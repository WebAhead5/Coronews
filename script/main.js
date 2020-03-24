

var articlesApi ={
    url: "http://newsapi.org/v2",
    apiKey : "9de2a3c2532845628d72a2c8e8d26c15",
    getUrl: function (searchQ) {
        return `${articlesApi.url}/everything?q=${searchQ}&apiKey=${articlesApi.apiKey} +`
    }
};
var weatherAPI = {
    url: "http://api.weatherstack.com/",
    apiKey: "917ac2461ccf86560369f3f51787b766",
    getUrl: function (searchQ) {
        return `${weatherAPI.url}/current?query=${location}&access_key=${weatherAPI.url}`
    },
    exampleLink: "http://api.weatherstack.com/current?query=London&access_key=917ac2461ccf86560369f3f51787b766"   
}

var elements_weatherContainer = document.getElementById("weatherContainer");
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


function generateArticleDiv(article) {

    let divContainer = document.createElement("div");
    divContainer.innerHTML=
        `
    
    <img src="${article.urlToImage}" alt="">
    <div class="articleTextSection">
        <h3>${article.title}</h3>
        <p class="articleDesc hidden">${article.description} <a href="${article.url}">Read More...</a> </p>
         
    </div>
`;

    divContainer.classList.add("articleHolder");
    divContainer.addEventListener("click", ()=> {
        // let element =Array.from(divContainer.childNodes).indexOf(x=>x.classList.contains("articleDesc"));
        let element= divContainer.getElementsByClassName("articleDesc")[0];
        console.log(element)

        element.classList.toggle("hidden")
    });
    return divContainer;
}


fetchJsonData(articlesApi.getUrl("coronavirus"), jsonObj=>
{
    jsonObj.articles.forEach(article=>
    {
        let newElement = generateArticleDiv(article);
        elements_articlesContainer.appendChild(newElement);
    });


});
