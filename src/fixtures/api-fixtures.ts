import { test as base, expect } from 'playwright/test';
import { ApiClient } from '@client/api-client';
import { UserApi } from '@client/user-api';
import { getAuthToken } from '@helper/auth-helper';
import { ClassVideosApi } from '@client/class-videos-api';

type MyFixtures = {

  apiClient: ApiClient;
  userApi: UserApi;
  classVideosApi: ClassVideosApi;
  
};

export const test = base.extend<MyFixtures>({

  apiClient: async ({ }, use) => {
    const client = new ApiClient();
    await client.init();

    const token = await getAuthToken();
    client.setToken(token);

    await use(client)
  },

  userApi: async ({ apiClient }, use) => {
    await use(new UserApi(apiClient));
  },

  classVideosApi: async({apiClient}, use) =>{
    await use(new ClassVideosApi(apiClient));

  }

  
});

export { expect };




