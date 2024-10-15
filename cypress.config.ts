// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080',
    specPattern: 'cypress/e2e/**/*.ts',
    supportFile: 'cypress/support/index.ts',
    fixturesFolder: 'cypress/fixtures', 
    downloadsFolder: 'cypress/downloads', // Path to downloads folder
    video: true, // Enable/disable video recording of test runs
    videosFolder: 'cypress/videos', // Path to save videos
    screenshotsFolder: 'cypress/screenshots' // Path to save screenshots
  },
});

