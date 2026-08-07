import { test, expect } from '@fixtures/api-fixtures';
import { addVideoRequestData } from '@data/add-video-data'; 
import {editVideoTopicRequestData} from '@data/edit-video-data';

test.describe('Class Videos API Tests', () => {

  test('Clone from syllabus', async ({ classVideosApi }) => {
    const res = await classVideosApi.getSyllabus();

    console.log(`Response status: ${res.status()}`);
    console.log(`Response body: ${await res.text()}`);

    expect(res.status()).toBe(200);
    const responseBody = await res.json();
    //expect(responseBody.tree.title).toEqual('1. Quality Assurance Theory');
  });


    test('Save Video Library - Add class video', async ({ classVideosApi }) => {
    const res = await classVideosApi.addClassVideos(addVideoRequestData());

    console.log(`Response status: ${res.status()}`);
    console.log(`Response body: ${await res.text()}`);

    expect(res.status()).toBe(201);
    
  });

  test('Save Video Library - Edit class video topic', async ({ classVideosApi }) => {
    const res = await classVideosApi.editClassVideos(editVideoTopicRequestData());

    console.log(`Response status: ${res.status()}`);
    console.log(`Response body: ${await res.text()}`);

    expect(res.status()).toBe(201);
    
  });

    test('Reload', async ({ classVideosApi }) => {
    const res = await classVideosApi.getClassVideos();

    console.log(`Response status: ${res.status()}`);
    console.log(`Response body: ${await res.text()}`);

    expect(res.status()).toBe(200);
    const responseBody = await res.json();
    //expect(responseBody.tree.title).toEqual('1. Quality Assurance Theory');
  });

});