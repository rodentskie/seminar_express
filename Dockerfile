FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma.config.mjs ./
COPY src ./src

# Dummy value so prisma.config.mjs can resolve DATABASE_URL at generate time;
# overridden by the real value passed via `docker run --env-file`.
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db"
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
