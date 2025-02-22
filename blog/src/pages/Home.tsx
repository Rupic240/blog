import { useState } from "react";
import Item from "../components/Item";
import List from "../components/List";
import Form from "../components/Form";
import { useTheme } from "@/contexts/theme-provider";
import { useMutation, useQuery } from "react-query";

import { queryClient } from "@/AppRouter";
import ErrorPopup from "../components/ErrorPopup";
import Loader from "@/components/Loader";
import { fetchFollowingPosts, fetchPosts, getToken, postPost } from "@/lib/fetcher";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button";

const api = import.meta.env.VITE_API;

export default function Home() {
  const { auth } = useTheme();
  const { showForm, setGlobalMsg } = useTheme();
  const token = getToken();
  const [showLatest, setShowLatest] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  
  const { isLoading, isError, error, data } = useQuery<any[]>(
    ['posts', showLatest, page],
    () => {
      if (showLatest) return fetchPosts(page, limit);
      else return fetchFollowingPosts();
    },
    {
      keepPreviousData: true,
    }
  );
  
  const add = useMutation(async (content: string) => postPost(content), {
    onSuccess: async post => {
      await queryClient.cancelQueries('posts');
      queryClient.setQueryData(['posts', showLatest, page], (old: any) => [post, ...old]);
      setGlobalMsg('An item added.');
    }
  });

  const remove = useMutation(
    async (id: number) => {
      await fetch(`${api}/content/posts/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    },
    {
      onMutate: id => {
        queryClient.cancelQueries("posts");
        queryClient.setQueriesData(["posts", showLatest, page], (old: any) => {
          return old.filter((item: any) => item.id !== id);
        });
        setGlobalMsg("An item deleted.");
      }
    }
  );

  if (isError) {
    return <ErrorPopup text={(error as Error).message} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {showForm && <Form add={add.mutate} />}

      {auth && (
        <div className="w-full flex items-center justify-center gap-8 mx-auto mb-4">
          <Button
            variant={null}
            disabled={showLatest}
            onClick={() => {
              setShowLatest(true);
              setPage(1);
            }}
            className="uppercase"
          >
            Latest
          </Button>
          <span className="text-xl">|</span>
          <Button
            variant={null}
            disabled={!showLatest}
            onClick={() => {
              setShowLatest(false);
              setPage(1);
            }}
            className="uppercase"
          >
            Following
          </Button>
        </div>
      )}

      <List>
        {data?.map(item => {
          return (
            <Item
              key={item.id}
              item={item}
              remove={remove.mutate}
            />
          );
        })}
      </List>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPage(old => Math.max(old - 1, 1))}
              className={`${page === 1 ? "pointer-events-none opacity-50" : ""}`}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{page}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => setPage(old => old + 1)}
              className={`${page >= (data?.length ?? 0) ? "pointer-events-none opacity-50" : ""}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
