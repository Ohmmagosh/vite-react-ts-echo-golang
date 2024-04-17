FROM node:latest

WORKDIR /app

# COPY app/package.json /app/package.json
COPY app/ /app/

RUN npm install

RUN npm run build




# RUN cd app && ls


EXPOSE 8080

# CMD [ "sleep", "infinity" ]
# CMD ["sh", "-c", "cd app && npm run preview"]
# CMD ["npm","run", "preview"]
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]

