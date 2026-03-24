import { DashboardLayout } from "@/components/DashboardLayout";
import { ActivityLeaderboard } from "@/components/ActivityLeaderboard";
import { RecentSessions } from "@/components/RecentSessions";
import { ActivityEvents } from "@/components/ActivityEvents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Activity() {
  return (
    <DashboardLayout title="Activity Tracking">
      <div className="space-y-6 max-w-6xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Activity Tracking</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitor in-game activity, sessions, and custom events
          </p>
        </div>

        <Tabs defaultValue="leaderboard" className="space-y-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="sessions">Recent Sessions</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard">
            <ActivityLeaderboard />
          </TabsContent>

          <TabsContent value="sessions">
            <RecentSessions />
          </TabsContent>

          <TabsContent value="events">
            <ActivityEvents />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
