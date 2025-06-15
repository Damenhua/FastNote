import { unstable_noStore as noStore } from "next/cache";

import Link from "next/link";
import EditorClient from "./EditorClient";

import { getNoteById } from "@/lib/data-service";
import { Button } from "@/components/ui/button";

async function Page({ params }) {
  noStore();

  let note;
  if (params.noteId === "new") {
    note = {
      id: null,
      title: "",
      contnet: "",
      created_at: new Date().toISOString(),
      isEmpty: false,
    };
  } else {
    note = await getNoteById(params.noteId);
  }

  return (
    <div className="mx-20 mt-12">
      <Button>
        <Link href="/note" className="px-4 text-pri-300">
          &larr; Back
        </Link>
      </Button>
      <div className="mt-32 flex flex-col gap-20 md:flex-row">
        <div className="min-w-0 flex-grow">
          <EditorClient note={note} />
        </div>
      </div>
    </div>
  );
}

export default Page;
