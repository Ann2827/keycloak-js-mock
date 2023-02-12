import { KeycloakMock } from '../lib';

// TODO: add tests
describe('KeycloakMock:', () => {
  test('init', async () => {
    const keycloak = KeycloakMock();
    await keycloak.init({  });
    expect(keycloak.token).not.toBeUndefined();
    expect(keycloak.authenticated).toBe(true);
  });
});
