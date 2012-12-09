<<<<<<< HEAD
function searchFavorites (query){
    var feedback = [];
    var resultList = localStorage.getItem("results");
    _.each(resultList.businesses, function(x){
        if(x.name.search(query) > -1 || x.tag.search(query) > -1 || x.notes.search(query) > -1){
            feedback.push(x);
        }
    });
    return feedback;
}
function getFavoriteCategories(){
    var feedback = [];
    var resultList = localStorage.getItem("results");
    //returns the list of lists (of categories); from here Varun will try to find the broad-level category that this category belongs to 
    _.each(resultList.businesses, function(x){
       feedback.push(x.categories); 
    }
 );
    return feedback;    
}
function getFavoritesWithinCategory (query){
    var feedback = [];
    var resultList = localStorage.getItem("results");
    
   _.each(resultList.businesses, function(x){
        if(x.categories == query){
            feedback.push(x);
        }
    });
    return feedback; 
}
function addBusinessToFavorite (business){
    var resultList = [];
    if(typeof localStorage.getItem("results") != 'undefined'){
        resultList = localStorage.getItem("results");
   }
     resultList.push(business);
     localStorage.setItem("results", resultList); 
}
function deleteBusinessFromStorage(business){
    var resultList = localStorage.getItem("results");
    removeA(resultList, business);
    localStorage.setItem("results", resultList);
}
function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
=======
var searchFavorites = function(query){
    var feedback = [];
    var resultList = localStorage.getItem("results");
    for (var x in resultList.businesses){
        if(x.name.search(query) > -1 || x.tag.search(query) > -1 || x.notes.search(query) > -1){
            feedback.push(x);
        }
    }
    return feedback;
};

var getFavoriteCategories = function(){
    var feedback = [];
    var resultList = localStorage.getItem("results");
    for (var x in resultList.businesses){
            feedback.push(x.categories); //returns the list of lists (of categories); from here Varun will try to find the broad-level category that this category belongs to
    }
    return feedback;
};

var getFavoritesWithinCategory = function(query){
    var feedback = [];
    var resultList = localStorage.getItem("results");
    for (var x in resultList.businesses){
        if(x.categories == query){
            feedback.push(x);
        }
    }
    return feedback;
};

var addBusinessToFavorite = function(business){
    var resultList = [];
    if(typeof localStorage.getItem("results") != 'undefined'){
        resultList = localStorage.getItem("results");
   }
     resultList.push(business);
     localStorage.setItem("results", resultList);
};

var deleteBusinessFromStorage = function(business){
    var resultList = localStorage.getItem("results");
    resultList.delete(business);
    localStorage.setItem("results", resultList);
};
>>>>>>> bb9ae28bd206ab2d6e5c4a18901c7a4993309511
