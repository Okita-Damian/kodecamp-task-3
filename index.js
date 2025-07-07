class ProvisionStore {
  #shopName;
  #shopLocation;

  products = [];

  constructor(shopName, location, products = []) {
    this.#shopName = shopName;
    this.#shopLocation = location;

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

  //  Get the  shop name
  getShopName() {
    return this.#shopName;
  }

  //  Get the shop location
  getShopLocation() {
    return this.#shopLocation;
  }

  updateShopLocation(newLocation) {
    if (!newLocation || typeof newLocation !== "string") {
      return "invalid location";
    }
    this.#shopLocation = newLocation;
    return "shop location updated";
  }

  // Return the list of products
  listProducts() {
    return this.products;
  }

  // Get product by ID
  getProductById(id) {
    return this.products.find((p) => p.id === id) || null;
  }

  // Add a new product
  addProduct({ productName, cost, stockStatus }) {
    const newProduct = {
      productName,
      cost,
      stockStatus,
      createdAt: new Date().toISOString(),
      id: Math.floor(Math.random() * 100000),
    };
    this.products.push(newProduct);
    return { message: "product added", newProduct };
  }

  // Edit a product by ID
  editProductById(id, newValues) {
    const product = this.getProductById(id);
    if (!product) return "product not found";

    if (newValues.productName) product.productName = newValues.productName;
    if (newValues.cost) product.cost = newValues.cost;
    return "product edited";
  }

  // Update stock status by ID
  updatesStockStatus(id, newStatus) {
    const product = this.getProductById(id);
    if (!product) return "product not found";

    const validStatus = ["In Stock", "Low Stock", "Out of Stock"];
    if (!validStatus.includes(newStatus)) return "Invalid stock status";

    product.stockStatus = newStatus;
    return "stock updated";
  }

  // Delete product by ID
  deleteProductById(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) return "product not found";

    this.products.splice(index, 1);
    return "product deleted";
  }
}

// =========================
// 🏁🏁🏁🚨🚨 Example Usage
// =========================

const store = new ProvisionStore("Sparrow's Autos", "Anambra");

const result = store.addProduct({
  productName: "DashboardCover",
  cost: "5,000",
  stockStatus: "In Stock",
});

// updated location
const updatedLocation = store.updateShopLocation("Lagos");

// shopLocation
const location = store.getShopLocation();

// Get products
const getStock = store.getProductById(result.newProduct.id);

// Edit product
const editStock = store.editProductById(result.newProduct.id, {
  productName: "Car Mirrors",
  cost: "7,990",
});

// Update stock status
const updateStock = store.updatesStockStatus(result.newProduct.id, "Low Stock");

// delete
const deleteStock = store.deleteProductById(result.newProduct.id);

// Logs

console.log("shop location:", location);
console.log("New location:", updatedLocation);
console.log("Get Product:", getStock);
console.log("Edit Result:", editStock);
console.log("Stock Update:", updateStock);
console.log("Delete Result:", deleteStock);
console.log("All Products:", store.listProducts());
