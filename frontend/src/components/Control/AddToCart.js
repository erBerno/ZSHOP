import Button from "./Button";
import classNames from "classnames";

export default function AddToCart({ onClick, className }) {
  return (
    <div className={`add-to-cart ${classNames(className)}`} onClick={onClick}>
      <Button
        height="3.85em"
        width="3.85em"
        color="whiteBlack"
        className="-round"
        action="#"
        content={<i className="fas fa-shopping-bag"></i>}
      />

      <h5>AÑADIR AL CARRITO</h5>
    </div>
  );
}
