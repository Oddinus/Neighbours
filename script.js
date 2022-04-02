'use strict';
const btn = document.querySelector('.login__btn');
const btnClear = document.querySelector('.clear__btn');
const countriesContainer = document.querySelector('.countries');
const inputCountry = document.querySelector('.login__input');

const renderCountry = function (data, className = '') {
  const html = ` <article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name"> ${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
    <p class="country__row"><span>🌇</span>${data.capital}</p>
    <p class="country__row"><span>💰</span>${
      Object.values(data.currencies)[0].name
    }</p>
    <p class="country__row"><span>💸</span>${Object.values(
      data.gini
    )} Gini Index</p>
    <p class="country__row">
      <span>🌎</span>${data.borders.length} neighbours
    </p>
    </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const loadCountryAndNeighbour = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
    countriesContainer.style.opacity = 1;

    //Get neighbour country 2
    const neighboursArr = data[0].borders;
    // console.log(neighboursArr);
    neighboursArr.forEach(async el => {
      const neighbourRes = await fetch(
        `https://restcountries.com/v3.1/alpha/${el}`
      );
      const neighbourData = await neighbourRes.json();

      renderCountry(neighbourData[0], 'neighbour');
      // const island = {data[0].borders: undefined};

      // if (!data[0]['borders'])
      // if (!('borders' in data[0]))
      // if (data[0].hasOwnProperty('borders')) {
      // if (data[0].borders.length === undefined) {
      //   console.log(neighboursArr);
      //   alert('Its island');
    });
    if (data[0].borders === undefined) {
      console.log(neighboursArr);
      alert('Its island');
    }
  } catch (err) {
    alert(
      'Ops, something went wrong... or your country is a lonely island :) Check your typing and try again.'
    );
    // console.log(err);
  }
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

btn.addEventListener('click', function (e) {
  e.preventDefault();
  const countries = document.querySelectorAll('.country');
  countries.forEach(t => t.remove());

  loadCountryAndNeighbour(`${inputCountry.value}`);
  inputCountry.value = '';
});
