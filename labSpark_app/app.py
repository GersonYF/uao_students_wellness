from pyspark.sql import SparkSession
from pyspark.sql.functions import count, when, col

spark = SparkSession.builder.appName("Wellness").getOrCreate()

df = spark.read.csv("/home/vagrant/wellnes-app/wellnesap_spark/school-survey-2018-19-1.csv", header=True, inferSchema=True)

# Selecciona las filas desde la tercera (índice 2) y la columna F
columna_f = df.select('Unnamed: 4').rdd.map(lambda x: x[0]).collect()[2:]

# Cuenta las ocurrencias de "Female", "Male" y nulos
contador_female = columna_f.count('Female')
contador_male = columna_f.count('Male')
contador_trans = columna_f.count('Trans')
contador_noone = columna_f.count('I would describe my gender in some other way')

# Selecciona las filas desde la tercera (índice 2) y la columna "Unnamed: 228"
columna_228 = df.select('Unnamed: 228').rdd.map(lambda x: x[0]).collect()[2:]

# Cuenta las ocurrencias de "Yes" y "No"
contador_yes = columna_228.count('Yes')
contador_no = columna_228.count('No')

# Selecciona las filas desde la tercera (índice 2) y la columna "Unnamed: 234"
columna_234 = df.select('Unnamed: 234').rdd.map(lambda x: x[0]).collect()[2:]

# Cuenta las ocurrencias de las respuestas
contador_yes_e_cig = columna_234.count('Yes, I have tried an electronic cigarette') + columna_234.count('Yes, I use electronic cigarettes daily') + columna_234.count('Yes, I use electronic cigarettes weekly')
contador_no_e_cig = columna_234.count('No, I have never used an electronic cigarette')

# Agrupa por la columna "Unnamed: 238" y cuenta las ocurrencias
resultados = df.groupBy("Unnamed: 238").count()

# Selecciona las filas desde la tercera (índice 2) y la columna "Unnamed: 235"
columna_235 = df.select('Unnamed: 235').rdd.map(lambda x: x[0]).collect()[2:]

# Cuenta las ocurrencias de la cantidad de veces que los encuestados toman alcohol
contador1 = columna_235.count('I drink alcohol once a week')
contador2 = columna_235.count('I drink only at certain times with my family')
contador3 = columna_235.count('I sometimes drink, but less than once a month')
contador4 = columna_235.count('I have tried alcohol once or twice without my family knowing')
contador5 = columna_235.count('I sometimes drink, but less than once a week')
contador6 = columna_235.count('I have never had a drink of alcohol')
contador7 = columna_235.count('I drink alcohol 2 to 3 times a week')
contador8 = columna_235.count('I drink alcohol every day')

# Define las listas de grupos de frecuencia de consumo
ocasionales = ["I sometimes drink, but less than once a month", "I have tried alcohol once or twice without my family knowing", "I sometimes drink, but less than once a week"]
moderados = ["I drink only at certain times with my family", "I drink alcohol 2 to 3 times a week"]
alto_consumo = ["I drink alcohol once a week", "I drink alcohol every day"]
abstemios = ["I have never had a drink of alcohol"]

# Cuenta la cantidad de personas en cada grupo de frecuencia de consumo
ocasionales_count = df.select(count(when(col("Unnamed: 235").isin(ocasionales), 1))).collect()[0][0]
moderados_count = df.select(count(when(col("Unnamed: 235").isin(moderados), 1))).collect()[0][0]
alto_consumo_count = df.select(count(when(col("Unnamed: 235").isin(alto_consumo), 1))).collect()[0][0]
abstemios_count = df.select(count(when(col("Unnamed: 235").isin(abstemios), 1))).collect()[0][0]

# Calidad del sueño de los estudiantes
valores_interesantes = ["10 hours", "11 hours", "12 hours", "12+ hours", "5 hours", "6 hours", "7 hours", "8 hours", "9 hours", "Less than 5 hours"]
frecuencia_valores = df.groupBy("Unnamed: 335").count().filter(col("Unnamed: 335").isin(valores_interesantes)).orderBy(col("count").desc())

df_clasificacion = df.withColumn("Clasificacion", when(col("Unnamed: 335").isin(["Less than 5 hours", "5 hours"]), "Mal sueño").otherwise("Buen sueño"))

