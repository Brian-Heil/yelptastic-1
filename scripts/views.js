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
 * Browses Favorites
 */
var browseFavorites = function() {
  var current = $('.active1').text();
  //alert("LOL" + current);
  $('.active1').remove();
 // $('body').triggerHandler('Home');
  $('.breadcrumb').append('<li onclick="$(\'body\').triggerHandler('+ '\''+ current + '\''+')"><a href="#' + current +'">' + current + '</a> <span class="divider">/</span><li>');
  $('.breadcrumb').append('<li class="active">' + 'Lookup' +'</li> ');
  history.pushState({}, 'Yelptastic- Browse Favorite', '#bookmarksearch');
  $('.columnCenter').empty();
   var data = new Array({
     title: 'Yelp',
     image_url: 'http://s3-media2.ak.yelpcdn.com/bphoto/7DIHu8a0AHhw-BffrDIxPA/ms.jpg',
     snippet_text: 'Sometimes we ask questions without reading an email thoroughly as many of us did for the last event.  In honor of Yelp, the many questions they kindly...',
    // tags: 'sucky',
     rating_image_url_small:'http://media1.ak.yelpcdn.com/static/201012161694360749/img/ico/stars/stars_3.png',
   },{title: 'cool',
     image_url: 'http://placehold.it/300x200',
     snippet_text: 'this sucks',
    // tags: 'sucky',
     rating_image_url_small: 'http://media3.ak.yelpcdn.com/static/201012161053250406/img/ico/stars/stars_large_3.png',
   },{title: 'cool',
     image_url: 'http://placehold.it/300x200',
     snippet_text: 'this sucks',
    // tags: 'sucky',
     rating_image_url_small: 'http://media3.ak.yelpcdn.com/static/201012161053250406/img/ico/stars/stars_large_3.png',
   },{title: 'cool',
     image_url: 'http://placehold.it/300x200',
     snippet_text: 'this sucks',
    // tags: 'sucky',
     rating_image_url_small: 'http://media3.ak.yelpcdn.com/static/201012161053250406/img/ico/stars/stars_large_3.png',
       });
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
   // $('body').triggerHandler('Home');
    $('.breadcrumb').append('<li onclick="$(\'body\').triggerHandler('+ '\''+ current + '\''+')"><a href="#' + current +'">' + current + '</a> <span class="divider">/</span><li>');
    $('.breadcrumb').append('<li class="active1">' + 'Search' +'</li> ');
    history.pushState({}, 'Yelptastic- Yelp Search', '#yelpsearch');
  }
  $('.columnLeft').empty();
  $('.columnCenter').empty();
   /*var data = new Array({
     title: 'Yelp',
     image_url: 'http://s3-media2.ak.yelpcdn.com/bphoto/7DIHu8a0AHhw-BffrDIxPA/ms.jpg',
     snippet_text: 'Sometimes we ask questions without reading an email thoroughly as many of us did for the last event.  In honor of Yelp, the many questions they kindly...',
    // tags: 'sucky',
     rating_image_url_small:'http://media1.ak.yelpcdn.com/static/201012161694360749/img/ico/stars/stars_3.png',
   },{title: 'cool',
     image_url: 'http://placehold.it/300x200',
     snippet_text: 'this sucks',
    // tags: 'sucky',
     rating_image_url_small: 'http://media3.ak.yelpcdn.com/static/201012161053250406/img/ico/stars/stars_large_3.png',
   },{title: 'cool',
     image_url: 'http://placehold.it/300x200',
     snippet_text: 'this sucks',
    // tags: 'sucky',
     rating_image_url_small: 'http://media3.ak.yelpcdn.com/static/201012161053250406/img/ico/stars/stars_large_3.png',
   },{title: 'cool',
     image_url: 'http://placehold.it/300x200',
     snippet_text: 'this sucks',
    // tags: 'sucky',
     rating_image_url_small: 'http://media3.ak.yelpcdn.com/static/201012161053250406/img/ico/stars/stars_large_3.png',
       });*/
  
    addQuery(data, opt_offset, total, opt_term, opt_location, opt_cat);
    alert(data);
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

      data.push({
        name:results[i].name,
        image:results[i].image_url,
        quote:results[i].snippet_text,
        ratingImage:results[i].rating_img_url,
        tags:'',
        button:'Favorite',
        object:JSON.stringify(results[i]),
      });
    }  
  var source = $('#results').html();
  var template = Handlebars.compile(source);
  var string = template(data);
  $thumbnailswrapper.append(string);
  if (opt_total > 20) {
    $buttonRow = $('<div class="buttonRow"></div>');

    if (opt_int >= 20) {
      alert('Running >');
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
  var data = [];
  if (results.length >=20) {
    for (var i = opt_int; i < opt_int + 20; i ++) {
      $button = $('<button>Favorite</button>');
      alert()
      data.push({
        title:results[i].title,
        image:results[i].image_url,
        quote:results[i].snippet_text,
        ratingImage:results[i].rating_img_url,
        tags:'',
        object:JSON.stringify(results[i]),
      });
    }  
  } else {
    for (var i = opt_int; i < results.length; i ++) {
      $button = $('<button>Favorite</button>');

      data.push({
        title:results[i].title,
        image:results[i].image_url,
        quote:results[i].snippet_text,
        ratingImage:results[i].rating_img_url,
        tags:'',
        object:JSON.stringify(results[i]),
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
      $('.thumbnails').append($see_prev);
      }
    if (opt_int + 20 <= data.length) {
      alert('Running <')
       $see_all = $('<input type="button" value="Next" name="prevButton">');
       $see_all.click(function() {
          addQuery(results, opt_int + 20);
       });
      $('.thumbnails').append($see_all);
    }
  }  
  $buttonRow = $('<div class="buttonRow"></div>');
  $buttonRow.append($see_prev);
  $buttonRow.append($see_all);
  
  $thumbnailswrapper.append($buttonRow);
  $('.columnCenter').append($thumbnailswrapper);
}
/*
 * Function to send the bookmarks to the backend
 */
var saveBookMark = function (jsonString, tags1, notes1) {
  
  var bookmark = {
    object:object1,
    tags:tags1,
    notes:notes1
  }
  alert('Saving tags');
}
