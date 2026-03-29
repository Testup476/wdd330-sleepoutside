import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getLocalStorage, CounterCart } from "./utils.mjs";
import { alertMessage } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  try{
    const productdata = new ExternalServices("tents");

  const datalist = new ProductList(
    "tents",
    productdata,
    document.querySelector(".product-list"),
  );
  const counter = document.querySelector(".cart-count");
  datalist.init();

  const cartdata = getLocalStorage("so-cart");
  CounterCart(cartdata, counter);
  }
  catch(error){
    alertMessage(error.message,null,2)
  }
});
