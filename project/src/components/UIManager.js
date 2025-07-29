export class UIManager {
  constructor(productManager, cartManager) {
    this.productManager = productManager
    this.cartManager = cartManager
  }

  init() {
    this.renderHTML()
    this.setupEventListeners()
    this.productManager.renderProducts()
    this.cartManager.updateCartDisplay()
  }

  renderHTML() {
    const app = document.querySelector('#app')
    app.innerHTML = `
      <!-- Header -->
      <header class="header">
        <div class="container">
          <div class="header-content">
            <a href="#" class="logo">ModernShop</a>
            <nav class="nav">
              <a href="#home" class="nav-link active">Home</a>
              <a href="#products" class="nav-link">Products</a>
              <a href="#about" class="nav-link">About</a>
              <a href="#contact" class="nav-link">Contact</a>
            </nav>
            <div class="header-actions">
              <button class="cart-button">
                🛒 Cart
                <span class="cart-count">0</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="hero" id="home">
        <div class="container">
          <h1>Discover Premium Products</h1>
          <p>Curated collection of high-quality items for modern living. Shop with confidence and style.</p>
          <a href="#products" class="cta-button">Shop Now</a>
        </div>
      </section>

      <!-- Products Section -->
      <section class="products-section" id="products">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Featured Products</h2>
            <p class="section-subtitle">Handpicked items that combine quality, style, and functionality</p>
          </div>
          <div class="products-grid">
            <!-- Products will be rendered here -->
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-section">
              <h3>ModernShop</h3>
              <p>Your destination for premium products and exceptional shopping experience. We curate the best items for modern living.</p>
            </div>
            <div class="footer-section">
              <h3>Quick Links</h3>
              <p><a href="#home">Home</a></p>
              <p><a href="#products">Products</a></p>
              <p><a href="#about">About Us</a></p>
              <p><a href="#contact">Contact</a></p>
            </div>
            <div class="footer-section">
              <h3>Customer Service</h3>
              <p><a href="#">Shipping Info</a></p>
              <p><a href="#">Returns</a></p>
              <p><a href="#">Size Guide</a></p>
              <p><a href="#">FAQ</a></p>
            </div>
            <div class="footer-section">
              <h3>Connect</h3>
              <p><a href="#">Newsletter</a></p>
              <p><a href="#">Social Media</a></p>
              <p><a href="#">Reviews</a></p>
              <p><a href="#">Blog</a></p>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2025 ModernShop. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      <!-- Cart Modal -->
      <div class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">Shopping Cart</h2>
            <button class="close-btn">&times;</button>
          </div>
          <div class="modal-body">
            <!-- Cart items will be rendered here -->
          </div>
        </div>
      </div>
    `
  }

  setupEventListeners() {
    // Cart button
    document.querySelector('.cart-button').addEventListener('click', () => {
      this.cartManager.openCart()
    })

    // Close cart modal
    document.querySelector('.close-btn').addEventListener('click', () => {
      this.cartManager.closeCart()
    })

    // Close modal when clicking overlay
    document.querySelector('.modal-overlay').addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.cartManager.closeCart()
      }
    })

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link, .cta-button').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = link.getAttribute('href')
        if (targetId.startsWith('#')) {
          const targetElement = document.querySelector(targetId)
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
        }
      })
    })

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
      const sections = document.querySelectorAll('section[id]')
      const navLinks = document.querySelectorAll('.nav-link')
      
      let current = ''
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100
        if (window.pageYOffset >= sectionTop) {
          current = section.getAttribute('id')
        }
      })

      navLinks.forEach(link => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active')
        }
      })
    })

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.cartManager.isOpen) {
        this.cartManager.closeCart()
      }
    })
  }
}