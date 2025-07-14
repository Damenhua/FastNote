"use client";

import { formatDate } from "@/lib/utils/dateTransform";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { RiDeleteBin5Line } from "react-icons/ri";

function CardItem({ note, onDelete, isCalendarPage = false }) {
  const { title, content, created_at, isEmpty, id, date } = note;
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useSortable({
      id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: "none",
    opacity: isDragging ? 0.5 : 1,
  };

  function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  }

  if (isEmpty) {
    return (
      <Link
        href={`/note/new`}
        className="relative h-48 w-full min-w-64 max-w-lg rounded-3xl border-2 border-dashed border-gray-300 bg-transparent p-4 transition-all hover:border-pri-500"
      >
        <div className="flex h-full items-center justify-center text-gray-400">
          <span className="text-2xl font-semibold text-pri-400">
            + 新增筆記
          </span>
        </div>
      </Link>
    );
  }

  if (!isCalendarPage) {
    return (
      <Link
        href={`/note/${id}`}
        className="relative flex h-48 w-full min-w-64 max-w-lg flex-col justify-between rounded-3xl border-2 border-gray-300 bg-transparent p-4 transition-all hover:border-pri-500"
      >
        <div className="flex items-center justify-between text-sec-600">
          <p className="text-2xl">{title}</p>
          <button
            className="rounded-xl px-4 py-2 hover:bg-sec-200"
            onClick={(e) => handleDelete(e)}
          >
            <RiDeleteBin5Line />
          </button>
        </div>
        <p className="text-xl text-gray-500">
          {content.replace(/<[^>]*>/g, "").length > 20
            ? content.replace(/<[^>]*>/g, "").slice(0, 20) + "..."
            : content.replace(/<[^>]*>/g, "")}
        </p>
        <div className="text-gray-500">{formatDate(date)}</div>
      </Link>
    );
  }

  return (
    <div
      className={`relative flex h-48 w-full min-w-64 max-w-lg flex-col justify-between rounded-3xl border-2 border-gray-300 bg-transparent p-4 transition-all hover:border-pri-500 ${isDragging ? "shadow-xl" : ""}`}
      ref={setNodeRef}
      style={style}
    >
      <div className="flex items-center justify-between text-sec-600">
        <p className="text-2xl">{title}</p>
        <button
          className="rounded-xl px-4 py-2 hover:bg-sec-200"
          onClick={(e) => handleDelete(e)}
        >
          <RiDeleteBin5Line />
        </button>
      </div>
      <div {...attributes} {...listeners} className="space-y-10">
        <p className="text-xl text-gray-500">
          {content.replace(/<[^>]*>/g, "").length > 20
            ? content.replace(/<[^>]*>/g, "").slice(0, 20) + "..."
            : content.replace(/<[^>]*>/g, "")}
        </p>
        <div className="text-gray-500">{formatDate(date)}</div>
      </div>
    </div>
  );
}

export default CardItem;
