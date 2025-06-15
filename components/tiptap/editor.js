"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import TextAlign from "@tiptap/extension-text-align";

import Menubar from "./menubar";

const extensions = [
  StarterKit,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
];

function Editor({ content = "<p>開始編輯...</p>", onUpdate }) {
  const editor = useEditor({
    extensions,
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-[400px] rounded-2xl px-5 py-3 text-xl bg-pri-100 ",
      },
    },
    onUpdate: ({ editor }) => {
      const updateContent = editor.getHTML();
      onUpdate(updateContent);
    },
  });

  return (
    <div className="w-full min-w-[400px] max-w-screen-xl">
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export default Editor;
