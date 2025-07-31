import { useState } from "react";
import SearchForm from "./components/SearchForm";
import { fetchUserRepos } from "./services/githubApi";
import type { Repo } from "./types/Repo";
import RepoItem from "./components/RepoItem";

export default function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");

  const handleSearch = async (username: string) => {
    setLoading(true);
    setUser("");
    try {
      const data = await fetchUserRepos(username);
      setRepos(data);
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

        <SearchForm onSearch={handleSearch} />

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        )}

        {/*user && <UserProfile user={user} />*/}

        {repos.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Repositories ({repos.length})</h2>
              <div className="text-sm text-gray-600">Sorted by recently updated</div>
            </div>

            <div className="space-y-3">
              {repos.map((repo) => (
                <RepoItem key={repo.id} repo={repo} />
              ))}
            </div>
          </div>
        )}

        {/*repos.length === 0 && !loading && !error && user && (
          <div className="text-center py-12">
            <p className="text-gray-500">No public repositories found.</p>
          </div>
        )*/}
      </div>
    </div>
  );
}
