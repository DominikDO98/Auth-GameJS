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

      RABBITMQ_DEFAULT_PASS: string;
      RABBITMQ_DEFAULT_USER: string;
      RABBITMQ_URL: string;

      TIMEOUT: string;

      PORT: string;
    }
  }
}
