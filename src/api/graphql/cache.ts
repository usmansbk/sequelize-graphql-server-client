import { InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        auth: {
          read(value = null) {
            return value;
          },
        },
      },
    },
  },
});

export default cache;
