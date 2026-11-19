@echo off
echo list file before update ........
ssh controldata "ls -lat '/var/www/html/mpsicc/paperless/client/'"
echo remove source on server ..........
ssh controldata "rm -rf /var/www/html/mpsicc/paperless/client/* "
ssh controldata "ls -lat '/var/www/html/mpsicc/paperless/client/'"
echo up source to server ..........
scp -r dist/* controldata:/var/www/html/mpsicc/paperless/client/
echo +++ up load finish +++

