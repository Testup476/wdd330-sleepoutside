

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  async getData() {
    const data= await fetch(this.path);
    if(!data){
      throw new Error("no data to fetch");
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
}
