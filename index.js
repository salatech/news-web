const myPosts = document.querySelector(".blogs");

window.addEventListener("scroll", reveal);

function reveal() {
	var reveals = document.querySelectorAll(".reveal");

	for (var i = 0; i < reveals.length; i++) {
		var windowheight = window.innerHeight;
		var revealtop = reveals[i].getBoundingClientRect().top;
		var revealpoint = 30;

		if (revealtop < windowheight - revealpoint) {
			reveals[i].classList.add("active");
		} else {
			reveals[i].classList.remove("active");
		}
	}
}

const renderPosts = async (term) => {
	let url =
		"https://newsapi.org/v2/everything?q=tesla&from=2024-06-24&sortBy=publishedAt&apiKey=93a6cb717b7c43f6b7b02f85bb999195";
	if (term) {
		url = `https://newsapi.org/v2/everything?q=${term}&from=2024-06-24&sortBy=publishedAt&apiKey=93a6cb717b7c43f6b7b02f85bb999195`;
	}

	const res = await fetch(url);
	const posts = await res.json();
	const results = posts.articles;
	console.log(results);

	let template = "";
	results.forEach((result) => {
		result.author == null
			? " "
			: (template += `
                <div class="post reveal">
                <img src=${result.urlToImage} alt="${result.title}">
                <p class="author"> Author: ${result.author}</p>
                 <p class="title">${result.title}</p>
                 <p class="desc"> ${result.description}</p>
                 <p class="pub">published at : ${result.publishedAt}</p>
                 <a href=${result.url} class="readmore"> Read more>>> </a>
                 </div>
            `);
	});
	myPosts.innerHTML = template;
};

const navLinks = document.querySelectorAll(".main-nav-link");
navLinks.forEach((link) => {
	link.addEventListener("click", (event) => {
		event.preventDefault(); // Prevent the default link behavior
		const ClickTerm = link.getAttribute("data-term");
		renderPosts(ClickTerm);
	});
});

document.getElementById("searchButton").addEventListener("click", () => {
	const searchTerm = document.getElementById("searchInput").value;
	renderPosts(searchTerm);
});

window.addEventListener("DOMContentLoaded", () => renderPosts());
