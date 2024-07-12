import { ChangeEvent } from "react";

import { useAudio } from "../../lib/hooks";
import { AudioBarProps, VolumeRangeType } from "../../lib/types";
import { IconPause, IconPlay, IconMute, IconLoud } from "../../assets/icons";
import { Button } from "../Button/Button";
import { InputRange } from "../InputRange/InputRange";

import cn from "./AudioBar.module.scss";

export const AudioBar = ({ isCustomAudioBar, state }: AudioBarProps) => {
  const {
    togglePlayPause,
    muteAudio,
    changeVolume,
    isPlayed,
    isMuted,
    audioVolume,
  } = useAudio({ current: state });

  if (isCustomAudioBar) {
    return null;
  }

  const onVolumeChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const volume = +target.value as VolumeRangeType;
    changeVolume(volume);
  };

  return (
    <div className={cn.buttonsWrapper} data-testid="reactRhythmPlay_container">
      <Button
        onClick={togglePlayPause}
        icon={isPlayed ? <IconPause /> : <IconPlay />}
        dataTestId="reactRhythmPlay_togglePlayPauseButton"
      />
      <div className={cn.rangeWrapper}>
        <Button
          onClick={muteAudio}
          icon={isMuted ? <IconMute /> : <IconLoud />}
          dataTestId="reactRhythmPlay_muteAudioButton"
        />
        <InputRange value={audioVolume} onChange={onVolumeChange} />
      </div>
    </div>
  );
};
