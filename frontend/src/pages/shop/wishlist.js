import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { toast } from "react-toastify";

import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import { formatCurrency } from "../../common/utils";
import { addToCart } from "../../redux/actions/cartActions";
import { removeFromWishlist } from "../../redux/actions/wishlistActions";
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";

export default function () {
  const dispatch = useDispatch();
  const wishlistState = useSelector((state) => state.wishlistReducer);
  const cartState = useSelector((state) => state.cartReducer);
  const checkProductInCart = (pid) => {
    return cartState.find((item) => item.id === pid);
  };
  const addToCartHandle = (e, data) => {
    e.preventDefault();
    let productItem = checkProductInCart(data.id);
    if (!productItem) {
      dispatch(addToCart(data));
      return toast.success("Producto añadido al carrito!");
    }
  };
  const removeWishlistProduct = (e, pid) => {
    e.preventDefault();
    dispatch(removeFromWishlist(pid));
    return toast.error("Producto eliminado de la lista de deseos!");
  };
  return (
    <LayoutFour title="LISTA DE DESEOS">
      <Breadcrumb title="LISTA DE DESEOS">
        <BreadcrumbItem name="INICIO" />
        <BreadcrumbItem name="TIENDA" />
        <BreadcrumbItem name="LISTA DE DESEOS" current />
      </Breadcrumb>
      <div className="wishlist">
        <div className="container">
          {!wishlistState || wishlistState.length === 0 ? (
            <div className="wishlist__empty">
              <h3>NO HAY PRODUCTOS EN LA LISTA DE DESEOS</h3>
            </div>
          ) : (
            <div className="wishlist__table">
              <div className="wishlist__table__wrapper">
                <table>
                  <colgroup>
                    <col style={{ width: "40%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>PRODUCTO</th>
                      <th>PRECIO</th>
                      <th>STOCK</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistState.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="wishlist-product">
                            <div className="wishlist-product__image">
                              <img src={item.thumbImage[0]} alt={item.name} />
                            </div>
                            <div className="wishlist-product__content">
                              <h5>{item.category}</h5>
                              <Link
                                href={
                                  process.env.PUBLIC_URL +
                                  "/shop/product/[slug]"
                                }
                                as={
                                  process.env.PUBLIC_URL +
                                  "/shop/product/" +
                                  item.slug
                                }
                              >
                                <a>{item.name}</a>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td>{formatCurrency(item.price)}</td>
                        <td>{item.quantity > 0 ? "DISPONIBLE" : "NO DISPONIBLE"}</td>
                        <td>
                          <a
                            href={process.env.PUBLIC_URL + "#"}
                            className={`btn -dark ${
                              checkProductInCart(item.id) ? "-disable" : ""
                            }`}
                            onClick={(e) => addToCartHandle(e, item)}
                          >
                            {checkProductInCart(item.id)
                              ? "AÑADIDO AL CARRITO"
                              : "AÑADIR AL CARRITO"}
                          </a>
                          <a
                            className="remove-btn"
                            href={process.env.PUBLIC_URL + "#"}
                            onClick={(e) => removeWishlistProduct(e, item.id)}
                          >
                            <i className="fal fa-times"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <InstagramTwo />
    </LayoutFour>
  );
}
