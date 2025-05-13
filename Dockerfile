FROM node:20 AS app
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 4001 3013
CMD ["npm", "run", "dev"] 