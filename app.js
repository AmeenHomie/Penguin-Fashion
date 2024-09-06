let iconCart = document.querySelector(".icon-cart");
let closeCart = document.querySelector(".close");
let closeCartModal = document.querySelector(".close-cart")
let body = document.querySelector("body");

const cartTotal = document.querySelector('.icon-cart .cart-total');

const totalPriceValue = document.querySelector(".totalValue")

const addMore = document.querySelector("click-count")


iconCart.addEventListener("click", () => {
  if (!body.classList.contains("showCart")) {
    console.log("not available")
    body.classList.add("showCart");
    body.classList.add("close")
  }
  else if(body.classList.contains("showCart")){
    body.classList.remove("showCart");
    body.classList.remove("close")
  }
});

closeCart.addEventListener("click", () => {
  if (body.classList.contains("showCart")) {
    body.classList.remove("showCart");
  }
});

closeCartModal.addEventListener("click", () => {
  if (body.classList.contains("showCart")) {
    body.classList.remove("showCart");
  }
});

const addBtn = document.querySelectorAll(".addBtn");
addBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    const newEle = card.querySelector("img").getAttribute("src");
    const name = card.querySelector("h5").textContent;
    const price = card.querySelector("h3").textContent;
    addItem(newEle, name, price.replace("$", ""));
  });
});

let cart = [];

function addItem(newEle, name, price) {
  let existingItem = cart.find(item => item.name === name);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      image: newEle,
      name: name,
      price: price,
      quantity: 1
    });    
    cartTotal.innerHTML = cart.length
  }
  renderCart();
}

function renderCart() {
  const list = document.querySelector(".listCart");
  list.innerHTML = '';
  
  const totalPrice = cart.reduce((acc, current) => acc + (current.price * current.quantity), 0);

  totalPriceValue.innerHTML =`$${totalPrice.toFixed(2)}`

  cart.forEach((item, index) => {
    let itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.innerHTML = `
      <div class="image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="name">${item.name}</div>
      <div class="totalPrice">$${(item.price * item.quantity).toFixed(2)}</div>
      <div class="quantity">
        <span class="minus" data-index="${index}">&lt;</span>
        <span>${item.quantity}</span>
        <span class="plus" data-index="${index}">&gt;</span>
      </div>
    `;
    
    list.appendChild(itemDiv);
  });

  document.querySelectorAll('.minus').forEach(button => {
    button.addEventListener('click', decreaseQuantity);
  });

  document.querySelectorAll('.plus').forEach(button => {
    button.addEventListener('click', increaseQuantity);
  });
}

function increaseQuantity(e) {
  const index = e.target.getAttribute('data-index');
  cart[index].quantity += 1;
  renderCart();
}

function decreaseQuantity(e) {
  const index = e.target.getAttribute('data-index');
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
}
