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
  
  searchQuery(term, near, opt_cat, opt_int);
}

/*
 * 
 */
var getBookmarks = function(term) {
  var bookmarks = searchFavorites(term);
  alert('bookmarks length: ' + bookmarks.length);
  browseFavorites(bookmarks);
}

/*
 * Browses Favorites
 */
var browseFavorites = function(data) {
  var current = $('.active1').text();
  alert("LOL: " + current);
  if (current != 'Search'){
    $('.active1').remove();
    $('.breadcrumb').append('<li onclick="$(\'body\').triggerHandler('+ '\''+ current + '\''+')"><a href="#' + current +'">' + current + '</a> <span class="divider">/</span><li>');
    $('.breadcrumb').append('<li class="active1">' + 'Lookup' +'</li> ');
  //  history.pushState({}, 'Yelptastic- Browse Favorite', '#bookmarksearch');
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
  alert("LOL: " + current);
  if (current != 'Search'){
    $('.active1').remove();
    $('.breadcrumb').append('<li onclick="$(\'body\').triggerHandler('+ '\''+ current + '\''+')"><a href="#' + current +'">' + current + '</a> <span class="divider">/</span><li>');
    $('.breadcrumb').append('<li class="active1">' + 'Search' +'</li> ');
  //  history.pushState({}, 'Yelptastic- Yelp Search', '#yelpsearch');
  }
  $('.columnLeft').empty();
  $('.columnCenter').empty();
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
      alert('Running <')
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
      data.push({
        title:results[i].title,
        image:image_url,
        quote:results[i].snippet_text,
        ratingImage:results[i].rating_img_url,
        tags:'',
        url:results[i].url,
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
        title:results[i].title,
        image:image_url,
        quote:results[i].snippet_text,
        ratingImage:results[i].rating_img_url,
        tags:'',
        url:results[i].url,
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
      alert('Running <')
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
  alert("The JSON: " + JSON.stringify(object1));  
  saveBookmark(object1, tags1, notes1);
}
