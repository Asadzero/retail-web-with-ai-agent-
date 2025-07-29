export class CartManager {
  constructor() {
    this.items = []
    this.isOpen = false
  }

  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.items.push({
        ...product,
        quantity: 1
      })
    }
    
    this.updateCartDisplay()
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId)
    this.updateCartDisplay()
    this.renderCart()
  }

  updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeItem(productId)
      return
    }

    const item = this.items.find(item => item.id === productId)
    if (item) {
      item.quantity = newQuantity
      this.updateCartDisplay()
      this.renderCart()
    }
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0)
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count')
    const totalItems = this.getTotalItems()
    
    if (cartCount) {
      cartCount.textContent = totalItems
      cartCount.style.display = totalItems > 0 ? 'flex' : 'none'
    }
  }

  openCart() {
    this.isOpen = true
    const modal = document.querySelector('.modal-overlay')
    if (modal) {
      modal.classList.add('active')
      document.body.style.overflow = 'hidden'
      this.renderCart()
    }
  }

  closeCart() {
    this.isOpen = false
    const modal = document.querySelector('.modal-overlay')
    if (modal) {
      modal.classList.remove('active')
      document.body.style.overflow = ''
    }
  }

  renderCart() {
    const cartBody = document.querySelector('.modal-body')
    if (!cartBody) return

    if (this.items.length === 0) {
      cartBody.innerHTML = `
        <div class="empty-cart">
          <div class="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
        </div>
      `
      return
    }

    const cartItemsHTML = this.items.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          <div class="cart-item-actions">
            <button class="quantity-btn" data-action="decrease" data-product-id="${item.id}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn" data-action="increase" data-product-id="${item.id}">+</button>
            <button class="remove-btn" data-product-id="${item.id}">Remove</button>
          </div>
        </div>
      </div>
    `).join('')

    cartBody.innerHTML = `
      ${cartItemsHTML}
      <div class="cart-total">
        <div class="total-amount">Total: $${this.getTotalPrice().toFixed(2)}</div>
        <button class="checkout-btn">Proceed to Checkout</button>
      </div>
    `

    // Add event listeners
    cartBody.querySelectorAll('.quantity-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId)
        const action = e.target.dataset.action
        const item = this.items.find(item => item.id === productId)
        
        if (item) {
          const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1
          this.updateQuantity(productId, newQuantity)
        }
      })
    })

    cartBody.querySelectorAll('.remove-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.productId)
        this.removeItem(productId)
      })
    })

    cartBody.querySelector('.checkout-btn')?.addEventListener('click', () => {
      this.checkout()
    })
  }

  checkout() {
    if (this.items.length === 0) return

    // Simulate checkout process
    const checkoutBtn = document.querySelector('.checkout-btn')
    const originalText = checkoutBtn.textContent
    
    checkoutBtn.innerHTML = '<span class="loading"></span> Processing...'
    checkoutBtn.disabled = true

    setTimeout(() => {
      // Show success message
      const cartBody = document.querySelector('.modal-body')
      cartBody.innerHTML = `
        <div class="success-message">
          🎉 Order placed successfully! Thank you for your purchase.
        </div>
        <div class="empty-cart">
          <h3>Order Summary</h3>
          <p>Total: $${this.getTotalPrice().toFixed(2)}</p>
          <p>Items: ${this.getTotalItems()}</p>
          <p>You will receive a confirmation email shortly.</p>
        </div>
      `

      // Clear cart
      this.items = []
      this.updateCartDisplay()

      // Close cart after delay
      setTimeout(() => {
        this.closeCart()
      }, 3000)
    }, 2000)
  }
}