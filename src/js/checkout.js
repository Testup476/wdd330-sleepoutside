import CheckoutProcess from "./CheckoutProcess.mjs";
//import ExternalServices from "./ExternalServices.mjs";
import { CounterCart, getLocalStorage } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const element = getLocalStorage("so-cart");
  const count = document.querySelector(".cart-count");
  CounterCart(element, count);

  const form = document.querySelector("#checkoutForm");
  const process = new CheckoutProcess("so-cart", ".order-summary");
  process.init();

  document.querySelector(".btn").addEventListener("click", async (event) => {
    event.preventDefault();
    const isValid = form.checkValidity();
    form.reportValidity();

    if (!isValid) {
      return;
    }
    await process.checkout(form);
  });
});
