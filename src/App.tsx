import { useState } from "react";
import SearchForm from "./components/SearchForm";
import { fetchUserRepos, fetchUserProfile, searchUser } from "./services/githubApi";
import type { Repo } from "./types/Repo";
import RepoList from "./components/RepoList";
import UserProfile from "./components/UserProfile";
import type { User } from "./types/User";
import type { UserSearch } from "./types/UserSearch";
import UserItems from "./components/UserItems";

export default function App() {
  const [repos, setRepos] = useState<Repo[]>([]); // Current user's repositories
  const [loading, setLoading] = useState(false);  // Loading state for async operations
  const [username, setUsername] = useState(""); // Current username being searched
  const [user, setUser] = useState<User | null>(null); // Current user's profile information
  const [otherUsers, setOtherUsers] = useState<UserSearch[]>([]); // List of other users found in the search

  // Function to handle search input and fetch data
  // It updates the state with the fetched repositories, user profile, and other users
  const handleSearch = async (username: string) => {
    setLoading(true);
    setUsername(username);
    setUser(null);
    setRepos([]);
    setOtherUsers([]);
    try {
      const data = await fetchUserRepos(username);
      setRepos(data);
      const userProfile = await fetchUserProfile(username);
      setUser(userProfile);
      const otherUsersData = await searchUser(username);
      setOtherUsers(otherUsersData.items || []);
      console.log("Other users found:", otherUsers);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">GitHub Repository Search</h1>
          </div>
          <p className="text-gray-600">Search for GitHub users and explore their repositories</p>
        </div>

        <SearchForm currentUser={username} onSearch={handleSearch} />

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        )}

        {user && <UserProfile user={user} />}
        <div className="flex flex-col lg:flex-row gap-6">

          <div className="flex-1">
            {repos.length > 0 && (
              <RepoList repos={repos} />
            )}

            {(!user || repos.length === 0) && otherUsers.length > 0 && (
              <UserItems
                otherUsers={otherUsers}
                onUserSelect={handleSearch}
                sidebar={false} />
            )}

          </div>

          {(user && otherUsers.length > 0 && repos.length > 0) && (
            <UserItems
              otherUsers={otherUsers}
              onUserSelect={handleSearch}
              sidebar={true} />
          )}

        </div>
      </div>
    </div>
  );
}
