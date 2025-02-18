import ErrorPopup from "@/components/ErrorPopup";
import FollowBtn from "@/components/FollowBtn";
// import Item from "@/components/Item";
import Loader from "@/components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/contexts/theme-provider";
import { fetchUser } from "@/lib/fetcher";
import { UserIcon } from "lucide-react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function Profile() {

  const { id } = useParams();
  const { auth } = useTheme();

  const { isLoading, isError, error, data } = useQuery(
    `users/${id}`,
    async () => fetchUser(Number(id))
  );

  if (isError) {
    return <ErrorPopup text={(error as Error).message} />
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-16 mb-10">
        <div className="relative w-full h-44 bg-[#404040] dark:bg-[#373737] rounded-xl">

          <Avatar className="absolute -bottom-12 right-1/2 translate-x-1/2 w-28 h-28 text-3xl font-semibold rounded-full">
            <AvatarImage src="/" alt="profile" />
            {
              !auth ? (
                <UserIcon className="w-full h-full bg-pink-700 p-2" />
              ) : (
                <AvatarFallback>{data.name[0]}</AvatarFallback>
              )
            }
          </Avatar>

        </div>

        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl text-center font-semibold mb-2">{data.name}</h1>
          <p className="dark:text-white/70 text-lg text-center text-gray-800/80">{data.bio}</p>

          <div className="flex gap-10">
            <h1>Followers - {data.following ? data.following.length : 0}</h1>
            <h1>Following - {data.followers ? data.followers.length : 0}</h1>
          </div>

          <FollowBtn user={data} />
        </div>

      </div>

      {/* <Item
        key={1}return <Loader />
        remove={() => { }}
        item={{
          id: 1,
          content: "A post content from Alice.",
          name: "Alice"
        }}
      /> */}
    </div>
  )
}
