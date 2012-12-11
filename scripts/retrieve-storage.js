function searchFavorites(query) {
	var feedback = [];
	var resultList = JSON.parse(localStorage.getItem("results"));
	if (resultList == null) {
		return feedback;
	} else {
		_.each(resultList, function(x) {
			if (x.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
				feedback.push(x);
			} else if (x.tags.toLowerCase().indexOf(query.toLowerCase()) > -1) {
				feedback.push(x);

			} else if (x.notes.toLowerCase().indexOf(query.toLowerCase()) > -1) {
				feedback.push(x);
			}
		});
	}
	return feedback;
}


function getFavoriteCategories() {

	var feedback = {};
	var resultList = JSON.parse(localStorage.getItem("results"));
	//returns the list of lists (of categories);
	_.each(resultList, function(x) {
		feedback[x.name] = [];
		_.each(x.categories, function(y) {
			feedback[x.name].push(y[1]);
			//	alert(y[1]);
		});
	});
	var answer = {};
	//a temp variable used in getBroadCategories which will be filled which a business's category hierachy
	var cats = [];
	//a list of 'answer' lists; each element in cats is a list containing the hierachy for each business

	_.each(feedback, function(innerCat, ky) {

		//	alert(innerCat); works- shows the strings of the categories
		cats.push(getBroadCategories(answer, innerCat, categories));
		answer = {};
	});
	//alert(cats);
	return cats;
}

//this function needs testing

function getBroadCategories(answers, innerCat, globalCategories) {
	
	for (var singleCat in innerCat) {
		answers[singleCat] = [];
		var hierarchy = [];
		//alert(globalCategories);
		answers[singleCat] = findStrings(singleCat, hierarchy, globalCategories);

	}
	return answers;
}

function findStrings(singleCat, catsForThisCat, globalCategories) {
	for (var ky in globalCategories) {
		if ( typeof globalCategories == 'object') {
			catsForThisCat.push(globalCategories);
			findStrings(singleCat, catsForThisCat, globalCategories[ky]);
		} else if ( typeof globalCategories == 'string') {

			if (globalCategories.toLowerCase().search(singleCat.toLowerCase()) > -1) {
				alert(singleCat);
				return catsForThisCat;
				//return the list which contains the hierachy of categories for this business
				//first element in the list is the inner most category and the last element is the broad category
			} else {
				//alert(catsForThisCat);
				
				catsForThisCat = [];
			}//else, the category of the item is not this one.
		}
	}
}

function getFavoritesWithinCategory(query) {
	var feedback = [];
	var resultList = JSON.parse(localStorage.getItem("results"));

	_.each(resultList, function(x) {
		if (x.categories == query) {
			feedback.push(x);
		}
	});
	return feedback;
}

function addBusinessToFavorite(business) {

	var resultList = JSON.parse(localStorage.getItem("results"));
	if (resultList == null) {
		resultList = [];

	}
	resultList.push(business);
	localStorage.setItem("results", JSON.stringify(resultList));
}

function deleteBusinessFromStorage(business) {
  alert('Deleting');
	var resultList = JSON.parse(localStorage.getItem("results"));

	var temp = removeA(resultList, business);
	localStorage.setItem("results", JSON.stringify(temp));
	getBookmarks(lastTerm[0]);
}

function removeA(array, item) {
	 for(var i in array){
    if(array[i].id == item.id) {
            array.splice(i,1);
            break;
            }
    }
	return array;
}

function saveBookmark(business, tags, notes) {
	if (tags == undefined) {
		tags = " ";
	}
	if (notes == undefined) {
		notes = " ";
	}
	business.tags = tags;
	business.notes = notes;
	var d = new Date();
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var time = d.getTime();
	var year = d.getFullYear();
	business.dateAdded = time + " " + month + "/" + day + "/" + year;
	addBusinessToFavorite(business);
}