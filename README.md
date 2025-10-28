# Uber-Video

A video calling application backend built with Node.js and Express.

## Features

- RESTful API built with Express.js
- CORS enabled for cross-origin requests
- Environment variable configuration with dotenv
- Modular server architecture

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Prem759-0/Uber-Video.git
cd Uber-video
```

2. Navigate to the backend directory:
```bash
cd backend
```

3. Install dependencies:
```bash
npm install
```

4. Create a `.env` file in the backend directory (optional):
```bash
PORT=3000
```

## Usage

1. Start the server:
```bash
npm start
```

Or for development:
```bash
node server.js
```

2. The server will start on `http://localhost:3000` (or the port specified in your .env file)

## API Endpoints

- `GET /` - Returns "Hello World" message

## Project Structure

```
Uber-video/
├── backend/
│   ├── app.js          # Express app configuration
│   ├── server.js       # HTTP server setup
│   ├── package.json    # Dependencies and scripts
│   └── package-lock.json
├── .gitignore
└── README.md
```

## Dependencies

- **express**: Web framework for Node.js
- **cors**: Enable CORS with various options
- **dotenv**: Load environment variables from .env file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
