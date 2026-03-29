
const baseURL = import.meta.env.VITE_SERVER_URL;
import { alertMessage } from "./utils.mjs";

async function convertToJson(res) {
  const jsonResponse = await res.json(); // 🔥 lire d'abord le body

  if (res.ok) {
    return jsonResponse;
  } else {
    // envoyer une erreur personnalisée
    throw {
      name: "servicesError",
      message: jsonResponse
    };
  }
}



function option(verb, data = null) {
  return {
    method: verb,
    headers: {
      "Content-Type": "application/json"
    },
    body: data ?  JSON.stringify(data) : null
  };
}

export default class ExternalServices {
  constructor(category) {
    this.category = category;
  }
  async getData() {
    const data= await fetch(baseURL + `products/search/${this.category}`);
    if(!data){
      alertMessage("No data to fetch",data)
    }
    const response = await convertToJson(data);
    const list = await response.Result ?? response;
     

    if (!Array.isArray(list)) {
      console.warn("getData() did not return an array:", list);
      return [];
    }
    return list
    ;
  }


  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

   async checkout(order){
    const res = await fetch(baseURL, option("POST", order))
    const Result = await res.json()
    return Result;
}

async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
 
}

