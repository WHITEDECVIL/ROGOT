FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --production || true
COPY . .
RUN npm run build || true
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node","dist/index.js"]
