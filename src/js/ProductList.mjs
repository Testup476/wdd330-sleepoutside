import { renderListWithTemplate } from "./utils.mjs";

const productCardTemplate = (product)=>{
   return `
       <li>
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.Name}">
            <h2 class="card__brand">${product.Brand.Name}</h2>
            <h3 class="card__name">${product.Name}</h3>
            <p class="product-card">$ ${product.FinalPrice}</p>
        </a>
       </li>
    `;
}


export default class ProductList{
    constructor(category,datasource,listElement){
        this.category = category;
        this.datasource = datasource;
        this.listElement = listElement;
    }
    async init(){
        const data = await this.datasource.getData();
        this.renderList(data);
    }

    renderList(list){
       renderListWithTemplate(productCardTemplate,this.listElement,list,"afterbegin",true)

    }
}