const blogPosts = Array.from({ length: 100 }, (_, i) => `Blog Post #${i + 1}`);
// let blogPosts = [];
const postsPerPage = 10;
let currentPage = 1;

// Fetch data from API
// async function fetchBlogPosts() {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts"); // Example API
//     const data = await response.json();
//     blogPosts = data.map((post) => post.title); // Adjust mapping as needed
//     currentPage = 1;
//     displayPosts(currentPage);
//     setupPagination();
//     updatePagination();
//   } catch (error) {
//     postsContainer.textContent = "Failed to load posts.";
//     console.error(error);
//   }
// }

// // Call fetch on page load
// fetchBlogPosts();
const postsContainer = document.getElementById("blog-posts-container");
const pageNumbersContainer = document.getElementById("page-numbers");
const prevButton = document.getElementById("prev-btn");
const nextButton = document.getElementById("next-btn");

function displayPosts(page) {
  if (!postsContainer) return;
  postsContainer.innerHTML = "";
  if (blogPosts.length === 0) {
    postsContainer.textContent = "No posts available.";
    return;
  }
  postsContainer.innerHTML = "";
  const start = (page - 1) * postsPerPage;
  const end = start + postsPerPage;
  const postsToDisplay = blogPosts.slice(start, end);
  postsToDisplay.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "blog-post";
    postElement.textContent = post;
    postsContainer.appendChild(postElement);
  });
}
function setupPagination() {
  if (!pageNumbersContainer) return;
  pageNumbersContainer.innerHTML = "";
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  if (totalPages === 0) return;
  pageNumbersContainer.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = i;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      displayPosts(currentPage);
      updatePagination();
    });
    li.appendChild(a);
    pageNumbersContainer.appendChild(li);
  }
}

function updatePagination() {
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  // update active page link
  const pageLinks = pageNumbersContainer.querySelectorAll("a");
  pageLinks.forEach((link, index) => {
    link.classList.toggle("active", index + 1 === currentPage);
  });
  // update button states
  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPosts(currentPage);
    updatePagination();
  }
});
nextButton.addEventListener("click", () => {
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayPosts(currentPage);
    updatePagination();
  }
});

// Initial setup
displayPosts(currentPage);
setupPagination();
updatePagination();
