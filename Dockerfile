# --- ステージ1: Node.jsビルド (変更なし) ---
FROM node:20-slim AS node-builder
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps && npm run build

# --- ステージ2: PHP環境を 8.4 に変更 ---
FROM php:8.4-apache

# 必要なシステムパッケージ (libavif-devなどを追加して 8.4 の互換性を高めます)
RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev zip unzip curl libpq-dev libavif-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

# (以下、以前のDockerfileと同じ設定を継続)
COPY --from=node-builder /usr/local/bin/node /usr/local/bin/
COPY --from=node-builder /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN a2enmod rewrite

WORKDIR /var/www/html
COPY . .
COPY --from=node-builder /app/public/build ./public/build

# Composerインストール（チェックを外して確実に通す）
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80
