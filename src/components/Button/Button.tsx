import { ButtonProps } from "../../lib/types";

import cn from "./Button.module.scss";

export const Button = ({ icon, onClick }: ButtonProps) => {
  return (
    <button className={cn.button} onClick={onClick}>
      {icon}
    </button>
  );
};
