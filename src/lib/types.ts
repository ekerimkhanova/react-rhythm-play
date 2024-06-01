export interface CommonProps {
  dataTestId?: string;
}

export interface AudioWaveProps {
  color?: string;
  progressColor?: string;
  progressGradientStartColor?: string;
  progressGradientEndColor?: string;
  width?: number;
  height: number;
  audioSource: string;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  isCustomAudioBar?: boolean;
  onPlayAudio?: () => void;
  onPauseAudio?: () => void;
  onAudioRewind?: (sec: number) => void;
  onMuteAudio?: () => void;
  onChangeVolume?: (volume: VolumeRangeType) => void;
}

export interface AudioWaveRef {
  canvas: HTMLCanvasElement;
  audio: HTMLAudioElement;
  color: string;
  progressColor: string;
  progressGradientStartColor: string;
  progressGradientEndColor: string;
  props: AudioWaveProps;
}

export type VolumeRangeType =
  | 0
  | 0.1
  | 0.2
  | 0.3
  | 0.4
  | 0.5
  | 0.6
  | 0.7
  | 0.8
  | 0.9
  | 1;

export interface AudioBarProps {
  isCustomAudioBar?: boolean;
  state: AudioWaveRef;
}

export interface ButtonProps extends CommonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

export interface InputRangeProps {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DrawBufferProps {
  canvas: React.MutableRefObject<HTMLCanvasElement>;
  canvasWidth: number;
  canvasHeight: number;
  chanelData: Float32Array;
  color?: string;
}
