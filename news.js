const apiKey = '6aff3b31681f4bde969994bfd5b4ddf7'

const vlogContainer = document.getElementById("blog-container");


const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


async function RAndomNews() {

    try {
        const apiUrl =` https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=12&apikey==${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data);
        return data.articles;

    } catch (error) {
        console.log("Error fetching the data", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => {
    let _query = searchField.value.trim()
    if (_query!== "") {
        try {
            const articles = await fetchNews(_query)
            displayBlogs(articles, [])



        } catch (error) {
            console.log("error in fetching news articles", error);
        }
    }

})

async function fetchNews(_query) {

    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${_query}&pageSize=8&apikey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        // console.log(data);
        return data.articles;

    } catch (error) {
        console.log("Error fetching the data", error);
        return [];
    }
}

function displayBlogs(articles) {

    vlogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img")
        img.src = article.urlToImage;
        img.alt = article.title
        const title = document.createElement("h2");
        title.textContent = article.title
        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank")
        })

        vlogContainer.appendChild(blogCard)


    })

}

(async () => {
    try {
        const articles = await RAndomNews()
        console.log(articles);
        displayBlogs(articles);
    } catch (error) {
        console.log(error);
    }
})();