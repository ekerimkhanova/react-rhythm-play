import { InputRangeProps } from "../../lib/types";

import cn from "./InputRange.module.scss";

export const InputRange = ({ value, onChange }: InputRangeProps) => {
  return (
    <input
      type="range"
      min="0"
      max="1"
      step="0.1"
      value={value}
      onChange={onChange}
      className={cn.inputRange}
      data-testid="reactRhythmPlay_inputRange"
    />
  );
};
