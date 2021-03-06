import {
  ApolloClient,
  ApolloLink,
  Context,
  from,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import toast from "react-hot-toast";
import i18n from "config/i18n";
import env from "config/env";
import Sentry from "config/sentry";
import apolloCache from "../cache";
import { AUTH_STATE } from "./queries/app";

const httpLink = new HttpLink({
  uri: env.GRAPHQL_ENDPOINT,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((e) => {
      const { message, extensions, originalError } = e;
      if (
        extensions.code === "UNAUTHENTICATED" ||
        extensions.code === "FORBIDDEN"
      ) {
        toast.error(message);
        apolloCache.writeQuery({
          query: AUTH_STATE,
          data: {
            auth: null,
          },
        });
      } else {
        toast.error(i18n.t("Something went wrong"));
        Sentry.captureException(originalError);
      }
    });
  }

  if (networkError) {
    toast.error(i18n.t("Network error"));
  }
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers, cache }: Context) => {
    const data = cache.readQuery({
      query: AUTH_STATE,
    });

    const token = data?.auth?.accessToken || "";
    return {
      headers: {
        ...headers,
        authorization: token && `Bearer ${token}`,
        client_id: env.CLIENT_ID,
      },
    };
  });

  return forward(operation);
});

const client = new ApolloClient({
  name: env.APP_NAME,
  version: env.APP_VERSION,
  link: from([errorLink, authLink, httpLink]),
  cache: apolloCache,
});

export default client;
