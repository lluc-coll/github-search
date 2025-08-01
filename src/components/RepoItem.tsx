import type { Repo } from "../types/Repo";
import { Star, GitFork, Circle, Calendar } from "lucide-react";
import { Colors } from "../assets/githubLanguageColors.json";
import CommitsChart from "./CommitsChart";
import { useState } from "react";

interface Props {
  repo: Repo;
}

// This component displays a single repository item with its details and an optional commit graph.
// It includes the repository name, description, language, stars, forks, last updated date,
// and a button to toggle the visibility of the commit graph.
export default function RepoItem({ repo }: Props) {
  const [showGraph, setShowGraph] = useState(false); // State to control the visibility of the commit graph

  // Uses github colorCodes to get the color for the repository language.
  const getLanguageColor = (language: string | null) => {
    if (!language || !Colors[language as keyof typeof Colors]) {
      return "#000000";
    }
    return Colors[language as keyof typeof Colors];
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:underline truncate max-w-xs md:max-w-none"
            >
              {repo.name}
            </a>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
              {repo.visibility}
            </span>
          </div>

          {repo.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2 break-words">
              {repo.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
            {repo.language && (
              <div className="flex items-center gap-1">
                <Circle
                  className="w-3 h-3"
                  fill={getLanguageColor(repo.language)}
                  color={getLanguageColor(repo.language)}
                />
                <span>{repo.language}</span>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{repo.stargazers_count.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              <span>{repo.forks_count.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                Updated {new Date(repo.updated_at).toLocaleDateString("en-GB")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 flex flex-col items-end gap-2">
          {!showGraph && (
            <button
              className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 w-full md:w-auto"
              onClick={() => setShowGraph(true)}
            >
              Show Commit Graph
            </button>
          )}
          {showGraph && (
            <div className="w-full md:w-64">
              <CommitsChart login={repo.owner.login} repo={repo} fetch={showGraph} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
