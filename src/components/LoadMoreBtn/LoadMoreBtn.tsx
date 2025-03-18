import s from "./LoadMoreBtn.module.css";
import { FC } from "react";

interface LoadMoreBtnProps {
  handleClick: () => void;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ handleClick }) => {
  return (
    <div className={s.btnContainer}>
      <button className={s.btn} onClick={handleClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
