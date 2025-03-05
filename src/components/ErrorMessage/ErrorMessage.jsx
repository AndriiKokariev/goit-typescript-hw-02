import s from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={s.errorContainer}>
      <p className={s.errorText}>Too many requests... Try again later!</p>
    </div>
  );
};

export default ErrorMessage;
