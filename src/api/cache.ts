import { InMemoryCache } from "@apollo/client";
import { PaletteMode } from "@mui/material";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        auth: {
          read(value = null) {
            return value;
          },
        },
        theme: {
          read(value: PaletteMode = "light") {
            return value;
          },
        },
      },
    },
  },
});

export default cache;
