/*

Queries Yelp Business and Search APIs and calls provided callback on success.

*/
//search_type can either be search or business
function query_yelp(query, search_type, callback, error){
var auth = { 
  //
  // Update with your auth tokens.
  //
  consumerKey: "RmwZbuexNTnUu0pCAzcXuQ", 
  consumerSecret: "3S6D6qH4K-hoBvMc6eQL22EjORg",
  accessToken: "JAazeyDhcErQlEMSBZqpOHCFF4mixIec",
  accessTokenSecret: "bEf62xhBTl1KoLYz6or-lRgGG_g",
  serviceProvider: { 
    signatureMethod: "HMAC-SHA1"
  }
};


var accessor = {
  consumerSecret: auth.consumerSecret,
  tokenSecret: auth.accessTokenSecret
};


var parameters = [];
parameters.push(['term', query.terms]);
parameters.push(['location', query.near]);
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

var Action = { 
    search: 0,
    business: 1        
};

var message = {};

/**If the search type is business, query.id must be provided */
if(search_type === Action.search){
    message = { 
      'action': 'http://api.yelp.com/v2/search',
      'method': 'GET',
      'parameters': parameters 
    };
}else if(search_type === Action.business){
    message = { 
      'action': 'http://api.yelp.com/v2/business/' + query.id ,
      'method': 'GET',
      'parameters': parameters 
    };
}

OAuth.setTimestampAndNonce(message);
OAuth.SignatureMethod.sign(message, accessor);

var parameterMap = OAuth.getParameterMap(message.parameters);
parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
console.log(parameterMap);

$.ajax({
  'url': message.action,
  'data': parameterMap,
  'cache': true,
  'dataType': 'jsonp',
  'jsonpCallback': 'cb',
  'success': callback,
  'error': error
});
}