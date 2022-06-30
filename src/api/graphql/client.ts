import {
  ApolloClient,
  ApolloLink,
  Context,
  from,
  HttpLink,
} from "@apollo/client";
import { SentryLink } from "apollo-link-sentry";
import { onError } from "@apollo/client/link/error";
import toast from "react-hot-toast";
import i18n from "config/i18n";
import env from "config/env";
import Sentry from "config/sentry";
import axios from "config/axios";
import apolloCache from "./cache";
import { AUTH_STATE } from "./queries/auth";

const httpLink = new HttpLink({
  uri: env.GRAPHQL_ENDPOINT,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach((e) => {
      const { message, extensions, originalError } = e;
      if (extensions.code === "UNAUTHENTICATED") {
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

const sentryLink = new SentryLink({
  uri: env.GRAPHQL_ENDPOINT,
});

const client = new ApolloClient({
  name: env.APP_NAME,
  version: env.APP_VERSION,
  link: from([sentryLink, errorLink, authLink, httpLink]),
  cache: apolloCache,
});

axios.interceptors.request.use(
  (config) => {
    const data = client.readQuery({
      query: AUTH_STATE,
    });

    const token = data?.auth?.accessToken || "";

    return {
      ...config,
      headers: {
        ...config.headers,
        authorization: token && `Bearer ${token}`,
        client_id: env.CLIENT_ID,
      },
    };
  },
  (error) => {
    toast.error(error.message);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    toast.success(response.data.message);
    return response;
  },
  (error) => {
    toast.error(error?.response?.data.message || error.message);
    return Promise.reject(error);
  }
);

export default client;
