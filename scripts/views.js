var lastLookup = [];
var lastSearch = [];
var bool = [true];
/*
 * Search the yelp api
 */
var searchYelp = function (term, near, category_filters, offset) {
  if (offset == undefined) {
    var opt_int = 0;
  } else {
    var opt_int = offset;
  }
  if (category_filters == undefined) {
    var opt_cat = "";
  } else {
    var opt_cat = category_filters;
  }
  if (near && term){
    searchQuery(term, near, opt_cat, opt_int);
  } else {
    if(bool[0]) {
      bool = [];
      bool.push(false);
      $('#middle').append('<div class="alert">' +
      '<button type="button" onclick="bool.pop(); bool.push(true);" class="close" data-dismiss="alert">&times;</button>'+
      '<strong>Error!</strong> Please include the appropriate info in the appropriate fields.'+
      '</div>');
    }
  
  }
  
}

/*
 * 
 */
var getBookmarks = function(term) {
  var bookmarks = searchFavorites(term);
  browseFavorites(bookmarks);
}

/*
 * Browses Favorites
 */
var browseFavorites = function(data) {
  var current = $('.active1').text();
  if (current != 'Lookup'){
    lastLookup.push(data);
    $('.active1').remove();
  $('.columnCenter').empty();
        $('.breadcrumb').empty();
        $('.breadcrumb').append('<li onclick="$(\'body\').triggerHandler('+ '\''+ 'Home' + '\''+')"><a href="#' + 'Home' +'">' + 'Home' + '</a> <span class="divider">/</span><li>');
        $('.breadcrumb').append('<li class="active1">Lookup</li> ');
    history.pushState({}, 'Yelptastic- Browse Favorite', '#bookmarksearch');
  }
  $('.columnCenter').empty();

  browseBookmarks(data, 0);
}

/*
 * Displays the view for searching yelp.
 */

var addFavoritesView = function(data, total, opt_term, opt_location, opt_cat, opt_offset) {
  //$('.breadcrumbs').removeClass('.active');
  var current = $('.active1').text();
  $('.alert').remove();
  bool = [];
  bool.push(true);

  lastSearch.push(data);
    lastSearch.push(total);
  lastSearch.push(opt_term);
  lastSearch.push(opt_location);
  lastSearch.push(opt_cat);
  lastSearch.push(opt_offset);
  if (current != 'Search'){
    $('.active1').remove();
     $('.columnCenter').empty();
     $('.breadcrumb').empty();
     $('.breadcrumb').append('<li onclick="$(\'body\').triggerHandler('+ '\''+ 'Home' + '\''+')"><a href="#' + 'Home' +'">' + 'Home' + '</a> <span class="divider">/</span><li>');
     $('.breadcrumb').append('<li class="active1">Search</li> ');
    history.pushState({}, 'Yelptastic- Yelp Search', '#yelpsearch');
  }
  $('.columnLeft').empty();
  $('.columnCenter').empty();
  var allcategories = $.getJSON("scripts/categories.json", function(y){
  	  var x = y;
  	  parseYelpCategories(opt_term, opt_location, x);
  });
  addQuery(data, opt_offset, total, opt_term, opt_location, opt_cat);


}

/*
 * Takes in the results and appends them to the thumbnails grids
 */
var addQuery = function (results, opt_int, opt_total, opt_term, opt_location, opt_cat) {
  $('.columnCenter').empty();
  $thumbnailswrapper = $('<ul class="thumbnails"></ul>');  
  var data = [];
    for (var i = 0; i < results.length; i ++) {
      $button = $('<button>Favorite</button>');
      if(results[i].image_url) {
        var image_url = results[i].image_url;
      } else {
        var image_url = 'http://s3-media3.ak.yelpcdn.com/assets/2/www/img/305e17fe6ed8/gfx/blank_biz_medium_sq.png';
      }
      data.push({
        name:results[i].name,
        image:image_url,
        quote:results[i].snippet_text,
        ratingImage:results[i].rating_img_url,
        button:'Favorite',
        object:JSON.stringify(results[i]),
        url:results[i].url,
        phonenumber:results[i].display_phone, 
        n:i.toString(),
        views:results[i].review_count,
        distance:results[i].distance,
        address:results[i].location.display_address[0] +" " + results[i].location.display_address[1]+" " + results[i].location.display_address[2],
      });
  } 
  var source = $('#results').html();
  var template = Handlebars.compile(source);
  var string = template(data);
  $thumbnailswrapper.append(string);
  if (opt_total > 20) {
    $buttonRow = $('<div class="buttonRow"></div>');

    if (opt_int >= 20) {
      $see_prev = $('<input type="button" value="Previous 20" name="nextButton">');
      $see_prev.click(function() {
        searchYelp(opt_term, opt_location, opt_cat, opt_int-20);
       });
     $buttonRow.append($see_prev);
    }
    if (opt_int + 20 <= opt_total) {
       $see_all = $('<input type="button" value="Next 20" name="prevButton">');
       $see_all.click(function() {
          searchYelp(opt_term, opt_location, opt_cat, opt_int + 20);
       });
     $buttonRow.append($see_all);
    }
  $thumbnailswrapper.append($buttonRow);
  }  
  $('.columnCenter').append($thumbnailswrapper);
  window.scroll();
}

