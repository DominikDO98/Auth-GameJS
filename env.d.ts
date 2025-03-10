export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      githubClientID: string;
      githubClientSecret: string;
      authorizeURL: string;
      tokenURL: string;
      apiURLBase: string;
      baseURL: string;
      frontendURL: string;

      MONGODB_DB: string;
      MONGODB_URI: string;
    }
  }
}
