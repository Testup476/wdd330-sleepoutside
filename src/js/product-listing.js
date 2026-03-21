import { getLocalStorage, CounterCart } from "./utils.mjs";

const counter = document.querySelector(".cart-count");

const cartdata = getLocalStorage("so-cart");
CounterCart(cartdata, counter);