/*
 * Takes in the results and appends them to the thumbnails grids
 */
var browseBookmarks = function (results, opt_int) {
  $('.columnCenter').empty();
  $thumbnailswrapper = $('<ul class="thumbnails"></ul>');
  $buttonRow = $('<div class="buttonRow"></div>');
  var data = [];
  if (results.length >=20) {
    for (var i = opt_int; i < opt_int + 20; i ++) {
      if(results[i].image_url) {
        var image_url = results[i].image_url;
      } else {
        var image_url = 'http://s3-media3.ak.yelpcdn.com/assets/2/www/img/305e17fe6ed8/gfx/blank_biz_medium_sq.png';
      }
      $button = $('<button>Favorite</button>');
      alert('results[i].location.display_address[0]');
      data.push({
        name:results[i].name,
        image:image_url,
        quote:results[i].snippet_text,
        ratingImage:results[i].rating_img_url,
        tags:results[i].tags,
        object:JSON.stringify(results[i]),
        url:results[i].url,
        notes:results[i].notes,
        views:results[i].review_count,
        distance:results[i].distance,
        address:results[i].location.display_address[0] +" " + results[i].location.display_address[1]+" "+ results[i].location.display_address[2],

      });
    }  
  } else {
    for (var i = opt_int; i < results.length; i ++) {
      if(results[i].image_url) {
        var image_url = results[i].image_url;
      } else {
        var image_url = 'http://s3-media3.ak.yelpcdn.com/assets/2/www/img/305e17fe6ed8/gfx/blank_biz_medium_sq.png';
      }
      $button = $('<button>Favorite</button>');
      data.push({
        name:results[i].name,
        image:image_url,
        quote:results[i].snippet_text,
        ratingImage:results[i].rating_img_url,
        tags:results[i].tags,
        url:results[i].url,
        views:results[i].review_count,
        distance:results[i].distance,
        address:results[i].location.display_address[0] +" " + results[i].location.display_address[1]+" " + results[i].location.display_address[2],
      });
    }  
  }
  var source = $('#browse').html();
  var template = Handlebars.compile(source);
  var string = template(data);
  $thumbnailswrapper.append(string);
  if (data.length >= 20) {
    if (opt_int >= 20) {
      $see_prev = $('<input type="button" value="Previous" name="nextButton">');
      $see_prev.click(function() {
        addQuery(results, opt_int-1);
       });
      $buttonRow.append($see_prev);
      }
    if (opt_int + 20 <= data.length) {
       $see_all = $('<input type="button" value="Next" name="prevButton">');
       $see_all.click(function() {
          addQuery(results, opt_int + 20);
       });
      $buttonRow.append($see_all);
    }
  }  
  
  $thumbnailswrapper.append($buttonRow);
  $('.columnCenter').append($thumbnailswrapper);
}
/*
 * Function to send the bookmarks to the backend
 */
var saveFavorite = function (jsonString, tags1, notes1) {
  var object1 = jsonString;
  saveBookmark(object1, tags1, notes1);
}


var parseYelpCategories = function (term, location, categories) {

	var categories_wrapper = '<div class="accordion" id="categories">';
	for (var i in categories)
	{
		var genCategory = i;
		var genCategoryTag = i;
		genCategoryTag = genCategoryTag.replace(/ /g, "_");
		genCategoryTag = genCategoryTag.replace(/&/g, "And");
		

    	categories_wrapper = categories_wrapper + '<div class="accordion-group" id="' + genCategoryTag + '">';        
        categories_wrapper = categories_wrapper + '<div class="accordion-heading">';
        categories_wrapper = categories_wrapper + '<a class="accordion-toggle" data-toggle="collapse" data-parent="#' + genCategoryTag + '" href="#sub' + genCategoryTag + '">';
		categories_wrapper = categories_wrapper + genCategory;
        categories_wrapper = categories_wrapper + '</a>';
        categories_wrapper = categories_wrapper + '</div>';
        categories_wrapper = categories_wrapper + '<div id="sub' + genCategoryTag + '" class="accordion-body collapse">';
        categories_wrapper = categories_wrapper + '<div class="accordion-inner">';
        
        for (var j in categories[i])
        {
        	var subCategory = j;
        	var subCategoryTag = categories[i][j];
        	
        	categories_wrapper = categories_wrapper + '<div class="accordion-group">';
            categories_wrapper = categories_wrapper + '<div class="accordion-heading">';
            categories_wrapper = categories_wrapper + '<a class="accordion-toggle" data-toggle="collapse" data-parent="#' + subCategoryTag + '">';      
            categories_wrapper = categories_wrapper + subCategory;                                
            categories_wrapper = categories_wrapper + '</a>';
            categories_wrapper = categories_wrapper + '</div>';
            categories_wrapper = categories_wrapper + '</div>';     
        }
           
        categories_wrapper = categories_wrapper + '</div>';
        categories_wrapper = categories_wrapper + '</div>';
        categories_wrapper = categories_wrapper + '</div>';

		
	}
	
	categories_wrapper = categories_wrapper + "</div>";
	
	$('.columnLeft').append(categories_wrapper);
}
