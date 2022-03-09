import logo from './logo.svg';
import './App.css';
import {loadStripe} from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  ShippingAddressElement,
} from "@stripe/react-stripe-js";
import { useState } from 'react'

const stripe = loadStripe('pk_test_51IGU4HHvdCSG50mtan9SFMcC0IMks0sGlRsBwc6MgNjmnV6fg8uWjWdqiiRHvWcRm3XsSv8zCfCBW7ULffu3fRIf00pb9LB42y', {
  betas: ['link_beta_2'],
  apiVersion: "2020-08-27;link_beta=v1"
});

// Customize the appearance of Elements using the Appearance API.
const appearance = {
  theme: 'night',
  /* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  labels: 'floating', */
  variables: {
    colorBackground: '#404040',
    borderRadius: '6px',
    spacingGridRow: '8px',
    colorText: '#ffffff',
    colorDanger: '#ff5a77',
    fontSizeBase: '14px',
    fontWeightNormal: '500',
  },
  rules: {
    '.Input': {
      border: '1px solid #979797',
    },
  },
}

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  console.log(stripe)

  const handleSubmit = async (event) => {
    event.preventDefault();

    //naboo -> item + amount

    /* const { paymentIntent, error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://my-site.com/order/123/complete",
      },
      redirect: 'if_required'
    });

    console.log(paymentIntent)

    if (error) {
      // handle error
      console.log(error)
    } */
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Contact info</h3>
      <LinkAuthenticationElement />
      <h3>Shipping</h3>
      <ShippingAddressElement />
      <h3>Payment</h3>
      <PaymentElement />
      <button type="submit">Submit</button>
    </form>
  );
}

function App() {
  const [clientSecret, setClientSecret] = useState('pi_3KbYpXHvdCSG50mt0dLbyfQP_secret_npSd81dtLtPufrl7f0uItuiEk')

  return (
    <div className="App">
      <input onBlur={(e) => setClientSecret(e.target.value)} />
      {clientSecret ? 
        <Elements stripe={stripe} options={{clientSecret, appearance}}>
          <CheckoutForm />
        </Elements>
      : null}
    </div>
  );
}

export default App;
