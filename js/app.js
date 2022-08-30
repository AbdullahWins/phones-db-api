//

//global variables

const searchBtn = document.getElementById("search-btn");
const showAllBtn = document.getElementById("btn-see-more");

//access phones from api

const loadPhones = async (searchText, itemCount) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, itemCount);
};

//access phone details from api

const loadPhoneDetails = async (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhnSpecs(data.data);
};

//load phones

const displayPhones = (phones, itemCount) => {
  const phonesContainer = document.getElementById("phones-container");
  const notFound = document.getElementById("not-found-warning");
  const loadMore = document.getElementById("load-more");
  phonesContainer.innerHTML = "";
  if (itemCount && phones.length > 10) {
    phones = phones.slice(0, 10);
    loadMore.classList.remove("d-none");
  } else {
    loadMore.classList.add("d-none");
  }
  if (phones.length != 0) {
    phones.forEach((phone) => {
      const makePhone = document.createElement("div");
      notFound.classList.add("d-none");
      makePhone.innerHTML = `
          <div class="card h-100 p-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title text-center">${phone.phone_name}</h5>
              <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            <div class="card-footer text-center">
            <small class="text-muted">Brand: ${phone.brand}</small>
          </div>
          <a onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" 
          data-bs-toggle="modal"
          data-bs-target="#phoneModal">Details</a>
          </div>
            `;
      makePhone.classList.add("col");
      phonesContainer.appendChild(makePhone);
      toggleSpinner(false);
    });
  } else {
    notFound.classList.remove("d-none");
    toggleSpinner(false);
    loadMore.classList.add("d-none");
  }
};

//load phone specs

const displayPhnSpecs = (data) => {
  const phnName = document.getElementById("phn-name");
  const phnDesc = document.getElementById("phn-desc");
  const phnDate = document.getElementById("phn-date");
  phnName.innerText = `Name: ${data.name}`;
  phnDesc.innerHTML = `<p>Specs: ${data.mainFeatures.sensors}</p>`;
  phnDate.innerHTML = `<p>Release Date: ${
    data.releaseDate ? data.releaseDate : "No Date Found"
  } </p>`;
};

// btn function

const searchProcess = (itemCount) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText, itemCount);
};

//btn click events

searchBtn.addEventListener("click", function () {
  searchProcess(10);
});

showAllBtn.addEventListener("click", function () {
  searchProcess();
});

//loading

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};
