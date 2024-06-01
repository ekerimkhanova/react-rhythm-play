import { DrawBufferProps } from "./types";

export function drawBuffer({
  canvas,
  canvasWidth,
  canvasHeight,
  chanelData,
  color,
}: DrawBufferProps) {
  const ctx = canvas.current.getContext("2d");
  canvas.current.width = canvasWidth;
  canvas.current.height = canvasHeight;

  const canvasVirtual = document.createElement("canvas");
  const canvasVirtualContext = canvasVirtual.getContext("2d");
  canvasVirtual.width = canvasWidth;
  canvasVirtual.height = canvasHeight;
  const step = Math.ceil(chanelData.length / canvasWidth); // chanelData == buffer.getChannelData(0) - return Float32Array. Every 32 bits it's 1 sample (small decoded audio fragment). 0 is monoCanal - each earphone will have the same sound
  const amp = canvasHeight / 2;

  for (let i = 0; i < canvasWidth; i++) {
    let min = 1.0;
    let max = -1.0;
    for (let j = 0; j < step; j++) {
      const datum = chanelData[i * step + j];
      if (datum < min) {
        min = datum;
      }
      if (datum > max) {
        max = datum;
      }
    }
    canvasVirtualContext.beginPath();
    canvasVirtualContext.fillStyle = color;
    canvasVirtualContext.fillRect(
      i,
      (1 + min) * amp,
      1,
      Math.max(1, (max - min) * amp)
    );
    canvasVirtualContext.closePath();
    canvasVirtualContext.fill();
  }

  const img = new Image();
  img.src = canvasVirtual.toDataURL();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    ctx.globalCompositeOperation = "source-atop";
    img.style.display = "none";
  };
}
