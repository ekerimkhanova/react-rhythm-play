import { useEffect } from "react";

import {
  DEFAULT_COLOR,
  PROGRESS_GRADIENT_STOP_COLOR_0,
  PROGRESS_GRADIENT_STOP_COLOR_1,
} from "../config";
import { AudioWaveRef } from "../types";

export function useEvents(state: AudioWaveRef) {
  const { canvas, audio, color, progressColor } = state || {};

  function onTimeUpdate() {
    const currentCanvasWidth =
      (canvas.width * audio.currentTime) / audio.duration;
    if (currentCanvasWidth <= 1) return;

    const ctx = canvas.getContext("2d");

    if (progressColor) {
      ctx.fillStyle = progressColor;
    } else {
      const linear = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
      );

      linear.addColorStop(0, PROGRESS_GRADIENT_STOP_COLOR_0);
      linear.addColorStop(1, PROGRESS_GRADIENT_STOP_COLOR_1);

      ctx.fillStyle = linear;
    }
    ctx.fillRect(0, 0, currentCanvasWidth, canvas.height);
  }

  function updateAudioRewind(e: MouseEvent) {
    const ctx = canvas.getContext("2d");

    if (color) {
      ctx.fillStyle = color;
    } else {
      ctx.fillStyle = DEFAULT_COLOR;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const currentCanvasWidth = e.offsetX;
    const currentTime = Math.round(
      (audio.duration * currentCanvasWidth) / canvas.width
    );
    audio.currentTime = currentTime;
    ctx.fillRect(0, 0, currentCanvasWidth, canvas.height);
  }

  useEffect(() => {
    if (!state) return;
    audio.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
    };
  });

  useEffect(() => {
    if (!state) return;

    canvas.addEventListener("click", updateAudioRewind);

    return () => {
      canvas.removeEventListener("click", updateAudioRewind);
    };
  });
}
