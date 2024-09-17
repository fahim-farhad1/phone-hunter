const phoneContainer = document.getElementById("phoneContainer");
const searchValue = document.getElementById("search");
const showMore = document.getElementById("showMore");
const loader = document.getElementById("loader");

// load phones data
const loadData = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};

// show phone data on display
const displayPhones = (phones, isShowAll) => {
  // first clear container
  phoneContainer.textContent = "";

  // hide and unhide show more button
  if (phones.length > 9 && !isShowAll) {
    showMore.classList.remove("hidden");
  } else {
    showMore.classList.add("hidden");
  }
  // slice data
  if (!isShowAll) {
    phones = phones.slice(0, 9);
  }

  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card card-compact bg-base-100 w-full shadow-xl`;
    phoneCard.innerHTML = `
         <figure>
              <img
                src="${phone.image}"
                alt="Shoes" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.brand}</h2>
              <p>${phone.phone_name}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Show Details</button>
              </div>
            </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });

  //   stop loader
  toggleLoader(false);
};

// search phone
const searchPhone = (isShowAll) => {
  toggleLoader(true);
  const searchText = searchValue.value;
  console.log(searchText);
  loadData(searchText, isShowAll);
};

// loader function
const toggleLoader = (isLoading) => {
  if (isLoading) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

const showAllData = () => {
  searchPhone(true);
};

loadData();
