"use client";

function ButtonToTop({ children }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="absolute left-1/2 flex animate-bounce flex-col items-center justify-center gap-2"
    >
      {children}
    </button>
  );
}

export default ButtonToTop;
