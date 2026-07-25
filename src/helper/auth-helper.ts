import { request } from 'playwright/test';
import { envConfig } from '@config/env-config';


export async function getAuthToken(): Promise<string> {

  const context = await request.newContext({ baseURL: envConfig.BASE_URL });

  const requestBody = { identifier: envConfig.IDENTIFIER, password: envConfig.PASSWORD,portal:envConfig.PORTAL };

  const response = await context.post(
    envConfig.TOKEN_URL,
    {
      data: requestBody,
      headers: { 'content-type': 'application/json' }, 
    });

  if (!response.ok()) {
    throw new Error(`Auth failed: ${response.status()} ${await response.text()}`);
  }

  const body = await response.json();

  console.log(`Auth token received: ${body.token}`);
  return body.token;
}

