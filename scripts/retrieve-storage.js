var getFavoritesCatergories = function(query){
    var feedback = [];
    var resultList = localStorage.getItem("results");
    for (var x in resultList.businesses){
        if(x.name.search("query") > -1 || x.tag.search("query") > -1 || x.notes.search("query") > -1){
            feedback.push(x);
        }
    }
    return feedback;
}