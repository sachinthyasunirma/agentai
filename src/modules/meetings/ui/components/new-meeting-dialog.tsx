import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";

interface NewMeetingDialogProps {
  open: boolean;
  onChange: (open: boolean) => void;
}

export const NewMeetingDialog = ({ open, onChange }: NewMeetingDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create a new meeting"
      open={open}
      onOpenChange={onChange}
    >
      TODO
      <MeetingForm
        onSuccess={(id) => {
          onChange(false);
          router.push(`/meetings/${id}`);
        }}
        onCancel={() => onChange(false)}
      />
    </ResponsiveDialog>
  );
};
