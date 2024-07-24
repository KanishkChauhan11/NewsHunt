const API_KEY = "8ea3984462184c22962b3033009daaba";
const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=> fetchNews("India"));

reload=()=>{
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newsTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsTemplate.content.cloneNode(true);
        fillData(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillData(cardClone, article){
    const newsImg = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} - ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url, "_blank");
    });
}

let curSelected = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelected?.classList.remove("active");
    curSelected = navItem;
    curSelected.classList.add("active");
}

const searchButton = document.getElementById("search-btn");
const searchText = document.getElementById("news-input");

searchButton.addEventListener("click", ()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelected?.classList.remove("active");
    curSelected = null;
})