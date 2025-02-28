import { SyncLoader } from "react-spinners";
import s from "./Loader.module.css";

const Loader = ({ loading }) => {
  return (
    <div className={s.overlay}>
      <SyncLoader loading={loading} color="#49f" size={15} />
    </div>
  );
};

export default Loader;
