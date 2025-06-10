"use client";

import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useConfirm } from "@/hooks/use-confirm";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { MeetingIdHeader } from "../components/meeting-id-header";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelState } from "../components/cancel-state";
import { ProcessingState } from "../components/processing-state";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();

  const queryClinet = useQueryClient();

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const removeAgent = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClinet.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        //TODO: invalidate free tier usage
        router.push("/meetings");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove this meeting`
  );

  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();
    if (!ok) return;

    await removeAgent.mutateAsync({ id: meetingId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";
  const isCanceled = data.status === "canceled";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 px-4 py-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => {
            setUpdateMeetingDialogOpen(true);
          }}
          onRemove={handleRemoveAgent}
        />
        {isCanceled && <CancelState />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <div>completed</div>}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCanceling={false}
          />
        )}
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading meeting"
      description="This may take a few seconds"
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error loading meeting"
      description="Someting went wrong!"
    />
  );
};
