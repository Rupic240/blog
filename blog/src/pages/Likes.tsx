import ErrorPopup from "@/components/ErrorPopup";
import Loader from "@/components/Loader";
import UserList from "@/components/UserList";
import { fetchCommentLike, fetchPostLike } from "@/lib/fetcher";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function Likes() {
    const { id, type } = useParams();
    const { isLoading, isError, error, data } = useQuery(
        ['users', id, type], () => {
            if (type === 'comment') {
                return fetchCommentLike(Number(id));
            } else {
                return fetchPostLike(Number(id));
            }
        }
    )


    if (isError) {
        return <ErrorPopup text={(error as Error).message} />
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <>
            <UserList title="Likes" data={data} />
        </>
    )
}
