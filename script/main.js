

var articlesApi ={
    url: "http://newsapi.org/v2",
    apiKey : "9de2a3c2532845628d72a2c8e8d26c15",
    getUrl: function (searchQ) {
        return `${articlesApi.url}/everything?q=${searchQ}&apiKey=${articlesApi.apiKey} +`
    }

};
var elements_articlesContainer = document.getElementById("articlesContainer");

function fetchJsonData(url, funcToApply) {
    fetch(url)
        .then(url=> url.json())
        .then(jsonObj=> {
            funcToApply(jsonObj)
        })
        .catch(e=> console.error(e));
}
function fetchAndLoadImg(url, imgElement) {
    fetch(url)
        .then(response=> response.blob())
        .then(blobRes=> imgElement.src = URL.createObjectURL(blobRes));
}


function generateArticleDiv(title,content,imgURL) {

    let divContainer = document.createElement("div");
    let titleElement = document.createElement("h3");
    let contentElement = document.createElement("p");
    let imgElement = document.createElement("img")

     // fetchAndLoadImg(imgURL, imgElement );
    titleElement.textContent = title;
    contentElement.textContent = content;
    imgElement.src = imgURL;

    divContainer.appendChild(imgElement);
    divContainer.appendChild(titleElement);
    divContainer.appendChild(contentElement);
    divContainer.classList.add("articleBody");
    return divContainer;
}


fetchJsonData(articlesApi.getUrl("coronavirus"), jsonObj=>
{
    jsonObj.articles.forEach(article=>
    {
        let newElement = generateArticleDiv(article.title,article.description,article.urlToImage);
        elements_articlesContainer.appendChild(newElement);
    });


});
