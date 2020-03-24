

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


function generateArticleDiv(title,description,imgURL) {

    let divContainer = document.createElement("div");
   divContainer.innerHTML=
       `
    <img src="${imgURL}" alt="">
    <h3>${title}</h3>
    <p>${description}</p> 

`;

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
