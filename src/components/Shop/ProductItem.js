import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cart-slice";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { name, price, description } = props.product;

  const addToCartHandler = () => {
    dispatch(addToCart(props.product));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{name}</h3>
          <div className={classes.price}>${price}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
