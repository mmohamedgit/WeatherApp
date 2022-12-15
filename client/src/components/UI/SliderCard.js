import classes from "../UI/SliderCard.module.css";

const SliderCard = (props) => {
  return <div className={`${classes["slider-card"]}`}>{props.children}</div>;
};

export default SliderCard;
