# Builder
FROM node:16.17.0-alpine as builder

WORKDIR /app

COPY . .

RUN npm install --silent

RUN npm run build

# Production
FROM nginx:1.23.1-alpine as frontned

COPY --from=builder /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
