# --- ステージ1: Node.jsでフロントエンドをビルド ---
FROM node:20-slim AS node-builder
WORKDIR /app
COPY . .
# インストールを強行し、Viteのビルド（Laravel/Inertia用）を実行
RUN npm install --legacy-peer-deps
# ここを修正：通常のbuildではなくvite buildを直接叩くか、確実にLaravelの構成で走らせる
RUN npm run build

# --- ステージ2: PHP環境を構築 ---
FROM php:8.2-apache

# 必要なシステムパッケージ
RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev zip unzip curl libpq-dev \
    && docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

# Node.js実行環境をコピー
COPY --from=node-builder /usr/local/bin/node /usr/local/bin/
COPY --from=node-builder /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Apacheの設定
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN a2enmod rewrite

# ファイルコピー
WORKDIR /var/www/html
COPY . .
# ビルド済みのフロントエンドファイルをコピー（ここが重要）
COPY --from=node-builder /app/public/build ./public/build

# PHP依存関係
RUN composer install --no-dev --optimize-autoloader

# 権限
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80
