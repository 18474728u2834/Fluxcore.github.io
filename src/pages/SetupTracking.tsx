import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Copy, Download, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function SetupTracking() {
  const [copied, setCopied] = useState<string | null>(null);

  // In production, this would come from the workspace's actual API key
  const API_KEY = "YOUR_WORKSPACE_API_KEY";
  const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL || "https://your-project.supabase.co"}/functions/v1/activity-tracker`;

  const luaScript = `-- Fluxcore Activity Tracker Module
-- Place this script in ServerScriptService

local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

local FluxcoreTracker = {}
FluxcoreTracker.API_URL = "${FUNCTION_URL}"
FluxcoreTracker.API_KEY = "${API_KEY}" -- Replace with your workspace API key
FluxcoreTracker.Sessions = {}

-- Track player join
function FluxcoreTracker:OnPlayerAdded(player)
    local success, response = pcall(function()
        return HttpService:PostAsync(
            self.API_URL,
            HttpService:JSONEncode({
                action = "join",
                roblox_user_id = tostring(player.UserId),
                roblox_username = player.Name,
                server_id = tostring(game.JobId)
            }),
            Enum.HttpContentType.ApplicationJson,
            false,
            {
                ["x-api-key"] = self.API_KEY
            }
        )
    end)
    
    if success then
        local data = HttpService:JSONDecode(response)
        self.Sessions[player.UserId] = data.session_id
        print("[Fluxcore] Tracking started for " .. player.Name)
    else
        warn("[Fluxcore] Failed to track join: " .. tostring(response))
    end
end

-- Track player leave
function FluxcoreTracker:OnPlayerRemoving(player)
    local success, response = pcall(function()
        return HttpService:PostAsync(
            self.API_URL,
            HttpService:JSONEncode({
                action = "leave",
                roblox_user_id = tostring(player.UserId),
                session_id = self.Sessions[player.UserId]
            }),
            Enum.HttpContentType.ApplicationJson,
            false,
            {
                ["x-api-key"] = self.API_KEY
            }
        )
    end)
    
    if success then
        print("[Fluxcore] Tracking ended for " .. player.Name)
    else
        warn("[Fluxcore] Failed to track leave: " .. tostring(response))
    end
    
    self.Sessions[player.UserId] = nil
end

-- Track custom event
function FluxcoreTracker:TrackEvent(player, eventType, eventData)
    local success, response = pcall(function()
        return HttpService:PostAsync(
            self.API_URL,
            HttpService:JSONEncode({
                action = "event",
                roblox_user_id = tostring(player.UserId),
                roblox_username = player.Name,
                event_type = eventType,
                event_data = eventData or {}
            }),
            Enum.HttpContentType.ApplicationJson,
            false,
            {
                ["x-api-key"] = self.API_KEY
            }
        )
    end)
    
    if success then
        print("[Fluxcore] Event tracked: " .. eventType)
    else
        warn("[Fluxcore] Failed to track event: " .. tostring(response))
    end
end

-- Initialize
function FluxcoreTracker:Init()
    Players.PlayerAdded:Connect(function(player)
        self:OnPlayerAdded(player)
    end)
    
    Players.PlayerRemoving:Connect(function(player)
        self:OnPlayerRemoving(player)
    end)
    
    -- Track players already in the game
    for _, player in ipairs(Players:GetPlayers()) do
        self:OnPlayerAdded(player)
    end
    
    print("[Fluxcore] Activity Tracker initialized!")
end

-- Start tracking
FluxcoreTracker:Init()

return FluxcoreTracker`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <DashboardLayout title="Setup Tracking">
      <div className="max-w-4xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Setup Activity Tracking</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Install the Fluxcore module in your Roblox game to start tracking activity
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="glass rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</div>
              <h2 className="text-lg font-semibold text-foreground">Enable HTTP Requests</h2>
            </div>
            <p className="text-sm text-muted-foreground pl-11">
              In Roblox Studio, go to <strong className="text-foreground">Game Settings → Security → Enable HTTP Requests</strong>. 
              This allows the module to communicate with Fluxcore's API.
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">2</div>
              <h2 className="text-lg font-semibold text-foreground">Copy Your API Key</h2>
            </div>
            <div className="pl-11 space-y-3">
              <p className="text-sm text-muted-foreground">
                Your workspace API key is used to authenticate requests from your game.
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-muted rounded-lg px-4 py-3 text-sm font-mono text-foreground break-all">
                  {API_KEY}
                </code>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => copyToClipboard(API_KEY, "api-key")}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  {copied === "api-key" ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="glass rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">3</div>
              <h2 className="text-lg font-semibold text-foreground">Install the Lua Module</h2>
            </div>
            <div className="pl-11 space-y-3">
              <p className="text-sm text-muted-foreground">
                Create a new <strong className="text-foreground">Script</strong> in <strong className="text-foreground">ServerScriptService</strong> and paste the code below.
                Replace <code className="text-primary">YOUR_WORKSPACE_API_KEY</code> with your actual API key.
              </p>
              <div className="relative">
                <pre className="bg-muted rounded-xl p-4 text-xs font-mono text-secondary-foreground overflow-x-auto max-h-96 overflow-y-auto leading-relaxed">
                  {luaScript}
                </pre>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-3 right-3"
                  onClick={() => copyToClipboard(luaScript, "lua")}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  {copied === "lua" ? "Copied!" : "Copy Script"}
                </Button>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="glass rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">4</div>
              <h2 className="text-lg font-semibold text-foreground">Publish & Test</h2>
            </div>
            <p className="text-sm text-muted-foreground pl-11">
              Publish your game and join it. You should see <code className="text-primary">[Fluxcore] Activity Tracker initialized!</code> in the output.
              Player activity will start appearing in the dashboard within seconds.
            </p>
          </div>

          {/* Custom Events */}
          <div className="glass rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-sm font-bold text-accent">+</div>
              <h2 className="text-lg font-semibold text-foreground">Track Custom Events (Optional)</h2>
            </div>
            <div className="pl-11 space-y-3">
              <p className="text-sm text-muted-foreground">
                You can track custom events like admin commands, help requests, or any game-specific activity:
              </p>
              <pre className="bg-muted rounded-xl p-4 text-xs font-mono text-secondary-foreground overflow-x-auto leading-relaxed">{`-- Require the Fluxcore module
local Fluxcore = require(script.Parent.FluxcoreTracker)

-- Track an admin command
Fluxcore:TrackEvent(player, "Admin Logs", {
    command = ":kick TrollUser",
    reason = "Exploiting"
})

-- Track a custom event
Fluxcore:TrackEvent(player, "Training", {
    module = "Welcome Training",
    completed = true
})`}</pre>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
