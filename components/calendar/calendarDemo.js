"use client";

import { Calendar } from "@/components/ui/calendar";

export default function CalendarDemo({ date, setDate, note }) {
  const noteDates = note?.map((note) => new Date(note.date)) || [];

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="w-[400px] rounded-2xl border shadow-sm"
      captionLayout="dropdown"
      modifiers={{ hasNote: noteDates }}
      modifiersStyles={{
        hasNote: {
          color: "red",
          backgroundColor: "#F4ECE1",
          borderRadius: "50%",
        },
      }}
    />
  );
}
