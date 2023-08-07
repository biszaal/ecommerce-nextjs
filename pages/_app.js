// pages/_app.js
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import { UserProvider } from "../src/contexts/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
