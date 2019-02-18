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

//click event function arrow
function backButton() {
  showPage("home");
  console.log(backButton);
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

// Random Key

function appendMovies(movies) {
  let htmlTemplate = "";
  let movie = movies[Math.floor(Math.random()*movies.length)]; {
    console.log(movie);
    htmlTemplate += `
    <article>
      <img class="featuredimg" src="${getFeaturedImageUrl(movie)}">
      <h2>${movie.title.rendered}</h2>
      <div class="line"></div>
      <p>${movie.content.rendered}</p>
    </article>
    `;
  }
  document.querySelector("#movies").innerHTML = htmlTemplate;
  showPage("result");
}

//scroll wheel skal implementeres ordenligt
instance = movies-dropdown.scroller('#demo', {
    rows: 10,
    wheels: [
        [{
            circular: false,
            data: fromValues,
            label: 'From'
        },
      ]
    ],
    showLabel: true,
    minWidth: 130,
    cssClass: 'md-daterange',
    validate: function (event, inst) {
        var i,
            values = event.values,
            disabledValues = [];

        for (i = 0; i < toValues.length; ++i) {
            if (toValues[i] <= values[0]) {
                disabledValues.push(toValues[i]);
            }
        }

        return {
            disabled: [
                [], disabledValues
            ]
        }
    },
    formatValue: function (data) {
        return data[0] + ' - ' + data[1];
    },
    parseValue: function (valueText) {
        if (valueText) {
            return valueText.replace(/\s/gi, '').split('-');
        }
        return [1990, 2010];
    }
});
