import { NextResponse } from "next/server";
import { deleteNote, getAllNote } from "@/lib/data-service";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const session = await auth();
    const { deviceId } = await request.json();

    const data = await getAllNote({
      userId: session?.user?.id,
      deviceId: !session?.user?.id ? deviceId : null,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error get notes :", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    await deleteNote(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error delete note:", error);
    return NextResponse.json({ error: "刪除筆記失敗" }, { status: 500 });
  }
}
