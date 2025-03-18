import s from "./ErrorMessage.module.css";
import { FC } from "react";

const ErrorMessage: FC = () => {
  return (
    <div className={s.errorContainer}>
      <p className={s.errorText}>Too many requests... Try again later!</p>
    </div>
  );
};

export default ErrorMessage;
