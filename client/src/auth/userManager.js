import { createUserManager } from "redux-oidc";

const userManagerConfig = {
  authority: `${window.location.protocol}//${window._env_.IDENTITY_PROVIDER_URL}`,
  client_id: "dashboard",
  redirect_uri: `${window.location.protocol}//${window._env_.DASHBOARD_URL}/callback.html`,
  response_type: "code",
  scope: "openid profile nlp_api solr_api",
  silent_redirect_uri: `${window.location.protocol}//${window._env_.DASHBOARD_URL}/silent_renew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  revokeAccessTokenOnSignout: true,
  query_status_response_type: "code"
};

const userManager = createUserManager(userManagerConfig);

export default userManager;
