const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

const verbsData = require('./verbs.json');

verbsData.verbs.map(async (verb) => {
  const options = {
    method: 'GET',
    url: `https://french-conjugaison.p.rapidapi.com/conjugate/${verb}`,
    headers: {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.API_HOST,
    },
  };

  await axios
    .request(options)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.error(err.message);
    });
});
