import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../store/cart-slice";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { name, quantity, total, price } = props.item;

  const handleAddToCart = () => {
    dispatch(addToCart(props.item));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(props.item));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{name}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleRemoveFromCart}>-</button>
          <button onClick={handleAddToCart}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
