import { FaSadTear } from "react-icons/fa";
import classes from "../ErrorPage/ErrorPage.module.css";

const ErrorPage = (props) => {
  return (
    <div className={classes.error}>
      {/* <p>{props.errorCode} Error</p> */}
      <FaSadTear size="200px" />
      <p className={classes["error-message"]}>
        {props.errorMessage === "city not found" ? (
          <div>
            <p className={classes["not-found"]}>City not found!</p>
            <p>Please try again.</p>
          </div>
        ) : (
          props.errorMessage
        )}
      </p>
      <p>{props.statusCode}</p>
      <p className={classes["status-message"]}>{props.statusText}</p>
    </div>
  );
};

export default ErrorPage;
