

var articlesApi ={
    url: "http://newsapi.org/v2",
    apiKey : "9de2a3c2532845628d72a2c8e8d26c15",
    getUrl: function (searchQ) {
        return `${articlesApi.url}/everything?q=${searchQ}&apiKey=${articlesApi.apiKey} +`
    }

};
var elements_articlesContainer = document.getElementById("articlesContainer");

function fetchData(url,funcToApply) {
    fetch(url)
        .then(url=> url.json())
        .then(jsonObj=> {
            funcToApply(jsonObj)
        })
        .catch(e=> console.error(e));
}



function generateArticleDiv(title,content,imgSrc) {
    let divContainer = document.createElement("div");
    let titleElement = document.createElement("h3");
    let contentElement = document.createElement("p");

    titleElement.textContent = title;
    contentElement.textContent = content;

    divContainer.appendChild(titleElement);
    divContainer.appendChild(contentElement);
    divContainer.classList.add("articleBody");

    return divContainer;
}


fetchData(articlesApi.getUrl("coronavirus"),jsonObj=>
{
    jsonObj.articles.forEach(article=>
    {
        let newElement = generateArticleDiv(article.title,article.description);
        elements_articlesContainer.appendChild(newElement);
    });


});
