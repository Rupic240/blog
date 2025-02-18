import ErrorPopup from "@/components/ErrorPopup";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { fetchSearch } from "@/lib/fetcher";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { Link } from "react-router-dom";
import FollowBtn from "@/components/FollowBtn";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Search() {

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const { isLoading, isError, error, data } = useQuery(
    ["search", debouncedQuery],
    () => {
      return fetchSearch(debouncedQuery)
    }
  );

  if (isError) {
    return <ErrorPopup text={(error as Error).message} />
  }

  return (
    <>
      <Input
        className="w-full h-12 mb-14"
        placeholder="Search user..."
        onKeyUp={e => setQuery((e.target as HTMLInputElement).value)} />
      {
        isLoading ? (
          <Loader />
        ) : (
          <ul>
            {
              data.map((user: any) => {
                return (
                  <li key={user.id} className="flex items-center justify-between gap-4 mb-5">
                    <div className="flex items-center gap-5">
                      <Link to={`/profile/${user.id}`}>
                        <Avatar className="w-20 h-20 text-3xl font-semibold rounded-full">
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                      </Link>

                      <h2>
                        <span className="text-lg">{user.name}</span>
                        <br />
                        <span className="dark:text-white/60">{user.bio}</span>
                      </h2>
                    </div>

                    <FollowBtn user={user} />
                  </li>
                )
              })
            }
          </ul>
        )
      }
    </>
  )
}
