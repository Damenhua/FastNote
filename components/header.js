import { auth } from "@/lib/auth";
import Link from "next/link";
import { CiCalendarDate } from "react-icons/ci";

async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-pri-300 bg-gray-100 px-4 py-4 shadow-lg md:py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/">
          <span className="text-2xl font-semibold text-pri-500 md:text-3xl">
            FastNote
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/calendar">
            <div className="rounded-2xl border border-sec-200 px-2 py-1 transition-all hover:bg-pri-200 md:px-3">
              <CiCalendarDate className="h-8 w-8 md:h-12 md:w-12" />
            </div>
          </Link>
          {session?.user ? (
            <div className="flex items-center gap-3">
              <p className="hidden text-lg font-semibold text-pri-500 md:block md:text-xl">
                Hi, {session.user?.name}
              </p>
              <img
                src={session.user?.image}
                alt={session?.user?.name}
                className="h-8 w-8 rounded-full md:h-10 md:w-10"
              />
            </div>
          ) : (
            <p className="text-lg font-semibold text-pri-500 md:text-xl">
              Welcome!
            </p>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
