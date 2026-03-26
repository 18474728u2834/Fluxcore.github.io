import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

interface WorkspaceContextType {
  workspaceId: string;
  workspace: { id: string; name: string; owner_id: string; api_key: string; roblox_group_id: string | null; gamepass_id: string | null } | null;
  isOwner: boolean;
  loading: boolean;
  memberRole: string | null;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState<WorkspaceContextType["workspace"]>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [memberRole, setMemberRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) { navigate("/login"); return; }
    if (!workspaceId) { navigate("/workspaces"); return; }

    const fetchWorkspace = async () => {
      setLoading(true);

      // Try fetching as owner
      const { data: wsData } = await supabase
        .from("workspaces")
        .select("*")
        .eq("id", workspaceId)
        .single();

      if (!wsData) {
        navigate("/workspaces");
        return;
      }

      setWorkspace(wsData);
      const ownerCheck = wsData.owner_id === user.id;
      setIsOwner(ownerCheck);

      if (!ownerCheck) {
        // Check membership
        const { data: member } = await supabase
          .from("workspace_members")
          .select("role")
          .eq("workspace_id", workspaceId)
          .eq("user_id", user.id)
          .maybeSingle();

        if (!member) {
          navigate("/workspaces");
          return;
        }
        setMemberRole(member.role);
      } else {
        setMemberRole("Owner");
      }

      setLoading(false);
    };

    fetchWorkspace();
  }, [workspaceId, user, authLoading]);

  return (
    <WorkspaceContext.Provider value={{ workspaceId: workspaceId || "", workspace, isOwner, loading, memberRole }}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error("useWorkspace must be used within WorkspaceProvider");
  return context;
}
