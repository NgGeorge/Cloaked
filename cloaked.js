(function ($) {
	const SPOILER_LIST = ['destiny', 'warlock', 'hunter', 'titan', 'destiny2']; // Terms to be filtered on
	const FILTER_DELAY = 4; 	// Number of events that can observed before a filter should be applied

    var getEnabledState = function() {
        // TODO: send a message to the event page asking for the state.
        var enabledPort = chrome.runtime.connect({name: "enabled"});
        enabledPort.postMessage({cmd: "getEnabledState"});
        enabledPort.onMessage.addListener(function(msg) {
            return msg;
        });
    }

    // Setup an observer for the given target element
	var setupObserver = function(target, observer) {
		observer.observe(target, {
			subtree: true, // watches target and it's descendants
			attributes: true, // watches targets attributes
		});
	}

	// Create a filter that watches and dynamically filters Facebook
	var filterFacebook = function() { 
		// The target elements to watch for mutation
		var feed = $('[id^=topnews_main_stream_]').get(0);
		var page = $('[id^=pagelet_timeline]').get(0);
		var count = 0; 		// Number of events observed by an observer

		// For Facebook Feeds
		// Creates an observer, and tells it what to do when it successfully observes mutations
		// Necessary for Facebooks "neverending" scrolling
		var observer = new MutationObserver(function (mutations, observer) {
			// fired when a mutation occurs
			count++;
			
			// For user news feed
			if (feed && (count % FILTER_DELAY === 0)) {
				blockFacebookSpoilers("[id^=hyperfeed_story_id_]");
			}

			// For page feeds
			if (page && (count % FILTER_DELAY === 0)) {
				blockFacebookSpoilers("[class^=_4-u2]");
			}

			// Will potentially need to put in a check for _401d feed and _307z posts
		});
		
		// Setup the observers to observe specific targets
		if (feed) {
			setupObserver(feed, observer);
		}

		if (page) {
			setupObserver(page, observer);
		}
			
	}

	// This function applies the censor filters to the page based on the items in the spoiler list.
	var searchForSpoilers = function() {
		if (SPOILER_LIST == null) {
			return null;
		}
		var searchString = '';
		SPOILER_LIST.forEach(function (item) {
			
			searchString = searchString + [
								"p:icontains('" + item + "')", 
								"h1:icontains('" + item + "')", 
								"h2:icontains('" + item + "')", 
								"li:icontains('" + item + "')", 
								"span:icontains('" + item + "')", 
								"img[src*='" + item + "']", 
								"source[src*='" + item + "'], "
							].join(', ');
		});
		searchString = searchString.substring(0, searchString.length - 2);

		// Blur the spoiler's parent (excluding body+head) because it's important to block the spoiler's surrounding terms.
		$(searchString).parent(":not('body')", ":not('head')").css('-webkit-filter', 'blur(5px)').click(function() {
			$(this).css('-webkit-filter', '');
		});
	}

	// searchForSpoilers and blockFacebookSpoilers still need to be refactored into one function
	var blockFacebookSpoilers = function(blockElement) {
		if (SPOILER_LIST == null) {
			return null;
		}
		var searchString = '';
		SPOILER_LIST.forEach(function (item) {
			
			searchString = searchString + "p:icontains('" + item + "'), span:icontains('" + item + "'), ";
		});
		searchString = searchString.substring(0, searchString.length - 2);
		$(searchString).parents(blockElement).css('-webkit-filter', 'blur(5px)');
	}

	// This function checks if the title includes any of the terms, if it does, then it will block all the images and videos on the page - just incase.
	checkTitle = function() {
		var title = $('title').text().toLowerCase();
		for (var i = 0; i < SPOILER_LIST.length; i++) {
			if (title.includes(SPOILER_LIST[i])) {
				$('img, source').parent(":not('body')", ":not('head')").css('-webkit-filter', 'blur(5px)');
				break;
			}
		}
	}

	// Case insensitive jquery contains
	jQuery.expr[':'].icontains = function(element, index, match) {
		return jQuery(element).text().toUpperCase()
		.indexOf(match[3].toUpperCase()) >= 0;
	};

	// Run script
	$(function () {
        

        // TODO: setup the channel first.
        var enabledPort = chrome.runtime.connect({name: "enabled"});
        enabledPort.postMessage({cmd: "getEnabledState"});
        enabledPort.onMessage.addListener(function(msg) {
            // Adds logic to on/off button in popup.html
            $('enabledButton').click(function() {
                console.log("msg: " + msg);
                console.log("!msg: " + !msg);
                enabledPort.postMessage({cmd: "setEnabledState", data: !msg});
            });


            if (msg == true) {
                // Filter through the entire page first
                searchForSpoilers();
                checkTitle();
                
                // Check if the current site is Facebook, then apply a filter that watches the mutating page feed if it is
                if (window.location.href.indexOf("facebook") > -1) {
                    filterFacebook();
                }
            }
        });
	});

}(window.jQuery));
