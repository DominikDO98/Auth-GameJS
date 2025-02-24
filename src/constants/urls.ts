import "dotenv/config";

export const AUTHORIZE_URL = `${process.env.authorizeURL}?response_type=code&client_id=${process.env.githubClientID}&redirect_uri=${process.env.baseURL}`;
export const TOKEN_URL = `${process.env.tokenURL}?grant_type=authorization_code&client_id=${process.env.githubClientID}&client_secret=${process.env.githubClientSecret}&redirect_uri=${process.env.baseURL}`;
export const USER_URL = `${process.env.apiURLBase}user`;
export const FRONTEND_URL = `${process.env.frontendURL}`;
