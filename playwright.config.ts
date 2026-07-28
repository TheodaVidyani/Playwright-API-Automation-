import { defineConfig } from '@playwright/test';

export default defineConfig({
    reporter: [
        ['list'], // Shows the test progress step-by-step in your VS Code terminal
        ['html']  // Automatically creates the detailed report in the playwright-report folder
      ],

  use: {
    // Root address for all tests
    baseURL: 'http://75.119.154.239',
  },
});