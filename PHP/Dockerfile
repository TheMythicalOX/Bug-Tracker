FROM php:8.4.5-apache

WORKDIR /var/www/html

RUN apt-get update -v -y && apt-get install -v -y libmariadb-dev

RUN a2enmod rewrite && service apache2 restart

RUN docker-php-ext-install mysqli