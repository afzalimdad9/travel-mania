import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/rsuite.min.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const onRedirectCallback = (appState) => {
    router.push(appState?.returnTo || "/");
  };

  return (
    <Auth0Provider
      domain="dev-pe1d8oowhknqgbpb.us.auth0.com"
      clientId="TFK1JBFrZokx2WqJjL0yBnhtnzAp3XwF"
      redirectUri={typeof window !== "undefined" ? window.location.origin : ""}
      onRedirectCallback={onRedirectCallback}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}
