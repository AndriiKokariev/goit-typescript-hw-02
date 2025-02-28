import s from "./Notification.module.css";

const Notification = () => {
  return (
    <div className={s.notification}>
      <p className={s.text}>There are no matches for your search query...</p>
    </div>
  );
};

export default Notification;
