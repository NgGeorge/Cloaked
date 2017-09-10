$(document).ready(function() {
  // TODO : Traverse the DOM BFS, once you reach the innermost child then start working backwards
  // call the spoiler replace function on each child.

  // TODO : Put this in a function that takes an element as an argument
  var elements = $('*'); // Change this to just grab the given element passed in as an argument
  elements.each(
    var className = $(this).attr("class").toLower();
    var id = $(this).attr("id").toLower();
    if (className == 'destiny' || id == 'destiny' || $(this).text().toLower().includes('destiny')) {
      $(this).replaceWith(//original element minus any inner content);
      $(this) // style stuff we can put in
    }
  );
});

