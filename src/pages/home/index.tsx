import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import routes from "pages/routes";

export default function Home() {
  const { t } = useTranslation();

  return <Link to={routes.deleteAccount}>{t("Delete account")}</Link>;
}
