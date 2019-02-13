"use strict";

fetch("http://jdesigns.dk/wordpress/wp-json/wp/v2/categories")
.then(function(response) {
  return response.json();
})
.then(function(json){
  appendCategories(json);
});


function appendCategories(categories){
  for (let category of catgories) {
    console.log(category);
    document.querySelector("#grid").innerHTML += `
      <h3>${category.name}</h3>
    `;
  }
}
