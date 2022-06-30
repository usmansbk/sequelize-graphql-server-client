import axios from "axios";
import toast from "react-hot-toast";
import env from "config/env";
import Sentry from "config/sentry";
import cache from "api/cache";
import { AUTH_STATE } from "api/graphql/queries/app";

const v1 = axios.create({
  baseURL: env.V1_ENDPOINT,
});

v1.interceptors.request.use(
  (config) => {
    const data: any = cache.readQuery({
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

v1.interceptors.response.use(
  (response) => {
    toast.success(response.data.message);
    return response;
  },
  (error) => {
    const { message, extensions, originalError } = error;
    if (extensions.code === "UNAUTHENTICATED") {
      toast.error(message);
      cache.writeQuery({
        query: AUTH_STATE,
        data: {
          auth: null,
        },
      });
    } else {
      toast.error(error?.response?.data.message || error.message);
      Sentry.captureException(originalError);
    }
    return Promise.reject(error);
  }
);

export default v1;
