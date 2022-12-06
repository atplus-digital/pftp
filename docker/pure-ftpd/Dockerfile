FROM debian:buster-slim

LABEL     mantainer="ATPlus Digital"

ENV DEBIAN_FRONTEND noninteractive


# Add repository to deb-src
RUN find /etc/apt/sources.list* -type f -exec sed -i 'p; s/^deb /deb-src /' '{}' +

# Install packages
RUN apt update && apt -y dist-upgrade && \
    apt install -y openssl dpkg-dev debhelper syslog-ng-core syslog-ng \
    libpam-dev libcap2-dev libldap2-dev default-libmysqlclient-dev libpq-dev libssl-dev && \
    mkdir /ftpdata && \
    mkdir /tmp/pure-ftpd-mysql && \
    cd /tmp/pure-ftpd-mysql && \
    apt source pure-ftpd-mysql && \
    cd pure-ftpd-* && \
    sed -i '/^optflags=/ s/$/ --without-capabilities/g' ./debian/rules && \
    dpkg-buildpackage -b -uc && \
    dpkg -i /tmp/pure-ftpd-mysql/pure-ftpd-common*.deb && \
    apt -y install openbsd-inetd && \
    dpkg -i  /tmp/pure-ftpd-mysql/pure-ftpd-mysql*.deb  && \
    apt-mark hold pure-ftpd pure-ftpd-mysql pure-ftpd-common


## add user and group to FTP
RUN groupadd -g 2001 ftpgroup && \ 
    useradd -u 2001 -s /bin/false -d /bin/null -c "pureftpd virtual user" -g ftpgroup ftpuser && \
    chown -R ftpuser:ftpgroup /ftpdata

# cleanup
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/*

# run mysql configuration creator script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod u+x /docker-entrypoint.sh

# entrypoint
ENTRYPOINT ["/docker-entrypoint.sh"]


# define important volumes
VOLUME /ftpdata

# expose important ports
EXPOSE 20 21 30000-30009