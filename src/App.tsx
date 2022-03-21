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
  const [q, setQ] = useState("");
  const { data, error, isLoading } = useSearchUsers(
    {
      queryParams: { q },
    },
    {
      enabled: Boolean(q),
    }
  );

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
        <a href={error.documentation_url}>Documentation</a>
      </div>
    );
  }

  return (
    <div>
      <input value={q} onChange={(e) => setQ(e.target.value)} />
      {isLoading ? (
        <div>Loading…</div>
      ) : (
        <ul>
          {data?.items.map((item) => (
            <li key={item.id}>{item.login}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
