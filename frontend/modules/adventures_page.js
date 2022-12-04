
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search)
  return params.get('city')

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let url = `${config.backendEndpoint}/adventures?city=${city}`
    let res = await fetch(url)
    let cityJson = res.json()
    // console.log(cityJson);
    return cityJson
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  function addAdventure(id, name, costPerHead, currency, image, duration, category) {
    let dataRow = document.getElementById('data');
    let div = document.createElement('div');
    div.className = "col-6 col-lg-3 mb-4"
    div.innerHTML = `
    <a href="detail/?adventure=${id}" id="${id}">
    
      <div class="activity-card">
      <div class="category-banner">${category}</div>
        <div class="activity-card-image"><img class="img-responsive" src="${image}"></div>
            <div class="d-flex justify-content-between mx-2 mt-2">
              <div><h5 class="text-left">${name}</h5> </div>
              <div><p>₹${costPerHead}</p> </div>
            </div>
            <div class="d-flex justify-content-between mx-2">
              <h5 class="text-left">Duration</h5>
              <p>${duration} Hours</p>
            </div>
      </div>
    </a>
    `
    dataRow.appendChild(div)

  }
  adventures.forEach(adventure => {
    let { id, name, costPerHead, currency, image, duration, category } = adventure;
    addAdventure(id, name, costPerHead, currency, image, duration, category);
  })

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter(adventure => adventure.duration >= low && adventure.duration <= high)
  return filteredList;
  

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

  const filteredList = list.filter(adventure => categoryList.includes(adventure.category))
  return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    

    let durationValuesArr = filters["duration"].split("-")
    let [low, high]  = durationValuesArr;
    let categoryList = filters["category"]
    let filterDuration = filterByDuration(list, low, high)
  
    let filterCategory = filterByCategory(filterDuration, categoryList) 
    
    let bothFilter = [... new Set([...filterDuration,...filterCategory])]
  
    return bothFilter.filter(adventure => categoryList.includes(adventure.category) && adventure.duration >= low && adventure.duration <= high)
    
  } else if (filters["duration"].length > 0 && filters["category"].length == 0) {
    
    let durationValuesArr = filters["duration"].split("-")
    let  [low, high]  = durationValuesArr;
    return filterByDuration(list, low, high)
    
  } else if (filters["category"].length > 0 && filters["duration"].length == 0) {
    
    let categoryList = filters["category"]
    return filterByCategory(list, categoryList)
    
  } 

    return list;
  

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters',JSON.stringify(filters))

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem('filters'));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById("duration-select").value = filters["duration"]

  let categoryList = document.getElementById("category-list")
  
  filters["category"].forEach(category => {
    categoryList.innerHTML += `
    <div class="category-filter">
    ${category}
    <button type="button" class="btn-close" id=${category} aria-label="Close" onclick="clearFilter(event,id)"></button>
    </div>
    `
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
