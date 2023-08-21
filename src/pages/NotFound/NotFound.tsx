import { useNavigate } from "react-router-dom";
import gifImage from "../../assets/gif/404-Error.gif";
import styles from "./NotFound.module.scss";
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="d-flex bg-secondary align-items-center justify-content-center h-100">
      <div className="position-relative ">
        <img src={gifImage} alt="Animated GIF" width="400px" />
        <div
          className={` ${styles.home} position-absolute bg-tertiary text-secondary rounded-1 cursor-pointer`}
          onClick={() => navigate("/")}
        >
          Home
        </div>
      </div>
    </section>
  );
};

export default NotFound;
