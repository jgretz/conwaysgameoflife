export type UserIdentity = {
  username: string;
  roles: Array<string>;
  openIdConnectClientId: string;
  openIdConnectServerOrigin: string;
  openIdConnectSessionState: string;
  openIdConnectCheckSessionUrl: string;
};
