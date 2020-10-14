FROM php:7.4-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nodejs \
    npm

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Update NPM
RUN npm install npm@latest -g

# Set working directory
WORKDIR /var/www
RUN chown www-data:www-data /var/www
USER www-data
COPY . /var/www
COPY --chown=www-data:www-data . /var/www

# Setup Laravel
RUN composer install
RUN npm install && npm run build
RUN ./artisan migrate:install
RUN ./artisan passport:install
RUN ./artisan cache:clear
