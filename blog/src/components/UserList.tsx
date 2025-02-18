import { useTheme } from "@/contexts/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import FollowBtn from "./FollowBtn";

interface UserListProps {
    title: string,
    data: any[]
}

export default function UserList({ title, data }: UserListProps) {

    const { auth } = useTheme();

    return (
        <div>
            <h1 className="text-4xl font-semibold mb-8">{title}</h1>

            <ul>
                {
                    data.map(item => {
                        return (
                            <li key={item.id} className="flex items-center justify-between gap-4 mb-5">
                                <div className="flex items-center gap-3">
                                    <Link to={`/profile/${item.user.id}`}>
                                        <Avatar className="w-20 h-20 text-3xl font-semibold rounded-full">
                                            <AvatarImage src="/" alt="profile" />
                                            {
                                                auth === null ? (
                                                    <UserIcon className="w-full h-full p-2" />
                                                ) : (
                                                    <AvatarFallback>{item.user.name[0]}</AvatarFallback>
                                                )
                                            }
                                        </Avatar>
                                    </Link>

                                    <h2>
                                        <span className="text-lg">{item.user.name}</span>
                                        <br />
                                        <span className="dark:text-white/60">{item.user.bio}</span>
                                    </h2>
                                </div>

                                <FollowBtn user={item.user} />
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
