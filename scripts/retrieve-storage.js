var searchFavorites = function(query){
    var feedback = [];
    var resultList = localStorage.getItem("results");
    _.each(resultList.businesses, function(x){
        if(x.name.search(query) > -1 || x.tag.search(query) > -1 || x.notes.search(query) > -1){
            feedback.push(x);
        }
    });
    return feedback;
};
var getFavoriteCategories = function(){
    var feedback = [];
    var resultList = localStorage.getItem("results");
    //returns the list of lists (of categories); from here Varun will try to find the broad-level category that this category belongs to 
    _.each(resultList.businesses, function(x){
       feedback.push(x.categories); 
    }
 );
    return feedback;    
};
var getFavoritesWithinCategory = function(query){
    var feedback = [];
    var resultList = localStorage.getItem("results");
    
   _.each(resultList.businesses, function(x){
        if(x.categories == query){
            feedback.push(x);
        }
    });
    return feedback; 
};

function addBusinessToFavorite (business){
    var resultList = [];
    if(typeof localStorage.getItem("results") != 'undefined'){
        resultList = localStorage.getItem("results");
   }
     resultList.push(business);
     localStorage.setItem("results", resultList); 
};
function deleteBusinessFromStorage(business){
    var resultList = localStorage.getItem("results");
    resultList.remove(business);
    localStorage.setItem("results", resultList);
};