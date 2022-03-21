import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ListRepository />
    </QueryClientProvider>
  );
}

function ListRepository() {
  return <div>todo</div>;
}

export default App;
