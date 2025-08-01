import { useEffect, useState } from "react";
import type { Repo } from "../types/Repo";
import RepoItem from "./RepoItem";
import { Search } from "lucide-react";


interface Props {
    repos: Repo[];
}

// RepoList component to display a list of repositories with search and filter functionality
// It allows users to search by repository name and filter by programming language
export default function RepoList({ repos }: Props) {
    const [filteredRepos, setFilteredRepos] = useState<Repo[]>(repos); // Initialize with all repos

    const [searchTerm, setSearchTerm] = useState("") // State for search term
    const [selectedLanguage, setSelectedLanguage] = useState("") // State for selected programming language

    const languages = Array.from(new Set(repos.map((repo) => repo.language).filter(Boolean))).sort() // Get unique languages from repos

    // Function to apply search and filter criteria
    const applyFilters = () => {
        let filtered = [...repos]

        if (searchTerm.length > 0) {
            filtered = filtered.filter(
                (repo) =>
                    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (selectedLanguage.length > 0) {
            filtered = filtered.filter((repo) => repo.language === selectedLanguage)
        }

        setFilteredRepos(filtered)
    }

    useEffect(() => {
        applyFilters()
    }, [searchTerm, selectedLanguage])


    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                    Repositories ({filteredRepos.length}
                    {filteredRepos.length !== repos.length ? ` of ${repos.length}` : ""})
                </h2>
                <div className="text-sm text-gray-600">
                    {filteredRepos.length !== repos.length ? "Filtered results" : "All repositories"}
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-[2]">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search repositories..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.currentTarget.value)
                                applyFilters()
                            }}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                        />
                    </div>

                    <div className="relative flex-[1]">
                        <select
                            value={selectedLanguage}
                            onChange={
                                (e) => {
                                    setSelectedLanguage(e.currentTarget.value)
                                    applyFilters()
                                }
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                        >
                            <option value="">All languages</option>
                            {languages.map((lang) => (
                                <option key={lang}>
                                    {lang}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                {filteredRepos.map((repo) => (
                    <RepoItem key={repo.id} repo={repo} />
                ))}
            </div>
        </div >

    );
}
