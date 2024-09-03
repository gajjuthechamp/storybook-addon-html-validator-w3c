# Storybook Addon HTML Validator
This addon provide a in tab view of all errors and warning in the component HTML

### Development scripts

- `npm run start` runs babel in watch mode and starts Storybook
- `npm run build` build and package your addon code

### Switch from TypeScript to JavaScript

Don't want to use TypeScript? We offer a handy eject command: `npm run eject-ts`

This will convert all code to JS. It is a destructive process, so we recommended running this before you start writing any code.

### Install 

```sh
npm i storybook-addon-html-w3c-validator
```

Then, register it as an addon in `.storybook/main.js`.

```js
// .storybook/main.ts

// Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
import type { StorybookConfig } from '@storybook/your-framework';

const config: StorybookConfig = {
  // ...rest of config
  addons: [
    '@storybook/addon-essentials'
    'storybook-addon-html-w3c-validator', // 👈 register the addon here
  ],
};

export default config;
```

Done...

Check the component in your storybook pannel addons

Want to Buy me a Coffee ??

paypal: gsparihar28


## How it looks?
![gs1](https://github.com/user-attachments/assets/5f9d1adf-9707-4e17-a883-34ca5c66c1ea)

![gs2](https://github.com/user-attachments/assets/486d6664-3df6-40a0-996d-9137734af471)

![gs3](https://github.com/user-attachments/assets/6286da57-7df6-48cb-94b5-ebd878be30d1)

![gs4](https://github.com/user-attachments/assets/a5f6356c-f950-4ef7-b2bc-3c068a2f3383)
