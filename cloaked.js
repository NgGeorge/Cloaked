$(document).ready(function() {
  
  // TODO : Put this in a function that takes an element as an argument
  var elements = $('*'); // Change this to just grab the given element passed in as an argument
  elements.each( function() {
    var className = $(this).attr("class") !== null ? $(this).attr("class"): '' ;
    var id = $(this).attr("id") !== null ? $(this).attr("id") : '' ;
    if (className == 'Destiny' || id == 'Destiny' || $(this).immediateText().includes('Destiny')) {      
      $(this).text(".................................");
      console.log("REACHED");
    }
  });
});

// jQuery function for returning text in 
$.fn.immediateText = function() {
    return this.contents().not(this.children()).text();
};

// $(document).ready(function() {
  
//   // TODO : Put this in a function that takes an element as an argument
//   var elements = $('*'); // Change this to just grab the given element passed in as an argument
//   elements.each( function() {
//     console.log($(this));

//     var className = $(this).attr("class") !== undefined ? $(this).attr("class").val().toLowerCase() : '' ;
//     console.log("className: " + className);

//     var id = $(this).attr("id") !== undefined ? $(this).attr("id").val().toLowerCase() : '' ;
//     console.log("id: " + id);

//     if (className == 'destiny' || id == 'destiny' || $(this).immediateText().includes('destiny')) {      
//       $(this).swapText();
//     }
//   });
// });

// // jQuery function for returning text in 
// $.fn.immediateText = function() {
//     return this.contents().not(this.children()).text().toLowerCase();
// };
  
//   // jQuery function for returning text in 
// $.fn.swapText = function() {
//     this.contents().not(this.children()).text(".................................");
// };