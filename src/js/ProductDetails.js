import { getLocalStorage, setLocalStorage, CounterCart } from "./utils.mjs";

export default class productDetails {
  constructor(productId, datasource) {
    this.productId = productId;
    this.product = {};
    this.datasource = datasource;
  }

  async init() {
    this.product = await this.datasource.findProductById(this.productId);

    this.renderProductDetails();

    //Calling the cart counter
    this.cartcountrender();

    // add listener to Add to Cart button
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }
  renderProductDetails() {
    productTemplate(this.product);
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];

    const existingitem = findrelevantCart(cartItems, this.productId);

    updateCart(existingitem, this.product, cartItems);
    saveCart(cartItems);
  }
  cartcountrender() {
    const cart = getLocalStorage("so-cart");
    const cartcount = document.querySelector(".cart-count");
    CounterCart(cart, cartcount);
  }
}

// Locate the relevant cart
function findrelevantCart(cart, id) {
  return cart.filter((element) => element).find((item) => item.Id === id);
}

// Update cart items
function updateCart(existingitem, product, cart) {
  !existingitem ? NewProduct(cart, product) : incrementQuantity(existingitem);
  // if the product does not exist in the cart we add it, otherwise we just increment it quantity
}

// Increment the item quantity
function incrementQuantity(item) {
  item.quantity = item.quantity ? item.quantity + 1 : 1;
}

// Add a new product and save it in storage
function NewProduct(cart, product) {
  product.quantity = 1;
  cart.push(product);
}

// Function to save cart
function saveCart(cart) {
  setLocalStorage("so-cart", cart);
}
// Template for product details
function productTemplate(product) {
  const parent = document.querySelector(".product-detail");
  let sourceimg = "";
  typeof product.Images === "string"
    ? (sourceimg = product.Images)
    : (sourceimg = product.Images.PrimaryMedium ?? "");
  const details = `
                <h3>${product.Name}</h3>
                <h2>${product.NameWithoutBrand}</h2>
                <img  class="divider" src=${sourceimg} alter="${product.NameWithoutBrand}">
                <p class="product-card__price"> $ ${product.FinalPrice}</p>
                <p class="product__color">${product.Colors[0].ColorName}</p>

                 <div class="product-detail__add">
                        <button id="addToCart" data-id = "${product.Id}">Add to Cart</button>
                </div>
            `;

  parent.innerHTML = details;
}
