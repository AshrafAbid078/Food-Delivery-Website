var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#prev",
    prevEl: "#next",
  },
});

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const menuCard = document.querySelector(".menu-card");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".total-price");
const cartValue = document.querySelector(".cart-value");
const hamBurger = document.querySelector(".hamburger");
const mobileMmenu = document.querySelector(".mobile-menu");
const bars = document.querySelector(".fa-bars");

hamBurger.addEventListener('click',()=>{
  mobileMmenu.classList.toggle('mobile-menu-active')
})
hamBurger.addEventListener('click',()=>bars.classList.toggle('fa-bars'));

cartIcon.addEventListener("click", () => {
  cartTab.classList.add("cart-tab-active");
});
closeBtn.addEventListener("click", () => {
  cartTab.classList.remove("cart-tab-active");
});

let productList = [];
let cartProduct = [];

const updateTotal =()=>{
  let totalPrice=0;
  let totalQuanity=0;
  document.querySelectorAll('.item').forEach(item =>{
    let quality = parseInt(item.querySelector(".quality-value").textContent)
    let price = parseFloat(item.querySelector('.item-price').textContent.replace('$',''))
    totalPrice+=price;
    totalQuanity+=quality;
  })
  cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  cartValue.textContent=totalQuanity;
}
const showCart = () => {
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");
    orderCard.innerHTML = `
    <div class="card-image">
      <img src="${product.image}" alt="">
    </div>
    <h4>${product.name}</h4>
    <h4 class="price">${product.price}</h4>
    <a href="#" class="btn card-btn ">Add to cart</a>
    `;
    menuCard.appendChild(orderCard);
    const cardBtn = orderCard.querySelector(".card-btn");
    cardBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};
const addToCart = (product) => {

  const existingproduct = cartProduct.find(items=>
    items.id === product.id
  )
  if(existingproduct){
    alert("item already in your cart");
    return;
  }
  cartProduct.push(product);
  let quality=1;
  let price = parseFloat(product.price.replace('$',''))

  const cartItem = document.createElement("div");
  cartItem.classList.add("item");
  cartItem.innerHTML = `
  <div class="img-container">
  <img src="${product.image}" alt="">
  </div>
  <div class="cart-detail">
  <h4>${product.name}</h4>
  <h4 class="item-price">${product.price}</h4> 
  </div>
  <div class="quality">
  <a href="#" class="quality-btn minus">
  <i class="fa-solid fa-minus"></i>
  </a>
  <h4 class="quality-value">${quality}</h4>
  <a href="#" class="quality-btn plus">
  <i class="fa-solid fa-plus "></i>
  </a>
 </div>
  `;
cartList.appendChild(cartItem);
updateTotal();


const qualityValue =cartItem.querySelector('.quality-value');
const itemPrice = cartItem.querySelector(".item-price");
const plusBtn = cartItem.querySelector(".plus");

plusBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  quality++;
  qualityValue.textContent = quality;
  itemPrice.textContent = `$${(price * quality).toFixed(2)}`;
  updateTotal();
})

const minusBtn = cartItem.querySelector(".minus");
minusBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  if(quality>1){
    quality--;
    qualityValue.textContent = quality;
    itemPrice.textContent = `$${(price * quality).toFixed(2)}`;
    updateTotal();
  }else{
    cartItem.remove();
    cartProduct=cartProduct.filter(item =>
      item.id!==product.id
    );
    updateTotal();
  }
})
};

const initApp = () => {
  fetch("product.json")
    .then((Response) => Response.json())
    .then((data) => {
      productList = data;
      showCart();
    });
};

initApp();
