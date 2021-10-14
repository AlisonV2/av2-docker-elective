FROM node
WORKDIR /app

#Here you could set the volume and set the correct user on it
# VOLUME /app/logs
# RUN chown -R node:node /app/logs
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
CMD ["npm", "start"]
