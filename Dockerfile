# PHP 8.2 の Apache サーバーを使用
FROM php:8.2-apache

# 必要なライブラリと拡張機能（PHP, Node.js, Composer）のインストール
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    curl \
    gnupg

# Node.js 18 のインストール（Inertia/Vite用）
RUN curl -fsSL https://nodesource.com | bash - && \
    apt-get install -y nodejs

# PHP拡張機能のインストール
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Composerのインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Apacheの設定（ドキュメントルートをpublicに変更）
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN a2enmod rewrite

# アプリケーションファイルをコピー
WORKDIR /var/www/html
COPY . .

# 依存関係のインストールとビルド
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# 権限の設定
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# ポートの設定
EXPOSE 80
