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
import { useState } from "react";
import { Button } from "@/components/ui/button";


const api = import.meta.env.VITE_API;

export default function Home() {

  const { auth } = useTheme();
  const { showForm, setGlobalMsg } = useTheme();
  const token = getToken();
  const [showLatest, setShowLatest] = useState(true);

  const { isLoading, isError, error, data } = useQuery<any[]>(
    ['posts', showLatest],
    () => {
      if (showLatest)  return fetchPosts()
      else return fetchFollowingPosts();
    }
  );

  const add = useMutation(async (content: string) => postPost(content), {
    onSuccess: async post => {
      await queryClient.cancelQueries('posts');
      queryClient.setQueryData(['posts', showLatest], (old: any) => [post, ...old]);
      setGlobalMsg('An item added.')
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
        queryClient.setQueriesData(["posts", showLatest], (old: any) => {
          return old.filter((item: any) => item.id !== id)
        });
        setGlobalMsg("An item deleted.")
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
      {showForm && <Form add={add.mutate} />}

      {
        auth && (
          <div className="w-full flex items-center justify-center gap-8 mx-auto mb-4">
            <Button
              variant={null}
              disabled={showLatest}
              onClick={() => {
                setShowLatest(true)
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
                setShowLatest(false)
              }}
              className="uppercase"
            >
              Following
            </Button>
          </div>
        )
      }

      <List>
        {
          data?.map(item => {
            return (
              <Item
                key={item.id}
                item={item}
                remove={remove.mutate}
              />
            )
          })
        }
      </List>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
