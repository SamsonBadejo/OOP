// Product class
class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }
  
  // ShoppingCartItem class
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }
  
    // Method to calculate the total price of the item
    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  // ShoppingCart class
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    // Method to add items to the cart
    addItem(product, quantity) {
      // Check if the item already exists in the cart
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));
      }
      this.displayCart(); // Update cart display after adding an item
    }
  
    // Method to remove items from the cart
    removeItem(productId) {
      const index = this.items.findIndex(item => item.product.id === productId);
      if (index !== -1) {
        const item = this.items[index];
        const element = document.getElementById(`item-${productId}`);
        if (element) {
          element.classList.add('removed');
          setTimeout(() => {
            this.items.splice(index, 1);
            this.displayCart();
          }, 300); // Match CSS transition time
        }
      }
    }
  
    // Method to get the total of items inside the cart
    getTotal() {
      return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
  
    // Method to display cart items
    displayCart() {
      const container = document.getElementById('cart-container');
      container.innerHTML = '';
  
      if (this.items.length === 0) {
        container.innerHTML = '<p>No items in the cart.</p>';
        return;
      }
  
      this.items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.id = `item-${item.product.id}`;
        div.innerHTML = `
          <p><strong>Product:</strong> ${item.product.name}</p>
          <p><strong>Quantity:</strong> ${item.quantity}</p>
          <p><strong>Total Price:</strong> $${item.getTotalPrice().toFixed(2)}</p>
        `;
        container.appendChild(div);
      });
  
      const totalDiv = document.createElement('div');
      totalDiv.innerHTML = `<h2>Total Cart Price: $${this.getTotal().toFixed(2)}</h2>`;
      container.appendChild(totalDiv);
    }
  }
  
  // Example usage
  
  // Create products
  const product1 = new Product(1, 'Laptop', 999.99);
  const product2 = new Product(2, 'Headphones', 199.99);
  const product3 = new Product(3, 'Mouse', 29.99);
  const product4 = new Product(4, 'Keyboard', 49.99);
  
  // Create a shopping cart
  const cart = new ShoppingCart();
  
  // Add items to the cart
  cart.addItem(product1, 1);
  cart.addItem(product2, 2);
  cart.addItem(product3, 3);
  cart.addItem(product4, 1);
  
  // Display the cart
  cart.displayCart();
  
  // Remove an item from the cart after 5 seconds for demonstration
  setTimeout(() => cart.removeItem(2), 5000);
  