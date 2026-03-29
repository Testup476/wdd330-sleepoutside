import { getLocalStorage, removeItem,redirectTo } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { alertMessage } from "./utils.mjs";

export default class CheckoutProcess{
    constructor(key, outputSelector){
        this.key = key;
        this.outputSelector = outputSelector;
        this.List = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.Tax = 0;
        this.orderTotal = 0;
        this.taxRate = 0.06;
    }

    async init(){
        this.List = getLocalStorage(this.key)
        this.calculateItemSubTotal();
        this.calculateOrderTotal()
    }

    calculateItemSubTotal(){
        // const subtotal = document.querySelector("#subtotal");
         
        this.itemTotal = this.List.reduce((sum,item)=>{
            return sum + (Number(item.quantity || 1 ) *  item.FinalPrice)
        },0)

        document.querySelector(`${this.outputSelector} #subtotal`).innerText = (this.itemTotal).toFixed(1);
    }
    
    calculateOrderTotal(){

        // Calcul Tax
        this.Tax = this.itemTotal * this.taxRate;

        // Shipping Calcul
        const itemcount = this.List.length;
        (itemcount === 0) ? this.shipping = 0 : this.shipping = 10 + (itemcount -1) * 2;
        
        // Render the shipping value via the shipping ID
        document.querySelector(`${this.outputSelector} #shipping`).innerText = this.shipping;


        //Calcul and render the orderTotal
        this.orderTotal = this.itemTotal + this.Tax + this.shipping;
        document.querySelector(`${this.outputSelector} #total`).innerText = (this.orderTotal).toFixed(2)
        this.displayOrderTotals();
    }

    displayOrderTotals(){
       const tax = document.querySelector(`${this.outputSelector} #tax`)
       tax.innerText=`${this.Tax.toFixed(2)}`
    }

    async checkout(form){
        try {
            const formData = new FormData(form);
            const order = formDataToJSON(form);

            order.items = packgeItems(getLocalStorage(this.key))
            order.orderDate = new Date().toISOString();
            const instance = new ExternalServices(this.key);
            console.log(order);
            const result = await instance.checkout(order)

            if(result){
                removeItem(this.key)
                redirectTo("./checkout/success.html")
            }
            console.log(result);
            
            return result
            

       } catch (error) {
          console.log("checkout error", error);
        //    const msg = error.message? message || "Something went wrong during checkout";
           alertMessage(JSON.stringify(error.message,null, 2)
           );
       } 
    }
}

  function packgeItems(items) {
        return items.map(item =>({
            id : item.Id || item.id,
            name : item.Name || item.name,
            price : item.FinalPrice,
            quantity : item.quantity || 1
        }))
}


function formDataToJSON(formElement){
  return {
    fname: formElement.querySelector("#firstName").value.trim(),
    lname: formElement.querySelector("#lastName").value.trim(),
    address: {
      street: formElement.querySelector("#street").value.trim(),
      city: formElement.querySelector("#city").value.trim(),
      state: formElement.querySelector("#state").value.trim(),
      zip: formElement.querySelector("#zip").value.trim()
    },
    cardNumber: formElement.querySelector("#cardNumber").value.replace(/\D/g,''),
    expiration: (() => {
      const [year, month] = formElement.querySelector("#expDate").value.split("-");
      return `${month}/${year.slice(-2)}`; // MM/YY
    })(),
    cvv: formElement.querySelector("#cvv").value.trim()
  };
}


