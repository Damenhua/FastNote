"use client";

import CalendarDemo from "@/components/calendar/calendarDemo";
import DeviceWrapper from "@/components/card/deviceWrapper";
import { useEffect, useState } from "react";

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState([]);
  const [filterNotes, setFilterNotes] = useState(null);

  useEffect(() => {
    try {
      if (note.length > 0) {
        const filteredNotes = note.filter(
          (note) => note.date.slice(0, 10) === date.toISOString().slice(0, 10),
        );
        setFilterNotes(filteredNotes || null);
      } else {
        setFilterNotes(null);
      }
    } catch (error) {
      console.error("error", error);
    }
  }, [date, note]);

  return (
    <div className="flex flex-col space-y-8 p-4 md:flex-row md:space-x-8 md:space-y-0 md:p-8">
      {/* 左側筆記列表 */}
      <div className="w-full border-b border-gray-200 pb-8 md:w-1/2 md:min-w-[450px] md:max-w-[600px] md:border-b-0 md:border-r md:pb-0 md:pr-8">
        <div className="h-[calc(100vh-16rem)] overflow-y-auto md:h-[calc(100vh-12rem)]">
          <DeviceWrapper onSetNote={setNote} isCalendarPage={true} />
        </div>
      </div>

      {/* 右側日曆和內容 */}
      <div className="flex w-full flex-col space-y-8 md:w-1/2 md:space-y-20">
        {/* 日曆部分 */}
        <div className="flex w-full items-center justify-center">
          <CalendarDemo date={date} setDate={setDate} note={note} />
        </div>

        {/* 內容顯示部分 */}
        <div className="w-full space-y-6 rounded-2xl border border-gray-200 p-4 md:min-w-[400px] md:p-6">
          {filterNotes ? (
            filterNotes.map((item) => (
              <div key={item.id} className="space-y-4 md:space-y-6">
                <h1 className="text-lg font-semibold text-sec-600 md:text-xl">
                  {item.title}
                </h1>
                <p className="text-base md:text-xl">
                  {item.content.replace(/<[^>]*>/g, "")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-base md:text-xl">content</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
