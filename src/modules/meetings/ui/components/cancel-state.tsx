import { EmptyState } from "@/components/empty-state";

export const CancelState = () => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        title="Meeting canceled"
        description="This meeting was cancelled"
        image="/cancelled.svg"
      />
    </div>
  );
};
