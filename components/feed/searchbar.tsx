import { SearchIcon } from "./genrateAndSearch";

export default function SearchBar() {
  return (
    <div className="space-y-6 mb-6">
      <h1 className="font-bold text-4xl">Search</h1>

      <div className="relative w-fit">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="w-100 bg-zinc-900 rounded-full pl-10 pr-5 py-2.5 border border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-700"
        />
      </div>
    </div>
  );
}