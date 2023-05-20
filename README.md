# Entregables:

## Documento:
[Enlace del documento en PDF]([https://drive.google.com/file/d/165qHfGI9ggK-EEZPdEGArpS-wOwYByzW/view?usp=sharing](https://drive.google.com/file/d/16JFMwZwN9TGsDETnoVtnijnfQ6CE8EwF/view?usp=sharing))

## Diapositivas:
[Enlace de las diapositivas](https://docs.google.com/presentation/d/1PgvvTkmKyRi18lDxU-DeTAYaH0nQNytDgPLbXNsX_wM/edit?usp=sharing)

# Para ejecutar el proyecto

Para la ejecución del proyecto se requiere de un ambiente vagrant con dos máquinas virtuales, la primera llamada **servidorUbuntu** con IP 192.168.100.2 y la segunda **clienteUbuntu** con IP 192.168.100.3.

Los siguientes pasos para la ejecución correcta de la aplicación.

## 1° Paso:
Seguir los pasos del siguiente documento, para la descarga e instalación de las herramientas necesarias como lo es Vagrant y VirtualBox.

[Descarga, instalación y ejecución de las herramientas necesarias](documentos/instalacion_y_ejecucion.pdf) <sub>__*Material realizado por Oscar Mondragón y Zeida Solarte, tomado del UAO VIRTUAL.*__</sub>

## 2° Paso:
Ingresamos a cada máquina virtual una vez posicionados en la carpeta que contiene el archivo Vagrantfile, el comando `vagrant ssh (nombre de la máquina virtual)`, **servidorUbuntu** y **clienteUbuntu**.

## 3° Paso:
Descargamos e instalamos el ambiente Docker para la ejecución de la aplicación siguiendo los siguientes pasos:

[Descarga e instalación de ambiente Docker](documentos/descarga_e_instalacion_de_ambiente_docker.pdf) <sub>__*Material realizado por Oscar Mondragón, tomado del UAO VIRTUAL.*__</sub>

## 4° Paso:
Desde la máquina virtual **servidorUbuntu**, iniciamos un cluster de Docker Swarm en el que obtenemos el rol Master, para gestionar y escalar la aplicación distribuida con **clienteUbuntu**, ejecutando el comando:

```
docker swarm init
```

> Se recomienda usar `sudo` como prefijo de cualquier comando para evitar problemas de accesibilidad o permisos en el caso de que nuestro usuario no sea administrador.

Esto nos devuelve el comando para permitir la unión de otros con el rol de Worker, como lo siguiente:

```
To add a worker to this swarm, run the following command:
    docker swarm join --token SWMTKN-1-68xc2eh82xcv9033kmzy2bvag3daj1776aif0i5m3x7c03jnjw-820eaqkd5wgk72d7f23nz4b76 192.168.100.2:2377
```

Ese comando lo copiamos.

## 5° Paso:
Desde la máquina virtual **clienteUbuntu**, nos unimos al clúster con el comando del resultado obtenido anteriormente.

```
docker swarm join --token SWMTKN-1-68xc2eh82xcv9033kmzy2bvag3daj1776aif0i5m3x7c03jnjw-820eaqkd5wgk72d7f23nz4b76 192.168.100.2:2377
```

## 6° Paso:
Instalamos git para poder obtener los archivos necesarios; para ello, ingresamos al siguiente sitio web y seguimos los pasos para su instalación.

[Descarga e instalación de ambiente Docker](https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-20-04-es) <sub>__*Material realizado por Lisa Tagliaferri, tomado de DigitalOcean.*__</sub>

## 7° Paso:
Teniendo **git**, nos posicionamos en la ubicación donde queremos obtener la carpeta de git y ejecutamos el siguiente código:

```
git clone https://github.com/GersonYF/uao_students_wellness.git
```

Estaremos con la rama **main**.

## 8° Paso:
Ahora necesitamos instalar todo lo relacionado al ambiente de procesamiento distribuido, para esto debemos seguir los pasos del siguiente documento:

> **Aclaraciones.** La carpeta de *labSpark* debe ser hermana directa de la carpeta *uao_students_wellness*, es decir, en el mismo nivel dentro de la misma ubicación padre, para acceder de forma relativa entre ellas.

[Descarga e instalación del ambiente de procesamiento distribuido Apache Spark](documentos/instalacion_y_ejecucion_spark.pdf) <sub>__*Material realizado por Oscar Mondragón, tomado del UAO VIRTUAL.*__</sub>

> **Aclaraciones.** La configuración de IPs del **servidorUbuntu** y el **clienteUbuntu** son **192.168.100.2** y **192.168.100.3** respectivamente. Además, el link que es para descargar spark es **https://dlcdn.apache.org/spark/spark-3.4.0/spark-3.4.0-bin-hadoop3.tgz**. Se debe instalar en ambas máquinas con el mismo nombre en las carpetas.

## 9° Paso:
De acuerdo a la ubicación de instalación de Apache Spark, creamos una carpeta llamada _app_ directamente dentro de la carpeta *labSpark*, donde alojaremos la aplicación encontrada en el **git** llamada *app3.py* en la carpeta *labSpark_app*.

## 10° Paso:
Ingresamos a la carpeta que copiamos *spark-3.4.0-bin-hadoop3* y luego en el directorio *sbin* para inicializar el **master**, con el comando:

```
./start-master.sh
```

## 11° Paso:
Ahora pasamos al **clienteUbuntu** y en la misma ubicación de *sbin*, ejecutamos el comando para conectarnos como **workers**:

```
./startworker.sh spark://192.168.100.2:7077
```

Para comprobar que las conexiones están correctamente, ejecutamos el comando:

```
cat **ubication**/labSpark/spark-3.3.2-bin-hadoop3/logs/spark-vagrantorg.apache.spark.deploy.worker.Worker-1-clienteUbuntu.out
```

Donde **ubication** es la ubicación donde se encuentra la carpeta, por ejemplo "**/home/vagrant**".

## 12° Paso:
Debemos tener la dirección del dataset que se encuentra dentro de la carpeta *documentos* llamado *dataset_load.csv* para ingresarla al momento de ejecutar la app de Spark. A esta se le apodará "**dataset_load**" para referenciarla con facilidad.

## 13° Paso:
Debemos tener la dirección donde se crearán los resultados del análisis; esta será dentro de la carpeta *uao_students_wellness* en *wellnesap_spark*. A esta se le apodará "**wellnesap_spark**" para referenciarla con facilidad.

## 14° Paso:
Ahora lanzaremos la aplicación, para esto, desde **servidorUbuntu** salimos de la carpeta *sbin* e ingresamos a la carpeta *bin*, ejecutando el siguiente comando:

```
./spark-submit --master spark://192.168.100.2:7077 --conf spark.executor.memory=1g **ubication**/labSpark/app/app.py "*dataset_load*" "../../uao_students_wellness/wellnesap_spark"
```

Donde **ubication** es la ubicación donde se encuentra la carpeta *labSpark*, por ejemplo "**/home/vagrant**".

## 15° Paso:
Una vez estando directamente dentro de la carpeta, ejecutar el comando `sudo docker compose up`.

## 16° Paso:
Después para cargar los registros sql, nos posicionamos en la carpeta **wellnesap_spark** y cargamos el archivo output.sql en postgres con el comando: `sudo psql -h 192.168.100.2 -p 32000 -U postgres -d wellness_uao -a -f config/seeders/output.sql` con contraseña `postgres`.

Podemos ingresar a la DB con el commando: `sudo psql -h 192.168.100.2 -p 32000 -U postgres -d wellness_uao` con contraseña `postgres`.

## 17° Paso:
Procedemos a ingresar a la aplicación con la url: `192.168.100.2:5080`

> Los correos para acceder son: *lance64@example.net*, *carrieturnerstaff@example.com*, *johnsonmichaelsuper@example.com*; la contraseña de todos los correos es: *autonoma1234*.
