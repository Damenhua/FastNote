import { notFound } from "next/navigation";
import { supabase } from "./supabase";

////
// Note
export async function getAllNote({ userId, deviceId }) {
  let query = supabase.from("note").select("*");

  if (userId) {
    query = query.eq("googleId", userId);
  } else if (deviceId) {
    query = query.eq("device_id", deviceId);
  } else {
    return [];
  }

  // For testing
  // await new Promise((res) => setTimeout(res, 2000));
  const { data: note, error } = await query;
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return note;
}

export async function getNoteById(id) {
  let { data: note, error } = await supabase
    .from("note")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return note;
}

export async function updateNote(id, { title, content, date }) {
  const { data: note, error } = await supabase
    .from("note")
    .update({ title, content, date })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return note;
}

export async function createNote(noteData, { userId, deviceId }) {
  const { data, error } = await supabase
    .from("note")
    .insert([
      { ...noteData, googleId: userId || null, device_id: deviceId || null },
    ])
    .select();

  if (error) throw error;
  return data;
}

export async function deleteNote(id) {
  const { error } = await supabase.from("note").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { success: true, message: "Note deleted" };
}

////
// user
export async function getUser(email) {
  let { data: user, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error("User not found:", error.message);
    return null;
  }
  return user;
}

export async function createUser(newUser) {
  const { data: user, error } = await supabase
    .from("user")
    .insert([newUser])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be created");
  }
  return user;
}
