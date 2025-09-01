FROM node:22-alpine

# Work in root
WORKDIR /

# Copy and install dependencies first
COPY package*.json ./
RUN npm install

# Copy the rest of your project files
COPY . .

# Expose Next.js dev server port
EXPOSE 3000

# Run Next.js in dev mode
CMD ["npm", "run", "dev"]
