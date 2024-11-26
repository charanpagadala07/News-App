let apiKey = "0ff1334aee234085a859b0be3917d52a";

const blogContainer = document.getElementById("blog-container");
const searchfield = document.getElementById("search-input");
const searchbutton = document.getElementById("search-button");

async function Randomnews(){
    try {
        let apiURL = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
        
    } catch (error) {
        console.error("error fetching random news....", error);
        return [];
        
    }
}
function displayBlogs(articles){
    blogContainer.innerHTML = " ";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage
        img.alt = article.title
        const title = document.createElement("h2");
        title.textContent = article.title
        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogContainer.appendChild(blogCard);
        blogCard.addEventListener("click", ()=>{
            window.open(article.url , "_blank");
        })
        
    });
}

searchbutton.addEventListener("click", async ()=>{
    const query = searchfield.value;
    if(query !== ""){
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
            
        } catch (error) {
            console.log("Error fetching news by query", error);
            
        }
    }
});

async function fetchNewsQuery(query){
    try {
        let apiURL = `https://newsapi.org/v2/top-headlines?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiURL);
        const data = await response.json();
        return data.articles;
        
    } catch (error) {
        console.error("error fetching random news....", error);
        return [];
        
    }
}


(async () =>{
    try {
        const articles = await Randomnews();
        displayBlogs(articles);

        
    } catch (error) {
        console.error("Error fetching random news", error);
        
    }
})();