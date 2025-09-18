FROM node:24-alpine AS builder
WORKDIR /auth
COPY . .
RUN npm i
RUN npm run build

FROM node:24-alpine
WORKDIR /auth
COPY --from=builder /auth/dist ./dist
COPY --from=builder /auth/package*.json ./
RUN npm i --production
CMD ["npm", "run", "start"]
