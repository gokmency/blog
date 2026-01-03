type GraphQLError = { message: string };

type GraphQLResponse<TData> = {
  data?: TData;
  errors?: GraphQLError[];
};

export async function hashnodeRequest<TData, TVariables extends Record<string, unknown> | undefined>(
  query: string,
  variables?: TVariables,
  options?: { revalidate?: number },
): Promise<TData> {
  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: options?.revalidate ? { revalidate: options.revalidate } : undefined,
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


