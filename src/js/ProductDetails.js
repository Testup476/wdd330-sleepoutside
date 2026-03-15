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
    cartItems.push(this.product);

    // updating the cartItems
    setLocalStorage("so-cart", cartItems);
    console.log(cartItems);
  }
  cartcountrender() {
    const cart = getLocalStorage("so-cart");
    const cartcount = document.querySelector(".cart-count");
    CounterCart(cart, cartcount);
  }
}

// Template for product details
function productTemplate(product) {
  const parent = document.querySelector(".product-detail");

  const details = `
                <h3>${product.Name}</h3>
                <h2>${product.NameWithoutBrand}</h2>
                <img  class="divider" src=${product.Image} alter="${product.NameWithoutBrand}">
                <p class="product-card__price"> $ ${product.FinalPrice}</p>
                <p class="product__color">${product.Colors[0].ColorName}</p>

                 <div class="product-detail__add">
                        <button id="addToCart" data-id = "${product.Id}">Add to Cart</button>
                </div>
            `;

  parent.innerHTML = details;
}
