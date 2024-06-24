import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import classNames from "classnames";

import { formatCurrency } from "../../../common/utils";
import { addToCart } from "../../../redux/actions/cartActions";
import { addToWishlist } from "../../../redux/actions/wishlistActions";
import ProductDetailController from "./ProductDetailController";
import ProductDetailInfoTab from "./ProductDetailInfoTab";
import Rate from "../../Other/Rate";
import { checkProductInWishList } from "../../../common/shopUtils";

export default function ProductDetailInfo({ data, onReviewSubmit, hideTab }) {
  const dispatch = useDispatch();
  const wishlistState = useSelector((state) => state.wishlistReducer);
  const [quantity, setQuantity] = useState();
  const [otherColor, setOtherColor] = useState();
  const getQuantity = (q) => {
    setQuantity(q);
  };
  const onAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(data, quantity, otherColor));
    toast.success("Producto añadido al carrito!");
  };
  const onAddToWishList = (e) => {
    e.preventDefault();
    let product = checkProductInWishList(wishlistState, data.id);
    dispatch(addToWishlist(data));
    toast.dismiss();
    if (!product) {
      return toast.success("Producto añadido a la lista de deseos!");
    } else {
      return toast.error("Producto eliminado de la lista de deseos!");
    }
  };
  return (
    <div className="product-detail__content">
      <div className="product-detail__content__header">
        <h5>{data.category}</h5>
        <h2>{data.name}</h2>
        <div className="product-detail__content__header__comment-block">
          <Rate currentRate={data.rate} />
          <p>03 RESEÑAS</p>
          <Link href={process.env.PUBLUC_URL + "#"}>
            <a>ESCRIBE UNA RESEÑA</a>
          </Link>
        </div>
        <h3>
          {data.discount
            ? formatCurrency(data.discount)
            : formatCurrency(data.price)}
          {data.discount && <span>{formatCurrency(data.price)}</span>}
        </h3>
      </div>
      <div className="divider"></div>
      <div className="product-detail__content__footer">
        <ul>
          <li>
            MARCA: <span>{data.brand}</span>
          </li>
          <li>
            CÓDIGO DE PRODUCTO: <span>{data.code}</span>
          </li>
          <li>
            PUNTOS DE RECOMPENSAS: <span>{data.point}</span>
          </li>
          <li>
            DISPONIBILIDAD:
            {data.quantity > 0 ? (
              <span className="in-stock">DISPONIBLE</span>
            ) : (
              <span className="out-stock">NO DISPONIBLE</span>
            )}
          </li>
        </ul>
        {data.variation && (
          <div className="product-detail__colors">
            <span>Color:</span>
            {data.variation.map((color, index) => (
              <div
                key={index}
                className={`product-detail__colors__item ${classNames({
                  active: otherColor === color.color,
                })}`}
                style={{ backgroundColor: color.colorCode }}
                onClick={() => setOtherColor(color.color)}
              />
            ))}
          </div>
        )}
        <ProductDetailController
          data={data}
          getQuantity={getQuantity}
          onAddToCart={onAddToCart}
          onAddToWishList={onAddToWishList}
          color={otherColor}
        />
      </div>
      {!hideTab && (
        <>
          <div className="divider"></div>
          <div className="product-detail__content__tab">
            <ProductDetailInfoTab onReviewSubmit={onReviewSubmit} />
          </div>
        </>
      )}
    </div>
  );
}
