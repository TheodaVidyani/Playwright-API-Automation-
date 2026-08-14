import { ApiClient } from '@client/api-client';

export class ChemistryMaterialApi {

  constructor(private client: ApiClient) {}

  async getMaterials() {
    return this.client.get(
      'admin/materials',
      { auth: true }
    );
  }

  async uploadMaterial(
    multipartData: Record<string, any>
  ) {
    return this.client.postMultipart(
      'admin/materials/upload',
      multipartData,
      { auth: true }
    );
  }

  async saveMaterials(
  requestData: Record<string, unknown>
) {
  return this.client.put(
    'admin/materials',
    requestData,
    { auth: true }
  );
}
}