frecuencia_clasificacion = df_clasificacion.groupBy("Clasificacion").count()

total_estudiantes = df_clasificacion.count()

porcentaje_clasificacion = frecuencia_clasificacion.withColumn("Porcentaje", (col("count") / total_estudiantes) * 100)

# Mostrar los resultados
frecuencia_valores.show()
frecuencia_clasificacion.show()
porcentaje_clasificacion.show()

Acount_x = df.where(col('Unnamed: 350') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por Bullying")
print(f"Cantidad de respuestas 'X': {Acount_x}")
print()

Bcount_x = df.filter(col('Unnamed: 351') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por School/college work")
print(f"Cantidad de respuestas 'X': {Bcount_x}")
print()

Ccount_x = df.filter(col('Unnamed: 352') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por Exams")
print(f"Cantidad de respuestas 'X': {Ccount_x}")
print()

Dcount_x = df.filter(col('Unnamed: 353') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por College/University")
print(f"Cantidad de respuestas 'X': {Dcount_x}")
print()

Ecount_x = df.filter(col('Unnamed: 354') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por conseguir un aprendizaje")
print(f"Cantidad de respuestas 'X': {Ecount_x}")
print()

Fcount_x = df.filter(col('Unnamed: 355') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por obtener un trabajo")
print(f"Cantidad de respuestas 'X': {Fcount_x}")
print()

Gcount_x = df.filter(col('Unnamed: 356') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por viajar a la escuela")
print(f"Cantidad de respuestas 'X': {Gcount_x}")
print()

Hcount_x = df.filter(col('Unnamed: 357') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por apuestas")
print(f"Cantidad de respuestas 'X': {Hcount_x}")
print()

Jcount_x = df.filter(col('Unnamed: 359') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por problemas de dinero")
print(f"Cantidad de respuestas 'X': {Jcount_x}")
print()

Kcount_x = df.filter(col('Unnamed: 360') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por sus relaciones de pareja")
print(f"Cantidad de respuestas 'X': {Kcount_x}")
print()

Lcount_x = df.filter(col('Unnamed: 361') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por problemas familiares")
print(f"Cantidad de respuestas 'X': {Kcount_x}")
print()

Mcount_x = df.filter(col('Unnamed: 362') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por su discapacidad")
print(f"Cantidad de respuestas 'X': {Kcount_x}")
print()

Ncount_x = df.filter(col('Unnamed: 363') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por su apariencia")
print(f"Cantidad de respuestas 'X': {Kcount_x}")
print()

Ocount_x = df.filter(col('Unnamed: 364') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por problemas de drogas, tabaco o alcohol")
print(f"Cantidad de respuestas 'X': {Kcount_x}")
print()

Pcount_x = df.filter(col('Unnamed: 365') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por relaciones sexuales, embarazo o enfermedades")
print(f"Cantidad de respuestas 'X': {Kcount_x}")
print()

Qcount_x = df.filter(col('Unnamed: 366') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por problemas de salud en la familia")
print(f"Cantidad de respuestas 'X': {Kcount_x}")
print()

Rcount_x = df.filter(col('Unnamed: 367') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por poco dinero para acomer")
print(f"Cantidad de respuestas 'X': {Kcount_x}")
print()

Scount_x = df.filter(col('Unnamed: 368') == 'X').count()  # Contar las respuestas "x"
print("Preocupados por una separacion")
print(f"Cantidad de respuestas 'X': {Kcount_x}")
print()

# Crea un nuevo DataFrame con los resultados
results_df = spark.createDataFrame([
    ("Gender", "Female", contador_female),
    ("Gender", "Male", contador_male),
    ("Gender", "Trans", contador_trans),
    ("Gender", "I would describe my gender in some other way", contador_noone),
    ("Smoking", "Yes", contador_yes),
    ("Smoking", "No", contador_no),
    ("E-cigarettes", "Affirmative responses", contador_yes_e_cig),
    ("E-cigarettes", "Negative responses", contador_no_e_cig),
    ("Alcohol consumption frequency", "I drink alcohol once a week", contador1),
    ("Alcohol consumption frequency", "I drink only at certain times with my family", contador2),
    ("Alcohol consumption frequency", "I sometimes drink, but less than once a month", contador3),
    ("Alcohol consumption frequency", "I have tried alcohol once or twice without my family knowing", contador4),
    ("Alcohol consumption frequency", "I sometimes drink, but less than once a week", contador5),
    ("Alcohol consumption frequency", "I have never had a drink of alcohol", contador6),
    ("Alcohol consumption frequency", "I drink alcohol 2 to 3 times a week", contador7),
    ("Alcohol consumption frequency", "I drink alcohol every day", contador8),
    ("Alcohol consumption classification", "Occasional drinkers", ocasionales_count),
    ("Alcohol consumption classification", "Moderate drinkers", moderados_count),
    ("Alcohol consumption classification", "High consumption", alto_consumo_count),
    ("Alcohol consumption classification", "Abstainers", abstemios_count),
    ("Sleep quality", "10 hours", frecuencia_valores.filter(col("Unnamed: 335") == "10 hours").first()[1]),
    ("Sleep quality", "11 hours", frecuencia_valores.filter(col("Unnamed: 335") == "11 hours").first()[1]),
    ("Sleep quality", "12 hours", frecuencia_valores.filter(col("Unnamed: 335") == "12 hours").first()[1]),
    ("Sleep quality", "5 hours", frecuencia_valores.filter(col("Unnamed: 335") == "5 hours").first()[1]),
    ("Sleep quality", "6 hours", frecuencia_valores.filter(col("Unnamed: 335") == "6 hours").first()[1]),
    ("Sleep quality", "7 hours", frecuencia_valores.filter(col("Unnamed: 335") == "7 hours").first()[1]),
    ("Sleep quality", "8 hours", frecuencia_valores.filter(col("Unnamed: 335") == "8 hours").first()[1]),
    ("Sleep quality", "9 hours", frecuencia_valores.filter(col("Unnamed: 335") == "9 hours").first()[1]),
    ("Sleep quality", "Less than 5 hours", frecuencia_valores.filter(col("Unnamed: 335") == "Less than 5 hours").first()[1]),
    ("Sleep classification", "Mal sueño", frecuencia_clasificacion.filter(col("Clasificacion") == "Mal sueño").first()[1]),
    ("Sleep classification", "Buen sueño", frecuencia_clasificacion.filter(col("Clasificacion") == "Buen sueño").first()[1]),
    ("Preocupados por Bullying", "Salud mental", Acount_x), #Recordar la coma
    ("Preocupados por Colegio", "Salud mental", Bcount_x),
    ("Preocupados por Examenes", "Salud mental", Ccount_x),
    ("Preocupados por College/University", "Salud mental", Dcount_x),
    ("Preocupados por conseguir aprender", "Salud mental", Ecount_x),
    ("Preocupados por conseguir trabajo", "Salud mental", Fcount_x),
    ("Preocupados por viajar a la escuela", "Salud mental", Gcount_x),
    ("Preocupados por apuestas", "Salud mental", Hcount_x),
    ("Preocupados por problemas de dinero", "Salud mental", Jcount_x),
    ("Preocupados por sus relaciones de pareja", "Salud mental", Kcount_x),
    ("Preocupados por problemas familiares", "Salud mental", Lcount_x),
    ("Preocupados por su discapacidad", "Salud mental", Mcount_x),
    ("Preocupados por su apariencia", "Salud mental", Ncount_x),
    ("Preocupados por problemas de drogas, tabaco o alcohol", "Salud mental", Ocount_x),
    ("Preocupados por relaciones sexuales, embarazo o enfermedades", "Salud mental", Pcount_x),
    ("Preocupados por problemas de salud en la familia", "Salud mental", Qcount_x),
    ("Preocupados por poco dinero para acomer", "Salud mental", Rcount_x),
    ("Preocupados por una separacion", "Salud mental", Scount_x)
], ["Category", "Value", "Count"])

#datos_saludmental_df = spark.createDataFrame([
#    ("Preocupados por Bullying", Acount_x), #Recordar la coma
#    ("Preocupados por Colegio", Bcount_x),
#    ("Preocupados por Examenes", Ccount_x)



# Guarda los resultados en un archivo CSV
results_df.write.csv("/home/vagrant/wellnes-app/wellnesap_spark/resultados5.csv", header=True)

# Cierra la sesión de Spark
spark.stop()