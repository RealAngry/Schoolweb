School Management System

This project combines a React frontend and Node.js/Express backend into a single deployable application.

## Features

- Single server deployment for both frontend and API
- Integrated Discord bot management
- MongoDB database backend
- React frontend with Vite build system

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- MongoDB installed (locally) or MongoDB Atlas account (cloud)
- Discord Developer Account (for bot features)

### Quick Start (Single Command)

To set up everything and start development in one step:

```bash
npm run setup-and-start
```

This will:
1. Install all frontend dependencies
2. Install all backend dependencies
3. Start both the frontend and backend servers together

### Manual Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/RealAngry/Schoolweb
cd Schoolweb
```

2. **Install dependencies for both frontend and backend**

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
npm run setup-server
```

3. **Configure environment variables**

Create `.env` files for both the frontend and backend:

Frontend (root directory):
```
VITE_API_URL=http://localhost:5000/api
```

Backend (server directory):
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/hmps-db
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
DISCORD_BOT_TOKEN=your_discord_bot_token
```

4. **Initialize the Discord bot directories** (optional)

```bash
npm run init-bot
```

5. **Start development servers**

Single terminal:
```bash
# Start both frontend and backend servers together
npm run dev-all
```

Or in separate terminals if you prefer:
```bash
# Start frontend development server
npm run dev

# Start backend server
npm run server-dev
```

### Production Deployment

#### Single Command Deployment

```bash
npm run deploy
```

This will:
1. Install all dependencies
2. Build the React frontend
3. Start the server in production mode

#### Manual Deployment Steps

1. **Build the frontend**

```bash
npm run build
```

2. **Start the production server**

```bash
npm run start
```

## Deployment to Hosting Platforms

### Vercel Deployment

This project includes a `vercel.json` configuration file for easy deployment to Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy using the default settings

### Other Platforms

For platforms like Heroku, Railway, or Render:

1. Set the build command to `npm run build`
2. Set the start command to `npm run start`
3. Configure the necessary environment variables

## Development

### Project Structure

```
├── dist/                # Built frontend files
├── public/              # Static assets
├── server/              # Backend code
│   ├── config/          # Server configuration
│   ├── controllers/     # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── scripts/         # Utility scripts
│   ├── bot/             # Discord bot code
│   └── server.js        # Main server file
└── src/                 # Frontend React code
    ├── components/      # React components
    ├── context/         # React context providers
    ├── pages/           # Page components
    └── utils/           # Utility functions
```

## License

This project is licensed under the MIT License.
