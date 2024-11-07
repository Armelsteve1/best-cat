# Best Cat Voting App - React + TypeScript + Vite

This application is a voting game to determine the best cat. It is built with React, TypeScript, and Vite, and includes modern features to ensure a smooth user experience and efficient development.

## Table of Contents

- [Features](#features)
- [Deployment](#deployment)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Scripts](#scripts)
- [License](#license)

## Deployment

Test the application here: [Best Cat Voting App on Vercel](https://best-cat-theta.vercel.app/)

## Features

- **Fast loading** with Vite
- **Utilizes React 18 and TypeScript** for reliable typing
- **Vote animation** to indicate user votes
- **Custom loader** displayed during initial cat data loading
- **Persistence of votes and match count** using local storage
- **Responsive design** for an optimized mobile experience

## Installation

To install and run the application locally, follow these steps:

1. **Clone the repository** :
   ```bash
   git clone https://github.com/YourUsername/best-cat-voting-app.git
   cd best-cat-voting-app
   ```
2. **Install dependencies** :

```bash
npm install
```

## Configuration

### Vite Configuration

The project uses Vite for fast startup and hot module replacement (HMR). You can customize the settings in the `vite.config.ts` file as needed.

### TypeScript Configuration

The TypeScript configuration file is located in `tsconfig.json`. Customize it to suit your typing and compilation preferences.

### Data Persistence Configuration

Scores and match counts are stored locally in the browser. The `incrementMatchCount` function uses `localStorage` to ensure that votes and match counts are persistent across sessions.

## Usage

1. **To start the development server, run**:
   ```bash
   npm run dev
   ```
2. **To build the project for production, run** :

```bash
npm run build
```

3. **To preview the production build locally, use** :

```bash
npm run preview
```

## Scripts

Scripts defined in the `package.json` file includ:

- `npm run dev` : Starts the development server with HMR.
- `npm run build` : Builds the project for production.
- `npm run preview` : Previews the production build locally.
- `npm run format` : Formats the code with Prettier (if configured).

## Licence

This project is licensed under the MIT License - see the [MIT](https://github.com/Armelsteve1/best-cat/blob/main/LICENSE) - file for details.
