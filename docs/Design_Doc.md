Title: Yelptastic Design Document  
Author: Varun Ravishankar  
		Jenee Benjamin  
Date: December 10, 2012  
Affiliation: Columbia University  
Email: vr2263@columbia.edu  
       jlb2229@columbia.edu  
Web: varnholm.com/ui/yelptastic/index.html  
     https://github.com/thefeinerthingsfall2012/yelptastic

# <img src="http://i.imgur.com/aIRpe.jpg" height="500px" width="200px" alt="Yelptastic Logo"/> #
## The Feiner Things ##

Jenee Benjamin, jlb2229  
Dan Mercado, dm2497  
Orlando Pineda, omp2114  
Varun Ravishankar, vr2263  

## Purpose

Yelptastic is a web app that allows users to bookmark businesses on Yelp and let them sort, filter, and delete them as well. Yelptastic's code is located on [Github][].

## Overall Process

Our overall process for creating Yelptastic followed a typical design cycle. We first up came up with use scenarios and then used them to create mockups. We iterated over the mockups many times, trying to decide the best way to display bookmarks, search through and add new bookmarks, and display a unified interface for searching and filtering through bookmarks by category, rating, distance, and date added. Once we were satisfied with the mockups, we started programming the site. We broke up the process into two parts, the front-end and the back-end, and the group split up to work on each part. We would sync up our work when one group member completed a part, and finish integrating that portion on the site. Throughout the process, we looked through the site and evaluated our design decisions to better improve the user experience. We altered our search boxes to resolve consistency issues between other forms on the web and ours, worked on adding spacing to improve readability, and to improve our error handling. To sum up, we went through the following process:

* Brainstorming
* Use Scenarios
* Look over feedback on use scenarios
* Start looking at different ways to visualize search results
* Create Yelptastic mockups
* Get feedback on Yelptastic mockups and iterate
* Program Yelptastic
* Test site and look for design issues


## Roles and Responsibilities ##

We split the project into two parts: the back-end, which was concerned with querying the Yelp API and parsing the results, and the front-end, which took the data from the back-end and displayed it to the user.

Orlando and Dan worked on the front-end, while Jenee and Varun worked on the back-end. Varun worked on querying the Yelp API and writing functions to deal with geolocation, while Jenee worked on adding the API results to localstorage.

## Target Users ##

We are targeting young adults, 18-25 year olds with our application. These young adults  are comfortable using technology and may or may not be in college. They live in urban and suburban areas and are surrounded by a variety of restaurants and businesses. They utilize Yelp Favorites to make it easier for them to find good places to eat and to keep tabs on the businesses. They like to use the tags and notes features so that they can make note of and identify unique characteristics of establishments that they have favored. They also use these features to help them better organize their favorites. Because the number of favorites a user can have is unlimited, users can search through their favorites and have the options of filtering by category, distance, and rating and/or sorting by distance, date added, and rating.

### Personas: ###

**Greg** is a 17 year old college freshman who recently entered a relationship with his girlfriend Gina. He is majoring in Computer Science and minoring in mathematics so that he could find a steady career and support himself in the future. As a busy college student, Greg does not have time to cook, and goes out to eat at restaurants often with his girlfriend. Greg has a Yelp account and uses it to find good restaurants in New York City. Once he finds an affordable restaurant that he likes, he goes onto Yelp and adds that restaurant to his favorites with a little note about what made his experience at the restaurant a good one. Greg tries many different restaurants and tends to lose track of restaurants that he adds to his favorites. The new Yelp Favorites application helps him organize them and allows him to quickly add new businesses and delete businesses that he no longer likes or that no longer exist.

**Steve** is a 21-year-old college student, trying to graduate with a degree in creative writing with the least amount of work possible. Steve loves partying with his frat brothers, but his friends have stopped funding his party animal antics after he puked on the couch and left without cleaning it up. Steve is low on money now and can’t afford to dine out or buy beer. As a result, Steve is using Yelp often to the cheapest restaurants- Chinese food restaurants, pizza places, etc.- that will deliver to his area. He then adds these businesses to his favorites for future reference so that he can simply go to his favorites and get the information for those places easily.

