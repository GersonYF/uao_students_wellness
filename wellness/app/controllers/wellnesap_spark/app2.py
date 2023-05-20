from pyspark.sql import SparkSession
from pyspark.sql.functions import count, col
from pyspark.sql.types import FloatType
from pyspark.sql.functions import when
from pyspark.sql.functions import when
# Create SparkSession
spark = SparkSession.builder.appName("Wellness").getOrCreate()

# Read the CSV file
df = spark.read.csv("/home/vagrant/wellnes-app/wellnesap_spark/school-survey-2018-19-1.csv", header=True, inferSchema=True)

# Select the "Unnamed: 4" column starting from the third row
columna_f = df.select('Unnamed: 4').rdd.map(lambda x: x[0]).collect()[2:]

# Count the occurrences of "Female", "Male", and "Trans"
contador_female = columna_f.count('Female')
contador_male = columna_f.count('Male')
contador_trans = columna_f.count('Trans')

# Select the "Unnamed: 228" column starting from the third row
columna_228 = df.select('Unnamed: 228').rdd.map(lambda x: x[0]).collect()[2:]

# Count the occurrences of "Yes" and "No"
contador_yes = columna_228.count('Yes')
contador_no = columna_228.count('No')

# Select the "Unnamed: 234" column starting from the third row
columna_234 = df.select('Unnamed: 234').rdd.map(lambda x: x[0]).collect()[2:]

# Count the occurrences of the responses
contador_yes_e_cig = columna_234.count('Yes, I have tried an electronic cigarette') + \
                     columna_234.count('Yes, I use electronic cigarettes daily') + \
                     columna_234.count('Yes, I use electronic cigarettes weekly')
contador_no_e_cig = columna_234.count('No, I have never used an electronic cigarette')

# Select the "Unnamed: 235" column starting from the third row
columna_235 = df.select('Unnamed: 235').rdd.map(lambda x: x[0]).collect()[2:]

# Count the occurrences of alcohol consumption frequencies
contador1 = columna_235.count('I drink alcohol once a week')
contador2 = columna_235.count('I drink only at certain times with my family')
contador3 = columna_235.count('I sometimes drink, but less than once a month')
contador4 = columna_235.count('I have tried alcohol once or twice without my family knowing')
contador5 = columna_235.count('I sometimes drink, but less than once a week')
contador6 = columna_235.count('I have never had a drink of alcohol')
contador7 = columna_235.count('I drink alcohol 2 to 3 times a week')
contador8 = columna_235.count('I drink alcohol every day')

# Define the lists of alcohol consumption classifications
ocasionales = ["I sometimes drink, but less than once a month",
               "I have tried alcohol once or twice without my family knowing",
               "I sometimes drink, but less than once a week"]
moderados = ["I drink only at certain times with my family", "I drink alcohol 2 to 3 times a week"]
alto_consumo = ["I drink alcohol once a week", "I drink alcohol every day"]
abstemios = ["I have never had a drink of alcohol"]

# Count the number of people in each alcohol consumption classification
ocasionales_count = df.filter(col("Unnamed: 235").isin(ocasionales)).count()
moderados_count = df.filter(col("Unnamed: 235").isin(moderados)).count()
alto_consumo_count = df.filter(col("Unnamed: 235").isin(alto_consumo)).count()
abstemios_count = df.filter(col("Unnamed: 235").isin(abstemios)).count()

# Select the "Unnamed: 335" column and filter out null values
horas_sueno = df.select('Unnamed: 335').filter(col('Unnamed: 335').isNotNull())

# Convert the column to FloatType
#horas_sueno = horas_sueno.withColumn('Unnamed: 335', col('Unnamed: 335').cast(FloatType()))

# Calculate the mean
#media = horas_sueno.agg({'Unnamed: 335': 'mean'}).first()[0]

# Calculate the median
#mediana = horas_sueno.approxQuantile('Unnamed: 335', [0.5], 0)[0]

# Calculate the mode
#moda = horas_sueno.groupBy('Unnamed: 335').count().orderBy('count', ascending=False).first()[0]

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

# Mostrar los resultados antes de crear el DataFrame
print("------------------------------------Frecuencia de horas de sueño---------------------------------------------")
frecuencia_valores.show()

