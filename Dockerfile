FROM nginx:1.29.4-alpine
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY index.html style.css script.js favicon.svg social-card.svg social-card.png site.webmanifest robots.txt sitemap.xml /usr/share/nginx/html/
EXPOSE 80
