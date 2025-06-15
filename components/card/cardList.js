"use client";

import { Children, useEffect, useMemo } from "react";
import CardItem from "./cardItem";
import useSWR, { mutate } from "swr";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import {
  DndContext,
  closestCorners,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";

const fetcher = async (url, deviceId) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ deviceId }),
  });

  if (!response.ok) {
    throw new Error("筆記獲取失敗");
  }

  return response.json();
};

const deleteFetcher = async (url, id) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error("刪除失敗");
  }
  return response.json();
};

function CardList({ deviceId, onSetNote, isCalendarPage }) {
  const { data } = useSWR(
    deviceId ? ["/api/notes", deviceId] : null,
    ([url, deviceId]) => fetcher(url, deviceId),
  );

  const datas = useMemo(
    () => [
      ...(data || []),
      {
        id: "empty",
        isEmpty: true,
      },
    ],
    [data],
  );

  const items = useMemo(() => datas.map((item) => item.id), [datas]);

  useEffect(() => {
    if (data) {
      onSetNote?.(data);
    }
  }, [data, onSetNote]);

  async function handleDelete(id) {
    if (confirm("確定要刪除這則筆記?")) {
      try {
        await deleteFetcher(`/api/notes`, id);
        mutate(["/api/notes", deviceId]);
      } catch (error) {
        console.error("error", error);
        alert("刪除失敗");
      }
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = data.findIndex((item) => item.id === active.id);
      const newIndex = data.findIndex((item) => item.id === over.id);

      const newData = arrayMove(data, oldIndex, newIndex);
      mutate(["/api/notes", deviceId], newData, false);
    }
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      modifiers={[]}
    >
      <div className="mx-10 flex flex-wrap justify-start gap-20 pb-10">
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {datas.map((note) => (
            <CardItem
              key={note.id}
              note={note}
              onDelete={handleDelete}
              isCalendarPage={isCalendarPage}
            >
              {Children}
            </CardItem>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}

export default CardList;
