'use strict';
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
    </div>
    </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
  // <p class="country__row"><span>🌎</span>${data.borders.length} neighbours</p>
};

//API nie wyszukuje sąsiada po kodzie typu ITA, FR

const loadCountryAndNeighbour = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();
    console.log(data);
    renderCountry(data[0]);
    countriesContainer.style.opacity = 1;

    //Get neighbour country 2
    const neighboursArr = data[0].borders;
    console.log(neighboursArr);
    const neighbour = data[0].borders[0];
    neighboursArr.forEach(async el => {
      console.log(el);
      const neighbourRes = await fetch(
        `https://restcountries.com/v3.1/alpha/${el}`
      );
      const neighbourData = await neighbourRes.json();
      console.log('=-=-=-', neighbourData);
      renderCountry(neighbourData[0], 'neighbour');
    });
    // console.log('neighbour data', neighbourData);
    // console.log('++', neighbourData[0]);
    // neighbourData.forEach(el => {
    //   renderCountry(el, 'neighbour');
    //   console.log(el);
    // });
    // const allNeighbour = data[0].borders.map(el =>
    //   fetch(`https://restcountries.com/v2/alpha/${el}`)
    // );

    // console.log(allNeighbour);
    // // renderCountry(neighbourData[0], 'neighbour');
    countriesContainer.style.opacity = 1;
    // const neighbourAll = await neighbour.map(function (cur) {
    //   fetch(`https://restcountries.com/v3.1/alpha/${cur}`);
    // });
    // if (!neighbour) throw new Error('No neighbour found!');
  } catch (err) {
    console.log(err);
  }
};
loadCountryAndNeighbour('poland');

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;

  //// przed kopiowaniem fragment
  // const neighbourRes = await fetch(
  //   `https://restcountries.com/v3.1/alpha/${neighbour}`
  // );
  // const neighbourData = await neighbourRes.json();
  // console.log('neighbour data', neighbourData);
  // console.log('++', neighbourData[0]);
  // neighbourData.forEach(el => {
  //   renderCountry(el, 'neighbour');
  //   console.log(el);
  // });
  // const allNeighbour = data[0].borders.map(el =>
  //   fetch(`https://restcountries.com/v2/alpha/${el}`)
  // );

  // console.log(allNeighbour);

  // ///////////////////////////////////////
  // const getCountryData = function (country) {
  //   const request = new XMLHttpRequest();
  //   request.open('GET', `https://restcountries.com/v2/name/${country}`);
  //   request.send();
  //   request.addEventListener('load', function () {
  //     //   console.log(this.responseText); //[{"name":"Poland","topLevelDomain":[".pl"],"alpha2Code":"PL","alpha3Code":"POL","callingCodes":["48"],"capital":"Warsaw","altSpellings":["PL","Republic of Poland","Rzeczpospolita Polska"],"subregion":"Central Europe","region":"Europe","population":37950802,"latlng":[52.0,20.0],"demonym":"Polish","area":312679.0,"gini":30.2,"timezones":["UTC+01:00"],"borders":["BLR","CZE","DEU","LTU","RUS","SVK","UKR"],"nativeName":"Polska","numericCode":"616","flags":{"svg":"https://flagcdn.com/pl.svg","png":"https://flagcdn.com/w320/pl.png"},"currencies":[{"code":"PLN","name":"Polish złoty","symbol":"zł"}],"languages":[{"iso639_1":"pl","iso639_2":"pol","name":"Polish","nativeName":"język polski"}],"translations":{"br":"Polônia","pt":"Polónia","nl":"Polen","hr":"Poljska","fa":"لهستان","de":"Polen","es":"Polonia","fr":"Pologne","ja":"ポーランド","it":"Polonia","hu":"Lengyelország"},"flag":"https://flagcdn.com/pl.svg","regionalBlocs":[{"acronym":"EU","name":"European Union"}],"cioc":"POL","independent":true}]
  //     const [data] = JSON.parse(this.responseText);
  //     console.log(data);

  //     const html = ` <article class="country">
  //   <img class="country__img" src="${data.flag}" />
  //   <div class="country__data">
  //     <h3 class="country__name">${data.nativeName}</h3>
  //     <h4 class="country__region">${data.region}</h4>
  //     <p class="country__row"><span>👫</span>${(
  //       +data.population / 1000000
  //     ).toFixed(1)} people</p>
  //     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
  //     <p class="country__row"><span>🌇</span>${data.capital}</p>
  //     <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  //     <p class="country__row"><span>💸</span>${data.gini} Gini Index</p>
  //     <p class="country__row"><span>🌎</span>${data.borders.length} neighbours</p>
  //   </div>
  // </article>`;
  //     countriesContainer.insertAdjacentHTML('beforeend', html);
  //     countriesContainer.style.opacity = 1;
  //   });
  // };
  // getCountryData('poland');
  // // getCountryData('USA');
  // // getCountryData('danmark');

  // const btn = document.querySelector('.btn-country');
  // const countriesContainer = document.querySelector('.countries');

  ///////////////////////////////////////

  const getCountryAndNeighbour = function (country) {
    //AJAX call country 1
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();
    request.addEventListener('load', function () {
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      // console.log(...data.borders);

      //Render country 1
      renderCountry(data);

      //Get neighbour country 2
      // const [neighbour] = data.borders;
      // console.log(neighbour);

      // if (!neighbour) return;

      // //AJAX call country 2
      // const request2 = new XMLHttpRequest();
      // request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
      // request2.send();
      // request2.addEventListener('load', function () {
      //   const data2 = JSON.parse(request2.responseText);
      //   console.log(data2);
      //   renderCountry(data2, 'neighbour');
      // });

      //Fragment do wyświetlania wszystkich sąsiadów kraju
      //Get neighbour country 2
      const neighbour = data.borders;
      console.log(neighbour);

      if (!neighbour) return;
      neighbour.forEach(function (cur) {
        //AJAX call country 2
        const request2 = new XMLHttpRequest();
        request2.open('GET', `https://restcountries.com/v2/alpha/${cur}`);
        request2.send();
        request2.addEventListener('load', function () {
          const data2 = JSON.parse(request2.responseText);
          console.log(data2);
          renderCountry(data2, 'neighbour');
        });
      });
    });
  };
  // getCountryAndNeighbour('poland');
  // getCountryData('USA');
  // getCountryData('danmark');

  //Fragment do wyświetlania wszystkich sąsiadów kraju
  // neighbour.forEach(function (cur) {
  //     //AJAX call country 2
  //     const request2 = new XMLHttpRequest();
  //     request2.open('GET', `https://restcountries.com/v2/alpha/${cur}`);
  //     request2.send();
  //     request2.addEventListener('load', function () {
  //       const data2 = JSON.parse(request2.responseText);
  //       console.log(data2);
  //       renderCountry(data2, 'neighbour');
  //     });
  //   });

  //Callback hell
  // setTimeout(() => {
  //   console.log('1 second passed');
  //   setTimeout(() => {
  //     console.log('2 second passed');
  //     setTimeout(() => {
  //       console.log('3 second passed');
  //       setTimeout(() => {
  //         console.log('4 second passed');
  //       }, 1000);
  //     }, 1000);
  //   }, 1000);
  // }, 1000);

  // const request = new XMLHttpRequest();
  //   request.open('GET', `https://restcountries.com/v2/name/${country}`);
  //   request.send();

  // const request = fetch('https://restcountries.com/v2/name/poland');
  // console.log(request);

  // const getCountryData = function (country) {
  //   fetch(`https://restcountries.com/v2/name/${country}`)
  //     .then(function (response) {
  //       console.log(response); //Response {type: 'cors', url: 'https://restcountries.com/v2/name/poland', redirected: false, status: 200, ok: true, …}
  //       return response.json();
  //     })
  //     .then(function (data) {
  //       console.log(data);
  //       renderCountry(data[0]);
  //     });
  // };
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    // console.log(response);
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  //Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      console.log(data);
      if (!neighbour) throw new Error('No neighbour found!');

      //Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(`${err}💣💣💣`);
      renderError(
        `Something went wrong with Internet!💣 ${err.message}. Try again!`
      );
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// const getCountryData = function (country) {
//
//     //Country 1
//     // fetch(`https://restcountries.com/v3.1/name/${country}`)
//     //   .then(response => {
//     //     console.log(response);
//     //     if (!response.ok)
//     //       throw new Error(`Country not found (${response.status})`);
//     //     return response.json();
//     //   })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       console.log(data);
//       if (!neighbour) return;

