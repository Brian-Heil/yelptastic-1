var addFavoritesView = function() {
  alert('printing');
  alert('length' + history.length);
  history.pushState({}, 'Yelptastic- Yelp Search', document.URL + '/yelpsearch');
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
    addQuery(data, 0);
}


/*
 * Takes in the results and appends them to the thumbnails grids
 */
var addQuery = function (results, opt_int) {
  $('.columnCenter').empty();
  $thumbnailswrapper = $('<ul class="thumbnails"></ul>');  
  var data = [];
  if (results.length >=20) {
    for (var i = opt_int; i < opt_int + 20; i ++) {
      $button = $('<button>Favorite</button>');
      data.push({
        title:results[i].title,
        image:results[i].image_url,
        quote:results[i].snippet_text,
        ratingImage:results[i].rating_img_url_small,
        tags:'',
      });
    }  
  } else {
    for (var i = opt_int; i < results.length; i ++) {
      $button = $('<button>Favorite</button>');

      data.push({
        title:results[i].title,
        image:results[i].image_url,
        quote:results[i].snippet_text,
        ratingImage:results[i].rating_image_url_small,
        tags:'',
        button:'Favorite',
      });
    }  

  }
  var source = $('#results').html();
  var template = Handlebars.compile(source);
  var string = template(data);
        $see_prev = $('<input type="button" value="Previous 20" name="nextButton">');
               $see_all = $('<input type="button" value="Next 20" name="prevButton">');



  $thumbnailswrapper.append(string);
  if (data.length >= 20) {
    if (opt_int >= 20) {
      alert('Running >');
      $see_prev = $('<input type="button" value="Previous 20" name="nextButton">');
      $see_prev.click(function() {
        addQuery(results, opt_int-1);
       });
      $('.thumbnails').append($see_prev);
      }
    if (opt_int + 20 <= data.length) {
      alert('Running <')
       $see_all = $('<input type="button" value="Next 20" name="prevButton">');
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
var saveBookMark = function (id1, title1, tags1, notes1) {
  var bookmark = {
    id:id1,
    title:title1,
    tags:tags1,
    notes:notes1,
  }
}
