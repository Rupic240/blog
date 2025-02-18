import { useTheme } from "@/contexts/theme-provider"
import { Button } from "./ui/button";
import { useMutation } from "react-query";
import { deleteFollow, postFollow } from "@/lib/fetcher";
import { queryClient } from "@/AppRouter";

interface FollowBtnProps {
    user: {
        id: number,
        following: any[],
    }
}

export default function FollowBtn({ user }: FollowBtnProps) {

    const { auth } = useTheme();
    if (!auth) return <></>

    const isFollowing = () => {
        return user.following.find(item => item.followerId === auth.id)
    }

    const follow = useMutation((id: number) => postFollow(id), {
        onSuccess: async () => {
            await queryClient.refetchQueries('users')
            await queryClient.refetchQueries(`users/${user.id}`)
            await queryClient.refetchQueries('user')
            await queryClient.refetchQueries('search')
        }
    })


    const unfollow = useMutation((id: number) => deleteFollow(id), {
        onSuccess: async () => {
            await queryClient.refetchQueries('users')
            await queryClient.refetchQueries(`users/${user.id}`)
            await queryClient.refetchQueries('user')
            await queryClient.refetchQueries('search')
        }
    })

    return ( 
        <>
            {
                auth.id === user.id ? (
                    <></>
                ) : (
                    <Button
                        variant={isFollowing() ? 'outline' : 'default'}
                            onClick={e => {
                                if (isFollowing()) {
                                    unfollow.mutate(user.id)
                                } else {
                                    follow.mutate(user.id)
                                }
                                e.stopPropagation();
                        }}
                        className="rounded-full"
                    >

                        {isFollowing() ? 'following' : 'follow'}
                    </Button>
                )
            }
        </>
    )
}
