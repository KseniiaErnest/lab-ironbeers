const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
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

// render random beer
app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
  .then(beer => {
    console.log(beer)
    res.render('random-beer', { beer })
  })
  .catch(error => console.log(error));
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
