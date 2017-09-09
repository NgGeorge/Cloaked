window.onload = function () {

    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      
        chrome.tabs.executeScript(tabs[0].id, {code:"console.log('test');"});
    });



  var elements = $('h2');

  for (var i = 0; i < elements.length; i++) {
    elements[i].html('TEST');
  }
}


