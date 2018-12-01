# logging
Logging service 

Luego de descargar:
```
npm install
npm install -g nodemon
```

Para iniciar(levanta en puerto 7000):
```
npm start
```

Endpoints disponibles:

* **Saber si UNQFY esta vivo**: localhost:7000/api/isUNQFYAlive

* **Saber estado del servicio de log**: localhost:7000/api/statusLog

* **Activar servicio de log**: localhost:7000/api/startLog

* **Desactivar servicio de log**: localhost:7000/api/stopLog

//EN CURSO:
* **Loggear en canal de Slack**: localhost:7000/log