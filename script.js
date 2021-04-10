var searchResults = $(".search-results");
var foodName = $(".search-input").val();
var apiKey = "76a0fbe245ad40c890010f39beefcc66";

function inputSearch(){

    var searchInput = $(".search-input").val();

    if (searchInput) {
        getFood(searchInput);
        $(".search-button").hide();
        $(".search-input").hide();
    }  
    
    if (!searchInput) {
        $("#myModal").modal('show');
        $(".modal-title").text("Error!")
        $(".modal-info").text("Please enter a search input!")
    }
}

$(".search-button").click(inputSearch);

function getFood(foodName){

    var foodUrl = "https://api.spoonacular.com/food/search?apiKey=" + apiKey + "&query=" + foodName;

fetch(foodUrl)
        .then(function (response) {
            console.log(response);
            
            if (response.ok) {
                response.json().then(function (results) {
                    displayFood(results);
                    console.log(results)
                })
            }
        })
    }

function displayFood(results) {

    var listResults = document.createElement("div");
    var resultBody = document.createElement("div");
    resultBody.setAttribute("class", "result-body")

    listResults.append(resultBody);

    var bodyTitle = document.createElement("h1");
    bodyTitle.setAttribute("class", "result-title")

    bodyTitle.textContent = results.searchResults[0].name;

    resultBody.append(bodyTitle);

    for (var i = 0; i < results.searchResults[0].results.length; i++){

        var recipeBody = document.createElement("div")
        recipeBody.setAttribute("class", "recipe-body")
        var recipeTitle = document.createElement("h1");
        recipeTitle.setAttribute("class", "recipe-title")
        var recipeImg = document.createElement("img");
        recipeImg.setAttribute("class", "recipe-img")
        var recipeInfo = document.createElement("p")
        recipeInfo.setAttribute("class", "recipe-info")

        recipeTitle.textContent = results.searchResults[0].results[i].name
        recipeImg.src = results.searchResults[0].results[i].image;
        recipeInfo.textContent = results.searchResults[0].results[i].content;


        recipeBody.append(recipeTitle, recipeImg, recipeInfo);
        resultBody.append(recipeBody);
    }

    var refreshButton = document.createElement("button");
    refreshButton.setAttribute("class", "refresh-button");
    refreshButton.textContent = "Refresh for new search!"

    refreshButton.addEventListener("click", refreshPage)

    searchResults.append(listResults);
    searchResults.append(refreshButton);

}

function refreshPage(){
    location.reload();
}