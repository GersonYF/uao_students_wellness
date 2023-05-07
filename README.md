# Para ejecutar el proyecto

## 1° Paso:
Una vez estando directamente dentro de la carpeta, ejecutar el comando `sudo docker compose up`.

## 2° Paso:
Después, cargaremos el archivo .sql en postgres: `sudo psql -h 192.168.100.2 -p 32000 -U postgres -d wellness_uao -a -f config/seeders/output.sql`

