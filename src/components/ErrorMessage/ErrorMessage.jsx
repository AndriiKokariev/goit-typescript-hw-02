import s from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={s.errorContainer}>
      <p className={s.errorText}>Something went wrong... Try again later!</p>
    </div>
  );
};

export default ErrorMessage;
