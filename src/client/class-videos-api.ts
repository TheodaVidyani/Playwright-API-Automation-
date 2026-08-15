import { ApiClient } from "@client/api-client";
const classVideosUrl: string = 'admin/class-videos';

export class ClassVideosApi {
  constructor(private client: ApiClient) {}

  async getSyllabus() {
    return this.client.get('admin/syllabus',{auth: true});
  }

  async getClassVideos() {
    return this.client.get(classVideosUrl, { auth: true });
  }

  async addClassVideos(requestData: Record<string, any>)
  {
    return this.client.put(classVideosUrl, requestData, { auth: true, })
  }

  async editClassVideos(requestData: Record<string, any>)
  {
    return this.client.put(classVideosUrl, requestData, {auth: true,})
  }

  async grantAccess(requestData: Record<string, any>)
  {
    return this.client.post('admin/class-videos/access', requestData, {auth: true,})
  }
}