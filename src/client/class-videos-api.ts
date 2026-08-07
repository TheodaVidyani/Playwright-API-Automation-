import { ApiClient } from "@client/api-client";

export class ClassVideosApi {
  constructor(private client: ApiClient) {}

  async getSyllabus() {
    return this.client.get('admin/syllabus',{auth: true});
  }

  async getClassVideos() {
    return this.client.get('admin/class-videos', { auth: true });
  }

  async addClassVideos(requestData: Record<string, any>)
  {
    return this.client.put('admin/class-videos', {auth: true})
  }

  async editClassVideos(requestData: Record<string, any>)
  {
    return this.client.put('admin/class-videos', {auth: true})
  }
}