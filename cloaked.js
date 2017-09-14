var spoilerList = { 'spoilerItem': ['destiny', 'warlock', 'hunter', 'titan', 'bungie']};

// Listeners to listen when the page loads
$(function () {
//    updateListView();
    searchForSpoilers();
    checkTitle();

    // Submit Button onclick adds item in input to list
    $('#submit-button').click(function (evt) {
        itemToAdd = $('#block-item').val().toLowerCase();
        spoilerList['spoilerItem'].push(itemToAdd);
        saveSpoilerList();
        $('#block-item').val('');
        updateListView();
        searchForSpoilers();
    });

    if (window.location.href.indexOf("facebook") > -1) {

      var feed = $('[id^=topnews_main_stream_]').get(0);
      var page = $('[id^=pagelet_timeline]').get(0);

      // For Facebook Feeds
      // New up an observer, and tell it what to do when it successfully observes.
      // Necessary for Facebooks "neverending" scrolling
      var observer = new MutationObserver(function (mutations, observer) {
          // fired when a mutation occurs

          if (feed) {
            blockFacebookSpoilers("[id^=hyperfeed_story_id_]");
          } else {
            blockFacebookSpoilers("[class^=_4-u2]");
          }
      });

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



/* Handles showing the list of terms in the extention popup
function updateListView() {
    if (spoilerList["spoilerItem"] != null) {
        $('#listView').empty();
        var html = '<ul>';
        for (var i = 0; i < spoilerList['spoilerItem'].length; i++) {
            html += '<li><a class="spoilerListItem" href="#">' + spoilerList['spoilerItem'][i] + '</a></li>';
        }
        html += '</ul>';
        $('#listView').append(html);
    }
}
*/

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
    //github.com/NgGeorge/Cloaked/issues/9/ "default_popup": "popup.html",
