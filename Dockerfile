FROM caddy:alpine

EXPOSE 8080

COPY Caddyfile /etc/caddy/Caddyfile
COPY dist /srv