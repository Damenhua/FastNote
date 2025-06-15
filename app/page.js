import Image from "next/image";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import Link from "next/link";

import home from "@/public/home.gif";
import edit from "@/public/edit.gif";
import calendar from "@/public/calendar.gif";

import ButtonToTop from "@/components/buttonToTop";
import SignInButton from "@/components/signInButton";
import { auth } from "@/lib/auth";
import SignOutButton from "@/components/signOutButton";

async function page() {
  const session = await auth();
  const id = session?.user?.id;

  return (
    <main className="mt-48 md:mt-96">
      <div
        className="fixed inset-0 -z-10 bg-[url('../public/bg.jpg')] bg-cover bg-repeat-y"
        style={{ backgroundSize: "100% auto" }}
      ></div>

      <div className="fixed inset-0 -z-10 bg-gray-100/20 backdrop-blur-sm"></div>

      <div className="relative mx-auto flex w-full max-w-[90%] flex-col items-center gap-3 rounded-lg px-4 md:left-[110px] md:max-w-none md:px-0">
        <h1 className="text-4xl font-semibold text-pri-500 md:text-8xl">
          FastNote
        </h1>
        <p className="mt-4 text-xl font-semibold tracking-widest text-sec-500 md:text-2xl">
          隨時記錄你的靈感
        </p>
        <Link
          href="/note"
          className="w-full rounded bg-pri-400 px-4 py-3 text-center tracking-widest transition-all hover:bg-pri-200 md:w-auto md:px-8 md:py-4"
        >
          {id ? "Back to Notes" : "Quick Start"}
        </Link>
        {id ? <SignOutButton /> : <SignInButton />}
      </div>

      {/* arrow */}
      <div className="relative bottom-10 mt-32 flex animate-bounce flex-col items-center gap-2 md:absolute md:bottom-10 md:left-1/2 md:mt-0">
        <div className="text-xl font-semibold text-sec-500 md:text-3xl">
          SCROLL DOWN
        </div>
        <FaArrowDown size={30} className="md:size-50 text-sec-500" />
      </div>

      <div className="mt-20 max-w-[100vw] md:mt-96">
        <div className="space-y-10 px-4 py-12 md:px-0">
          <div className="flex flex-col gap-8 md:flex-row md:justify-around">
            <div className="w-full md:w-[45%]">
              <Image
                src={home}
                alt="Demo Placeholder"
                quality={100}
                className="rounded-lg border shadow-lg"
              />
            </div>
            <div className="flex w-full flex-col space-y-6 rounded-2xl p-6 shadow-xl backdrop-blur-sm transition-all md:w-[45%] md:space-y-10 md:p-4">
              <h1 className="text-center text-2xl font-semibold text-gray-800 md:mt-6 md:text-5xl">
                Quick Start
              </h1>
              <ul className="list-disc space-y-3 px-6 marker:text-pri-400 md:text-2xl">
                <li>支援 Google 帳號快速登入</li>
                <li>快速預覽所有筆記</li>
                <li>輕鬆創建、編輯和刪除筆記</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:justify-around">
            <div className="w-full md:w-[45%]">
              <Image
                src={edit}
                alt="Demo Placeholder"
                className="rounded-lg border shadow-lg"
              />
            </div>
            <div className="flex w-full flex-col space-y-6 rounded-2xl p-6 shadow-xl backdrop-blur-sm transition-all md:w-[45%] md:space-y-10 md:p-4">
              <h1 className="text-center text-2xl font-semibold text-gray-800 md:mt-6 md:text-5xl">
                Editor
              </h1>
              <ul className="list-disc space-y-3 px-6 marker:text-pri-400 md:text-2xl">
                <li>豐富的文字編輯功能</li>
                <li>一鍵將筆記加入行事曆</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-8 md:flex-row md:justify-around">
            <div className="w-full md:w-[45%]">
              <Image
                src={calendar}
                alt="Demo Placeholder"
                className="rounded-lg border shadow-lg"
              />
            </div>
            <div className="flex w-full flex-col space-y-6 rounded-2xl p-6 shadow-xl backdrop-blur-sm transition-all md:w-[45%] md:space-y-10 md:p-4">
              <h1 className="text-center text-2xl font-semibold text-gray-800 md:mt-6 md:text-5xl">
                Calendar
              </h1>
              <ul className="list-disc space-y-3 px-6 marker:text-pri-400 md:text-2xl">
                <li>清晰查看所有預定事項</li>
                <li>直覺的拖曳排序功能</li>
              </ul>
            </div>
          </div>
          <ButtonToTop className="fixed bottom-10 md:bottom-20">
            <FaArrowUp size={30} className="md:size-50 text-sec-500" />
            <div className="text-xl font-semibold text-sec-500 md:text-3xl">
              BACK TO TOP
            </div>
          </ButtonToTop>
        </div>
      </div>
    </main>
  );
}

export default page;
