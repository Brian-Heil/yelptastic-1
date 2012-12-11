var Action = {
    search: 0,
    business: 1
};
/*

Queries Yelp Business and Search APIs and calls provided callback on success.

search_type can either be search or business

*/
var queryYelp = function(query, search_type, callback, error, opt_term, opt_location, opt_cat, opt_offset) {
    var auth = {
        //
        // Update with your auth tokens.
       //
        consumerKey: 'S7blEgVAa7LxkozuxW_zvA',
        consumerSecret: '-fPZ-78sOnReB8baHgmuL96b5Wk',
        accessToken: "2hz5QMNGA78FZU7EnlP4dRtcqxCWnL6Y",
        accessTokenSecret: "bSFYHpEEmsuvqO2kAepwC2SSYbQ",
        serviceProvider: {
            signatureMethod: "HMAC-SHA1"
        }
    };


    var accessor = {
        consumerSecret: auth.consumerSecret,
        tokenSecret: auth.accessTokenSecret
    };


    var parameters = [];
    parameters.push(['term', query.term]);
    parameters.push(['location', query.location]);
    console.log(query.categories);
    parameters.push(['category_filter', query.categories]);
    parameters.push(['offset', query.offset]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    var message = {};

    /**If the search type is business, query.id must be provided */
    if (search_type === Action.search) {
        message = {
            'action': 'http://api.yelp.com/v2/search',
            'method': 'GET',
            'parameters': parameters
        };
    }

    else if (search_type === Action.business) {
        message = {
            'action': 'http://api.yelp.com/v2/business/' + query.id,
            'method': 'GET',
            'parameters': parameters
        };
    }

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    var parameterMap = OAuth.getParameterMap(message.parameters);
    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
    var check = $.ajax({
        'url': message.action,
        'data': parameterMap,
        'cache': true,
        'timeout':3000,
        'dataType': 'jsonp',
        'jsonpCallback': 'cb',
        'success':function (response){
          onSearchSuccess(response, opt_term, opt_location, opt_cat, opt_offset);
        }
    });
    check.success(function() {
      console.log('Yes! Success!');
    });

    check.error(function() {
       history.pushState({}, 'Yelptastic- Error', '#Error');
       $('body').empty();
       $('body').append('<div class="hero-unit">'+
    '<h1>An error occured in connecting with the YELP</h1>' +
  '<p><h3>Please refresh the page and try again.</h3></p>'+
  //'<p>' +
  //  '<a class="btn btn-primary btn-large">'+
    //  'Learn more'+
    //'</a>'+
  //'</p>' +
'</div>');
    $('body').append('<div id="error"><img src="http://cdn.memegenerator.net/instances/400x/31664563.jpg"></div>');
  });
};

/* Utility function to parse JSON and return JS object */
var parseData = function(json){


  //return JSON && JSON.parse(json) || $.parseJSON(json);//JSON && JSON.parse(json) || jQuery.parseJSON(json);
  return jQuery.parseJSON(json);
};

/* Frontend API method to search Yelp with provided query and location. */
var searchQuery = function(term, location, category_filters, offset){
    var query = {};
    query['term'] = term;
    query['location'] = location;
    query['categories'] = category_filters;
    query['offset'] = offset;

    queryYelp(query, Action.search, onSearchSuccess, onSearchError, term, location, category_filters, offset);
};

/* Get JSON object from search API, remove unnecessary fields, and return object. */
var onSearchSuccess = function(json, opt_term, opt_location, opt_cat, opt_offset){
    var obj = json;
    addFavoritesView(obj.businesses, obj.total, opt_term, opt_location, opt_cat, opt_offset);
};

/* Return appropriate Yelp API error. */
var onSearchError = function(json){
    var err = parseData(json);
    console.error("Yelp API error", err);

};
