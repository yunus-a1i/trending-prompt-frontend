import { useState } from "react";

export const SparkleIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 1C8 1 8.5 4.5 10 6C11.5 7.5 15 8 15 8C15 8 11.5 8.5 10 10C8.5 11.5 8 15 8 15C8 15 7.5 11.5 6 10C4.5 8.5 1 8 1 8C1 8 4.5 7.5 6 6C7.5 4.5 8 1 8 1Z"
      fill="currentColor"
    />
  </svg>
);

export const SearchIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.8" />
    <line
      x1="10.5"
      y1="10.5"
      x2="14.5"
      y2="14.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const tabs = [
  { id: "generate", label: "Generate", Icon: SparkleIcon },
  { id: "search", label: "Search", Icon: SearchIcon },
];

export default function GenerateSearchToggle() {
  const [active, setActive] = useState("generate");

  const handleClick = (id: string) => {
    setActive(id);
  };

  return (
    <div className="inline-flex items-center bg-zinc-800 rounded-full p-1 gap-0.5">
      {tabs.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={`
              flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium
              transition-all duration-150 outline-none cursor-pointer
              ${
                isActive
                  ? "bg-zinc-700 text-white"
                  : "bg-transparent text-zinc-500 hover:text-zinc-300"
              }
            `}
          >
            <Icon />
            {label}
          </button>
        );
      })}
    </div>
  );
}
