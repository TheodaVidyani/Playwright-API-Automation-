import { test, expect } from '@fixtures/api-fixtures';
import {
  chemistryMaterialUploadData,
  saveChemistryMaterialsData
} from '@data/chemistry-material-data';
import fs from 'fs';
import path from 'path';

test.describe('Chemistry Materials Upload API Tests', () => {

  test('CM-AM-004 - Verify a valid PDF can be uploaded successfully', async ({ chemistryMaterialApi }) => {

    const filePath = path.join(
      process.cwd(),
      'src',
      'data',
      'files',
      'QA_UI_Testing.pdf'
    );

    const fileBuffer = fs.readFileSync(filePath);

    const requestData = chemistryMaterialUploadData(fileBuffer);

    const response = await chemistryMaterialApi.uploadMaterial(requestData);

    console.log(`Response status: ${response.status()}`);
    console.log(`Response body: ${await response.text()}`);

    expect(response.status()).toBe(201);

  });

  test('Verify Chemistry Materials can be fetched successfully', async ({ chemistryMaterialApi }) => {

  const response = await chemistryMaterialApi.getMaterials();

  console.log(`Response status: ${response.status()}`);

  const responseBody = await response.json();

  console.log('Response body:', JSON.stringify(responseBody, null, 2));

  expect(response.status()).toBe(200);

  expect(responseBody).toHaveProperty('stats');
  expect(responseBody).toHaveProperty('tree');

  expect(Array.isArray(responseBody.stats)).toBeTruthy();
  expect(Array.isArray(responseBody.tree)).toBeTruthy();

});

test('Verify Chemistry Materials library can be saved successfully', async ({ chemistryMaterialApi }) => {

  const requestData = saveChemistryMaterialsData();

  const response = await chemistryMaterialApi.saveMaterials(requestData);

  console.log(`Response status: ${response.status()}`);

  const responseBody = await response.json();

  console.log('Response body:', JSON.stringify(responseBody, null, 2));

  expect(response.status()).toBe(200);

});

test('Verify Reload returns the latest Chemistry Materials tree successfully', async ({ chemistryMaterialApi }) => {

  const response = await chemistryMaterialApi.getMaterials();

  console.log(`Response status: ${response.status()}`);

  const responseBody = await response.json();

  console.log(
    'Reload response body:',
    JSON.stringify(responseBody, null, 2)
  );

  expect(response.status()).toBe(200);

  expect(responseBody).toHaveProperty('stats');
  expect(responseBody).toHaveProperty('tree');

  expect(Array.isArray(responseBody.stats)).toBeTruthy();
  expect(Array.isArray(responseBody.tree)).toBeTruthy();

  expect(responseBody.tree.length).toBeGreaterThan(0);

  const titles = responseBody.tree.map((node: any) => node.title);

  expect(titles).toContain('Physical Chemistry');
  expect(titles).toContain('Organic Chemistry');

  const physicalChemistry = responseBody.tree.find(
    (node: any) => node.title === 'Physical Chemistry'
  );

  expect(physicalChemistry).toBeDefined();

  const moleConcept = physicalChemistry.children.find(
    (child: any) => child.title === 'Mole Concept'
  );

  expect(moleConcept).toBeDefined();

  const relativeAtomicMass = moleConcept.children.find(
    (child: any) => child.title === 'Relative Atomic Mass'
  );

  expect(relativeAtomicMass).toBeDefined();

});
});