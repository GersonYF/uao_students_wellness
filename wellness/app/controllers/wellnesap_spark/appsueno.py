from pyspark.sql import SparkSession
from pyspark.sql.functions import count, when, col

spark = SparkSession.builder.appName("Wellness").getOrCreate()

df = spark.read.csv("/home/vagrant/wellnes-app/wellnesap_spark/school-survey-2018-19-1.csv", header=True, inferSchema=True)

# Seleccionar la columna "335" y contar la frecuencia de cada valor específico
valores_interesantes = ["10 hours", "11 hours", "12 hours", "12+ hours", "5 hours", "6 hours", "7 hours", "8 hours", "9 hours", "Less than 5 hours"]
frecuencia_valores = df.groupBy("Unnamed: 335").count().filter(col("Unnamed: 335").isin(valores_interesantes)).orderBy(col("count").desc())


# Agrupar estudiantes según si duermen mal o duermen correctamente
df_clasificacion = df.withColumn("Clasificacion", when(col("Unnamed: 335").isin(["Less than 5 hours", "5 hours"]), "Mal sueño").otherwise("Buen sueño"))

# Contar la frecuencia de clasificación
frecuencia_clasificacion = df_clasificacion.groupBy("Clasificacion").count()

# Calcular el total de estudiantes
total_estudiantes = df_clasificacion.count()

# Calcular el porcentaje de cada clasificación
porcentaje_clasificacion = frecuencia_clasificacion.withColumn("Porcentaje", (col("count") / total_estudiantes) * 100)

# Mostrar los resultados
frecuencia_valores.show()
frecuencia_clasificacion.show()
porcentaje_clasificacion.show()
