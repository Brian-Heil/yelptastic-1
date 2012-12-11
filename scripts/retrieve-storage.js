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
			else if (x.location.display_address.join(' ').toLowerCase().indexOf(query.toLowerCase()) > -1) {
				feedback.push(x);
			}
		});
	}
	return feedback;
}

//filters are distance, rating, category
function filterFavorites(criterion, filter, results) {
  
	var feedback = [];
	if (filter == "rating") {
		feedback = _.filter(results, function(x) {
			return x.rating >= criterion;
		});
	} else if (filter == "distance") {
		var destinations = [];
		feedback = _.each(results, function(x) {
			var lat = parseFloat(x.coordinate.latitude);
			var lng = parseFloat(x.coordinate.longitude);
			var latlng = new google.maps.LatLng(lat, lng);
			destinations[x.name] = latlng;

		});
		var geo = new Geolocation;
		var locObj = new google.maps.LatLng(geo.getCurrentLocation.latitude, geo.getCurrentLocation.longitude);
		var mapping = calculateDistances(locObj, Object.values(destinations));
		for (var i=0; i< mapping.values.length; i++){
			if ((mapping.values[i])[distance] <= criterion){
				feedback(destinations[i]);
			}
		}
		return findDistance(x) <= criterion;
		//within 'criterion' miles
	} else if (filter == "category" || filter == "categories") {
		
		getFavoriteCategories();
		 _.each(results, function(x) {
			for(thisList in businessAndCategories){
				if((typeof thisList[x] != "undefined") && thisList[x].contains(criterion)){
					feedback.push(x);
				}
			}
		});	
	}
	/*return*/browseFavorites(feedback);
}
var businessAndCategories = [];
function getFavoriteCategories() {
	businessAndCategories = [];
	var feedback = {};
	var busName = "";
	var resultList = JSON.parse(localStorage.getItem("results"));
	//returns the list of lists (of categories);
	_.each(resultList, function(x) {
		feedback[x.name] = [];
		_.each(x.categories, function(y) {
			feedback[x.name].push(y[1]);
		});
	});
	var answer = {};
	var cats = {};
	_.each(feedback, function(innerCat, ky) {
		getBroadCategories(ky, answer, innerCat, allcategories);
	

	
	});
	
	return cats;
}

//this function needs testing
//innerCat has Traditional(American), Gluten-Free | Mexican, Catering 
function getBroadCategories(busName, answers, innerCat, globalCategories) {
	for (var singleCat in innerCat) {
		answers[singleCat] = [];
		var hierarchy = [];
		var broadforthissub = findStrings(busName, innerCat[singleCat], hierarchy, globalCategories, globalCategories);
		answers[singleCat].push(broadforthissub);
	}
	return answers;
}

function findStrings(busName, singleCat, catsForThisCat, globalCategories, staticGlobal) {
	if ( typeof globalCategories == 'object') {
		for (var ky in globalCategories) {
			catsForThisCat.push(ky);
		
			if (typeof findStrings(busName, singleCat, catsForThisCat, globalCategories[ky], staticGlobal) == "object"){
				
			}else{
				while(Object.keys(staticGlobal).indexOf(catsForThisCat.pop()) != -1){
				}
			}
			
		}
		} else if ( typeof globalCategories == 'string') {
		
			if (globalCategories.toLowerCase().indexOf(singleCat.toLowerCase()) > -1) {
				saveThisHierachy(busName, singleCat, catsForThisCat);
				return catsForThisCat;
				//return the list which contains the hierachy of categories for this business
				//first element in the list is the inner most category and the last element is the broad category
			} else {
				return "NF";			
			}
		}
		
	
}

function saveThisHierachy(bus, subcategory, tree){
	var bus_tree = {};
	tree.push(subcategory);
	bus_tree[bus] = tree;
	businessAndCategories.push(JSON.stringify(bus_tree));
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

function metersToMiles(meters){
    return meters * 0.000621371192;
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
	business.distance = metersToMiles(business.distance);
	var d = new Date();
	var day = d.getDate();
	var month = d.getMonth() + 1;
	var time = d.getTime();
	var year = d.getFullYear();
	business.dateAdded = time + " " + month + "/" + day + "/" + year;
	addBusinessToFavorite(business);
}