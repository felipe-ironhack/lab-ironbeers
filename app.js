const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, '/views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then(beersFromApi => {
      const data = { 
        beers: beersFromApi
      }
      res.render('beers', data)
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then(randomBeer => {
      console.log(randomBeer[0])
      res.render('randomBeer', randomBeer[0])
    })
    .catch(error => console.log(error))
});

app.get('/beers/beer-:id', (req, res) => {
  const id = req.params.id
  punkAPI.getBeer(id)
    .then(oneBeer => {
      console.log(oneBeer)
      res.render('oneBeer', oneBeer[0])
    })
    .catch(error => console.log(error))
});


app.listen(3000, () => console.log('🏃‍ on port 3000'));
