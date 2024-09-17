const phoneContainer = document.getElementById("phoneContainer");
const searchValue = document.getElementById('search');
const loadData = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
    phoneContainer.textContent = ''
    phones.forEach((phone) => {
      console.log(phone)
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
};

    const searchPhone = () =>{
        const searchText = searchValue.value;
        console.log(searchText)
        loadData(searchText)
    }
loadData();
