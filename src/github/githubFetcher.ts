import { GithubContext } from "./githubContext";

const baseUrl = "https://api.github.com";

export type GithubFetcherOptions<TBody, THeaders, TQueryParams, TPathParams> = {
  url: string;
  method: string;
  body?: TBody;
  headers?: THeaders;
  queryParams?: TQueryParams;
  pathParams?: TPathParams;
} & GithubContext["fetcherOptions"];

export async function githubFetch<
  TData,
  TBody extends {} | undefined,
  THeaders extends {},
  TQueryParams extends {},
  TPathParams extends {}
>({
  url,
  method,
  body,
  headers,
  pathParams,
  queryParams,
}: GithubFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams
>): Promise<TData> {
  const response = await window.fetch(
    `${baseUrl}
    ${resolveUrl(url, queryParams, pathParams)}`,
    {
      method: method.toUpperCase(),
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    }
  );
  if (!response.ok) {
    // TODO validate & parse the error to fit the generated error types
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

const resolveUrl = (
  url: string,
  queryParams: Record<string, string> = {},
  pathParams: Record<string, string> = {}
) => {
  let query = new URLSearchParams(queryParams).toString();
  if (query) query = `?${query}`;
  return url.replace(/\{\w*\}/g, (key) => pathParams[key.slice(1, -1)]) + query;
};
