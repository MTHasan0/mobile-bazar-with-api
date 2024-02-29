const loadData = async (search = "13", isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);

}


const displayPhones = (phones, isShowAll) => {
    const getDiv = document.getElementById("mobile-container");
    getDiv.innerHTML = '';


    const showAllBtn = document.getElementById("show-all-btn");

    if (phones.length >= 12 && !isShowAll) {
        showAllBtn.classList.remove("hidden");

    } else {
        showAllBtn.classList.add("hidden");
    }

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }




    phones.forEach(phone => {
        const div = document.createElement("div");
        div.classList = `card card-compact bg-base-100 shadow-xl p-4 m-4`;

        div.innerHTML = `
                
                    <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}!</h2>
                      <p class="font-bold text-xl">$999</p>

                      <div class="card-actions justify-center">
                        <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
                
        `;

        getDiv.appendChild(div);

    });

    toggleSpinner(false);


}

const handleShowDetails = async (showId) => {
    //load single phone data

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${showId}`);
    const data = await res.json();

    showPhoneDetails(data);

}

const showPhoneDetails = (phone) => {
    console.log(phone);

    const div = document.getElementById('show-details-container');
    

    div.innerHTML = `
            <div class="flex justify-center"><img src="${phone.data.image}" alt=""></div>
            <h3 class="font-bold text-lg">${phone.data.name}</h3>
            <p class="py-4 text-lg font-bold">Storage: <span class="font-normal">${phone.data.mainFeatures.storage}</span></p>
            <p class="py-4 text-lg font-bold">Display Size: <span class="font-normal">${phone.data.mainFeatures.displaySize}</span></p>
            <p class="py-4 text-lg font-bold">Chip Set: <span class="font-normal">${phone.data.mainFeatures.chipSet}</span></p>
            <p class="py-4 text-lg font-bold">Memory: <span class="font-normal">${phone.data.mainFeatures.memory}</span></p>
            <p class="py-4 text-lg font-bold">Slug: <span class="font-normal">${phone.data.slug}</span></p>
            <p class="py-4 text-lg font-bold">Release Date: <span class="font-normal">${phone.data.releaseDate}</span></p>
            <p class="py-4 text-lg font-bold">Brand: <span class="font-normal">${phone.data.brand}</span></p>
            <p class="py-4 text-lg font-bold">GPS: <span class="font-normal">${phone?.data?.others?.GPS}</span></p>
            
            
    
    `

    

    showModal.showModal();
}



const handleSearch = (isShowAll) => {
    toggleSpinner(true);

    const inputArea = document.getElementById("search-input");

    const inputValue = inputArea.value;

    loadData(inputValue, isShowAll);

}


function toggleSpinner(isTrue) {

    const toggle = document.getElementById("toggleSpinner");

    if (isTrue) {
        toggle.classList.remove("hidden");
    } else {
        toggle.classList.add("hidden");
    }

}

const handleShowAll = () => {
    handleSearch(true);
}


loadData();


