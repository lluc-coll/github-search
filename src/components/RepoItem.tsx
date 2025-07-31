import type { Repo } from "../types/Repo";
import { Star, GitFork, Circle, Calendar } from "lucide-react"
import { Colors } from "../assets/githubLanguageColors.json";

interface Props {
  repo: Repo;
}

export default function RepoItem({ repo }: Props) {
    const getLanguageColor = (language: string | null) => {
    if (!language || !Colors[language as keyof typeof Colors]) {
      return "#000000"; // Default color for unknown languages
    }
    return Colors[language as keyof typeof Colors];
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:underline truncate"
            >
              {repo.name}
            </a>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border">
              {repo.visibility}
            </span>
          </div>

          {repo.description && <p className="text-gray-600 text-sm mb-3 line-clamp-2">{repo.description}</p>}

          <div className="flex items-center gap-4 text-sm text-gray-600">
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
              <span>Updated {new Date(repo.updated_at).toLocaleDateString("en-GB")}</span>
            </div>
          </div>
        </div>
        {/* make graph with commits */}
      </div>
    </div>
  );
}
