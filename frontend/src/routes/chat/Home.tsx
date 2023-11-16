import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  return (
    <div className="bg-blue-300/0 rounded-xl p-3 border border-border w-full overflow-hidden">
      <h1 className="text-4xl mb-6">Profile Page</h1>
      <div className="rounded-md grid grid-cols-2 p-3 gap-10">
        <div>
          <Skeleton className="w-full h-full aspect-square rounded-full" />
        </div>
        <div className="flex flex-col gap-6">
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
          <Skeleton className="w-full h-12" />
        </div>
      </div>
    </div>
  );
};

export default Home;
