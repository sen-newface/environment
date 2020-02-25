FROM centos:7.5.1804

#locale 追加
RUN sed -i -e '/override_install_langs/s/$/,ja_JP.utf8/g' /etc/yum.conf

RUN curl -sL https://rpm.nodesource.com/setup_10.x | bash - \
  && yum install -y http://rpms.famillecollet.com/enterprise/remi-release-7.rpm \
  && yum install -y postgresql10 \
  nodejs \
  zlib-devel \
  glibc-common \
  make \
  libpng-devel \
  cronie \
  && yum install -y --enablerepo=remi,remi-php73 \
  php \
  php-opcache \
  php-mbstring \
  php-pdo \
  php-pecl-memcache \
  php-pecl-memcached \
  php-pecl-redis \
  php-pecl-imagick \
  php-mcrypt \
  php-mysqlnd \
  php-xml \
  php-gd \
  php-devel \
  php-pgsql \
  php-pecl-ssh2 \
  php-process \
  php-intl \
  php-pear \
  php-pecl-apcu \
  php-pecl-apcu-bc \
  php-pecl-zip \
  php-fpm \
  && rm -rf /var/cache/yum/* \
  && yum clean all


COPY ./php-fpm.conf /etc/php-fpm.conf

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin \
  && mv /usr/local/bin/composer.phar  /usr/local/bin/composer \
  && composer global require hirak/prestissimo

WORKDIR /var/www

CMD ["/usr/sbin/php-fpm","-F","-y","/etc/php-fpm.conf"]
