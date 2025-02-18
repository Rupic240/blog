import { queryClient } from "@/AppRouter";
import ErrorPopup from "@/components/ErrorPopup";
import Item from "@/components/Item";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTheme } from "@/contexts/theme-provider";
import { getToken, postComment } from "@/lib/fetcher";
import { useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const api = import.meta.env.VITE_API;

export default function Comments() {

    const { id } = useParams();    
    const navigate = useNavigate();
    const token = getToken();
    const { auth } = useTheme();

    const commentRef = useRef<HTMLTextAreaElement>(null);

    const { setGlobalMsg } = useTheme();

    const { isLoading, isError, error, data } = useQuery('comments',
        async () => {
          const res = await fetch(`${api}/content/posts/${id}`);
          return res.json();
        }
    );  

    const removePost = useMutation(
        async (id: number) => {
            await fetch(`${api}/content/posts/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setGlobalMsg('A post deleted.');
            navigate('/');
        }
    );

    const removeComment = useMutation(
        async (id: number) => {
            await fetch(`${api}/content/comment/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        },
        {
            onMutate: id => {
                queryClient.cancelQueries("comments");
                queryClient.setQueriesData("comments", (old: any) => {
                    const updatedComment = old.comments.filter((comment: any) => comment.id !== id);
                    return { ...old, comments: updatedComment }
                });
                setGlobalMsg('A comment deleted.');
            }
        }
    );

    const handleSubmit = () => {
        const content = commentRef.current?.value;
        addComment.mutate(content)
    }

    const addComment = useMutation((content: string | undefined) => postComment({content: content ?? '', postId: Number(id)}), {
        onSuccess: async (content) => {
            await queryClient.cancelQueries('comments');
            queryClient.setQueryData('comments', (old: any) => {
                old.comments = [...old.comments, content]
                return {...old}
            } )
        }
    })

    if (isError) {
        return <ErrorPopup text={(error as Error).message} />
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <Item
                primary
                item={data}
                remove={removePost.mutate}
            />

            {
                data.comments.map((comment: any) => {                    
                    return (
                        <Item
                            comment
                            key={comment.id}
                            item={comment}
                            remove={removeComment.mutate}
                        />
                    )
                })
            }
            {auth && (
                <form
                className="h-52 mt-10"
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmit();
                    e.currentTarget.reset();
                }}
            >
                <Textarea
                    placeholder="Add a comment..."
                    className="h-28 resize-none"
                    ref={commentRef}
                />
                <Button
                    type="submit"
                    className="mt-3 w-full h-10"
                >
                    Reply
                </Button>
                </form>
            )}
        </>
    )
}
