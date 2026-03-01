FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build TypeScript → dist/
RUN npm run build

FROM node:18-alpine
WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy only production files
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 5001

USER appuser

# Run compiled JS directly (NOT nest start)
CMD ["node", "dist/main.js"]