import { mergeObject } from '../lib/utils';
import { customizeData } from '../lib/core/customize';

describe('mergeObject:', () => {
  test('should be merged', () => {
    const obj1 = {
      resource_access: {
        account: {
          roles: ['manage-account', 'manage-account-links', 'view-profile'],
        },
      },
    };
    const obj2 = {
      resource_access: {
        client: {
          roles: ['client-role']
        }
      },
    };
    const result = mergeObject(obj1, obj2);
    expect(result).toEqual({
      resource_access: {
        account: {
          roles: ['manage-account', 'manage-account-links', 'view-profile'],
        },
        client: {
          roles: ['client-role']
        }
      },
    });
  });

  test('array should be with unique values', () => {
    const obj1 = {
      aud: 'account',
      realm_access: {
        roles: ['offline_access', 'uma_authorization', 'default-roles'],
      },
    };
    const obj2 = {
      realm_access: {
        roles: ['default-roles', 'new-role'],
      },
    };
    const result = mergeObject(obj1, obj2);
    expect(result).toEqual({
      aud: 'account',
      realm_access: {
        roles: ['offline_access', 'uma_authorization', 'default-roles', 'new-role'],
      },
    });
  });

  test('fn should be merged', () => {
    function resolveCallback(instance: any): void {
      instance.subject = customizeData.profile.id;
    }
    function rejectCallback(instance: any): void {
      instance.subject = undefined;
    }
    const obj1 = {
      promises: {
        init: {
          method: 'resolve',
          resolveCallback: resolveCallback,
        },
      },
    };
    const obj2 = {
      promises: {
        init: {
          method: 'reject',
          rejectCallback: rejectCallback,
        },
      },
    };
    const result = mergeObject(obj1, obj2);
    expect(result).toEqual({
      promises: {
        init: {
          method: 'reject',
          resolveCallback: resolveCallback,
          rejectCallback: rejectCallback,
        },
      },
    });
  });
});
