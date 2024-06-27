import "./Cart.css";
import CardProductCart from "../components/CardProductCart";
import NavBar from "../components/NavBar";
import { Footer } from "../components/Footer";
import { CartContext } from "../context/CartContext";
import { useContext, useEffect } from "react";
import { loadScript } from "@paypal/paypal-js";
import Swal from "sweetalert2";

function Cart() {
  const { cartItems, emptyCart } = useContext(CartContext);
  const totalCartItems = cartItems.length;
  const totalPrice = cartItems.reduce(
    (total, product) => total + product.price,
    0
  );
  
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirigir al usuario a la página de inicio de sesión si no está autenticado
    window.location.href = "/login";
  }

  const loadPayPalScript = async () => {
    try {
      const paypalScript = await loadScript({
        "client-id": "",
        currency: "USD",
        intent: "capture",
      });

      paypalScript.Buttons({
        createOrder: async () => {
          const response = await fetch("http://localhost:3000/api/paypal/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ totalAmount: totalPrice.toFixed(2)}),
          });
          const { orderId } = await response.json();
          
          return orderId;
        },
        onApprove: (data) => {
          Swal.fire({
            title: "Pago exitoso",
            text: "Tu pago ha sido procesado exitosamente",
            icon: "success",
            confirmButtonText: "Ok",
          }).then(
            emptyCart(),
            window.location.href = "/"
          )
        },
      }).render("#paypal-button-container");
    } catch (error) {
      console.error("Error al cargar el script de PayPal:", error);
    }
  };

  
  useEffect(() => {
    loadPayPalScript();
  }, []);



  return (
    <>
      <NavBar />
      <div className="content-cart">
        <div className="cart">
          <h1 className="cart-title">Tu carrito</h1>
          <div className="cart__items">
            {
              (totalCartItems > 0) 
              ? 
              cartItems.map((product) => (
                <CardProductCart key={product._id} product={product} />
              ))
              :
              <p>No hay productos en el carrito</p>
            }
          </div>
        </div>
        <aside className="cart-pay-aside">
          <h2 className="cart-pay-title">Resumen de compra</h2>
          <div className="cart-pay-info">
            <p>
              Cantidad de productos: <span className="cart-pay-cant">{totalCartItems}</span>
            </p>
            <p>
              Total: <span className="cart-pay-total">RD${totalPrice}</span>
            </p>
            <div id="paypal-button-container"></div>
          </div>
        </aside>
      </div>
    </>
  );
}

export default Cart;
