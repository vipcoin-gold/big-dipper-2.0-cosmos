FROM node:18.19.1
RUN node -v
RUN npm -v
ENV PORT 3000

# Install git for ui and internal packages
RUN apk add --no-cache git

# Set app directory
WORKDIR /app

# Add PM2
RUN npm install pm2 -g

# Installing dependencies
COPY package*.json ./
RUN npm i

# Copying source files
COPY . .

# Get env from secrets
ARG NEXT_PUBLIC_GRAPHQL_URL
ARG NEXT_PUBLIC_GRAPHQL_WS
ARG NEXT_PUBLIC_WALLET_URL
ARG NEXT_PUBLIC_URL
ARG NEXT_PUBLIC_WS_CHAIN_URL
ARG NEXT_PUBLIC_RPC_WEBSOCKET
ARG NEXT_PUBLIC_CHAIN_STATUS
ARG NEXT_PUBLIC_CHAIN_TYPE
ARG NEXT_PUBLIC_ASSET
ARG NODE_ENV
ARG PORT
ARG NEXT_PUBLIC_MATOMO_URL
ARG NEXT_PUBLIC_MATOMO_SITE_ID
ARG NEXT_PUBLIC_WALLET_API

# Generate env file
ENV NEXT_PUBLIC_GRAPHQL_URL ${NEXT_PUBLIC_GRAPHQL_URL}
ENV NEXT_PUBLIC_GRAPHQL_WS ${NEXT_PUBLIC_GRAPHQL_WS}
ENV NEXT_PUBLIC_WALLET_URL ${NEXT_PUBLIC_WALLET_URL}
ENV NEXT_PUBLIC_URL ${NEXT_PUBLIC_URL}
ENV NEXT_PUBLIC_WS_CHAIN_URL ${NEXT_PUBLIC_WS_CHAIN_URL}
ENV NEXT_PUBLIC_RPC_WEBSOCKET ${NEXT_PUBLIC_RPC_WEBSOCKET}
ENV NEXT_PUBLIC_CHAIN_STATUS ${NEXT_PUBLIC_CHAIN_STATUS}
ENV NEXT_PUBLIC_CHAIN_TYPE ${NEXT_PUBLIC_CHAIN_TYPE}
ENV NEXT_PUBLIC_ASSET ${NEXT_PUBLIC_ASSET}
ENV NEXT_PUBLIC_WALLET_API ${NEXT_PUBLIC_WALLET_API}
ENV NODE_ENV ${NODE_ENV}
ENV PORT ${PORT}
ENV NEXT_PUBLIC_MATOMO_URL ${NEXT_PUBLIC_MATOMO_URL}
ENV NEXT_PUBLIC_MATOMO_SITE_ID ${NEXT_PUBLIC_MATOMO_SITE_ID}

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD ["pm2-runtime", "dist/index.js"]
