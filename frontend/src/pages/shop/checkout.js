import Link from "next/link";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import LayoutFour from "../../components/Layout/LayoutFour";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";
import { formatCurrency } from "../../common/utils";
import { calculateTotalPrice } from "../../common/shopUtils";

export default function Checkout() {
  const cartState = useSelector((state) => state.cartReducer);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (formData) => {
    try {
      const payload = {
        email: formData.contact,
        name: formData.firstName,
        lastName: formData.lastName,
        address: formData.streetAddress,
        dptoNumber: formData.apartment,
        city: formData.town,
        state: formData.state,
        country: formData.country,
        zipCode: formData.zip,
        phone: formData.contact,
        total: calculateTotalPrice(cartState, false),
        apartment: formData.apartment,
        products: JSON.stringify(cartState.map(item => ({
          id: item.cartId,
          name: item.name,
          quantity: item.cartQuantity,
          price: item.price
        })))
      };

      const response = await fetch('http://127.0.0.1:8090/api/collections/sales/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos de venta');
      }

      window.location.reload();    
    } catch (error) {
      console.error('Error en el envío:', error);
    }
  };


  return (
    <LayoutFour title="COMPRAR">
      <Breadcrumb title="COMPRAR">
        <BreadcrumbItem name="INICIO" />
        <BreadcrumbItem name="TIENDA" />
        <BreadcrumbItem name="COMPRAR" current />
      </Breadcrumb>
      <div className="checkout">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="checkout__form">
                  <div className="checkout__form__contact">
                    <div className="checkout__form__contact__title">
                      <h5 className="checkout-title">INFORMACIÓN DE CONTACTO</h5>
                    </div>
                    <div className="input-validator">
                      <input
                        type="text"
                        name="contact"
                        ref={register({ required: true })}
                        placeholder="CORREO O NÚMERO DE TELÉFONO"
                      />
                      {errors.contact && (
                        <span className="input-error">
                          Por favor, indica un nombre o correo
                        </span>
                      )}
                    </div>
                    <label className="checkbox-label" htmlFor="subcribe-news">
                      <input
                        type="checkbox"
                        id="subcribe-news"
                        name="subcribeNews"
                        ref={register}
                      />
                      MANTÉNME AL TANTO DE NUEVAS OFERTAS
                    </label>
                  </div>
                  <div className="checkout__form__shipping">
                    <h5 className="checkout-title">DIRECCIÓN DE ENVÍO</h5>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="input-validator">
                          <label>
                            NOMBRE <span>*</span>
                            <input
                              type="text"
                              name="firstName"
                              ref={register({ required: true })}
                            />
                          </label>
                          {errors.firstName && (
                            <span className="input-error">
                              Por favor, indica un nombre
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12 col-md-6">
                        <div className="input-validator">
                          <label>
                            APELLIDO <span>*</span>
                            <input
                              type="text"
                              name="lastName"
                              ref={register({ required: true })}
                            />
                          </label>
                          {errors.lastName && (
                            <span className="input-error">
                              Por favor, indica un apellido
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            PAÍS <span>*</span>
                            <input
                              type="text"
                              name="country"
                              ref={register({ required: true })}
                            />
                          </label>
                          {errors.country && (
                            <span className="input-error">
                              Por favor, indica un país
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            DIRECCIÓN <span>*</span>
                            <input
                              type="text"
                              name="streetAddress"
                              ref={register({ required: true })}
                              placeholder="DIRECCIÓN"
                            />
                            <input
                              type="text"
                              name="apartment"
                              ref={register({ required: true })}
                              placeholder="NÚMERO DE DEPARTAMENTO (OPCIONAL)"
                            />
                          </label>
                          {errors.streetAddress || errors.apartment ? (
                            <span className="input-error">
                              Por favor, indica una dirección
                            </span>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            CIUDAD <span>*</span>
                            <input
                              type="text"
                              name="town"
                              ref={register({ required: true })}
                            />
                          </label>
                          {errors.town && (
                            <span className="input-error">
                              Por favor, indica una ciudad
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            DEPARTAMENTEO <span>*</span>
                            <input
                              type="text"
                              name="state"
                              ref={register({ required: true })}
                            />
                          </label>
                          {errors.state && (
                            <span className="input-error">
                              Por favor, indica un departamento
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            CÓDIGO POSTAL <span>*</span>
                            <input
                              type="text"
                              name="zip"
                              ref={register({ required: true })}
                            />
                          </label>
                          {errors.zip && (
                            <span className="input-error">
                              Por favor, indica un código postal
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-validator">
                          <label>
                            INDICACIONES
                            <input
                              type="text"
                              name="note"
                              placeholder="INDICACIONES PARA EL PEDIDO"
                              ref={register()}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <label className="checkbox-label" htmlFor="save">
                      <input
                        type="checkbox"
                        id="save"
                        name="saveInfo"
                        ref={register()}
                      />
                      GUARDAR ESTA INFORMACIÓN PARA LA PRÓXIMA VEZ
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-lg-4">

              <form
                className="checkout__total__coupon"
              >
                <h5>CÓDIGO DE CUPÓN</h5>
                <div className="input-validator">
                  <input
                    type="text"
                    placeholder="CÓDIGO DE CUPÓN"
                    name="coupon"
                  />
                </div>
                <button className="btn -dark">APLICAR</button>
              </form>
              <div className="checkout__total__price">
                <h5>PRODUCTO</h5>
                <table>
                  <colgroup>
                    <col style={{ width: "70%" }} />
                    <col style={{ width: "30%" }} />
                  </colgroup>
                  <tbody>
                    {cartState.map((item) => (
                      <tr key={item.cartId}>
                        <td>
                          <span>
                            {item.cartQuantity}
                          </span>{" "}
                          x {item.name}
                        </td>
                        <td>
                          {formatCurrency(item.price * item.cartQuantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="checkout__total__price__total-count">
                  <table>
                    <tbody>
                      <tr>
                        <td>SUBTOTAL</td>
                        <td>{calculateTotalPrice(cartState, true)}</td>
                      </tr>
                      <tr>
                        <td>TOTAL</td>
                        <td>{calculateTotalPrice(cartState, true)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <button
                className="btn -whiteBlack"
                onClick={handleSubmit(onSubmit)}
              >
                COMPRAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </LayoutFour>
  );
}
