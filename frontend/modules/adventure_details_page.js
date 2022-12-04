import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams(search)
  return params.get('adventure')

  // Place holder for functionality to work in the Stubs
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
   try {
    let url = `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    let res = await fetch(url)
    let data = await res.json();
    return data
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").textContent = adventure.name
  document.getElementById("adventure-subtitle").textContent = adventure.subtitle
  document.getElementById("adventure-content").textContent = adventure.content

  adventure.images.map(image => {
    let element = document.createElement("div")
    let img = document.createElement("img")
    img.src = image
    img.className = "activity-card-image"
    element.append(img)
    let gallery = document.getElementById('photo-gallery')
    gallery.append(element)
  })




  


}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
 document.getElementById("photo-gallery").innerHTML = `
 <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
 <div class="carousel-indicators">
  // <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  // <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  // <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
 </div>
  <div class="carousel-inner">
  
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
 `
 let ind=document.querySelector('.carousel-indicators')
 ind.innerHTML = ""
 images.map((image, index) => {
   if (index == 0) {
     ind.innerHTML += `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>`
   }
   else {
     ind.innerHTML += ` <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to=${index} aria-label="Slide ${index + 1}"></button>`
   }
 })

// console.log(images);
images.forEach((ele) => {
  const carouselItem = document.createElement("div");
  carouselItem.setAttribute("class", "carousel-item");
  const imgDiv = document.createElement("img");
  imgDiv.setAttribute("src", ele);
  imgDiv.setAttribute("class", "d-block w-100");
  carouselItem.appendChild(imgDiv);
  document.querySelector(".carousel-inner").appendChild(carouselItem);
});
document.getElementsByClassName("carousel-item")[0].className =
  "carousel-item active";

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure);
  const reservation_panel = document.getElementById('reservation-panel-available')
  const soldOut_panel = document.getElementById('reservation-panel-sold-out')
  const reservation_cost = document.getElementById('reservation-person-cost')


    if(adventure.available){
      reservation_cost.innerHTML = adventure.costPerHead
      reservation_panel.style.display = "block"
      soldOut_panel.style.display = "none"
    }
    else{
      soldOut_panel.style.display = "block"
      reservation_panel.style.display = "none"

    }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

 
    let total = adventure.costPerHead * persons
    document.getElementById('reservation-cost').innerHTML = total
  
  // console.log(total)
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById('myForm');
  form.method = 'POST';
  form.action = `${config.backendEndpoint}/reservations/new`;
  
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let nameValue = form.elements['name'].value;
    let dateValue = form.elements['date'].value;
    let personValue = form.elements['person'].value ;
    fetch(`${config.backendEndpoint}/reservations/new`,{
      method:'POST',
      headers:{
        'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:nameValue,date:dateValue,person:personValue,adventure:adventure.id})
    })
    .then(function(res){
      res.json().then((r)=>alert('Success!'));
    })
    .catch((err)=>alert('Failed!')); 
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved)
  {
  document.getElementById("reserved-banner").style.display="block"
  }
  else
  {
    document.getElementById("reserved-banner").style.display="none"
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
