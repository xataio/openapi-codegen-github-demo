import { Box, Button, Input, Link, Text } from "@chakra-ui/react";
import React, { createContext, useContext, useState } from "react";
import { useQueryClient } from "react-query";

const authContext = createContext<{ token: null | string }>({
  token: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const key = "githubToken";
  const [token, setToken] = useState(localStorage.getItem(key));
  const [draftToken, setDraftToken] = useState("");
  const queryClient = useQueryClient();

  return (
    <authContext.Provider value={{ token }}>
      {token ? (
        <>
          {children}
          <Button
            position="absolute"
            top="2"
            right="2"
            colorScheme="teal"
            onClick={() => {
              setToken(null);
              localStorage.removeItem(key);
              queryClient.clear();
              queryClient.invalidateQueries([]);
            }}
          >
            Disconnect
          </Button>
        </>
      ) : (
        <Box
          width="xl"
          borderRadius="md"
          borderColor="teal.400"
          borderWidth="thin"
          margin="1"
          padding="4"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setToken(draftToken);
              localStorage.setItem(key, draftToken);
            }}
          >
            <Text>Please enter a github personal access token</Text>
            <Input
              autoFocus
              marginY="2"
              placeholder="my token"
              value={draftToken}
              onChange={(e) => setDraftToken(e.target.value)}
            ></Input>
            <Link fontSize="sm" href="https://github.com/settings/tokens">
              https://github.com/settings/tokens
            </Link>
          </form>
        </Box>
      )}
    </authContext.Provider>
  );
}

export const useToken = () => {
  const { token } = useContext(authContext);

  return token;
};
