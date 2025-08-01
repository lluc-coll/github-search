
const baseUrl = 'https://api.github.com';

/**
 * Search for users on GitHub
 * @param userquery The query string to search for users
 * @returns A promise that resolves to the search results
 */
export const searchUser = async (userquery: string) => {
  const response = await fetch(`${baseUrl}/search/users?q=${userquery}`);
  if (!response.ok) {
    throw new Error('Failed to search user');
  }
  return response.json();
};

/**
 * Fetch a user's profile from GitHub
 * @param username The GitHub username to fetch the profile for
 * @returns A promise that resolves to the user's profile data
 */
export const fetchUserProfile = async (username: string) => {
  const response = await fetch(`${baseUrl}/users/${username}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return response.json();
};

/**
 * Fetch a user's repositories from GitHub
 * @param username The GitHub username to fetch repositories for
 * @returns A promise that resolves to the user's repositories data
 */
export const fetchUserRepos = async (username: string) => {
  const response = await fetch(`${baseUrl}/users/${username}/repos`);
  if (!response.ok) {
    throw new Error('Failed to fetch user repositories');
  }
  return response.json();
};

/**
 * Fetch a repository's commits from GitHub
 * @param owner The owner of the repository
 * @param repo The name of the repository
 * @returns A promise that resolves to the repository's commits data
 */
export const fetchRepoCommits = async (owner: string, repo: string) => {
  const response = await fetch(`${baseUrl}/repos/${owner}/${repo}/commits`);
  if (!response.ok) {
    throw new Error('Failed to fetch repository commits');
  }
  return response.json();
};
