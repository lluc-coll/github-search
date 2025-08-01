import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  currentUser: string;
  onSearch: (username: string) => void;
}

// Simple search form component, when the search is submitted, it calls the onSearch function with the username.
// CurrentUser is used to maintain the state of the input field if the user changes.
export default function SearchForm({ currentUser, onSearch }: Props) {

  useEffect(() => {
    setUsername(currentUser);
  }, [currentUser]);

  const [username, setUsername] = useState(currentUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-sm"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Search
        </button>
      </form>
    </div>
  );
}
