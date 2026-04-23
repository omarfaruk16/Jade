FROM node:20-alpine

WORKDIR /app

# Install openssl for prisma
RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

# Ensure directory for SQLite exists and has proper permissions
RUN mkdir -p /app/data

EXPOSE 5000

# Script to run migrations and then start the app
CMD ["sh", "-c", "npx prisma db push && node seed.js && node index.js"]
