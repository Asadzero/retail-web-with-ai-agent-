import './style.css'
import { ProductManager } from './components/ProductManager.js'
import { CartManager } from './components/CartManager.js'
import { UIManager } from './components/UIManager.js'

// Initialize managers
const cartManager = new CartManager()
const productManager = new ProductManager(cartManager)
const uiManager = new UIManager(productManager, cartManager)

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  uiManager.init()
})