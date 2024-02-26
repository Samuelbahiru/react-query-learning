import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

  const queryClient = useQueryClient();

  // useQuery is when we want to get our state from the server, not to change
  // where as, useMutation is for the case we want to change or create a new state from the server
  // server state is, the data we have/got from the server

  //query
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: () => wait(1000).then(() => [...POSTS]),
  });

  // mutation
  const newPostMutation = useMutation({
    mutationFn: (title) => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title })
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
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
        <button onClick={() => newPostMutation.mutate("New Post")}>
          Add Post
        </button>
      </div>
    </>
  );
}

function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export default App;
