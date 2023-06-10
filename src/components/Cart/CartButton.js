import classes from "./CartButton.module.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../Store/ui-slice";
import { useSelector } from "react-redux";
const CartButton = (props) => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispathch = useDispatch();

  const toggleCartHandler = () => {
    dispathch(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
