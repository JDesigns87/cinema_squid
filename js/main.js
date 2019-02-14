"use strict";

// ---------- default SPA Web App setup ---------- //

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  setActiveTab(pageId);
}

// set default page
function setDefaultPage() {
  let page = "home";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }

  }
}

setDefaultPage();

// ---------- Fetch data from data sources ---------- //

/*
Fetches json data - categories
*/
fetch('http://jdesigns.dk/wordpress/wp-json/wp/v2/categories')
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    appendCategories(json);
  });

/*
Appends categories
*/
function appendCategories(categories) {
  let htmlTemplate = "<select>";
  for (let category of categories) {
    htmlTemplate += `
      <option value="${category.id}">${category.name}</option>
    `;
  }
  htmlTemplate += "</select>";
  document.querySelector("#movies-dropdown").innerHTML += htmlTemplate;
}

// click event function
function randomizeMovies() {
  console.log(randomizeMovies);
  // get dropdown element
  let dropdown = document.querySelector("#movies-dropdown select");
  // get selected option value
  let selectedCategory = dropdown.options[dropdown.selectedIndex].value;
  console.log(selectedCategory);
  // call getMovies with selectedCategory
  getMovies(selectedCategory);

}

function getFeaturedImageUrl(post) {
  let imageUrl = "";
  if (post._embedded['wp:featuredmedia']) {
    imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
  }
  return imageUrl;
}

// get movies or post by given id
function getMovies(id) {
  fetch("http://jdesigns.dk/wordpress/wp-json/wp/v2/posts?_embed&categories=" + id)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      appendMovies(json);
    });
}

function appendMovies(movies) {
  let htmlTemplate = "";
  for (let movie of movies) {
    console.log(movies);
    htmlTemplate += `
    <article>
      <img src="${getFeaturedImageUrl(movie)}">
      <h2>${movie.title.rendered}</h2>
      <p>${movie.content.rendered}</p>
    </article>
    `;
  }
  document.querySelector("#movies").innerHTML += htmlTemplate;
  showPage("result");
}

// append movie functionality

  // to do
