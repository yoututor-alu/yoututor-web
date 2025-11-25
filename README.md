# YouTutor Web

Web App for the YouTutor - built with React, Vite and TypeScript.

**YouTutor** simplifies learning from YouTube videos by enabling users to chat with video content by ingesting video transcript into an LLM thereby enabling YouTutor to respond naturally.

## Table of Contents

- [Deployed URL](#deployed-url)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Environment Configuration](#environment-configuration)
- [Development](#development)
- [Building for Production](#building-for-production)

## Deployed URL

https://alu-yoututor.onrender.com

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: v20+ (22.13.0 specified in `.nvmrc`)
- **NPM** or **Yarn**: (package manager)
- **Git**: For version control

## Setup Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yoututor-alu/yoututor-web.git
cd yoututor-web
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies listed in `package.json`.

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following environment variables to your `.env` file:

```env
# API Configuration
VITE_API_URL=https://yoututor-api.onrender.com

# Environment (development, staging, or production)
VITE_ENVIRONMENT=development
```
### 4. Start the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another port if 5173 is in use).

## Environment Configuration

The application uses Vite's environment variable system. All environment variables must be prefixed with `VITE_` to be exposed to the client-side code.

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend GraphQL API endpoint | `http://localhost:4000` |
| `VITE_ENVIRONMENT` | Current environment | `development`, `staging`, or `production` |

### Environment-Specific Behavior

The app automatically detects the environment and adjusts behavior accordingly:

- **Development**: `import.meta.env.DEV` is `true`
- **Staging**: `VITE_ENVIRONMENT=staging`
- **Production**: `VITE_ENVIRONMENT=production`

## Development

### Running the Development Server

```bash
npm run dev
```

This starts the Vite development server with:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- TypeScript type checking in the background

### Code Quality

#### Linting

```bash
npm run lint
```

This runs ESLint to check for code quality issues.

#### Type Checking

```bash
npm run fix
```

This runs TypeScript compiler (`tsc`) to check for type errors without emitting files.

### API Health Check

The application includes an automatic API health check on startup:
- If the backend API is not responding within 2 seconds, a modal will appear
- The app will continue polling the API every 2 seconds until it's available
- Once the API is healthy, the modal automatically closes

## Building for Production

### Create Production Build

```bash
npm run build
```

This command:
1. Runs TypeScript type checking
2. Builds the application using Vite
3. Outputs optimized static files to the `dist/` directory

### Preview Production Build Locally

```bash
yarn preview
```

This serves the production build locally for testing before deployment.

**Happy coding! 🎉**
