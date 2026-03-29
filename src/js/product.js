import { getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import productDetails from "./ProductDetails.js";

const category = getParam("category");
const productId = getParam("product");
const datasource = new ExternalServices(category);

const product = new productDetails(productId, datasource);
product.init();
