"use client";

import { getDeviceId } from "@/lib/device";
import CardList from "@/components/card/cardList";

export default function DeviceWrapper({ onSetNote, isCalendarPage }) {
  const deviceId = getDeviceId();

  return (
    <CardList
      deviceId={deviceId}
      onSetNote={onSetNote}
      isCalendarPage={isCalendarPage}
    />
  );
}
