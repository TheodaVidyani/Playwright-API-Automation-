import { ApiClient } from "@client/api-client";

export class UserApi {
  constructor(private client: ApiClient) {}

  async getProfile() {
    return this.client.get('admin/profile',{auth: true});
  }

  async createNewUser(requestData: Record<string, any>) {
    return this.client.post('admin/users', requestData,{ auth: true, });
  }
}