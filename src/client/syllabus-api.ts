import { ApiClient } from '@client/api-client';

export class SyllabusApi {
  constructor(private client: ApiClient) {}

  /** Fetch the current syllabus tree. Safe/read-only operation. */
  async getSyllabus() {
    return this.client.get('admin/syllabus', { auth: true });
  }

  /**
   * Save the syllabus tree.
   * IMPORTANT: Confirm the exact request payload in the browser Network tab
   * before calling this from a test, because this can modify shared data.
   */
  async saveSyllabus(requestData: Record<string, unknown>) {
    return this.client.put('admin/syllabus', requestData, { auth: true });
  }
}
