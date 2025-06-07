import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";

interface NewAgentDialogProps {
  open: boolean;
  onChange: (open: boolean) => void;
}

export const NewAgentDialog = ({ open, onChange }: NewAgentDialogProps) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent"
      open={open}
      onOpenChange={onChange}
    >
      <AgentForm
        onSuccess={() => onChange(false)}
        onCancel={() => onChange(false)}
      />
    </ResponsiveDialog>
  );
};
