import { ChangeEvent } from "react";

import { useAudio } from "../../lib/hooks";
import { AudioBarProps, VolumeRangeType } from "../../lib/types";
import { IconPause, IconPlay, IconMute, IconLoud } from "../../assets/icons";
import { Button } from "../Button/Button";
import { InputRange } from "../InputRange/InputRange";

import cn from "./AudioBar.module.scss";

export const AudioBar = ({ isCustomAudioBar, state }: AudioBarProps) => {
  if (isCustomAudioBar || !state) {
    return null;
  }

  const {
    togglePlayPause,
    muteAudio,
    changeVolume,
    isPlayed,
    isMuted,
    audioVolume,
  } = useAudio({ current: state });

  const onVolumeChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const volume = +target.value as VolumeRangeType;
    changeVolume(volume);
  };

  return (
    <div className={cn.buttonsWrapper}>
      <Button
        onClick={togglePlayPause}
        icon={isPlayed ? <IconPause /> : <IconPlay />}
      />
      <div className={cn.rangeWrapper}>
        <Button
          onClick={muteAudio}
          icon={isMuted ? <IconMute /> : <IconLoud />}
        />
        <InputRange value={audioVolume} onChange={onVolumeChange} />
      </div>
    </div>
  );
};
