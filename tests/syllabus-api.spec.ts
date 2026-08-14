import { test, expect } from '@playwright/test';
import { getAuthToken } from '@helper/auth-helper';
import 'dotenv/config';

test.describe('Admin Syllabus API Suite', () => {

  test('GET /syllabus - Should fetch syllabus list', async ({ request }) => {
    const token = await getAuthToken();

    const response = await request.get('/api/admin/syllabus', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    console.log(`GET /api/admin/syllabus Status: ${response.status()}`);
    const body = await response.json();
    console.log('Syllabus Data:', JSON.stringify(body, null, 2));

    expect(response.status()).toBe(200);
  });

  test.skip('PUT /syllabus - Should update syllabus tree', async ({ request }) => {
    const token = await getAuthToken();

    const payload = {
      // Put exact syllabus tree payload here when saving
    };

    const response = await request.put('/api/admin/syllabus', {
      data: payload,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    expect(response.status()).toBe(200);
  });

});
