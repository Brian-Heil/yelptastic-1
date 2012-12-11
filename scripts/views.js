var lastLookup = [];
var lastSearch = [];
var bool = [true];
var delet = [];
var lastTerm = [];
var opts = {
    lines: 13, // The number of lines to draw
    length: 7, // The length of each line
    width: 4, // The line thickness
    radius: 10, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    color: '#000', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
};

/*
 * Displays the home page
 */
var home = function() {
      var current = $('.active1').text();
   if (current != 'Home'){
        $('.active1').remove();
        $('.columnCenter').empty();
        $('.columnLeft').empty();
        $('.breadcrumb').empty();
        $('.breadcrumb').append('<li class="active1">Home</li> ');
        history.pushState({}, 'Yelptastic- Browse Favorite', '#Home');
    }
  var results = JSON.parse(localStorage.getItem("results"));
  if (results.length == 0) {
    $('.columnCenter').append('<div class="hero-unit">'+
    '<p><h1>You currently do not have any favorites saved.</h1></p>' +
  '<p><h1>Select add favorites to begin browsing and adding favorites</h1></p>'+ '</div>');
  } else {
    lastLookup.push(results);
    browseBookmarks(results, 0);
  }
  
  
}





/*
* Search the yelp api
*/
var searchYelp = function (term, near, category_filters, offset) {
    var target = document.getElementById('columnCenter');
    $('.columnCenter').empty();
    var spinner = new Spinner(opts).spin(target);
    var opt_int;
    var opt_cat;
    if (offset == undefined) {
        opt_int = 0;
    } else {
        opt_int = offset;
    }
    if (category_filters == undefined) {
        opt_cat = "";
    } else {
        opt_cat = category_filters;
    }
    if (near && term){
        searchQuery(term, near, opt_cat, opt_int);
    } else {
        if(bool[0]) {
            spinner.stop();
            bool = [];
            bool.push(false);
            $('#middle').append('<div class="alert">' +
                                '<button type="button" onclick="bool.pop(); bool.push(true);" class="close" data-dismiss="alert">&times;</button>'+
                                '<strong>Error!</strong> Please include the appropriate info in the appropriate fields.'+
                                '</div>');
        }
    }
};

/*
*
*/
var getBookmarks = function(term) {
    lastTerm.push(term);
    var bookmarks = searchFavorites(term);
    browseFavorites(bookmarks);
};

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
};

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
        parseYelpCategories(opt_term, opt_location, y);
    });

    addQuery(data, opt_offset, total, opt_term, opt_location, opt_cat);
};

/*
* Takes in the results and appends them to the thumbnails grids
*/
var addQuery = function (results, opt_int, opt_total, opt_term, opt_location, opt_cat) {
    $('.columnCenter').empty();
    $thumbnailswrapper = $('<ul class="thumbnails"></ul>');
    var data = [];
    for (var i = 0; i < results.length; i ++) {
        var image_url;
        $button = $('<button>Favorite</button>');
        if(results[i].image_url) {
            image_url = results[i].image_url;
        } else {
            image_url = 'http://s3-media3.ak.yelpcdn.com/assets/2/www/img/305e17fe6ed8/gfx/blank_biz_medium_sq.png';
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
            address:results[i].location.display_address[0] +" " + results[i].location.display_address[1]+" " + results[i].location.display_address[2]
        });
    }
    var source = $('#results').html();
    var source2 = $('#radial').html();
    var template = Handlebars.compile(source);
    var template2 = Handlebars.compile(source2);
    var string = template(data);
    var string2 = template2({func:'Results', object:JSON.stringify(results),});
    var target = document.getElementById('columnCenter');
    var spinner = new Spinner(opts).stop(target);

    if(results.length > 0){
        $thumbnailswrapper.append(string);
    }
    else{
        $("#columnCenter").text("Sorry, there are no businesses to display.");
    }

    if (opt_total > 20) {
        $buttonRow = $('<div class="buttonRow"></div>');

        if (opt_int >= 20) {
            $see_prev = $('<button class="btn" value="Previous 20" name="prevButton">Previous 20</button>');
            $see_prev.click(function() {
                searchYelp(opt_term, opt_location, opt_cat, opt_int-20);
            });
            $buttonRow.append($see_prev);
        }
        if (opt_int + 20 <= opt_total) {
            $see_all = $('<button class="btn" value="Next 20" name="nextButton">Next 20</button>');
            $see_all.click(function() {
                searchYelp(opt_term, opt_location, opt_cat, opt_int + 20);
            });
            $buttonRow.append($see_all);
        }
        $thumbnailswrapper.append($buttonRow);
    }
    $('.columnRight').empty();
    $('.columnRight').append(string2);
    $('.columnCenter').append($thumbnailswrapper);
    window.scroll();
};

