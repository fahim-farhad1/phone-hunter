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
    // console.log(phone);
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
                <button onclick="my_modal_5.showModal(), handelShowModal('${phone.slug}')" 
                
                class="btn btn-primary">Show Details</button>
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
//   console.log(searchText);
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
// show all phone data
const showAllData = () => {
  searchPhone(true);
};
//show modal data
const handelShowModal = async (id) => {
  console.log(id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  displayModalData(phone);
};

const displayModalData = (phone) => {
    console.log(phone)
  const modal = document.getElementById("my_modal_5");
  modal.innerHTML = `
     <div class="modal-box">
     <img class="" src="${phone.image}" alt="" />
        <h3 class="text-lg font-bold">${phone.brand}</h3>
        <p class="py-4">${phone.name}</p>
        <p class="py-4">${phone.releaseDate}</p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    `;
};
loadData();
