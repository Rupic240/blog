import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { LucideTrash2, TimerIcon, UserCircle } from "lucide-react";
import { formatRelative } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/theme-provider";
import LikeBtn from "./LikeBtn";
import CommentBtn from "./CommentBtn";

interface ItemPrps {
    primary?: boolean,
    comment?: boolean,
    item: {
        id: number,
        content: string,
        user: {
            name: string,
            id: number
        },
        postLikes: any[],
        comments: any[],
        created: number
    };
    remove: (id: number) => void;
}

export default function Item({ primary, item, remove, comment = false }: ItemPrps) {

    const navigate = useNavigate();
    const { auth } = useTheme();


    return (
        <Card className="mb-4">
            {primary && <div className="w-full h-5 bg-lime-400 rounded-tr-sm rounded-tl-sm" />}
            <CardHeader>
                <div className="flex items-center gap-3">
                    <CardTitle>
                        <TimerIcon className="text-xl text-green-600" />
                    </CardTitle>
                    <CardDescription className="text-green-600">
                        {formatRelative(item.created, new Date())}
                    </CardDescription>
                </div>

                {
                    auth?.id === item.user.id && (
                        <Button
                            variant={null}
                            onClick={e => {
                                remove(item.id);
                                e.stopPropagation();
                            }}
                        >
                            <LucideTrash2 className="text-3xl text-red-700" />
                        </Button>
                    )
                }

            </CardHeader>

            <CardContent
                onClick={() => {
                    if (comment) return false;
                    navigate(`/comments/${item.id}`)
                }}
                className={`transition-all duration-300 ${!comment && 'cursor-pointer hover:bg-[#323232]'}`}
            >
                {item.content}
            </CardContent>

            <CardFooter>
                <div className="flex items-center">
                    <UserCircle className="text-xl" />
                    <span className="ml-3">{item.user.name}</span>
                </div>
                <div className="flex items-center">
                    <LikeBtn item={item} comment={comment} />
                    <CommentBtn item={item} comment={comment} />
                </div>
            </CardFooter>
        </Card>
    )
}