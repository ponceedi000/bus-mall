'use strict';


// global varriables
let allProducts = [];

let myContainer = document.querySelector('section');
let myButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
let clicks = 0;
let clickAllowed = 3;

function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  let productArray = [];
  let product1 = selectRandomProduct();
  productArray.push(product1); // productArray = [product1] (At this point)
  let product2 = selectRandomProduct();
    if (productArray.includes(product2)) {
      while (productArray.includes(product2) === true) {
      product2 = selectRandomProduct();
    }
  }
  productArray.push(product2); // product array = [product1, product2] (At this point)
  let product3 = selectRandomProduct();
    if (productArray.includes(product3)) {
      while (productArray.includes(product3) === true) {
      product3 = selectRandomProduct();
  }
}
productArray.push(product3); // product array = [product1, product2, product3] (At this point)

image1.src = allProducts[product1].src;
image2.src = allProducts[product2].src;
image3.src = allProducts[product3].src;
image1.alt = allProducts[product1].name;
image2.alt = allProducts[product2].name;
image3.alt = allProducts[product3].name;
allProducts[product1].views++;
allProducts[product2].views++;
allProducts[product3].views++;
}
//---End of renderProducts function---//

function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickProduct = event.target.alt;
  console.log(clickProduct);
    for (let i = 0; i < allProducts.length; i++) {
      if (clickProduct === allProducts[i].name) {
        allProducts[i].clicks++;
        break;
    }
  }
  renderProducts();
  if (clicks === clickAllowed) {
    myButton.className = 'clicks-allowed';
    myContainer.removeEventListener('click', handleProductClick);
  }
}
//---End of handleProductClick function

function renderResults() {
  let ul = document.querySelector('ul');
    for (let i = 0; i < allProducts.length; i++) {
      let li = document.createElement('li')
      li.textContent = `${allProducts[i].name} had ${allProducts[i].views} view and was clicked ${allProducts[i].clicks} times.`;
      ul.appendChild(li);
  }
}
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu')
new Product('dog-duck')
new Product('dragon')
new Product('pen')
new Product('pet-sweep')
new Product('scissors')
new Product('shark')
new Product('sweep', 'png')
new Product('tauntaun')
new Product('unicorn')
new Product('water-can')
new Product('wine-glass')

renderProducts();

myContainer.addEventListener('click', handleProductClick);
myButton.addEventListener('click', renderResults);