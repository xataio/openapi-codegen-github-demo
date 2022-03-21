import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSearchUsers } from "./github/githubComponents";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}

function Users() {
  const { data, error, isLoading } = useSearchUsers({
    queryParams: { q: "fabien" },
  });

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
        <a href={error.documentation_url}>Documentation</a>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading…</div>;
  }

  return (
    <ul>
      {data?.items.map((item) => (
        <li key={item.id}>{item.login}</li>
      ))}
    </ul>
  );
}

export default App;
