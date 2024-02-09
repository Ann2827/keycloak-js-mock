import { KeycloakMock } from '../lib';

// TODO: add tests
describe('KeycloakMock:', () => {
  const keycloak = new KeycloakMock();

  afterAll(() => {
    keycloak.logout();
  })

  test('init', async () => {
    await keycloak.init({  }).then((authenticated) => {
      expect(keycloak.token).not.toBeUndefined();
      expect(authenticated).toBe(true);
      expect(keycloak.authenticated).toBe(true);
    });
  });
});
