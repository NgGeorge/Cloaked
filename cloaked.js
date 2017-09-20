var spoilerList = { 'spoilerItem': ['dota', 'warlock', 'hunter', 'titan', 'destiny2']};
var count = 0;

// Listeners to listen when the page loads
$(function () {
//    updateListView();
    searchForSpoilers();
    checkTitle();

    // TODO: refactor the if check to a general if check, then wrap the Facebook-specific code into its own function.

    if (window.location.href.indexOf("facebook") > -1) {

      var feed = $('[id^=topnews_main_stream_]').get(0);
      var page = $('[id^=pagelet_timeline]').get(0);

      // For Facebook Feeds
      // New up an observer, and tell it what to do when it successfully observes.
      // Necessary for Facebooks "neverending" scrolling
      var observer = new MutationObserver(function (mutations, observer) {
          // fired when a mutation occurs
	count++;

        // TODO: 4 is a heuristic; encapsulate
          if (feed && (count % 4 == 0)) {
            blockFacebookSpoilers("[id^=hyperfeed_story_id_]");
          } 
          if (page && (count % 4 == 0)) {
            blockFacebookSpoilers("[class^=_4-u2]");
          }
	// Will need to put in a check for _401d feed and _307z posts
      });

      // TODO: enforce DRY by using a function for these parallel structures (if(feed)... and if(page)...)
      if (feed) {
        observer.observe(feed, {
            subtree: true, // watches target and it's descendants
            attributes: true // watches targets attributes
        });
      }

      // This part establishes what needs to be watched, and starts the watching
      if (page) {
        observer.observe(page, {
            subtree: true, // watches target and it's descendants
            attributes: true // watches targets attributes
        });
      }
    }
});

// Handles searching for spoilers
function searchForSpoilers() {
    if (spoilerList["spoilerItem"] != null) {
        var searchString = '';
        spoilerList["spoilerItem"].forEach(function (item) {

        searchString = searchString + "p:icontains('" + item + "'), h1:icontains('" + item + "'), h2:icontains('" + item + "'), li:icontains('" + item + "'), span:icontains('" + item + "'), img[src*='" + item + "'], source[src*='" + item + "'], ";
        });
        searchString = searchString.substring(0, searchString.length - 2);
        $(searchString).parent(":not('body')", ":not('head')").css('-webkit-filter', 'blur(5px)');
    }
}

function blockFacebookSpoilers(blockElement) {
    if (spoilerList["spoilerItem"] != null) {
        var searchString = '';
        spoilerList["spoilerItem"].forEach(function (item) {

          searchString = searchString + "p:icontains('" + item + "'), span:icontains('" + item + "'), ";
        });
        searchString = searchString.substring(0, searchString.length - 2);
        $(searchString).parents(blockElement).css('-webkit-filter', 'blur(5px)');
    }
}

// This function checks if the title includes any of the terms, if it does, then it will block all the images and videos on the page - just incase.
function checkTitle() {
  var title = $('title').text().toLowerCase();
  for (var i = 0; i < spoilerList['spoilerItem'].length; i++) {
    if (title.includes(spoilerList['spoilerItem'][i])) {
      $('img, source').parent(":not('body')", ":not('head')").css('-webkit-filter', 'blur(5px)');
      break;
    }
  }
}

// Case insensitive jquery contains
jQuery.expr[':'].icontains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
};


