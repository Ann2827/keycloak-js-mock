# Keycloak Js Mock

[![NPM](https://img.shields.io/npm/v/keycloak-js-mock.svg)](https://www.npmjs.com/package/keycloak-js-mock)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

JavaScript adapter that does not request data in Keycloak.

It can be used to launch a frontend application without a Keycloak in docker or for testing.

[keycloak-js source for 21.1.2](https://github.com/keycloak/keycloak/tree/21.1.2/js/libs/keycloak-js)

## Getting Started

```sh
npm install -D keycloak-js-mock
```

## 🚀 Usage

KeycloakMock returns an identical instance.
The library generates a token without the help of Keycloak based on the received profile (by default, all the necessary data is already written).

**To start the application without connecting to KK:**
```ts
import Keycloak from 'keycloak-js';
import { KeycloakMock, customize } from 'keycloak-js-mock';

const keycloakInit = (mocked: boolean): Keycloak => {
  if (mocked) {
    customize.profile({
      username: 'myUserName',
    });
    
    return new KeycloakMock();
  }

  return new Keycloak({
    url: REACT_APP_KEYCLOAK_URL,
    realm: KEYCLOAK_REALM_NAME,
    clientId: KEYCLOAK_CLIENT_ID,
  });
};

const keycloak = keycloakInit(true);

await keycloak.init({ pkceMethod: 'S256', onLoad: 'login-required' }).then(() => {
  keycloak.authenticated // true
  keycloak.token // eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldU...
  keycloak.tokenParsed // { username: 'myUserName', email: 'j.snow@google.com', ... }
});

```

**For jest testing:**
```ts
/**
 * To run using @testing-library/jest-dom
 * @jest-environment node
 */
import Keycloak, { KeycloakConfig } from 'keycloak-js';
import { customize, KeycloakMock as mockKeycloak } from 'keycloak-js-mock';

jest.mock('keycloak-js', () => {
  return jest.fn().mockImplementation((config?: KeycloakConfig | string) => {
    return new mockKeycloak(config);
  });
});

describe('KeycloakMock:', () => {
  const username = 'myTestUserName';
  let keycloak: Keycloak;

  beforeAll(() => {
    customize.profile({
      username,
    });
    keycloak = new Keycloak();
  });

  afterAll(() => {
    // In order to complete the test, do not forget to logout
    keycloak.logout();
  });

  test('init', async () => {
    await keycloak.init({}).then((authenticated) => {
      expect(authenticated).toBe(true);
      expect(keycloak.tokenParsed!.username).toBe(username);
    });
  });
});

```

## 📝 License

Copyright © 2024 [Bystrova Ann](https://github.com/Ann2827).<br />
This project is [MIT](https://github.com/Ann2827/keycloak-js-mock/blob/main/LICENSE) licensed.

## Contact <a name = "contact"></a>

Bystrova Ann - ann.bystrova96@mail.ru

Project Link: https://github.com/Ann2827/keycloak-js-mock
