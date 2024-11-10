version: '3.8'
services:
  webapp:
    build: .
    ports:
      - "1337:1337"  # Back4Apps standard port
    environment:
      - PORT=1337
      - PARSE_MOUNT=/parse
      - APP_ID=${APP_ID}
      - MASTER_KEY=${MASTER_KEY}
    healthcheck:
      test: ["CMD", "wget", "--spider", "-q", "http://localhost:1337/health"]
      interval: 30s
      timeout: 10s
      retries: 3