### Use Cases: ###

#### Scenario One: ####

Greg wants to take Gina out for their one-month anniversary. He is planning on having dinner in the area he lives near- Times Square- and then walking around the area and visiting attractions. He first needs to find a restaurant that is open late at night and that is reasonably priced. To find a place to eat that he knows is good, Greg visits the Yelp site and goes to his favorites. Once he is on the Favorites homepage, he types “restaurants” in the search box and “Times Square”  in the location box.  He filters his results by price, by selecting “Price” title, and looks at his results with his budget in mind. He reads a note that he left for Red Lobster previously which says that the service there was amazing. With its affordable price and good notes, Red Lobster is Greg’s ideal choice of restaurant and he decides to take Gina there.

In addition, Greg wants to look up the common tourist attractions to take Jane to after dinner. Greg goes back to his Favorites homepage and selects the “Arts and Entertainment” category. He looks through his favorites which fall under the “Arts and Entertainment” category, and filters the results by price. He then sorts those results by location to see the closest attractions to his current location.  He chooses the Pop-Tarts World Cafe, which he had previously visited; however, he notices that the establishment is no longer in business. He decides to delete the favorite so that it no longer shows up, in order to prevent it from showing up in future planning. He then looks through his results again and plans to bring Gina to the M&M store after dinner.

#### Scenario Two: ####

Steve can no longer afford to dine out or buy beer and must adapt his party animal lifestyle to his new budget. However, Steve will not sacrifice his beer so he decides he needs to find cheaper pizza places to buy food from or risk not being able to afford his Keystone Light. Steve types pizza into the search box and enters his zip code "10025" as his location. Steve looks through the list of nearby pizza places and adds to his favorites pizza places with good ratings. As he adds each business to his favorites, Steve add tags the “cheap_pizza” tag to the pizza places. He does this by typing the tag in the popup dialog box that appears once he clicks “Add Favorite” for that particular restaurant, and then he saves it. After Steve has added shops to his favorites, he goes to his favorites homepage, searches through them by the pizza tag, and sorts the results by price. Steve finds the cheapest pizza place and chooses that one. He sees restaurant's phone number there, and places a call to order a large pie with anchovies.

## Design Decisions ##

The first major design decision we made was to target a younger, more technologically-savvy demographic. This group of users would be familiar with review sites like Yelp, and would be used to searching for businesses online to find interesting restaurants or shops. This meant that we could remain consistent with Yelp's look and feel for each result and depend on the user to know what iconography and basic terminology meant.

We made major design decisions when creating our mockups. Our first mockups and initial thoughts when writing the use scenarios involved lists of items that could be filtered and searched through, with a search bar at the top and a filter box similar to Amazon's filters on the right. Categories would be displayed in a grid. When a user clicked on a category, they would be taken to another grid of subcategories. For businesses with a category that was two or three tiers down (such as Restaurants > Chinese > Dim Sum), the user would need to click through two categories to see their actual result, and the user would need to click on the back button to go back and browse through another category. We decided that this option did not offer the user much *user control*, and so decided against the grid approach. We also decided against combining this view with a list view, as too many views would simply confuse the user and would not offer much *consistency*.

## Prototyping and Testing Process ##

## Software Engineering ##

Yelptastic is written in HTML, CSS, and Javascript. It uses many HTML5 features, like Local Storage, Geolocation, and the History API. Open-source components used in Yelptastic include:

* [jQuery](http://jquery.com)
* [underscore.js](http://underscorejs.org)
* [Bootstrap](http://twitter.github.com/bootstrap/)
* [Handlebars.js](http://handlebarsjs.com)
* [ouath](http://oauth.googlecode.com)

Tools we used include:

* [Github](http://github.com)
* [Cloud9](https://c9.io)

All code for Yelptastic can be found on our team's [Github][] repository.

[Github]: https://github.com/thefeinerthingsfall2012/yelptastic