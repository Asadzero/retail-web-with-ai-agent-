export class ProductManager {
  constructor(cartManager) {
    this.cartManager = cartManager
    this.products = [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299.99,
        description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
        category: "Electronics"
      },
      {
        id: 2,
        name: "Smart Fitness Watch",
        price: 199.99,
        description: "Advanced fitness tracking with heart rate monitoring, GPS, and smartphone connectivity. Track your health goals effortlessly.",
        image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
        category: "Wearables"
      },
      {
        id: 3,
        name: "Minimalist Backpack",
        price: 89.99,
        description: "Sleek and functional backpack perfect for work, travel, or daily use. Made with durable materials and thoughtful design.",
        image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
        category: "Accessories"
      },
      {
        id: 4,
        name: "Organic Coffee Blend",
        price: 24.99,
        description: "Premium organic coffee beans sourced from sustainable farms. Rich, smooth flavor that coffee enthusiasts will love.",
        image: "https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
        category: "Food & Beverage"
      },
      {
        id: 5,
        name: "Wireless Charging Pad",
        price: 49.99,
        description: "Fast wireless charging for all compatible devices. Sleek design that complements any workspace or bedside table.",
        image: "https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
        category: "Electronics"
      },
      {
        id: 6,
        name: "Eco-Friendly Water Bottle",
        price: 34.99,
        description: "Sustainable stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Perfect for active lifestyles.",
        image: "https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
        category: "Lifestyle"
      }
    ]
  }

  getAllProducts() {
    return this.products
  }

  getProductById(id) {
    return this.products.find(product => product.id === id)
  }

  addToCart(productId) {
    const product = this.getProductById(productId)
    if (product) {
      this.cartManager.addItem(product)
      return true
    }
    return false
  }

  renderProducts() {
    const productsGrid = document.querySelector('.products-grid')
    if (!productsGrid) return

    productsGrid.innerHTML = this.products.map(product => `
      <div class="product-card fade-in-up">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <div class="product-footer">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            <button class="add-to-cart-btn" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    `).join('')

    // Add event listeners to add-to-cart buttons
    productsGrid.querySelectorAll('.add-to-cart-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId)
        const success = this.addToCart(productId)
        
        if (success) {
          // Visual feedback
          const originalText = button.textContent
          button.textContent = 'Added!'
          button.disabled = true
          
          setTimeout(() => {
            button.textContent = originalText
            button.disabled = false
          }, 1000)
          
          // Update cart count
          this.cartManager.updateCartDisplay()
        }
      })
    })
  }
}