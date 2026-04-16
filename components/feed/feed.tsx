"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import FeedCard from "./feedcard";
import { fetchFeed } from "@/lib/features/feed/feedAPi";
import GenerateSearchToggle from "./genrateAndSearch";
import SearchBar from "./searchbar";

export default function Feed() {
  const { feedData, loading, error } = useAppSelector((state) => state.feed);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="py-6 px-6">
      <div>
        <div className="flex justify-center mb-2">
          <GenerateSearchToggle />
        </div>
        <div>
          <SearchBar />
        </div>
        <div className="py-4">
          
          <hr className=" border-zinc-700 my-4" />
          <div className="text-center -mt-7.5 ">feed</div>
        </div>
        <div
          className="max-w-2xl mx-auto "
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {feedData.map((post) => (
            <FeedCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
