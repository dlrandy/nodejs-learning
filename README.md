# nodejs-learning

mkdir -p ./app/.{recipe-api, shared}/tls

openssl req -nodes -new -x509 -keyout app/recipe-api/tls/basic-private-key.key -out app/shared/tls/basic-certificate.cert
