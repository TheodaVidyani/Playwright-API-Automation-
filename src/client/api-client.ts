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
      baseURL: envConfig.BASE_URL!,
    });
  }

  /**
   * Helper to build request headers.
   * Note: Omit application/json content-type when sending multipart payloads.
   */
  private getHeaders(options?: { auth?: boolean }, isMultipart = false): Record<string, string> {
    const headers: Record<string, string> = {};

    if (!isMultipart) {
      headers['Content-Type'] = 'application/json';
    }

    // Defaults to true if options is omitted or options.auth is undefined
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

  // MULTIPART POST request
  async postMultipart(
    url: string,
    multipart: Record<string, any>,
    options?: { auth?: boolean }
  ) {
    // Pass isMultipart = true so 'Content-Type: application/json' isn't set
    const headers = this.getHeaders(options, true);
    const res = await this.context.post(url, {
      multipart,
      headers,
    });

    if (!res.ok()) {
      throw new Error(`POST (Multipart) ${url} failed: ${res.status()} ${await res.text()}`);
    }
    return res;
  }

  // Optional: Clean up API request context resources
  async dispose() {
    if (this.context) {
      await this.context.dispose();
    }
  }
}