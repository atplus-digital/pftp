#!/bin/bash

# mysql configuration
cat << EOM > /etc/pure-ftpd/db/mysql.conf
#MYSQLSocket        /var/run/mysqld/mysqld.sock
MYSQLServer         ${MYSQL_HOST:-mysql}
MYSQLPort           ${MYSQL_PORT:-3306}
MYSQLUser           ${MYSQL_USER:-pureftpd}
MYSQLPassword       ${MYSQL_PASSWORD:-password}
MYSQLDatabase       ${MYSQL_DATABASE:-pureftpd}
MYSQLCrypt          md5
MYSQLGetPW          SELECT Password FROM ftpd WHERE User="\L" AND status="1" AND (ipaccess = "*" OR ipaccess LIKE "\R")
MYSQLGetUID         SELECT Uid FROM ftpd WHERE User="\L" AND status="1" AND (ipaccess = "*" OR ipaccess LIKE "\R")
MYSQLGetGID         SELECT Gid FROM ftpd WHERE User="\L"AND status="1" AND (ipaccess = "*" OR ipaccess LIKE "\R")
MYSQLGetDir         SELECT Dir FROM ftpd WHERE User="\L"AND status="1" AND (ipaccess = "*" OR ipaccess LIKE "\R")
MySQLGetBandwidthUL SELECT ULBandwidth FROM ftpd WHERE User="\L"AND status="1" AND (ipaccess = "*" OR ipaccess LIKE "\R")
MySQLGetBandwidthDL SELECT DLBandwidth FROM ftpd WHERE User="\L"AND status="1" AND (ipaccess = "*" OR ipaccess LIKE "\R")
MySQLGetQTASZ       SELECT QuotaSize FROM ftpd WHERE User="\L"AND status="1" AND (ipaccess = "*" OR ipaccess LIKE "\R")
MySQLGetQTAFS       SELECT QuotaFiles FROM ftpd WHERE User="\L"AND status="1" AND (ipaccess = "*" OR ipaccess LIKE "\R")
EOM

echo yes > /etc/pure-ftpd/conf/ChrootEveryone
echo yes > /etc/pure-ftpd/conf/CreateHomeDir

# tls enable and certificate mix
TLS=0
if [ -e /etc/ssl/private/imported.pem ];
then
	cat /etc/ssl/private/imported.pem > /etc/ssl/private/pure-ftpd.pem
	chmod 600 /etc/ssl/private/pure-ftpd.pem
	TLS=1
else
    openssl req -x509 -nodes -newkey rsa:2048 -keyout /etc/ssl/private/pure-ftpd.pem -out \
    /etc/ssl/private/pure-ftpd.pem -subj "/C=${TLS_C:-US}/ST=${TLS_ST:-California}/L=${TLS_L:-San Francisco}/O=${TLS_O:-Company}/OU=.../CN=${TLS_CN:-localhost}/emailAddress=${TLS_EMAILADDRESS:-example@localhost}" -days 3650 
    chmod 600 /etc/ssl/private/pure-ftpd.pem
    TLS=1
fi

echo $TLS > /etc/pure-ftpd/conf/TLS

# Define Force passive IP

echo ${EXTERNAL_IP:-localhost} > /etc/pure-ftpd/conf/ForcePassiveIP 

#Define Range Passive Port 
echo "30000 30009" > /etc/pure-ftpd/conf/PassivePortRange

# start syslog service
service syslog-ng start

# Start service PureFTPD 
/etc/init.d/pure-ftpd-mysql start &&  tail -f /var/log/*.log




