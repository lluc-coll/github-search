import { Users } from "lucide-react"
import type { UserSearch } from "../types/UserSearch"

interface Props {
  otherUsers: UserSearch[]
  onUserSelect: (username: string) => void
  sidebar: boolean
}

// This component displays a list of similar users with their avatars and usernames.
// It allows the user to select a user, which triggers a onUserSelect.
// It is designed to be used in a sidebar or a full-width layout based on the `sidebar` prop.
export default function UserItems({ otherUsers, onUserSelect, sidebar }: Props) {

  return (
    <div className={`${sidebar ? "w-80 flex-shrink-0" : "w-full"} transition-all`}>
      <div className="sticky top-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4" />
            Similar Users
          </h3>
          <div className="space-y-2">
            {otherUsers.map((user) => (
              <div
                key={user.login}
                onClick={() => onUserSelect(user.login)}
                className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-gray-100"
              >
                <img
                  src={user.avatar_url || "/placeholder.svg"}
                  alt={user.login}
                  className="w-8 h-8 rounded-full border border-gray-200"
                />
                <span className="text-sm font-medium text-gray-900 truncate">{user.login}</span>

                <span className="ml-auto text-sm font-medium text-gray-900 truncate">{user.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
