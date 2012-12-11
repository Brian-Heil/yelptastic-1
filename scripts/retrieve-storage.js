
function searchFavorites (query){
    var feedback = [];
    var resultList = localStorage.getItem("results");
    _.each(resultList.businesses, function(x){
        if(x.name.search(query) > -1 || x.tag.search(query) > -1 || x.notes.search(query) > -1){
            feedback.push(x);
        }
    });
    alert('is Feedback empty?' + feedback.length);
    return feedback;
}

function getFavoriteCategories(){
    var feedback = [];
    var resultList = localStorage.getItem("results");
    //returns the list of lists (of categories); 
    _.each(resultList.businesses, function(x){
       feedback.push(x.categories);
    }
 );
    var answer = []; //a temp variable used in getBroadCategories which will be filled which a business's category hierachy
    var cats = [];   //a list of 'answer' lists; each element in cats is a list containing the hierachy for each business

    _.each(feedback, function(innerCat){
        cats.push(getBroadCategories(answer, innerCat, categories));
        answer =[];
    });
    return cats;
}
//this function needs testing

function getBroadCategories(answers, innerCat, globalCategories){
    for(var ky in globalCategories){
        if(typeof globalCategories == 'object'){
            answers.push(globalCategories);
            getBroadCategories(answers, globalCategories[ky]);
        }else if(typeof globalCategories == 'string'){
            if(globalCategories == innerCat){
                 return answers; //return the list which contains the hierachy of categories for this business 
                 //first element in the list is the inner most category and the last element is the broad category
            }//else, the category of the item is not this one.
        }
        answers = [];  //clear the array and look at the next category in the global list
    }    
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
    var resultList =[];
    resultList = localStorage.getItem("results");
    if (resultList === null) {
        resultList = [];
        resultList.push(business);
   }
     localStorage.setItem("results", JSON.stringify(resultList));
}

function deleteBusinessFromStorage(business){
    var resultList = localStorage.getItem("results");
    removeA(resultList, business);
    localStorage.setItem("results", JSON.stringify(resultList));
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

function saveBookmark(business, tags, notes){
    business.tags = tags;
    business.notes = notes;
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var time = d.getTime();
    var year = d.getFullYear();
    business.dateAdded = time + " " + month + "/" + day +"/"+ year;
    addBusinessToFavorite(business);
}