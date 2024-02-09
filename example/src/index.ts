import { customize, KeycloakMock } from 'keycloak-js-mock';
import Keycloak from 'keycloak-js';
import * as process from 'process';

customize.profile({
  username: 'myUserName',
});

const useMocked = true;
const keycloakInit = (): Keycloak => {
  if (useMocked) {
    return new KeycloakMock()
  }
  return new Keycloak();
}

const keycloak = keycloakInit();
keycloak.init({}).then(() => {
  console.log('token', keycloak.token);
  console.log('profile', keycloak.profile);
  process.exit();
});

exports = {};
