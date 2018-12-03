# logging
Logging service 

Para levantarlo con docker, primero tenemos que correr el siguiente comando para crear una subred:


 `- docker network create --subnet=172.20.0.0/16 unqfynet`


Luego, al levantar los containers lo hacemos sobre la red que acabamos de crear de la siguiente forma:

```

- docker build -t logging_image .
- docker run --net unqfnet --ip 172.20.0.23 -p 5002:5000 --name logging_container --user node logging_image

```

Para levantarlo localmente el servidor, tener instalado node y nodemon:
`npm install -g nodemon`

```
npm install
```

Y se levanta con:
```
npm start
```

Endpoints disponibles:

* **Saber si UNQFY esta vivo**: 172.20.0.23:5000/api/isUNQFYAlive

* **Saber estado del servicio de log**: 172.20.0.23:5000/api/statusLog

* **Activar servicio de log**: 172.20.0.23:5000/api/startLog

* **Desactivar servicio de log**: 172.20.0.23:5000/api/stopLog

* **Loggear en canal de Slack**: 172.20.0.23:5000/log (necesita un body con el campo "text", en formato JSON)
