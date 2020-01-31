'use strict';

const names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// create votes to be an object with keys be image names and values be the number of votes for that image.
let votes = {};
let views = {};
let clicks = 0;

const leftImg = document.getElementById('left');
const centerImg = document.getElementById('center');
const rightImg = document.getElementById('right');
const container = document.getElementById('image_container');
const productList = document.getElementById('productlist');
const images = [leftImg, centerImg, rightImg];

// initialize votes to hold 0 values for all images.
const initVotesAndViews = function (){
  names.forEach((name) => {
    votes[name] = 0;
    views[name] = 0;
  });
};

// return the path of the image given its name
const srcPath= function (name){
  return 'img/'+name+'.jpg';
};

// generate 3 random images names and make sure there are no duplicates
const generateThree = function(){
  let indices = [];
  let images = [];
  while(indices.length < 3) {
    const idx = Math.floor(Math.random() * names.length);
    if (indices.indexOf(idx) < 0){ // idx does not exist in indices
      indices.push(idx);
    }
  }
  indices.forEach((v) => {
    views[names[v]] += 1;
    images.push(names[v]);
  });
  return images;
};

// show images and cal the stats
const displayPics = function(){
  const picsNames = generateThree();
  images.forEach((img, i) => {
    img.src = srcPath(picsNames[i]);
    img.id = picsNames[i];
  });
};


const clickHandler = function(event){
  const imageName = event.target.id;
  if (imageName === 'image_container') return;
  votes[imageName] += 1;
  clicks += 1;
  if (clicks > 24){ // after 25 clicks
    container.removeEventListener('click', clickHandler);
    container.style.display = 'none';
    displayCharts();
    displayList();
  }
  else{
    displayPics();
  }
};

const displayCharts = function(){
  const statChart = document.getElementById('chartypants').getContext('2d');
  new Chart(statChart,{//eslint-disable-line
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: 'total votes',
        backgroundColor: 'gold',
        borderColor: '#214',
        data: Object.values(votes),
      },
      {
        label: 'total views',
        backgroundColor: 'brown',
        borderColor: '#214',
        data: Object.values(views),
      }
      ],
      options: {
        responsive: false,
        scales: {
          yAxes: [{
            ticks: {
              max: 20,
              min: 0,
              stepSize: 1
            }
          }]
        }
      }
    }
  });
  Chart.defaults.global.defaultFontColor = '#eee'; //eslint-disable-line
};

const displayList = function(){
  names.forEach((name) => {//eslint-disable-line
    const str = `${name} has ${votes[name]} votes in ${views[name]} views.`;
    const li = document.createElement('li');
    li.textContent = str;
    productList.appendChild(li);
  });
};

initVotesAndViews();
container.addEventListener('click', clickHandler);
displayPics();
