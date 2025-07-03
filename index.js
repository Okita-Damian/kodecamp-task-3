class ProvisionStore {
  #shopName;
  #shopClass;

  products = [];

  constructor(shopName, location, shopClass, products = []) {
    this.#shopName = shopName;
    this.#shopClass = shopClass;
    this.location = location;

    this.products = products.map((product) => {
      return {
        name: product.name,
        cost: product.cost,
        stockStatus: product.stockStatus,
        createdAt: new Date().toISOString(),
        id: Math.floor(Math.random() * 100000),
      };
    });
  }

  // methods that return the list of products
  listProducts() {
    return this.products;
  }

  // get product by id
  getProductById(id) {
    return this.products.find((p) => p.id === id) || null;
  }
  // add new product
  addProduct({ name, cost, stockStatus }) {
    const newProduct = {
      name,
      cost,
      stockStatus,
      createdAt: new Date().toISOString(),
      id: Math.floor(Math.random() * 100000),
    };
    this.products.push(newProduct);
    return { message: "product added", newProduct };
  }
  // edit a products properties by ID
  editProductById(id, newValues) {
    const product = this.getProductById(id);
    if (!product) return "product not found";

    if (newValues.name) product.name = newValues.name;
    if (newValues.cost) product.cost = newValues.cost;
    return "product editted";
  }

  //  edit the stockStatus
  updatesStockStatus(id, newStatus) {
    const status = this.getProductById(id);
    if (!status) return "product not found";

    const validStatus = ["In Stock", "Low Stock", "Out of Stock"];
    if (!validStatus.includes(newStatus)) return "Invalid stock status";

    status.stockStatus = newStatus;
    return "stock updated";
  }

  // delete product by ID
  deleteProductById(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return "product not found";

    this.products.splice(index, 1);
    return "product deleted";
  }
}

const store = new ProvisionStore("Sparrow's Autor's", "Anambra", "S");

const result = store.addProduct({
  name: "DashboardCover",
  cost: "5,000",
  stockStatus: "In Stock",
});

// Get products
const getStock = store.getProductById(result.newProduct.id);

// Edit product
const editStock = store.editProductById(result.newProduct.id, {
  name: "Car Mirrors",
  cost: "7,990",
});

// Update stock status
const updateStock = store.updatesStockStatus(result.newProduct.id, "Low Stock");

// Logs
console.log("All Products:", store.listProducts());
console.log("Get Product:", getStock);
console.log("Edit Result:", editStock);
console.log("Stock Update:", updateStock);

// delete
const deleteStock = store.deleteProductById(result.newProduct.id);
console.log("Delete Result:", deleteStock);

// Final product list
console.log("Final Products:", store.listProducts());
