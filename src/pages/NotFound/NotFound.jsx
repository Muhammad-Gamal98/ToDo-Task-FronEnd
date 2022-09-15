import classes from "./NotFound.module.css";
import { images } from "../../constants/index.js";

function NotFound() {
  return (
    <div className={classes.notFound}>
      <img src={images.notfound} alt="" className={classes["not-found-image"]} />
    </div>
  );
}

export default NotFound;
