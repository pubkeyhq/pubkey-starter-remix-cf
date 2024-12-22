import React, { ReactNode } from 'react';

export interface AppConfig {
  solanaCluster: string;
  solanaEndpoint: string;
}

export interface AppConfigProviderContext {
  config: AppConfig;
}

const AppConfigContext = React.createContext<AppConfigProviderContext>({} as AppConfigProviderContext);

export function AppConfigProvider(props: { children: ReactNode, config: AppConfig }) {
  const {children} = props;

  const value = {
    config: props.config,
  };
  return (
    <AppConfigContext.Provider value={value}>
      {children}
    </AppConfigContext.Provider>
  );
}

export function useAppConfig() {
  return React.useContext(AppConfigContext);
}
