import { Zap, Shield, MessageSquare, AlertTriangle } from "lucide-react";

const events = [
  { type: "Admin Logs", username: "xDarkSlayer", data: ":kick TrollUser", time: "2 min ago", icon: Shield },
  { type: "Chat Message", username: "RobloxPro2024", data: "Welcome to the team!", time: "5 min ago", icon: MessageSquare },
  { type: "Warning", username: "GamerKid99", data: "Verbal warning issued", time: "15 min ago", icon: AlertTriangle },
  { type: "Admin Logs", username: "CoolBuilder", data: ":ban Exploiter123", time: "30 min ago", icon: Shield },
  { type: "Custom", username: "NinjaX", data: "Completed training module", time: "1 hr ago", icon: Zap },
  { type: "Admin Logs", username: "xDarkSlayer", data: ":promote RobloxPro2024", time: "2 hrs ago", icon: Shield },
];

const typeColors: Record<string, string> = {
  "Admin Logs": "text-primary bg-primary/10",
  "Chat Message": "text-success bg-success/10",
  "Warning": "text-warning bg-warning/10",
  "Custom": "text-accent bg-accent/10",
};

export function ActivityEvents() {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border/50">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <Zap className="w-4 h-4 text-primary" /> Custom Events
        </h3>
      </div>
      <div className="divide-y divide-border/40">
        {events.map((event, i) => (
          <div key={i} className="px-5 py-3 flex items-center gap-4 hover:bg-secondary/30 transition-colors">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${typeColors[event.type] || "text-muted-foreground bg-secondary"}`}>
              <event.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${typeColors[event.type] || ""}`}>
                  {event.type}
                </span>
                <p className="text-sm font-medium text-foreground truncate">{event.username}</p>
              </div>
              <p className="text-xs text-muted-foreground font-mono">{event.data}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{event.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
