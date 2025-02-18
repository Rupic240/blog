import { useTheme } from "@/contexts/theme-provider";
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useMutation } from "react-query";
import { deleteCommentLike, deletePostLike, postCommentLike, postPostLike } from "@/lib/fetcher";
import { queryClient } from "@/AppRouter";

interface LikeBtnProps {
    item: {
        id: number,
        postLikes: any[]
    },
    comment: boolean
}

export default function LikeBtn({ item, comment }: LikeBtnProps) {

    const navigate = useNavigate();
    const { auth } = useTheme();

    const isLiked = () => {
        if (!auth) return false;
        if (!item.postLikes) return false;

        return item.postLikes.find(like => like.userId == auth.id);
    }

    const likePost = useMutation((id: number) => postPostLike(id), {
        onSuccess: () => {
            queryClient.refetchQueries('posts')
            queryClient.refetchQueries('comments')
        }
    })

    const likeComment = useMutation((id: number) => postCommentLike(id), {
        onSuccess: () => {
            queryClient.refetchQueries('comments');
        }
    });

    const unlikePost = useMutation((id: number) => deletePostLike(id), {
        onSuccess: () => {
            queryClient.refetchQueries('posts')
            queryClient.refetchQueries('comments')
        }
    });

    const unlikeComment = useMutation((id: number) => deleteCommentLike(id), {
        onSuccess: () => {
            queryClient.refetchQueries('comments')
        }
    })

    return (
        <div className="flex items-center">
            {
                isLiked() ? (
                    <Button
                        variant={null}
                        onClick={e => {
                            comment ? unlikeComment.mutate(item.id) : unlikePost.mutate(item.id);
                            e.stopPropagation();
                        }}
                        className="px-0 mr-2"
                    >
                        <FaHeart className="text-red-700 text-xl" />
                    </Button>
                ) : (
                    <Button
                        variant={null}
                        onClick={e => {
                            comment ? likeComment.mutate(item.id) : likePost.mutate(item.id);
                            e.stopPropagation();
                        }}
                        className="px-0 mr-2"
                    >
                        <FaRegHeart className="text-red-700 text-xl" />
                    </Button>
                )
            }
            <Button
                variant={null}
                onClick={e => {
                    if (comment) {
                        navigate(`/likes/${item.id}/comment`);
                    } else {
                        navigate(`/likes/${item.id}/post`)
                    }
                    e.stopPropagation();
                }}
            >
                {item.postLikes ? item.postLikes.length : 0}
            </Button>
        </div>
    )
}
