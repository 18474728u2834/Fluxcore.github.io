import { DashboardLayout } from "@/components/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <DashboardLayout title="Pastriez Bakery">
      <div className="space-y-8 max-w-2xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Configure your workspace</p>
        </div>

        <div className="glass rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Gamepass Configuration</h2>
          <div className="space-y-2">
            <Label>Required Gamepass ID</Label>
            <Input placeholder="Enter Roblox Gamepass ID" defaultValue="000000000" className="bg-muted border-border" />
            <p className="text-xs text-muted-foreground">Users must own this gamepass to create workspaces</p>
          </div>
        </div>

        <div className="glass rounded-xl p-6 space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Group Settings</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Roblox Group ID</Label>
              <Input placeholder="Enter Roblox Group ID" className="bg-muted border-border" />
            </div>
            <div className="space-y-2">
              <Label>Group Name</Label>
              <Input placeholder="Your group name" className="bg-muted border-border" />
            </div>
          </div>
          <Button variant="hero">Save Settings</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
