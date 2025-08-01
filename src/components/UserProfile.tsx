import { MapPin, Building, Users, BookOpen } from "lucide-react"
import type { User } from "../types/User"

interface Props {
  user: User
}

export default function UserProfile({ user }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:items-center">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-20 h-20 rounded-full border border-gray-200"
        />

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-bold text-gray-900">{user.name || user.login}</h2>
            <span className="text-lg text-gray-600">({user.login})</span>
          </div>

          {user.bio && <p className="text-gray-700 mb-3">{user.bio}</p>}

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
            {user.company && (
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                <span>{user.company}</span>
              </div>
            )}

            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
            )}

          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span className="font-semibold">{user.followers.toLocaleString()}</span>
              <span className="text-gray-600">followers</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="font-semibold">{user.following.toLocaleString()}</span>
              <span className="text-gray-600">following</span>
            </div>

            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span className="font-semibold">{user.public_repos.toLocaleString()}</span>
              <span className="text-gray-600">repositories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
