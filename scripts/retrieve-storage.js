var searchFavorites = function(query){
    //search crap.name, tags, category, crap.category
    var feedback = [];
    var resultList = localStorage.getItem("results");
    for (var x in resultList.businesses){
        if(x.name.search(query) > -1 || x.tag.search(query) > -1 || x.notes.search(query) > -1){
            feedback.push(x);
        }
    }
    return feedback;
}
var getFavoriteCategories = function(){
    var feedback = [];
    var resultList = localStorage.getItem("results");
    for (var x in resultList.businesses){
            feedback.push(x.categories); //returns the list of lists (of categories); from here Varun will try to find the broad-level category that this category belongs to 
    }
    return feedback;    
}
var getFavoritesWithinCategory = function(query){
    var feedback = [];
    var resultList = localStorage.getItem("results");
    for (var x in resultList.businesses){
        if(x.categories.search(query) > -1){
            feedback.push(x);
        }
    }
    return feedback; 
}
var addBusinessToFavorite = function(business){
    var resultList = localStorage.getItem("results");
    resultList.push(business);
    localStorage.setItem("results", resultList);   
}
var deleteBusinessFromStorage = function(business){
    var resultList = localStorage.getItem("results");
    resultList.delete(business);
    localStorage.setItem("results", resultList);
}