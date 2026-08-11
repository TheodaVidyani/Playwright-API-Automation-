import { request, APIRequestContext } from '@playwright/test';
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

  private getHeaders(options?: { auth?: boolean }): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Defaults to true if options is not provided
    const needsAuth = options?.auth ?? true;

    if (needsAuth) {
      if (!this.token) {
        throw new Error('Authorization token is missing. Please call setToken() before sending authenticated requests.');
      }
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // GET request
  async get(url: string, options?: { auth?: boolean }) {
    const headers = this.getHeaders(options);
    const res = await this.context.get(url, { headers });

    if (!res.ok()) {
      throw new Error(`GET ${url} failed: ${res.status()} ${await res.text()}`);
    }
    return res;
  }

  // POST request
  async post(
    url: string,
    data?: Record<string, unknown>,
    options?: { auth?: boolean }
  ) {
    const headers = this.getHeaders(options);
    const res = await this.context.post(url, { data, headers });

    if (!res.ok()) {
      throw new Error(`POST ${url} failed: ${res.status()} ${await res.text()}`);
    }
    return res;
  }

  // PUT request
  async put(
    url: string,
    data?: Record<string, unknown>,
    options?: { auth?: boolean }
  ) {
    const headers = this.getHeaders(options);
    const res = await this.context.put(url, { data, headers });

    if (!res.ok()) {
      throw new Error(`PUT ${url} failed: ${res.status()} ${await res.text()}`);
    }
    return res;
  }
}