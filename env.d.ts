export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      githubClientID: string;
      githubClientSecret: string;
      authorizeURL: string;
      tokenuRL: string;
      apiURLBase: string;
      baseURL: string;

      MONGODB_DB: string;
      MONGODB_URI: string;
    }
  }
}