//       //Country 2
//       return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`);

//       // fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
//       //   .then(response => response.json())
//       //   .then(data => renderCountry(data, 'neighbour'));
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.log(`${err}💣💣💣`);
//       renderError(
//         `Something went wrong with Internet! ${err.message}. Try again!`
//       );
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

btn.addEventListener('click', function () {
  getCountryData('poland');
});
// getCountryData('223ffff');
// getCountryData('australia');
// getCountryData('USA');
// getCountryAndNeighbour('Italy');

// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// // Promise.resolve('Resolved promise 2').then(res => {
// //   for (let i = 0; i < 10000; i++) {
// // console.log(res);
// //   }
// // });
// console.log('Test ends');

// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Lottery draw is happening');
//   setTimeout(function () {
//     if (Math.random() >= 0.5) {
//       resolve('You win!');
//     } else {
//       reject(new Error('You lost your money :('));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 sec');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 sec'));

// Promise.resolve('Resolved').then(x => console.log(x));
// Promise.reject(new Error('Rejected')).catch(err => console.error(err));

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// getPosition().then(pos => console.log(pos));

// const whereAmI = async function (country) {
//   try {
//     const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
//     if (!res.ok) throw new Error('Problem getting country');
//     const data = await res.json();
//     renderCountry(data[0]);
//     countriesContainer.style.opacity = 1;
//     // console.log(data);

