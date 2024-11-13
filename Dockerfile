# Stage 1: Build dependencies
FROM node:18 AS build

WORKDIR /app

# Clean npm cache to avoid issues with corrupted archives
RUN npm cache clean --force
RUN npm install -g npm@latest

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: Production image
FROM node:18-slim

WORKDIR /app

# Copy only production dependencies from the build stage
COPY --from=build /app /app

# Remove dev dependencies to reduce image size
RUN npm prune --production

EXPOSE 3000

# Run the app
CMD ["npm", "run", "dev"]
