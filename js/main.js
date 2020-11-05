console.log("Running!!")

let cart = document.getElementsByClassName("add-cart");
let products = [
  {
    name: 'The Beginning (Beninging)',
    tag: 'beginning',
    price: 800,
    inCart: 0
  },{
    name: 'Exodus: Aluta Continua',
    tag: 'exodus',
    price: 800,
    inCart: 0
  },{
    name: 'Merge: Three Become One',
    tag: 'merge',
    price: 800,
    inCart: 0
  },{
    name: 'Trends: Mr. Jones and Me',
    tag: 'trends',
    price: 800,
    inCart: 0
  }
];

for (let i=0; i<cart.length; i++){
  cart[i].addEventListener('click', () =>{
    cartCounter(products[i]);
    cartTotal(products[i]);
  })
}

function onLoadCartQuantity(){
  let productCount = localStorage.getItem('cartCounter');
  if (productCount){
    document.querySelector('.cart span').textContent = productCount;
  }
}

function cartCounter(product){
  // console.log('The product clicked is: ', product);
  let productCount = localStorage.getItem('cartCounter');
  productCount = parseInt(productCount);
  if(productCount){
    localStorage.setItem('cartCounter', productCount + 1);
    document.querySelector('.cart span').textContent = productCount + 1;
  }else {
    localStorage.setItem('cartCounter', 1)
    document.querySelector('.cart span').textContent = 1;
  }
  setCartItems(product);
}

function setCartItems(item){
  let cartItems = localStorage.getItem('productCount');
  cartItems = JSON.parse(cartItems);
  // console.log('My cart items are: ', cartItems);
  if (cartItems != null){
    if(cartItems[item.tag] == undefined){
      cartItems = {
        ...cartItems,
        [item.tag]: item
      }
    }
    cartItems[item.tag].inCart +=1;
  } else {
      item.inCart = 1;
      cartItems = {
        [item.tag] : item
      }
  }
  // console.log('My cart items are: ', cartItems);
  localStorage.setItem('productCount', JSON.stringify(cartItems));
}

function cartTotal(item){
  let cartValue =  localStorage.getItem('cartTotal');
  // console.log("The CART value is a: ", typeof cartValue);
  if (cartValue != null){
    cartValue = parseInt(cartValue);
    localStorage.setItem('cartTotal', cartValue + item.price);
  }else{
    localStorage.setItem('cartTotal', item.price);
  }
  // console.log("The Cart Value is: ", cartValue);
}
function displayCart(){
  let shoppingBag = localStorage.getItem('productCount');
  shoppingBag = JSON.parse(shoppingBag);
  // console.log(shoppingBag);
  let cartContainer = document.querySelector('.cart-items');
  if(shoppingBag && cartContainer){
    cartContainer.innerHTML = '';
    Object.values(shoppingBag).map(item => {
      cartContainer.innerHTML += `
      <div class="title">
<!--        <ion-icon ></ion-icon>-->
        <img src="http://localhost/assignment-bootstrap/img/cart-img/${item.tag}.jpg">
        <span>${item.name}</span>
      </div>
      <div class="price">${item.price}</div>
      <div class="quantity">
            ${item.inCart}
      </div>
      `
    });
  }

}
onLoadCartQuantity();
displayCart();
