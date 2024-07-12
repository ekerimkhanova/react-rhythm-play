import { MutableRefObject, useState, useCallback } from "react";
import { AudioWaveRef, VolumeRangeType } from "../types";

export function useAudio(state: MutableRefObject<AudioWaveRef>) {
  const [isPlayed, setPlayed] = useState(false);
  const [isMuted, setMuted] = useState(false);
  const [audioVolume, setAudioVolume] = useState(1);

  const clearCanvasRect = useCallback(() => {
    const ctx = state.current?.canvas.getContext("2d");

    ctx.fillStyle = state.current?.color;

    ctx.fillRect(
      0,
      0,
      state.current?.canvas.width,
      state.current?.canvas.height
    );
  }, [state]);

  const playAudio = useCallback(() => {
    state.current?.audio.play();
    setPlayed(true);

    if (state.current?.props?.onPlayAudio) {
      state.current.props.onPlayAudio();
    }
  }, [state]);

  const pauseAudio = useCallback(() => {
    state.current?.audio.pause();
    setPlayed(false);

    if (state.current?.props?.onPauseAudio) {
      state.current.props.onPauseAudio();
    }
  }, [state]);

  const toggleAudio = useCallback(
    (isPaused: boolean) => {
      if (isPaused) {
        playAudio();
      } else {
        pauseAudio();
      }
    },
    [pauseAudio, playAudio]
  );

  const rewind = useCallback(
    (sec: number) => {
      if (
        !state.current?.audio ||
        state.current?.audio.duration < sec ||
        sec < 0
      )
        return;

      state.current.audio.currentTime = sec;
      clearCanvasRect();

      if (state.current?.props?.onAudioRewind) {
        state.current.props.onAudioRewind(sec);
      }
    },
    [clearCanvasRect, state]
  );

  const toggleMuteAudio = useCallback(() => {
    const muteValue = !isMuted;
    setMuted(muteValue);
    if (muteValue) {
      setAudioVolume(0);
      state.current.audio.volume = 0;
    } else {
      setAudioVolume(0.5);
      state.current.audio.volume = 0.5;
    }
  }, [isMuted, state]);

  const muteAudio = useCallback(() => {
    state.current.audio.volume = 0;
    setAudioVolume(0);
    setMuted(true);

    if (state.current?.props?.onMuteAudio) {
      state.current.props.onMuteAudio();
    }
  }, [state]);

  const changeVolume = useCallback(
    (volume: VolumeRangeType) => {
      setAudioVolume(volume);
      state.current.audio.volume = volume;
      if (isMuted) {
        setMuted(false);
      }

      if (state.current?.props?.onChangeVolume) {
        state.current.props.onChangeVolume(volume);
      }
    },
    [isMuted, state]
  );

  return {
    playAudio,
    pauseAudio,
    rewindToBeginning: () => rewind(0),
    rewind,
    togglePlayPause: () => toggleAudio(state.current?.audio.paused),
    toggleMuteAudio,
    muteAudio,
    changeVolume,
    isPlayed,
    isMuted,
    audioVolume,
  };
}
