import KeycloakMock, { customize } from 'keycloak-js-mock';

customize.profile({
  username: 'myUserName',
});

const keycloak = KeycloakMock();
keycloak.init({}).then(() => {
  console.log('token', keycloak.token);
});
