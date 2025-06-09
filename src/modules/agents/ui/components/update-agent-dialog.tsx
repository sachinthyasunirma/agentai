import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
  open: boolean;
  onChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}

export const UpdateAgentDialog = ({
  open,
  onChange,
  initialValues,
}: UpdateAgentDialogProps) => {

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
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};
