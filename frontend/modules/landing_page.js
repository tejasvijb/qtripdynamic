import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  // console.log(`${config.backendEndpoint}/cities`);
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let url = `${config.backendEndpoint}/cities`
    let data = await fetch(url)
    let citiesData = data.json()
    return citiesData
  } catch (err) {
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let row = document.getElementById('data')
  let container = document.createElement('div')
  container.className = "col-6 col-lg-3 mb-4"
  
  let a = document.createElement('a')
  a.href = `pages/adventures/?city=${id}`
  a.id = id
  a.innerHTML = `
  <div class="tile">
    <div class="tile-text text-center">
      <h5>${city}</h5>
      <p>${description}</p>
    </div>
      <img class="img-responsive" src=${image}>
  </div>
  `
  container.append(a)
  row.appendChild(container)


}

export { init, fetchCities, addCityToDOM };
