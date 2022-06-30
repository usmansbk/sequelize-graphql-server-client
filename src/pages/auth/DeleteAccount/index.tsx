import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDeleteAccount } from "api/graphql/hooks/auth";
import { Box, LinearProgress, Alert, AlertTitle } from "@mui/material";
import DeleteAccountForm from "./DeleteAccountForm";

export default function DeleteAccount() {
  const { loading, onDeleteAccount, reset, response } = useDeleteAccount();
  const [params] = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    if (token) {
      onDeleteAccount({ token });
    }
  }, [token]);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box>
      {!!response && (
        <Alert
          severity={response.success ? "success" : "error"}
          onClose={reset}
        >
          <AlertTitle>{response.message}</AlertTitle>
        </Alert>
      )}
      <DeleteAccountForm />
    </Box>
  );
}
