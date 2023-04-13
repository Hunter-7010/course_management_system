import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import { Toaster } from "react-hot-toast";
import LayOut from "~/components/layout/Layout";
import Script from "next/script";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <LayOut>
        <Toaster />
        <Component {...pageProps} />
      </LayOut>
      <Script
        async
        defer
        data-website-id="979414d8-f015-4052-8c0a-cde2241884ff"
        src="https://umamianalytics.netlify.app/umami.js"
      />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
