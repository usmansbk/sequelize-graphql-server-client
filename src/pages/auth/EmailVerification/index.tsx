import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Alert, AlertTitle, Box, Button, LinearProgress } from "@mui/material";
import { useVerifyEmail } from "api/graphql/hooks/auth";
import routes from "pages/routes";
import EmailVerificationForm from "./EmailVerificationForm";

function VerifyEmail() {
  const { t } = useTranslation();
  const { onVerifyEmail, response, loading } = useVerifyEmail();
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      onVerifyEmail({ token });
    }
  }, [token]);

  return (
    <Box display="flex" flexGrow={1} flexDirection="column">
      {loading && <LinearProgress />}
      {response && (
        <Alert
          severity={response.success ? "success" : "error"}
          action={
            response.success && (
              <Button
                color="inherit"
                onClick={() => navigate(routes.home, { replace: true })}
              >
                {t("Continue")}
              </Button>
            )
          }
        >
          <AlertTitle>{response.message}</AlertTitle>
        </Alert>
      )}
      {!token && <EmailVerificationForm />}
    </Box>
  );
}

export default VerifyEmail;
