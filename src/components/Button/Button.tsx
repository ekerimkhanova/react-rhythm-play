import { ButtonProps } from "../../lib/types";

import cn from "./Button.module.scss";

export const Button = ({
  icon,
  onClick,
  dataTestId = "reactRhythmPlay_button",
}: ButtonProps) => {
  return (
    <button className={cn.button} onClick={onClick} data-testid={dataTestId}>
      {icon}
    </button>
  );
};
