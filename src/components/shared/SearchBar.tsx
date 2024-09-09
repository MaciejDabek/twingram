import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LucideSearch } from "lucide-react";
import { useDebounce } from "use-debounce";

import { Input } from "../ui/input";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [debounceQuery] = useDebounce(query, 500);

  useEffect(() => {
    setSearchParams((params) => {
      if (debounceQuery) params.set("q", debounceQuery);
      else params.delete("q");

      return params;
    });
  }, [debounceQuery, searchParams, setSearchParams]);

  return (
    <div className="flex gap-1 items-center px-4 w-full max-w-[600px] rounded-lg text-slate-50 bg-zinc-900 border border-zinc-800 focus-within:ring-2 focus-within:ring-zinc-400">
      <LucideSearch className="text-[24px] text-lime-400/90" />
      <Input
        type="text"
        placeholder="Search"
        className="bg-transparent border-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
