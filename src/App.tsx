import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  List,
  ListItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";
import { useSearchUsers } from "./github/githubComponents";
import { AuthProvider } from "./useAuth";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Users />
      </AuthProvider>
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
      <Alert status="error" maxWidth="lg" margin="1">
        <AlertIcon />
        <Text>{error.message}</Text>
        <Link
          href={error.documentation_url}
          isExternal
          color="red.900"
          marginLeft="1"
        >
          <ExternalLinkIcon />
        </Link>
      </Alert>
    );
  }

  return (
    <Box width="lg" borderRadius="md" margin="1" padding="4">
      <InputGroup>
        <Input
          placeholder="username"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {isLoading && (
          <InputRightElement
            children={<Spinner color="teal.400" size="sm" />}
          />
        )}
      </InputGroup>
      <List spacing={3} padding="2">
        {data?.items.map((item) => (
          <ListItem key={item.id}>🙂 {item.login}</ListItem>
        ))}
        {data?.items.length === 0 && (
          <ListItem>🙈 Nobody found with this username</ListItem>
        )}
      </List>
    </Box>
  );
}

export default App;
