/*
 * Takes in the results and appends them to the thumbnails grids
 */
var addQuery = function (results, opt_int) {
  $('.thumbnails').empty();
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
        ratingImage:results[i].rating_img_url_small,
        tags:'',
        button:'Favorite',//$button,
      });
    }  

  }
  var source = $('#results').html();
  var template = Handlebars.compile(source);
  var string = template(data);
  $('.thumbnails').append(string);
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
