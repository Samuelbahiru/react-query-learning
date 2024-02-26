import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

function App() {
  const POSTS = [
    {
      id: "1",
      title: "Post 1",
    },
    {
      id: "2",
      title: "Post 2",
    },
  ];

  const postsQuery = useQuery({
    queryKey: ["getting posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  if (postsQuery.isLoading) {
    return <h1>is Loading...</h1>;
  }
  if (postsQuery.error) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  return (
    <>
      <div>
        {postsQuery.data.map((post) => {
          return <h1 key={post.id}>{post.title}</h1>;
        })}
      </div>
    </>
  );
}

function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default App;
