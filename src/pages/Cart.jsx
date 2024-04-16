import "./Cart.css";
import CardProductCart from "../components/CardProductCart";
import NavBar from "../components/NavBar";
import { Footer } from "../components/Footer";
function Cart() {
return (
    <>
<NavBar/>
    <div className="content-cart">
      <div className="cart">
          <h1 className="cart-title">Tu carrito</h1>
          <p className="total-products-card">Total: <span>20</span></p>

          <div className="cart__items">
              <CardProductCart />
              <CardProductCart />
              <CardProductCart />
          </div>
      </div>
      <aside className="cart-pay-aside">
          <h2 className="cart-pay-title">Resumen de compra</h2>
          <div className="cart-pay-info">
              <p>Cantidad de productos:  <span className="cart-pay-cant"> 3</span></p>
              <p>Total: <span className="cart-pay-total">RD$5500</span></p>
              <button className="btn-pay">Pagar Stripe</button>
              <button className="btn-pay">Pagar paypal</button>
          </div>
      </aside>
    </div>
      <Footer />
    </>
  );
}

export default Cart;
