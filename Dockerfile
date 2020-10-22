FROM node:14.14
RUN mkdir /app
WORKDIR /app
ADD . .
RUN npm install
RUN npm run build
CMD ["node", "index.js"]
EXPOSE 3001

