import { test, expect } from '@fixtures/api-fixtures';
import { createUserRequestData } from '@data/create-user-data';

test.describe('User API Tests', () => {

  test('Get logged-in user info', async ({ userApi }) => {
    const res = await userApi.getProfile();

    console.log(`Response status: ${res.status()}`);
    console.log(`Response body: ${await res.text()}`);

    expect(res.status()).toBe(200);
    const responseBody = await res.json();
    expect(responseBody.profile.username).toEqual('ishari');
  });

    test('Create new user with correct data', async ({ userApi }) => {
    const res = await userApi.createNewUser(createUserRequestData());

    console.log(`Response status: ${res.status()}`);
    console.log(`Response body: ${await res.text()}`);

    expect(res.status()).toBe(201);
    
  });

});