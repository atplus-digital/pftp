<h1>Como rodar a Aplicação</h4>

## Execute os seguintes comandos:

    git clone https://gitlab.com/projetos-atplus/atp-ftp/atp-ftp.git
    cd atp-ftp


## Alimente as variaveis de ambiente de acordo o seu ambiente

    mv .env.example .env


## Edite o arquivo .env
    EXTERNAL_IP=        IP de conexão com o FTP (IP do servidor)
    MYSQL_HOST=         Host de banco de dados
    MYSQL_PORT=         Porta de banco de dados
    MYSQL_USER=         Usuário de banco de dados
    MYSQL_PASSWORD=     Senha de banco de dados
    MYSQL_DATABASE=     Nome do banco de dados
    ADMIN_PASSWORD=     Senha do usuário admin do painel
    LETSENCRYPT_MAIL=   Email para certificado SSL
    DOMAIN_SERVER=      Dominio de acesso

<br>

## O servidor FTP precisa ter um certificado TLS para funcionar, crie o diretório de mapeamento do certificado para o servidor e insira a chave com estes comandos:

    mkdir cert 
    cd cert && openssl req -x509 -nodes -newkey rsa:2048 -keyout pure-ftpd.pem -out pure-ftpd.pem -days 3650 

## Comandos pra subir a aplicação

    docker-compose up -d

<br>

<h1> Troubleshooting </h1>

## Caso ocorra problema de acesso ao banco de dados no serviço de Backend, reinicie o serviço com o comando: 
    docker-compose restart pftp-backend




