# Contributing to Keycloak Js Mock

## Update version
1. Find the next major version in [keycloak-js](https://www.npmjs.com/package/keycloak-js?activeTab=versions).
   It is preferable to choose the latest minor and patch versions.
2. Check [release notes](https://www.keycloak.org/docs/24.0.1/release_notes/#adapters) for Adapters.
3. Check the [git history](https://github.com/keycloak/keycloak/tree/22.0.5/js/libs/keycloak-js) for the new version.
4. Set the new version in package.json for keycloak-js-mock.
5. Update keycloak-js source link in README.
6. Update keycloak-js peerDependencies and devDependencies versions in package.json and run `yarn upgrade keycloak-js`
   or remove `yarn.lock` and run `yarn install`. (Please use node version from package.json)
7. Update lib code.
8. Runs:
   - `yarn lint:fix`
   - `yarn test`
   - `yarn build`
   - `cd exmaple` and `yarn install` and them check with `yarn start`
9. PR in GitHub, merge and manual create new tag and release.
