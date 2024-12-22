import '@mantine/core/styles.css'

import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, } from "@remix-run/react";
import { AppConfig, AppConfigProvider } from "~/app-config";

import stylesheet from './app.css?url'

export const links: LinksFunction = () => [
  {rel: 'stylesheet', href: stylesheet},
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
      <ColorSchemeScript defaultColorScheme="dark"/>
    </head>
    <body>
    <AppConfigProvider config={config}>
      <MantineProvider defaultColorScheme="dark">
        {children}
      </MantineProvider>
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
