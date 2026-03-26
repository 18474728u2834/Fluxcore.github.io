import { LayoutDashboard, Users, Shield, Settings, LogOut, Menu, Clock, Code, Megaphone, CalendarDays } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useWorkspace } from "@/hooks/useWorkspace";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { workspaceId, workspace, isOwner } = useWorkspace();

  const base = `/w/${workspaceId}`;

  const mainItems = [
    { title: "Dashboard", url: `${base}/dashboard`, icon: LayoutDashboard },
    { title: "Members", url: `${base}/members`, icon: Users },
    { title: "Activity", url: `${base}/activity`, icon: Clock },
    { title: "Sessions", url: `${base}/sessions`, icon: CalendarDays },
    { title: "Wall", url: `${base}/wall`, icon: Megaphone },
    { title: "Ranks", url: `${base}/ranks`, icon: Shield },
  ];

  const configItems = [
    { title: "Setup Tracking", url: `${base}/setup-tracking`, icon: Code },
    { title: "Settings", url: `${base}/settings`, icon: Settings },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/40">
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-5 mb-1">
            {!collapsed ? (
              <div>
                <span className="text-lg font-extrabold text-gradient tracking-tight">Fluxcore</span>
                {workspace && (
                  <p className="text-[10px] text-muted-foreground truncate mt-0.5">{workspace.name}</p>
                )}
              </div>
            ) : (
              <span className="text-lg font-extrabold text-primary">F</span>
            )}
          </div>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-secondary/60" activeClassName="bg-primary/10 text-primary font-semibold">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isOwner && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs text-muted-foreground/70 px-4 uppercase tracking-widest">
              {!collapsed && "Config"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {configItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} end className="hover:bg-secondary/60" activeClassName="bg-primary/10 text-primary font-semibold">
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate("/workspaces")} className="text-muted-foreground hover:bg-secondary/60 hover:text-foreground">
              <Menu className="mr-2 h-4 w-4" />
              {!collapsed && <span>Switch Workspace</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="text-destructive/80 hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              {!collapsed && <span>Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
