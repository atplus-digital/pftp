# PFTP - Simple FTP Manager

## Why use it? 🤔
  * 🗂️  **FTP storage server** You can store your data using FTP protocol.
  * 👥  **Simple FTP account management** You can create, update and delete FTP accounts simply and quickly.
  * 📊  **Simple Statistics** Intuitive server and account storage statistics.
  
  ![image](https://user-images.githubusercontent.com/71342479/205938132-1bd3eca0-c1bd-48f7-84ed-ad48719d6c6c.png)

  
# Quickstart

## Clone repository

```console
git clone https://github.com/atplus-digital/pftp.git && cd pftp
```

## Generate SSL certificate to want to use FTPS

```console
mkdir cert && openssl req -x509 -nodes -newkey rsa:2048 -keyout cert/pure-ftpd.pem -out cert/pure-ftpd.pem -days 3650 
```

## Change the environment variables

```console
mv .env.example .env
```

```console
EXTERNAL_IP=        External IP address
MYSQL_HOST=         Database server host
MYSQL_PORT=         Database server port
MYSQL_USER=         Database User
MYSQL_PASSWORD=     Database Password
MYSQL_DATABASE=     Database name
ADMIN_PASSWORD=     Admin password
LETSENCRYPT_MAIL=   Email for SSL certificate generation
DOMAIN_SERVER=      Domain name 
```

## Running Application with docker-compose

```console
docker-compose up -d
```

# Supported languages  :
  * Portuguese (PT-BR) 🇧🇷
  * English (en) 🇺🇸 (Coming soon)
