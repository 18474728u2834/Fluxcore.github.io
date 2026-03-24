import { Trophy, Clock, TrendingUp } from "lucide-react";

// Mock data - in production this would come from the database
const leaderboard = [
  { rank: 1, username: "xDarkSlayer", totalMinutes: 2241, sessions: 15, lastSeen: "2 min ago" },
  { rank: 2, username: "RobloxPro2024", totalMinutes: 2131, sessions: 12, lastSeen: "15 min ago" },
  { rank: 3, username: "GamerKid99", totalMinutes: 1869, sessions: 10, lastSeen: "1 hr ago" },
  { rank: 4, username: "CoolBuilder", totalMinutes: 1403, sessions: 8, lastSeen: "3 hrs ago" },
  { rank: 5, username: "NinjaX", totalMinutes: 987, sessions: 6, lastSeen: "5 hrs ago" },
  { rank: 6, username: "BuilderPro", totalMinutes: 754, sessions: 5, lastSeen: "1 day ago" },
  { rank: 7, username: "StarPlayer", totalMinutes: 612, sessions: 4, lastSeen: "2 days ago" },
  { rank: 8, username: "QuickRunner", totalMinutes: 445, sessions: 3, lastSeen: "3 days ago" },
];

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

const rankStyles: Record<number, string> = {
  1: "text-warning",
  2: "text-muted-foreground",
  3: "text-orange-400",
};

export function ActivityLeaderboard() {
  return (
    <div className="space-y-4">
      {/* Top 3 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {leaderboard.slice(0, 3).map((user) => (
          <div key={user.rank} className="glass-hover rounded-xl p-5 text-center space-y-3">
            <div className="flex justify-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                user.rank === 1 ? "bg-warning/10" : "bg-secondary"
              }`}>
                <Trophy className={`w-5 h-5 ${rankStyles[user.rank] || "text-muted-foreground"}`} />
              </div>
            </div>
            <div>
              <p className="font-bold text-foreground">{user.username}</p>
              <p className="text-2xl font-extrabold text-gradient mt-1">{formatTime(user.totalMinutes)}</p>
            </div>
            <div className="flex justify-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {user.sessions} sessions</span>
            </div>
          </div>
        ))}
      </div>

      {/* Full Table */}
      <div className="glass rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border/50">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" /> Activity Leaderboard
          </h3>
        </div>
        <div className="divide-y divide-border/40">
          {leaderboard.map((user) => (
            <div key={user.rank} className="px-5 py-3 flex items-center gap-4 hover:bg-secondary/30 transition-colors">
              <span className={`text-sm font-bold w-6 text-center ${rankStyles[user.rank] || "text-muted-foreground"}`}>
                #{user.rank}
              </span>
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground">
                {user.username.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user.username}</p>
                <p className="text-xs text-muted-foreground">{user.lastSeen}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">{formatTime(user.totalMinutes)}</p>
                <p className="text-xs text-muted-foreground">{user.sessions} sessions</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
