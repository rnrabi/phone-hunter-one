const loadData = async (searchText, showAllData) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayCard(phones, showAllData);
}

const displayCard = (phones, showAllData) => {
    // console.log(phones);
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';

    const showAll = document.getElementById('show-all-div');
    if (phones.length > 10 && !showAllData) {
        showAll.classList.remove('hidden');
        phones = phones.slice(0, 10);
    }
    else {
        showAll.classList.add('hidden');
    }

    phones.forEach(phone => {
        // console.log(phone);
        const divCard = document.createElement('div');
        divCard.classList = `card w-96 bg-base-100 shadow-xl`;

        const div = document.createElement('div');
        div.classList = `card-body items-center text-center`;
        div.innerHTML = `
        <img src="${phone.image}" alt=""> 
        <h2> ${phone.phone_name}</h2>
        <button onclick="modalView('${phone.slug}')" class="btn btn-primary">Show Details</button>
        `;
        divCard.appendChild(div);
        cardContainer.appendChild(divCard);
    })
    loadSpinner(false);
}

const searchHandle = (showAllData) => {
    loadSpinner(true);
    const searchText = document.getElementById('search-text').value;
    loadData(searchText, showAllData);
}

const loadSpinner = (isLoading) => {
    const loaderSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loaderSpinner.classList.remove('hidden');
    }
    else {
        loaderSpinner.classList.add('hidden');
    }
}

const allDataShow = () => {
    const showAll = document.getElementById('show-all-div');
    showAll.classList.add('hidden');
    searchHandle(true);

}

const modalView = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    displayModal(data.data);

    my_modal_5.showModal();
}

const displayModal = (singlePhone) => {
    console.log(singlePhone);
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <img class="mx-auto" src="${singlePhone.image}" alt="">
    <h2 class="text-3xl font-extrabold text-purple-600">${singlePhone.name}</h2>
    <h2><span class="text-2xl font-bold">Display:</span> ${singlePhone.mainFeatures.displaySize}</h2>
`;
}

document.getElementById('search-text').addEventListener('keyup', function (event) {
    const searchText = event.target.value;
    if(event.key === 'Enter'){
        loadData(searchText);
    }
})

loadData();
