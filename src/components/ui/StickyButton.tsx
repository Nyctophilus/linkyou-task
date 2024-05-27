import { cn } from "@/lib/utils";

const StickyButton = () => {
  return (
    <span
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "text-white grid place-items-center size-12 rounded-full bg-main-foreground",
        window.innerWidth < 768
          ? "fixed bottom-[34px] left-1/2 -translate-x-1/2"
          : "[box-shadow:0px_4px_4px_0px_#03030380] absolute xl:fixed right-9 bottom-5"
      )}
    >
      {window.innerWidth < 768 ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.6087 10L1.39136 10"
            stroke="#283D5D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 18.6087L10 1.3913"
            stroke="#283D5D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27 25.5L18 16.5L9 25.5"
            stroke="white"
            strokeWidth="3.85714"
            strokeLinecap="round"
          />
          <path
            d="M10.5 9L25.5 9"
            stroke="white"
            strokeWidth="3.85714"
            strokeLinecap="round"
          />
        </svg>
      )}
    </span>
  );
};
export default StickyButton;
