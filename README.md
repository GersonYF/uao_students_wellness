# Para ejecutar el proyecto

Para la ejecución del proyecto se requiere de un ambiente vagrant con dos máquinas virtuales, la primera llamada Servidorubuntu con IP 192.168.100.2 y la segunda ClienteUbuntu con IP 192.168.100.3.

Los siguientes pasos para la ejecución correcta de la aplicación.

## 1° Paso:
Seguir los pasos para la descarga e instalación de las herramientas necesarias como lo es Vagrant y VirtualBox.

[Descarga, instalación y ejecución de las herramientas necesarias](documentos/instalacion_y_ejecucion.pdf)

[Descarga, instalación y ejecución de las herramientas necesarias](https://docs.google.com/viewer?url=https://tudominio.com/documentos/instalacion_y_ejecucion.pdf)

<iframe src="documentos/ins)talacion_y_ejecucion.pdf" width="100%" height="500px">
    <p>Este navegador no puede mostrar el archivo PDF. Puedes descargarlo haciendo clic <a href="documentos/instalacion_y_ejecucion.pdf">aquí</a>.</p>
</iframe>


## X° Paso:
Desde la máquina virtual servidorUbuntu, iniciamos un cluster de Docker Swarm en el que obtenemos el rol Master, para gestionar y escalar la aplicación distribuida con el comando:

```
docker swarm init
```

Esto nos devuelve el comando para permitir la unión de otros con el rol de Worker, como lo siguiente:

```
To add a worker to this swarm, run the following command:
    docker swarm join --token SWMTKN-1-68xc2eh82xcv9033kmzy2bvag3daj1776aif0i5m3x7c03jnjw-820eaqkd5wgk72d7f23nz4b76 192.168.100.2:2377
```

Ese comando lo copiamos para lo siguiente.

## X° Paso:
Desde la máquina virtual clienteUbuntu, nos unimos al swarm con el comando del resultado obtenido anteriormente.

```
docker swarm join --token SWMTKN-1-68xc2eh82xcv9033kmzy2bvag3daj1776aif0i5m3x7c03jnjw-820eaqkd5wgk72d7f23nz4b76 192.168.100.2:2377
```

Una vez estando directamente dentro de la carpeta, ejecutar el comando `sudo docker compose up`.

## 2° Paso:
Después, cargaremos el archivo .sql en postgres: `sudo psql -h 192.168.100.2 -p 32000 -U postgres -d wellness_uao -a -f config/seeders/output.sql`

