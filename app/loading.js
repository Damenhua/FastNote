import Spinner from "@/components/spinner";

function loading() {
  return (
    <div className="flex h-1/2 w-full flex-col items-center justify-center">
      <Spinner />
      <p className="text-pri-400 text-2xl font-semibold">Loading...</p>
    </div>
  );
}

export default loading;
