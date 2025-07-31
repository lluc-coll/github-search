
const baseUrl = 'https://api.github.com';

export const searchUser = async (userquery: string) => {
  const response = await fetch(`${baseUrl}/search/users?q=${userquery}`);
  if (!response.ok) {
    throw new Error('Failed to search user');
  }
  return response.json();
};

export const fetchUserProfile = async (username: string) => {
  const response = await fetch(`${baseUrl}/users/${username}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }
  return response.json();
};

export const fetchUserRepos = async (username: string) => {
  const response = await fetch(`${baseUrl}/users/${username}/repos`);
  if (!response.ok) {
    throw new Error('Failed to fetch user repositories');
  }
  return response.json();
};
