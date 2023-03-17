# Keycloak Js Mock

[![NPM](https://img.shields.io/npm/v/keycloak-js-mock.svg)](https://www.npmjs.com/package/keycloak-js-mock)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)

JavaScript adapter that does not request data in Keycloak.

It can be used to launch a frontend application without a Keycloak in docker or for testing.

## Getting Started

```sh
npm install -D keycloak-js-mock
```

## 🚀 Usage

KeycloakMock returns an identical instance.
The library generates a token without the help of Keycloak based on the received profile (by default, all the necessary data is already written).

```ts
import Keycloak from 'keycloak-js';
import { KeycloakMock, customize } from 'keycloak-js-mock';

const keycloakInit = (mocked: boolean): Keycloak.KeycloakInstance => {
  if (mocked) {
    customize.profile({
      username: 'myUserName',
    });
    
    return KeycloakMock();
  }

  return Keycloak({
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

## 📝 License

Copyright © 2023 [Bystrova Ann](https://github.com/Ann2827).<br />
This project is [MIT](https://github.com/Ann2827/keycloak-js-mock/blob/main/LICENSE) licensed.

## Contact <a name = "contact"></a>

Bystrova Ann - ann.bystrova96@mail.ru

Project Link: https://github.com/Ann2827/keycloak-js-mock
