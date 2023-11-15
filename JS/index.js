const showButton = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json();

    let AllData = data.data;
    // console.log(AllData)
    const cardButton = document.getElementById('card-button')

    AllData.forEach(singleData => {
        // console.log(singleData)
        const div = document.createElement('div')
        div.innerHTML = `
        <button id="btn" onclick="loadData('${singleData.category_id}')" class="btn rounded-md p-3 text-xs lg:text-sm lg:px-5 md:text-sm md:px-5">${singleData.category}</button>
        `
        cardButton.appendChild(div);
    })
}


//Card fetch section
let publicData = null;

const loadData = async (id) => {
    // console.log(id)
    // single card style 
    const btn = document.getElementById('btn')
    btn.style.backgroundColor = 'red';
    btn.style.color = 'white'

    toggleLoading(true);
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    publicData = data.data;
    // console.log(publicData);
    showCard(publicData)
}


//Sorting section
const sortByViews = () => {
    const cardData = publicData;

    cardData.sort((a, b) => {
        const viewsA = parseInt(a.others?.views.replace('K', '')) || 0;
        const viewsB = parseInt(b.others?.views.replace('K', '')) || 0;

        return viewsB - viewsA;
    })
    showCard(cardData);
}


//any Card show section
const showCard = async (cardData) => {
    console.log(cardData)

    const noContent = document.getElementById('no-content')
    noContent.style.display = 'none';

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    if (cardData.length > 0) {
        cardData.forEach(singleCard => {

            const timeString = singleCard.others?.posted_date
            const time = parseInt(timeString)
            // console.log(time + 10)
            const hour = parseInt(time / 3600);
            const min = parseInt((time % 3600) / 60);

            const div = document.createElement('div');
            div.innerHTML = `
        <div class="card w-auto bg-base-100 shadow-xl">
            <figure class="h-44 relative"><img src=${singleCard.thumbnail}/> 
            ${timeString ? `<p class="bg-[#171717] text-white rounded-md text-xs p-1 absolute bottom-2 right-2" id="timeOnCard">${hour}hrs ${min}mins ago</p>` : ``}</figure>
            <div class="card-body card-side">
                <div class="avatar mr-3">
                    <div class="w-10 h-10 rounded-full">
                    <img src=${singleCard.authors[0]?.profile_picture}/>
                    </div>
                </div>
                <div>
                    <h2 class="font-bold text-base">${singleCard.title}</h2>
                    <p class="py-1">${singleCard.authors[0]?.profile_name}</p>
                    <div class="card-actions">
                        <p>${singleCard.others?.views} views<p>
                    </div>
                </div>
            </div>
        </div>
            `
            cardContainer.appendChild(div)
        })
    }
    else {
        noContent.style.display = 'block'
    }
    toggleLoading(false)
}


//Loading section
const toggleLoading = (isloading) => {
    const loadingSpiner = document.getElementById('loading-spiner')

    if (isloading) {
        loadingSpiner.classList.remove('hidden')
    }
    else {
        loadingSpiner.classList.add('hidden')
    }
}


//Go to the Blog.html page
function blogbutton() {
    window.location.href = 'Blog.html';
}


showButton();