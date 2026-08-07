import { request, APIRequestContext } from 'playwright/test';
import { envConfig } from '@config/env-config';

export class ApiClient {
  private context!: APIRequestContext;
  private token?: string;

  setToken(token: string) {
    this.token = token;
  }

  async init() {
    this.context = await request.newContext({
      baseURL: envConfig.BASE_URL!
    });
  }



  // GET request
  async get(
  url: string,
  options?: { auth?: boolean }
) {
  const headers: Record<string, string> = {};

  if (options?.auth) {
   
    //console.log(`Using auth token: ${this.token}`);
    headers['Authorization'] = `Bearer ${this.token}`;
  }

  const res = await this.context.get(url, { headers });
  //console.log(`GET ${url} - Status: ${res.status()}`);
  //console.log(`GET ${url} - URL: ${await res.url()}`);

  if (!res.ok()) {
    throw new Error(`GET ${url} failed: ${res.status()} ${await res.text()}`);
  }

  return res;
}

  // POST request
  async post(
  url: string,
  data: Record<string, unknown>,
  options?: { auth?: boolean }
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options?.auth) {
    
    headers['Authorization'] = `Bearer ${this.token}`;
  }

  const res = await this.context.post(url, { data, headers });

  
  if (!res.ok()) {
    throw new Error(`POST ${url} failed: ${res.status()} ${await res.text()}`);
  }

  return res;
}


  // PUT request
  async put(
  url: string,
  data: Record<string, unknown>,
  options?: { auth?: boolean }
) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (options?.auth) {
    
    headers['Authorization'] = `Bearer ${this.token}`;
  }

  const res = await this.context.put(url, { data, headers });

  
  if (!res.ok()) {
    throw new Error(`PUT ${url} failed: ${res.status()} ${await res.text()}`);
  }

  return res;
}
} 


