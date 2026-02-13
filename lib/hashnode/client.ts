type GraphQLError = { message: string };

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: GraphQLError[];
};

export type HashnodeRequestOptions = {
  revalidate?: number;
  cache?: RequestCache;
};

export async function hashnodeRequest<TData, TVariables extends Record<string, unknown> | undefined>(
  query: string,
  variables?: TVariables,
  options?: HashnodeRequestOptions,
): Promise<TData> {
  const useRevalidate = typeof options?.revalidate === "number" && options.revalidate > 0;
  const noStore = options?.cache === "no-store";
  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    cache: options?.cache,
    next: noStore ? { revalidate: 0 } : useRevalidate ? { revalidate: options!.revalidate } : undefined,
  });

  if (!res.ok) {
    throw new Error(`Hashnode GraphQL request failed (${res.status})`);
  }

  const json = (await res.json()) as GraphQLResponse<TData>;

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("\n"));
  }

  if (!json.data) throw new Error("Hashnode GraphQL response missing data");

  return json.data;
}