print("------------------------------------Clasificación de sueño---------------------------------------------")
frecuencia_clasificacion.show()

print("------------------------------------Porcentaje de clasificación de sueño---------------------------------------------")
porcentaje_clasificacion.show()


# Print the results
print("------------------------------------Genero de los encuestados---------------------------------------------")
print("Cantidad de 'female':", contador_female)
print("Cantidad de 'male':", contador_male)
print("Cantidad de 'trans':", contador_trans)

print("---------------------------------Numero de personas que fuman cigarrillo'---------------------------------------")
print("Cantidad de 'Yes':", contador_yes)
print("Cantidad de 'No':", contador_no)

print("------------------------------------Uso de cigarrillos electrónicos---------------------------------------------")
print("Cantidad de respuestas afirmativas:", contador_yes_e_cig)
print("Cantidad de respuestas negativas:", contador_no_e_cig)

print("------------------------------------Frecuencia de consumo de alcohol---------------------------------------------")
print("Cantidad de 'I drink alcohol once a week':", contador1)
print("Cantidad de 'I drink only at certain times with my family':", contador2)
print("Cantidad de 'I sometimes drink, but less than once a month':", contador3)
print("Cantidad de 'I have tried alcohol once or twice without my family knowing':", contador4)
print("Cantidad de 'I sometimes drink, but less than once a week':", contador5)
print("Cantidad de 'I have never had a drink of alcohol':", contador6)
print("Cantidad de 'I drink alcohol 2 to 3 times a week':", contador7)
print("Cantidad de 'I drink alcohol every day':", contador8)

print("------------------------------------Clasificación de consumo de alcohol---------------------------------------------")
print("Cantidad de ocasionales:", ocasionales_count)
print("Cantidad de moderados:", moderados_count)
print("Cantidad de alto consumo:", alto_consumo_count)
print("Cantidad de abstemios:", abstemios_count)

print("------------------------------------Horas de sueño---------------------------------------------")
#print("Media: ", media)
#print("Mediana: ", mediana)
#print("Moda: ", moda)

# Create the DataFrame for results
results_data = [
    ("Gender", "Female", int(contador_female)),
    ("Gender", "Male", int(contador_male)),
    ("Gender", "Trans", int(contador_trans)),
    ("Smoking", "Yes", int(contador_yes)),
    ("Smoking", "No", int(contador_no)),
    ("E-cigarettes", "Affirmative responses", int(contador_yes_e_cig)),
    ("E-cigarettes", "Negative responses", int(contador_no_e_cig)),
    ("Alcohol consumption frequency", "I drink alcohol once a week", int(contador1)),
    ("Alcohol consumption frequency", "I drink only at certain times with my family", int(contador2)),
    ("Alcohol consumption frequency", "I sometimes drink, but less than once a month", int(contador3)),
    ("Alcohol consumption frequency", "I have tried alcohol once or twice without my family knowing", int(contador4)),
    ("Alcohol consumption frequency", "I sometimes drink, but less than once a week", int(contador5)),
    ("Alcohol consumption frequency", "I have never had a drink of alcohol", int(contador6)),
    ("Alcohol consumption frequency", "I drink alcohol 2 to 3 times a week", int(contador7)),
    ("Alcohol consumption frequency", "I drink alcohol every day", int(contador8)),
    ("Alcohol consumption classification", "Occasional drinkers", int(ocasionales_count)),
    ("Alcohol consumption classification", "Moderate drinkers", int(moderados_count)),
    ("Alcohol consumption classification", "High consumption", int(alto_consumo_count)),
    ("Alcohol consumption classification", "Abstainers", int(abstemios_count)),
    ("Sleep", "Frecuencia de horas de sueño", frecuencia_clasificacion),
    ("Sleep", "Clasificación de sueño", total_estudiantes),
   # ("Sleep", "Porcentaje de clasificación de sueño", porcentaje_clasificacion)
  #  ("Sleep", "Average", float(media)),
 #   ("Sleep", "Median", float(mediana[0])),
#    ("Sleep", "Mode", float(moda[0][0])),
]

results_df = spark.createDataFrame(results_data, ["Category", "Value", "Count"])

# Save the results to a CSV file
results_df.write.csv("/home/vagrant/wellnes-app/wellnesap_spark/resultados1.csv", header=True)

# Stop the Spark session
spark.stop()

