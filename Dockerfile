FROM node:14.15.0-alpine3.10 AS base
RUN mkdir /app && chown -R node:node /app 
WORKDIR /app 
COPY --chown=node:node package.json package-lock*.json ./
COPY --chown=node:node . .
ENV PATH=/app/node_modules/.bin:$PATH
RUN npm ci && npm cache clean --force && npm install
USER node
CMD ["npm", "start"]