//     return `You are in ${data[0].name.official}`;
//   } catch (err) {
//     console.error(`${err} problem came!`);
//     renderError(`💣 ${err.message}`);
//     throw err;
//   }
// };
// const country = whereAmI('poland');
// console.log(country); //Promise {<pending>}
// console.log('1: Will get location');
// whereAmI('poland')
//   .then(country => console.log(`2: ${country}`))
//   .catch(err => console.log(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished')); //You are in Republic of Poland

(async function () {
  try {
    const country = await whereAmI('poland');
    // console.log(`2: ${country}`);
  } catch (err) {
    console.log(`2: ${err.message} 💥`);
  }
  // console.log('3: Finished');
})();

// try {
//   let y = 1;
//   const x = 2;
//   x = 3;
// } catch (err) {
//   alert(err.message);
// }

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
//     // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
//     // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     console.log(data.map(d => d[0].capital[0])); //(3) ['Warsaw', 'Washington, D.C.', 'Rome']
//     // console.log(data); //(3) [Array(1), Array(1), Array(1)]
//     // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]); //(3) ['Warsaw', 'Washington, D.C.', 'Rome']
//   } catch (err) {
//     console.log(err);
//   }
// };

// get3Countries('poland', 'usa', 'italy'); //(3) ['Warsaw', 'Washington, D.C.', 'Rome']

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/poland`),
    getJSON(`https://restcountries.com/v3.1/name/ghana`),
    getJSON(`https://restcountries.com/v3.1/name/france`),
  ]);
  // console.log(res[0]); //{name: {…}, tld: Array(1), cca2: 'FR', ccn3: '250', cca3: 'FRA', …}
})();

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('request took to long'));
//     }, sec * 1000);
//   });
// };

// Promise.race([
//   getJSON(`https://restcountries.com/v3.1/name/tanzania`),
//   timeout(0.1),
// ])
//   .then(res => console.log(res[0]))
//   .catch(err => console.log(err));

// Promise.allSettled([
//   Promise.resolve('Succes'),
//   Promise.reject('Error'),
//   Promise.resolve('Another succes'),
// ])
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

Promise.any([
  Promise.resolve('Succes'),
  Promise.reject('Error'),
  Promise.resolve('Another succes'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
