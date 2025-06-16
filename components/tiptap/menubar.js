"use client";

import { useMemo } from "react";
import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaItalic,
  FaStrikethrough,
} from "react-icons/fa";

function Menubar({ editor }) {
  const Options = useMemo(() => {
    if (!editor) return [];
    return [
      {
        icon: <BsTypeH1 />,
        onclick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        preesed: editor.isActive("heading", { level: 1 }),
      },
      {
        icon: <BsTypeH2 />,
        onclick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        preesed: editor.isActive("heading", { level: 2 }),
      },
      {
        icon: <BsTypeH3 />,
        onclick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        preesed: editor.isActive("heading", { level: 3 }),
      },
      {
        icon: <FaBold />,
        onclick: () => editor.chain().focus().toggleBold().run(),
        preesed: editor.isActive("bold"),
      },
      {
        icon: <FaItalic />,
        onclick: () => editor.chain().focus().toggleItalic().run(),
        preesed: editor.isActive("italic"),
      },
      {
        icon: <FaStrikethrough />,
        onclick: () => editor.chain().focus().toggleStrike().run(),
        preesed: editor.isActive("strike"),
      },
      {
        icon: <FaAlignLeft />,
        onclick: () => editor.chain().focus().setTextAlign("left").run(),
        preesed: editor.isActive({ textAlign: "left" }),
      },
      {
        icon: <FaAlignCenter />,
        onclick: () => editor.chain().focus().setTextAlign("center").run(),
        preesed: editor.isActive({ textAlign: "center" }),
      },
      {
        icon: <FaAlignRight />,
        onclick: () => editor.chain().focus().setTextAlign("right").run(),
        preesed: editor.isActive({ textAlign: "right" }),
      },
    ];
  }, [editor]);

  return (
    <div className="space-x-2">
      {Options.map((item, index) => (
        <button
          key={index}
          onClick={item.onclick}
          className={`${item.preesed} rounded-xl p-4 transition-all hover:bg-sec-50`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}

export default Menubar;
