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

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Set working directory
WORKDIR /var/www
COPY .env.docker .env
COPY . /var/www
RUN touch /var/www/storage/database.sqlite
COPY --chown=www:www . /var/www
RUN chown -R www:www /var/www

USER www

# Setup Laravel
RUN composer install
RUN npm install && npm run prod
RUN ./artisan migrate
RUN ./artisan passport:install
RUN ./artisan key:generate
RUN ./artisan cache:clear