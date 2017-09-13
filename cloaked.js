var spoilerList = { 'spoilerItem': ['destiny', 'warlock', 'hunter', 'titan', 'bungie']};


// Listeners to listen when the page loads
$(function () {
//    updateListView();
    searchForSpoilers();

    // Submit Button onclick adds item in input to list
    $('#submit-button').click(function (evt) {
        itemToAdd = $('#block-item').val().toLowerCase();
        spoilerList['spoilerItem'].push(itemToAdd);
        saveSpoilerList();
        $('#block-item').val('');
        updateListView();
        searchForSpoilers();
    });

    // New up an observer, and tell it what to do when it successfully observes.
    // Necessary for Facebooks "neverending" scrolling
    /* var observer = new MutationObserver(function (mutations, observer) {
        // fired when a mutation occurs
        searchForSpoilers();
    });*/

    // This part establishes what needs to be watched, and starts the watching
    /*observer.observe($('[id^=topnews_main_stream_]').get(0), {
        subtree: true, // watches target and it's descendants
        attributes: true // watches targets attributes
    });*/
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

        searchString = searchString + "p:icontains('" + item + "'), h1:icontains('" + item + "'), h2:icontains('" + item + "'),  h3:icontains('" + item + "'), h4:icontains('" + item + "'),  h5:icontains('" + item + "'), h6:icontains('" + item + "'), li:icontains('" + item + "'), ";
        });
        searchString = searchString.substring(0, searchString.length - 2);
        $(searchString).parent(":not('body')", ":not('head')").css('-webkit-filter', 'blur(5px)');
    }
}


// Case insensitive jquery contains
jQuery.expr[':'].icontains = function(a, i, m) {
    return jQuery(a).text().toUpperCase()
            .indexOf(m[3].toUpperCase()) >= 0;
};
