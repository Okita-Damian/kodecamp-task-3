class ProvisionStore {
  #shopName;
  #location;

  products = [];

  constructor(shopName, location) {
    this.#shopName = shopName;
    this.#location = location;
    this.products = [];
  }

  //  Get the  shop name
  getShopName() {
    return this.#shopName;
  }

  //  Get the shop location
  getLocation() {
    return this.#location;
  }

  updateLocation(newLocation) {
    if (!newLocation || typeof newLocation !== "string") {
      return {
        success: false,
        message: "invalide location",
      };
    }
    this.#location = newLocation;
    return {
      success: true,
      message: "shop location updated successfully",
    };
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
    const validStatus = ["in-stock", "low-stock", "out-of-stock"];
    const normalized = stockStatus.toLowerCase();
    if (!validStatus.includes(normalized)) {
      return {
        success: false,
        message:
          "Invalid stock status. Use in-stock, low-stock, or out-of-stock.",
      };
    }

    const newProduct = {
      productName,
      cost: parseFloat(cost.toString().replace(/,/g, "")),
      stockStatus: normalized,
      createdAt: new Date().toISOString(),
      id: Math.floor(Math.random() * 100000),
    };
    this.products.push(newProduct);
    return {
      success: true,
      message: "product added successfully",
      newProduct,
    };
  }

  // Edit a product by ID
  editProductById(id, newValues) {
    const product = this.getProductById(id);
    if (!product) {
      return {
        success: false,
        message: "product not found",
      };
    }

    if (newValues.productName) product.productName = newValues.productName;
    if (newValues.cost)
      product.cost = parseFloat(newValues.cost.toString().replace(/,/g, ""));
    return {
      success: true,
      message: "product edited successfully",
      data: product,
    };
  }

  // Update stock status by ID
  updateStockStatus(id, newStatus) {
    const product = this.getProductById(id);
    if (!product) {
      return {
        success: false,
        message: "product not found",
      };
    }

    const validStatus = ["in-stock", "low-stock", "out-of-stock"];
    const normalized = newStatus.toLowerCase();
    if (!validStatus.includes(normalized)) {
      return {
        success: false,
        message:
          "Invalid stock status. Use in-stock, low-stock, or out-of-stock.",
      };
    }

    product.stockStatus = normalized;
    return {
      success: true,
      message: "stock updated successfully",
      data: product,
    };
  }

  // Delete product by ID
  deleteProductById(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      return {
        success: false,
        message: "product not found",
      };
    }
    const deleted = this.products.splice(index, 1)[0];
    return {
      success: true,
      message: "product deleted successfully",
      data: deleted,
    };
  }
}

// =========================
// 🏁🏁🏁🚨🚨 Example Usage
// =========================

const store = new ProvisionStore("Sparrow's Autos", "Anambra");

const result = store.addProduct({
  productName: "DashboardCover",
  cost: "5,000",
  stockStatus: "in-stock",
});

// updated location
const updatedLocation = store.updateLocation("Lagos");

// shopLocation
const location = store.getLocation();

// Get products
const getStock = store.getProductById(result.newProduct.id);

// Edit product
const editStock = store.editProductById(result.newProduct.id, {
  productName: "Car Mirrors",
  cost: "7,990",
});

// Update stock status
const updateStock = store.updateStockStatus(result.newProduct.id, "low-stock");

// delete
const deleteStock = store.deleteProductById(result.newProduct.id);

// Logs

console.log("location:", location);
console.log("New location:", updatedLocation);
console.log("Get Product:", getStock);
console.log("Edit Result:", editStock);
console.log("Stock Update:", updateStock);
console.log("Delete Result:", deleteStock);
console.log("All Products:", store.listProducts());
