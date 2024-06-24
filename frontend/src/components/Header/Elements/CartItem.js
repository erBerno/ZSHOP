import { useDispatch } from "react-redux";

import { formatCurrency } from "../../../common/utils";
import { removeFromCart } from "../../../redux/actions/cartActions";
import Link from "next/link";
import { toast } from "react-toastify";

function CartItem(props) {
  const dispatch = useDispatch();
  const { image, name, price, quantity, cartId } = props;
  const removeProductHandle = (e) => {
    e.preventDefault();
    dispatch(removeFromCart(cartId));
    toast.error("Producto eliminado del carrito!");
  };
  console.log("Image URL:", process.env.PUBLIC_URL + image);
  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={process.env.PUBLIC_URL + image} alt="Product image" />
      </div>
      <div className="cart-item__info">
        <Link
          href={""}
          as={""}
        >
          <a>{name}</a>
        </Link>
        <h5>{formatCurrency(price)}</h5>
        <p>
          CANTIDAD: <span>{quantity}</span>
        </p>
      </div>
      <a className="cart-item__remove" href="#" onClick={removeProductHandle}>
        <i className="fal fa-times"></i>
      </a>
    </div>
  );
}

export default CartItem;
