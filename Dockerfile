# 1. PHP 8.2 Apacheをベースに使用
FROM php:8.2-apache

# 2. 必要なシステムパッケージのインストール
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl \
    gnupg \
    libpq-dev

# 3. Node.js (LTS) の確実なインストール方法に変更
RUN mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://nodesource.com | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://nodesource.com nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get install nodejs -y

# 4. PHP拡張機能のインストール（PostgreSQL対応も追加）
RUN docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

# 5. Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 6. Apacheの設定
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN a2enmod rewrite

# 7. アプリケーションファイルのコピー
WORKDIR /var/www/html
COPY . .

# 8. 依存関係のインストールとビルド（キャッシュを考慮）
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# 9. 権限の設定
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80
