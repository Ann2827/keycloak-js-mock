import { customize, KeycloakMock } from 'keycloak-js-mock';
import Keycloak from 'keycloak-js';
import * as process from 'process';

customize.profile({
  username: 'myUserName',
});

const useMocked = true;
const keycloakInit = (): Keycloak.KeycloakInstance => {
  if (useMocked) {
    return KeycloakMock()
  }
  return Keycloak();
}

const keycloak = keycloakInit();
keycloak.init({}).then(() => {
  console.log('token', keycloak.token);
  console.log('profile', keycloak.profile);
  process.exit();
});

exports = {};
