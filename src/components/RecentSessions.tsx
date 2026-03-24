import { Clock, ArrowRight } from "lucide-react";

const sessions = [
  { username: "xDarkSlayer", joinedAt: "Today 14:30", leftAt: "Today 15:45", duration: "1h 15m", server: "Server 1", active: false },
  { username: "RobloxPro2024", joinedAt: "Today 13:00", leftAt: null, duration: "2h 30m+", server: "Server 2", active: true },
  { username: "GamerKid99", joinedAt: "Today 11:20", leftAt: "Today 12:45", duration: "1h 25m", server: "Server 1", active: false },
  { username: "CoolBuilder", joinedAt: "Yesterday 20:00", leftAt: "Yesterday 22:30", duration: "2h 30m", server: "Server 3", active: false },
  { username: "NinjaX", joinedAt: "Yesterday 18:15", leftAt: "Yesterday 19:00", duration: "45m", server: "Server 1", active: false },
  { username: "BuilderPro", joinedAt: "Yesterday 16:00", leftAt: "Yesterday 17:30", duration: "1h 30m", server: "Server 2", active: false },
];

export function RecentSessions() {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border/50 flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" /> Recent Sessions
        </h3>
        <span className="text-xs text-muted-foreground">{sessions.filter(s => s.active).length} active now</span>
      </div>
      <div className="divide-y divide-border/40">
        {sessions.map((session, i) => (
          <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-secondary/30 transition-colors">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-foreground">
                {session.username.charAt(0)}
              </div>
              {session.active && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-card" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground truncate">{session.username}</p>
                {session.active && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-success/10 text-success font-medium">LIVE</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>{session.joinedAt}</span>
                <ArrowRight className="w-3 h-3" />
                <span>{session.leftAt || "Now"}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{session.duration}</p>
              <p className="text-xs text-muted-foreground">{session.server}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
