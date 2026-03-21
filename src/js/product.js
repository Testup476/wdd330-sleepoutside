import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import productDetails from "./ProductDetails.js";

const category = getParam("category");
const productId = getParam("product");
const datasource = new ProductData(category);

const product = new productDetails(productId, datasource);
product.init();
