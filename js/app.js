//

const searchBtn = document.getElementById("search-btn");

const loadPhones = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};

const displayPhones = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = "";
  phones.forEach((phone) => {
    const makePhone = document.createElement("div");
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
      </div>
        `;
    makePhone.classList.add("col");
    phonesContainer.appendChild(makePhone);
  });
};

loadPhones();

searchBtn.addEventListener("click", function () {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhones(searchText);
});
