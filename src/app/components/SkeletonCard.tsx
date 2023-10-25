import clsx from "clsx";

export function SkeletonCard({ isLoading }: { isLoading?: boolean }) {
  return (
    <div
      className={clsx(
        "flex flex-col shadow-lg h-96 bg-slate-800 p-5 text-gray-300 rounded",
        {
          "animate-pulse": isLoading,
        }
      )}
    >
      <div className="relative max-h-72 flex-1 bg-slate-700 rounded" />
      <div className="h-3 w-8/12 my-7 rounded-md bg-slate-700" />
    </div>
  );
}
