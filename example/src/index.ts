// import KeycloakMock, { customize } from 'keycloak-js-mock';
import { KeycloakMock, customize } from 'keycloak-js-mock';
import * as process from 'process';

customize.profile({
  username: 'myUserName',
});

const keycloak = KeycloakMock();
keycloak.init({}).then(() => {
  console.log('token', keycloak.token);
  console.log('profile', keycloak.profile);
  process.exit();
});

exports = {};
