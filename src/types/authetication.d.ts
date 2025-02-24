export interface IGrant {
  access_token: string;
  token_type: string;
  scope: string;
}

export interface IError {
  error: string;
  error_description: string;
  error_uri: string;
}

export interface IGithubUser {
  login: string;
  id: number;
  avatar_url: string;
}
