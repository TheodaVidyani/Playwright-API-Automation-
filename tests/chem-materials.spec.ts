import { test, expect } from '@playwright/test';
import 'dotenv/config';

test.describe('Admin Chemistry Materials API Suite', () => {

  test('GET /materials - Should fetch materials list', async ({ request }) => {

    const response = await request.get('/api/admin/materials', {
      headers: {
        'Authorization': process.env.ADMIN_TOKEN as string,
        'Accept': 'application/json'
      }
    });

    expect(response.status()).toBe(200);
  });

});