/*
* Takes in the results and appends them to the thumbnails grids
*/
var browseBookmarks = function (results, opt_int) {
    $('.columnCenter').empty();
    var target = document.getElementById('columnCenter');
    var spinner = new Spinner(opts).spin(target);
    $thumbnailswrapper = $('<ul class="thumbnails"></ul>');
    $buttonRow = $('<div class="buttonRow"></div>');
    var data = [];
    var image_url;
    if (results.length >=20) {
        for (var i = opt_int; i < opt_int + 20; i ++) {
            if(results[i].image_url) {
                image_url = results[i].image_url;
            } else {
                image_url = 'http://s3-media3.ak.yelpcdn.com/assets/2/www/img/305e17fe6ed8/gfx/blank_biz_medium_sq.png';
            }
            $button = $('<button>Favorite</button>');
            data.push({
                name:results[i].name,
                image:image_url,
                quote:results[i].snippet_text,
                ratingImage:results[i].rating_img_url,
                tags:results[i].tags,
                object:JSON.stringify(results[i]),
                url:results[i].url,
                notes:results[i].notes,                
                n:i.toString(),
                views:results[i].review_count,
                distance:results[i].distance,
                address:results[i].location.display_address[0] +" " + results[i].location.display_address[1]+" "+ results[i].location.display_address[2]

            });
        }
    } else {
        for (var i = opt_int; i < results.length; i ++) {
            if(results[i].image_url) {
                image_url = results[i].image_url;
            } else {
                image_url = 'http://s3-media3.ak.yelpcdn.com/assets/2/www/img/305e17fe6ed8/gfx/blank_biz_medium_sq.png';
            }
            $button = $('<button>Favorite</button>');
            data.push({
                name:results[i].name,
                image:image_url,
                quote:results[i].snippet_text,
                ratingImage:results[i].rating_img_url,
                tags:results[i].tags,
                url:results[i].url,
                n:i.toString(),
                notes:results[i].notes,
                object:JSON.stringify(results[i]),
                views:results[i].review_count,
                distance:results[i].distance,
                address:results[i].location.display_address[0] +" " + results[i].location.display_address[1]+" " + results[i].location.display_address[2]
            });
        }
    }
     var source2 = $('#radial').html();
    var template2 = Handlebars.compile(source2);
    var string2 = template2({func:'Favorites', object:JSON.stringify(results)});
    
    
    var source = $('#browse').html();
    var template = Handlebars.compile(source);
    var string = template(data);
    spinner.stop();

    if(results.length > 0){
        $thumbnailswrapper.append(string);
    }
    else{
        $("#columnCenter").text("There are no favorites to display!");
    }

    if (data.length >= 20) {
        if (opt_int >= 20) {
            $see_prev = $('<button class="btn" value="Previous" name="nextButton">Previous 20</button>');
            $see_prev.click(function() {
                addQuery(results, opt_int-1);
            });
            $buttonRow.append($see_prev);
        }
        if (opt_int + 20 <= data.length) {
            $see_all = $('<button class="btn" value="Next" name="prevButton">Next 20</button>');
            $see_all.click(function() {
                addQuery(results, opt_int + 20);
            });
            $buttonRow.append($see_all);
        }
    }
    var source1 = $('#filts').html();
    var template1 = Handlebars.compile(source1);
    var string1 = template1({funcname:'filterFavorites', results:JSON.stringify(results)});
    $('.columnRight').empty();
    $('.columnRight').append(string2);
    $('.columnRight').append(string1);
    $thumbnailswrapper.append($buttonRow);
    $('.columnCenter').append($thumbnailswrapper);
    $('#pop').popover();
};

