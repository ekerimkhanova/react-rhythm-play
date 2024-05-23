import {
  useEffect,
  useRef,
  forwardRef,
  MutableRefObject,
  useImperativeHandle,
  useState,
} from "react";

import { useInitAudio, useEvents } from "../../lib/hooks";
import { AudioWaveProps, AudioWaveRef } from "../../lib/types";
import { drawBuffer } from "../../lib/utils";
import { AudioBar } from "../AudioBar/AudioBar";
import { Loader } from "../Loader/Loader";

import cn from "./AudioWave.module.scss";

const AudioWave = forwardRef<AudioWaveRef, AudioWaveProps>(
  (props, ref: MutableRefObject<AudioWaveRef>) => {
    const {
      color,
      progressColor,
      width,
      height,
      audioSource,
      loadingComponent,
      isCustomAudioBar,
    } = props;

    const canvas = useRef<HTMLCanvasElement>(null);
    const canvasWrapper = useRef<HTMLDivElement>(null);

    const { audioBuffer, isLoading, audio } = useInitAudio(audioSource);

    const [state, setState] = useState<AudioWaveRef>();

    const style = { width: width ?? "100%", height };

    useEffect(() => {
      if (canvas.current && audioBuffer && canvasWrapper.current) {
        drawBuffer({
          canvas,
          canvasWidth: width ?? canvasWrapper.current.clientWidth,
          canvasHeight: height,
          chanelData: audioBuffer.getChannelData(0),
          color,
        });

        setState({
          canvas: canvas.current,
          audio,
          color,
          progressColor,
          props,
        });
      }
    }, [canvas.current, audioBuffer, canvasWrapper.current]);

    useEvents(state);

    useImperativeHandle(ref, () => state, [state]);

    if (isLoading) {
      return (
        <div className={cn.loaderWrapper} style={style}>
          {loadingComponent ? loadingComponent : <Loader />}
        </div>
      );
    }

    return (
      <div ref={canvasWrapper} className={cn.content}>
        <canvas ref={canvas} style={style} />
        <AudioBar state={state} isCustomAudioBar={isCustomAudioBar} />
      </div>
    );
  }
);

export default AudioWave;
