import { Title } from "@mantine/core";
import type { MetaFunction } from "@remix-run/cloudflare";
import { useAppConfig } from "~/app-config";

export const meta: MetaFunction = () => {
  return [
    {title: "PubKey Starter"},
    {name: "description", content: "Welcome to PubKey Starter!"},
  ];
};

export default function Index() {
  const {config} = useAppConfig()
  return (
    <div>
      <div>
        <header>
          <Title>
            Welcome to PubKey Starter!
          </Title>
        </header>
      </div>
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </div>
  );
}