/*
* Function to send the bookmarks to the backend
*/
var saveFavorite = function (jsonString, tags1, notes1) {
    var object1 = jsonString;
    saveBookmark(object1, tags1, notes1);
};



var parseYelpCategories = function (term, location, categories) {

    var categories_wrapper = '<div class="accordion" id="categories">';
    
    var missing_identifiers = 
    {
    	"Active Life" : "active",
    	"Diving" : "diving",
    	"Fitness & Instruction" : "fitness",
    	"Parks" : "parks",
	    "Arts & Entertainment" : "arts",
	    "Festivals" : "festivals",
	    "Automotive" : "auto",
	    "Beauty and Spas" : "beautysvc",
	    "Hair Removal" : "hairremoval",
	    "Hair Salons" : "hair",
	    "Bicycles" : "bicycles",
	    "Education" : "education",
	    "Specialty Schools" : "specialtyschools",
	    "Event Planning & Services" : "eventservices",
	    "Photographers" : "photographers",
	    "Financial Services" : "financialservices",
	    "Food" : "food",
	    "Specialty Food" : "gourmet",	    
	    "Health and Medical" : "health",
	    "Dentists" : "dentists",
	    "Diagnostic Services" : "diagnostics",
	    "Doctors" : "physicians",
	    "Medical Centers" : "medcenters",
	    "Home Services"  : "homeservices",
	    "Hotels & Travel" : "hotelstravel",
	    "Transportaion" : "transport",
	    "Local Flavor" : "localflavor",
	    "Local Services" : "localservices",
	    "IT Services & Computer Repair" : "itservices",
	    "Mass Media" : "massmedia",
	    "Nightlife" : "nightlife",
	    "Bars" : "bars",
	    "Pets" : "pets",
	    "Pet Services" : "petservices",
	    "Professional Services" : "professional",
	    "Lawyers" : "lawyers",
	    "Public Services & Government" : "publicservicesgovt",
	    "Real Estate" : "realestate",
	    "Religious Organizations" : "religiousorgs",
	    "Restaurants" : "restaurants",
	    "African" : "african",
	    "Caribbean" : "caribbean",
	    "Chinese" : "chinese",
	    "Italian" : "italian",
	    "Japanese" : "japanese",
	    "Latin American" : "latin",
	    "Malaysian" : "malaysian",
	    "Middle Eastern" : "mideastern",
	    "Polish" : "polish",
	    "Spanish" : "spanish",
	    "Shopping" : "shopping",
	    "Arts & Crafts" : "artsandcrafts",
	    "Books, Mags, Music and Video" : "media",
	    "Fashion" : "fashion",
	    "Flowers & Gifts" : "flowers",
	    "Home & Garden" : "homeandgarden",
	    "Sporting Goods" : "sportgoods"
	   };
    
    
    for (var i in categories)
    {
        var genCategory = i;
        var genCategoryTag = missing_identifiers[i];
        categories_wrapper = categories_wrapper + '<div class="accordion-group" id="' + genCategoryTag + '">';
        categories_wrapper = categories_wrapper + '<div class="accordion-heading" onclick="searchYelp(';
        categories_wrapper = categories_wrapper + "'" + term + "'";
        categories_wrapper = categories_wrapper + ', ';
        categories_wrapper = categories_wrapper + "'" + location + "'";
        categories_wrapper = categories_wrapper + ', ';
        categories_wrapper = categories_wrapper + "'" + genCategoryTag + "'";
        categories_wrapper = categories_wrapper + ');">';
//         onclick="searchYelp(' + term + ', ' + location + ', \"' + genCategoryTag + '\");"

        categories_wrapper = categories_wrapper + '<a class="accordion-toggle"  data-parent="#' + genCategoryTag + '">';
        categories_wrapper = categories_wrapper + genCategory;
        categories_wrapper = categories_wrapper + '</a>';
        categories_wrapper = categories_wrapper + '</div>';
        categories_wrapper = categories_wrapper + '<div id="sub' + genCategoryTag + '" class="accordion-body collapse">';
        categories_wrapper = categories_wrapper + '<div class="accordion-inner">';

        for (var j in categories[i])
        {
            var subCategory = j;
            var subCategoryTag = categories[i][j];
            if (typeof categories[i][j] != "string")
            {
                subCategoryTag = missing_identifiers[j];
            }

            categories_wrapper = categories_wrapper + '<div class="accordion-group">';
            categories_wrapper = categories_wrapper + '<div class="accordion-heading"  onclick="searchYelp(';
        	categories_wrapper = categories_wrapper + "'" + term + "'";
        	categories_wrapper = categories_wrapper + ', ';
        	categories_wrapper = categories_wrapper + "'" + location + "'";
        	categories_wrapper = categories_wrapper + ', ';
        	categories_wrapper = categories_wrapper + "'" + genCategoryTag; 
        	categories_wrapper = categories_wrapper + ", ";
        	categories_wrapper = categories_wrapper + subCategoryTag;
        	categories_wrapper = categories_wrapper +"'";
        	categories_wrapper = categories_wrapper + ');">';
//             onclick="searchYelp(' + term + ', ' + location + ', "' + genCategoryTag + ', ' + subCategoryTag + '");"
            categories_wrapper = categories_wrapper + '<a class="accordion-toggle" data-toggle="collapse" data-parent="#' + subCategoryTag + '" ';

            if (typeof categories[i][j] != "string")
            {
                categories_wrapper = categories_wrapper + 'href ="#sub' + subCategoryTag +  '" ';
            }

            categories_wrapper = categories_wrapper + '>';

            categories_wrapper = categories_wrapper + subCategory;
            categories_wrapper = categories_wrapper + '</a>';
            categories_wrapper = categories_wrapper + '</div>';

            if (typeof categories[i][j] != "string")
            {
                categories_wrapper = categories_wrapper + '<div id="sub'+ subCategoryTag + '" class="accordion-body collapse">';
                categories_wrapper = categories_wrapper + '<div class="accordion-inner" style="margin-left:1em; margin-right:1em">';

                for (var k in categories[i][j])
                {
                    var subSubCategory = k;
                    var subSubCategoryTag = categories[i][j][k];

 
                    categories_wrapper = categories_wrapper + '<div class="accordion-group">';
            		categories_wrapper = categories_wrapper + '<div class="accordion-heading"  onclick="searchYelp(';
        			categories_wrapper = categories_wrapper + "'" + term + "'";
        			categories_wrapper = categories_wrapper + ', ';
        			categories_wrapper = categories_wrapper + "'" + location + "'";
        			categories_wrapper = categories_wrapper + ', ';
        			categories_wrapper = categories_wrapper + "'" + genCategoryTag; 
        			categories_wrapper = categories_wrapper + ", ";
        			categories_wrapper = categories_wrapper + subCategoryTag;
        			categories_wrapper = categories_wrapper + ", ";
        			categories_wrapper = categories_wrapper + subSubCategoryTag;
        			categories_wrapper = categories_wrapper +"'";
        			categories_wrapper = categories_wrapper + ');">';
//  onclick="searchYelp(' + term + ', ' + location + ', "' + genCategoryTag + ', ' + subCategoryTag + ', ' + subSubCategoryTag + '");"               

                    categories_wrapper = categories_wrapper + '<a class="accordion-toggle">';
                    categories_wrapper = categories_wrapper + subSubCategory;
                    categories_wrapper = categories_wrapper + '</a>';
                    categories_wrapper = categories_wrapper + '</div>';
                    categories_wrapper = categories_wrapper + '</div>';
                }

                categories_wrapper = categories_wrapper + '</div>';
                categories_wrapper = categories_wrapper + '</div>';
            }
            categories_wrapper = categories_wrapper + '</div>';
        }

        categories_wrapper = categories_wrapper + '</div>';
        categories_wrapper = categories_wrapper + '</div>';
        categories_wrapper = categories_wrapper + '</div>';
    }
    categories_wrapper = categories_wrapper + "</div>";
    console.log(categories_wrapper);
    $('.columnLeft').append(categories_wrapper);
};