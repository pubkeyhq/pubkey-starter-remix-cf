import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, } from "@remix-run/react";

import "./tailwind.css";
import { AppConfig, AppConfigProvider } from "~/app-config";

export const links: LinksFunction = () => [
  {rel: "preconnect", href: "https://fonts.googleapis.com"},
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function loader({context}: LoaderFunctionArgs) {
  const {env} = context.cloudflare;

  const config: AppConfig = {
    solanaCluster: env.SOLANA_CLUSTER,
    solanaEndpoint: env.SOLANA_ENDPOINT_PUBLIC
  }

  return {config}
}

export function Layout({children}: { children: React.ReactNode }) {
  const {config} = useLoaderData<typeof loader>();
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <Meta/>
      <Links/>
    </head>
    <body>
    <AppConfigProvider config={config}>
      {children}
    </AppConfigProvider>
    <ScrollRestoration/>
    <Scripts/>
    </body>
    </html>
  );
}

export default function App() {
  return <Outlet/>;
}
