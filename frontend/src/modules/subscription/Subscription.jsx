import "../../style/subscription.css";
import React, {useEffect} from "react";
import Navbar from "../home/Navbar";



const Subscription = () =>{

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AaPTZ3aeYYWIiFYtIVX_fyFAKzLYqh5Pdcc6orxBey5OroRa6A9wzmvrhtFbAfYEQiY58i-xA8_mNSO-&currency=USD";
        script.async = true;
        script.onload = () => {
          // Función para cargar los botones de PayPal en un contenedor específico
          const loadPayPalButtons = (containerId, amount) => {
            const container = document.querySelector(containerId);
            container.innerHTML = ""; // Limpiar el contenedor antes de renderizar el botón
            window.paypal.Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: amount // El precio del producto
                    }
                  }]
                });
              },
              onApprove: (data, actions) => {
                return actions.order.capture().then(details => {
                  alert('TTransaccion exitosa, realizada por ' + details.payer.name.given_name);
                  // Aquí puedes manejar el éxito de la transacción, como actualizar el estado del usuario
                });
              }
            }).render(containerId);
          };
    
          // Cargar los botones de PayPal para cada contenedor
          loadPayPalButtons('#paypal-button-container-1-month', '10.00');
          loadPayPalButtons('#paypal-button-container-3-months', '25.00');
          loadPayPalButtons('#paypal-button-container-12-months', '90.00');
        };
    
        document.body.appendChild(script);
    
        return () => {
          document.body.removeChild(script);
        };
      }, []);

    return(
        <div className="sub-body">
            <Navbar/>
            <h1>Suscripcion</h1>
            <div className="sub-container">
                <div className="sub-card"> 
                    <h2>1 mes</h2>
                    <p>Beneficios</p>
                    <li>Muchas cosas</li>
                    <li>Muchas cosas</li>
                    <div className="sub-button">
                        <div id="paypal-button-container-1-month"></div>
                    </div>
                    
                </div>
                <div className="sub-card">
                    <h2>3 meses</h2>
                    <p>Beneficios</p>
                    <li>Muchas cosas</li>
                    <li>Muchas cosas</li>
                    <li>Muchas cosas</li>
                    <div className="sub-button">
                        <div id="paypal-button-container-3-months"></div>
                    </div>
                </div>
                <div className="sub-card">
                    <h2>12 meses</h2>
                    <p>Beneficios</p>
                    <li>Muchas cosas</li>
                    <li>Muchas cosas</li>
                    <li>Muchas cosas</li>
                    <li>Muchas cosas</li>
                    <div className="sub-button">
                        <div id="paypal-button-container-12-months"></div>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
};
export default Subscription;