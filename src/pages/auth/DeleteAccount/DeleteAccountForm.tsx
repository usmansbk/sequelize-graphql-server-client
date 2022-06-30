import { LoadingButton } from "@mui/lab";
import { Stack, Alert, AlertTitle } from "@mui/material";
import { useRequestDeleteAccount } from "api/graphql/hooks/auth";
import { useTranslation } from "react-i18next";

export default function DeleteAccountForm() {
  const { t } = useTranslation();
  const { loading, onRequestDelete, response, reset } =
    useRequestDeleteAccount();

  return (
    <Stack spacing={2}>
      {!!response && (
        <Alert
          severity={response.success ? "success" : "error"}
          onClose={reset}
        >
          <AlertTitle>{response.message}</AlertTitle>
        </Alert>
      )}
      <LoadingButton
        loading={loading}
        disabled={loading}
        onClick={onRequestDelete}
      >
        {t("Delete Account")}
      </LoadingButton>
    </Stack>
  );
}
