// Fetch user data from GitHub API
async function fetchUserData(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

// Fetch user repos from GitHub API
async function fetchUserRepos(username) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

// Render user data
async function renderUserData(username) {
  const userData = await fetchUserData(username);
  const { name, bio, avatar_url, html_url } = userData;

  // Update header
  document.querySelector("header h1").textContent = name;

  // Update bio section
  document.querySelector("#bio img").setAttribute("src", avatar_url);
  document.querySelector("#bio h2").textContent = name;
  document.querySelector("#bio p").textContent = bio;

  // Add link to GitHub profile
  const link = document.createElement("a");
  link.setAttribute("href", html_url);
  link.setAttribute("target", "_blank");
  link.textContent = "View profile";
  document.querySelector("#bio").appendChild(link);
}

// Render user repos
async function renderUserRepos(username) {
  const repos = await fetchUserRepos(username);
  const repoList = document.querySelector("#repo-list");

  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort repos by star count
    .slice(0, 6) // Limit to top 6
    .forEach((repo) => {
      const { name, description, stargazers_count, html_url } = repo;
      const repoElement = document.createElement("div");
      repoElement.classList.add("repo");
      repoElement.innerHTML = `
                <h3>${name}</h3>
                <p>${description ? description : ""}</p>
                <a href="${html_url}" target="_blank">View<i class="fas fa-external-link-alt"></i></a>
                <span><i class="far fa-star"></i> ${stargazers_count}</span>
            `;
      repoList.appendChild(repoElement);
    });
}

// Call functions to render user data and repos
const username = "AzPerez";
renderUserData(username);
renderUserRepos(username);
