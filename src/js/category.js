import { getParam, getLocalStorage, CounterCart } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const category = getParam("category");

const productdata = new ProductData(category);

// print the category

document.querySelector(".category").innerHTML = category;

const datalist = new ProductList(
  category,
  productdata,
  document.querySelector(".product-list"),
);

datalist.init();

const counter = document.querySelector(".cart-count");

const cartdata = getLocalStorage("so-cart");
CounterCart(cartdata, counter);
