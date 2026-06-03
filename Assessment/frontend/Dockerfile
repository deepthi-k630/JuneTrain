FROM node:20-alpine

WORKDIR /app

# Install http-server to serve static files
RUN npm install -g http-server

COPY index.html /app/

EXPOSE 8000

CMD ["http-server", "-p", "8000", "--cors"]
