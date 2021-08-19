'use strict';

// global varriables

let allProducts = [];
let clicks = 0;
let clickAllowed = 3;
let numberOfUniqueIndexes = 6;

let myContainer = document.querySelector('section');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');
let indexArray = [];


function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
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

function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderProducts() {
  while (indexArray.length < numberOfUniqueIndexes) {
    let randomNumber = selectRandomProduct();
    if (!indexArray.includes(randomNumber)) {
      indexArray.push(randomNumber);
    }
  }
  console.log(indexArray)
  let product1 = indexArray.shift();
  let product2 = indexArray.shift();
  let product3 = indexArray.shift();

image1.src = allProducts[product1].src;
image1.alt = allProducts[product1].name;
allProducts[product1].views++;
image2.src = allProducts[product2].src;
image2.alt = allProducts[product2].name;
allProducts[product2].views++;
image3.src = allProducts[product3].src;
image3.alt = allProducts[product3].name;
allProducts[product3].views++;
console.log(indexArray);
}
//---End of renderProducts function---//

function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an image');
  }
  clicks++;
  let clickedProduct = event.target.alt;
    for (let i = 0; i < allProducts.length; i++) {
      if (clickedProduct === allProducts[i].name) {
        allProducts[i].clicks++;
        break;
    }
  }
  renderProducts();
  if (clicks === clickAllowed) {
    myContainer.removeEventListener('click', handleProductClick);
    renderChart();
  }
}
renderProducts();


function renderChart() {
  let productViews = [];
  let productClicks = [];
  let productNames = [];
  for (let i = 0; i < allProducts.length; i++) {
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
    productNames.push(allProducts[i].name);
    
  }
  //console.log(productClicks);
  let chartObject = {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Views',
        data: productViews,
        backgroundColor: '#FF3366',
        borderColor: '#011627',
        borderWidth: 1
      },
      {
        label: '# of Clicks',
        data: productClicks,
        backgroundColor: '#20A4F3',
        borderColor: '#011627',
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, chartObject);
}

myContainer.addEventListener('click', handleProductClick);