"use client";

import { mutate } from "swr";

const { signOutAction } = require("@/lib/action");
const { FcGoogle } = require("react-icons/fc");

function SignOutButton() {
  async function handleSignOut() {
    await signOutAction();

    window.location.reload();
  }
  return (
    <button
      onClick={() => handleSignOut()}
      className="mt-6 flex items-center gap-2 rounded bg-pri-400 px-6 py-3 tracking-widest transition-all hover:bg-pri-200"
    >
      <FcGoogle size={30} />
      LogOut
    </button>
  );
}

export default SignOutButton;
