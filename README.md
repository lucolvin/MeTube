# MediaHub: YouTube-like Media Streaming Platform

A beautiful, responsive media streaming platform for self-hosted content.

## Features

- Video player with standard controls (play/pause, volume, fullscreen, playback speed)
- Video gallery with thumbnails and metadata display
- Navigation sidebar for browsing categories/folders
- Search functionality to find specific media
- Responsive design that works across all devices
- Media metadata display (title, description, duration)
- Docker containerization with configurable media location

## Getting Started

### Prerequisites

- Docker and Docker Compose

### Installation

1. Clone this repository:
```
git clone https://github.com/yourusername/mediahub.git
cd mediahub
```

2. Create a media directory or point to an existing one:
```
mkdir -p media
```

3. Start the application:
```
MEDIA_PATH=/path/to/your/media docker-compose up -d
```

This will:
- Build the Docker image
- Start a container on port 8080
- Mount your media directory to the container

4. Access the application at `http://localhost:8080`

## Configuration

You can configure the media path by setting the `MEDIA_PATH` environment variable before starting the application:

```
MEDIA_PATH=/path/to/your/media docker-compose up -d
```

If not specified, it will use a `./media` directory in the current folder.

## Development

To run the application in development mode:

```
npm install
npm run dev
```

## Building for Production

To build the application for production:

```
npm run build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.