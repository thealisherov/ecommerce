document.addEventListener("DOMContentLoaded", function () {
    // TANLAB OLINGAN DOM ELEMENTLAR
    const productsContainer = document.getElementById("products");
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cartModal');
    const closeModal = document.querySelector('.close');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const cartCountElement = document.querySelector('.cart-count');
  
    async function fetchProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        displayProducts(data.products);
      } catch (error) {
        console.log("Xatolik ", error);
      }
    }
  
    function displayProducts(products) {
      productsContainer.innerHTML = "";
      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
          <div class="product-img">
            <img src="${product.thumbnail}" alt="">
          </div>
          <div class="product-info">
            <h4 class="product-title">${product.title}</h4>
            <p class="product-price">${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to cart</button>
          </div>
        `;
        productsContainer.appendChild(productCard);
      });
    }
  function addToCart(a) {
    const productId = parseInt(a.target.getAttribute('data-id'));

    const existingItem =cart.find(item=> item.id === productId);

 
    updateCart();
  }

function updateCart() {
  localStorage.setItem('cart',JSON.stringify(cart));
    renderCartItems();
    updateCartCount();
}
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Sizning savatingiz haligacha bosh</p>'
        cartTotalElement.textContent = '0';
            return;
    }
    let total = 0;
    cart.forEach(item=>{
const cartItemElement = document.createElement('div');
createElement.className='cart-item';

cartCountElement.innerHTML = `
             <img src="${item.thumbnail}" alt="${item.title}">
                <div class="cart-item-info">
                    <p class="cart-item-title">${item.title}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <i class="fas fa-trash remove-item" data-id="${item.id}"></i>

`;

cartItemsContainer.appendChild(cartCountElement);

total += item.price * item.quantity;

    });
cartTotalElement.textContent = total.toFixed(2);
// selecting items
document.querySelectorAll('.decrease-quantity').forEach(button=>{
    button.addEventListener('click',decreaseQuantity);
});

document.querySelectorAll('increase-quantity').forEach(button =>{
    button.addEventListener('click',increaseQuantity);
});
document.querySelectorAll('.remove-item').forEach(button =>{
    button.addEventListener('click',removeItem)
});
// yangilash

function updateCartCount() {
    const count = cart.reduce((total,item)=>total+item.quantity,0);
    cartCountElement.textContent=count;
}
// increase/decrease/remove
function increaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === productId);
    item.quantity += 1;
    updateCart();

}
function decreaseQuantity(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item=>item.id === productId);
if (item.quantity>1) {
    item.quantity-=1;
} else {
    cart = cart.filter(item=>item.id !==productId);
}  
updateCart()
}
function removeItem(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        updateCart();
}
// increase/decrease/remove
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = 'none';
    }
});
}

    fetchProducts();
  });
  


