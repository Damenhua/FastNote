"use client";

import CalendarDemo from "@/components/calendar/calendarDemo";
import Editor from "@/components/tiptap/editor";
import { Button } from "@/components/ui/button";
import { createNote, updateNote } from "@/lib/data-service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDate } from "@/lib/utils/dateTransform";
import { useSession } from "next-auth/react";
import { getDeviceId } from "@/lib/device";

function EditorCient({ note }) {
  const [editor, setEditor] = useState(note?.content || "");
  const [title, setTitle] = useState(note?.title || "");
  const [date, setDate] = useState(new Date());

  return (
    <div className="pb-10">
      <div className="mb-10 space-y-4">
        <div className="flex space-x-10">
          <input
            className="min-h-[50px] rounded-2xl bg-pri-100 px-3 text-xl"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="輸入標題"
          />
          <p className="py-3 text-xl text-sec-600">
            {note?.date
              ? formatDate(note.date)
              : formatDate(date.toLocaleDateString())}
          </p>
        </div>
        <div className="flex flex-col gap-20 lg:flex-row">
          <Editor
            content={note?.content}
            noteId={note.id}
            onUpdate={setEditor}
          />
          <CalendarDemo date={date} setDate={setDate} />
        </div>
      </div>
      <SaveButton
        noteId={note.id}
        content={editor}
        title={title || ""}
        date={date}
      />
    </div>
  );
}

function SaveButton({ noteId, content, title = "", date }) {
  const router = useRouter();
  const [isSubmit, setIsSubmit] = useState(false);
  const { data: session } = useSession();

  async function handleSave() {
    try {
      setIsSubmit(true);
      const deviceId = getDeviceId();
      const userId = session?.user?.id;

      if (noteId === null) {
        await createNote(
          { title, content, date },
          { userId, deviceId: session ? null : deviceId },
        );
      } else {
        await updateNote(noteId, { title, content, date }, userId);
      }

      router.refresh();
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSubmit(false);
    }
  }

  return (
    <Button
      onClick={handleSave}
      className="px-8 py-5 text-xl font-semibold text-pri-300 transition-all"
      disabled={isSubmit}
    >
      {isSubmit ? "儲存中..." : "儲存"}
    </Button>
  );
}

export default EditorCient;
