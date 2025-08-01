import { useEffect, useState } from "react";
import { fetchRepoCommits } from "../services/githubApi";
import type { Commit } from "../types/Commit";
import type { Repo } from "../types/Repo";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale, // <--- THIS ONE is key!
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface Props {
    login: string;
    repo: Repo;
    fetch: boolean;
}

// This component displays a chart of commits over time for a given repository.
// It fetches commit data from the GitHub API and processes it to display a line chart  
// showing the number of commits per day since the repository was created until today.
// The chart is rendered using the chartjs
export default function CommitsChart({ login, repo, fetch }: Props) {
    const [commits, setCommits] = useState<Commit[]>([]);

    useEffect(() => {
        if (!fetch) return; // Only fetch commits if the fetch prop is true, to reduce unnecessary API calls
        const fetchCommits = async () => {
            const rawData = await fetchRepoCommits(login, repo.name);
            const parsedData: Commit[] = rawData.map((item: any) => ({
                commit: {
                    author: {
                        date: new Date(item.commit.author.date), // Convert string to Date object
                    }
                }
            }));
            setCommits(parsedData);
            console.log("Fetched commits:", parsedData);
        };
        fetchCommits();

    }, [login, repo, fetch]);


    // Group dates by day
    const groupCommitsByDate = (commits: Commit[]) => {
        const counts: Record<string, number> = {};

        const start = new Date(repo.created_at);
        const end = new Date();

        // Start "counts" with all dates from repo creation to today
        while (start <= end) {
            const isoDay = start.toISOString().slice(0, 10);
            counts[isoDay] = 0;
            start.setUTCDate(start.getUTCDate() + 1);
        }

        // Count commits for each day in the fetched commits
        commits.forEach(({ commit }) => {
            const day = commit.author.date.toISOString().slice(0, 10);
            counts[day] = (counts[day] || 0) + 1;
        });

        const sortedDates = Object.keys(counts).sort();

        return {
            labels: sortedDates,
            data: sortedDates.map(date => counts[date]),
        };
    };


    const { labels, data } = groupCommitsByDate(commits);

    const chartData = {
        labels,
        datasets: [
            {
                data,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.5,
            },
        ],
    };

    // Chart options to hide dots, legend and elements
    const chartOptions = {
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        elements: {
            point: {
                radius: 0, // Hide dots
            },
        },
        scales: {
            y: { display: false },
            x: { display: false },
        },
    };


    return (
        <Line data={chartData} options={chartOptions} />
    );
}
