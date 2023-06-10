import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../Store/ui-slice";
const CartButton = (props) => {
  const dispathch = useDispatch();

  const toggleCartHandler = () => {
    dispathch(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
