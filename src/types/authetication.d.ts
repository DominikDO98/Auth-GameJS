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
  id: number;
  login: string;
  avatar_url: string;
}

export interface IGithubUserDO {
  id: number;
  login: string;
  avatarUrl: string;
}
