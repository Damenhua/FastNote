"use client";
const { signInAction } = require("@/lib/action");
const { FcGoogle } = require("react-icons/fc");

function SignInButton() {
  return (
    <button
      onClick={() => signInAction()}
      className="mt-6 flex gap-2 rounded bg-pri-400 px-6 py-3 text-center tracking-widest transition-all hover:bg-pri-200"
    >
      <FcGoogle size={30} />
      Login with Google
    </button>
  );
}

export default SignInButton;
