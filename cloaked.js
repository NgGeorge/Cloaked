document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.executeScript(null,
      {code:"var elements = document.querySelectorAll('h2');for (var i = 0; i < elements.length; i++) {elements[i].innerHTML = 'TEST';console.log('test');}"});

});


