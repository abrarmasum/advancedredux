import classes from "./CartButton.module.css";
import { toggleCart } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantities = useSelector((state) => state.cart.totalItems);

  const handleClick = () => {
    dispatch(toggleCart());
  };

  return (
    <button className={classes.button} onClick={handleClick}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantities}</span>
    </button>
  );
};

export default CartButton;
