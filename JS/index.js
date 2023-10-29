const showButton = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await response.json();

    let AllData = data.data;
    // console.log(AllData)
    const cardButton = document.getElementById('card-button')

    AllData.forEach(singleData => {
        console.log(singleData)
        const div = document.createElement('div')
        div.innerHTML = `
        <button onclick="showCard('${singleData.category_id}')" class="btn rounded-md">${singleData.category}</button>
        `
        cardButton.appendChild(div);
    })
}

const showCard = async (id) => {
    toggleLoading(true)
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await response.json()
    console.log(id)
    let cardData = data.data
    console.log(cardData)
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = '';

    cardData.forEach(singleCard => {
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="card w-auto bg-base-100 shadow-xl">
        <figure class="h-44"><img src=${singleCard.thumbnail}/></figure>
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
    toggleLoading(false)
}

const toggleLoading = (isloading) => {
    const loadingSpiner = document.getElementById('loading-spiner')

    if (isloading) {
        loadingSpiner.classList.remove('hidden')
    }
    else {
        loadingSpiner.classList.add('hidden')
    }
}

showButton();
// showCard()