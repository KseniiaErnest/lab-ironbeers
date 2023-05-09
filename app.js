const express = require('express');
// imports express package

const hbs = require('hbs');
// imports hbs
const path = require('path');
// imports path which is the thing that allows us to tell us to tell hbs where to find 
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
// this line initializes 
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

// render home page
app.get('/', (req, res) => {
  res.render('index');
});
// render all beers
app.get('/beers', (req, res) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers});
  })
  .catch(error => console.log(error));
})

// Using fetch
/*
app.get('/beers', (req, res, next)=> {
  fetch('http://api.punkapi.com/v2/beers')
  .then((response)=> {
    response.json()
    .then((jsonResponse)=> {
      res.render('beers', {beers: jsonResponse});
    })
  })
  .catch((err)=> {
    console.log(err);
  })
})
*/

// render random beer
app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(beer => {
    console.log(beer);
    const theBeer = beer[0];
    res.render('random-beer', {theBeer})
  })
  .catch(error => console.log(error));
})

// Using fetch
/*
app.get('/random-beer', (req, res, next)=> {
  fetch('http://api.punkapi.com/v2/beers/random')
  .then((response)=> {
    response.json()
    .then((jsonResponse)=> {
      const theBeer = jsonResponse
      res.render('beers', {beers: jsonResponse});
    })
  })
  .catch((err)=> {
    console.log(err);
  })
})
*/

app.listen(3000, () => console.log('🏃‍ on port 3000'));
