from pyspark.sql import SparkSession
from pyspark.sql.functions import count, when, col
from pyspark.sql.types import FloatType

spark = SparkSession.builder.appName("Wellness").getOrCreate()

# Lee el archivo csv
df = spark.read.csv("/home/vagrant/wellnes-app/wellnesap_spark/school-survey-2018-19-1.csv", header=True, inferSchema=True)

# Selecciona las filas desde la tercera (índice 2) y la columna F
columna_f = df.select('Unnamed: 4').rdd.map(lambda x: x[0]).collect()[2:]

# Cuenta las ocurrencias de "Female", "Male" y nulos
contador_female = columna_f.count('Female')
contador_male = columna_f.count('Male')
contador_trans = columna_f.count('Trans')

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


horas_sueno = df.withColumn("Unnamed: 335", df["Unnamed: 335"].cast(FloatType())).filter(col("Unnamed: 335").isNotNull())

# Calcula la media
media = horas_sueno.agg({'Unnamed: 335': 'mean'}).collect()[0][0]
print(f'Media: {media}')

# Calcula la mediana
horas_sueno = horas_sueno.sort("Unnamed: 335")
mediana = horas_sueno.approxQuantile("Unnamed: 335", [0.5], 0)
#print(f'Mediana: {mediana[0]}')

# Calcula la moda
moda = horas_sueno.groupBy('Unnamed: 335').count().orderBy('count', ascending=False)
print(f'Moda: {moda}')

# Imprime los resultados
print("------------------------------------Genero de los encuestados---------------------------------------------")
print("Cantidad de 'female':", contador_female)
print("Cantidad de 'male':", contador_male)
print("Cantidad de trans:", contador_trans)

# Imprime los resultados
print("---------------------------------Numero de personas que fuman cigarrillo'---------------------------------------")
print("Cantidad de 'Yes':", contador_yes)
print("Cantidad de 'No':", contador_no)

print("------------------------------------Uso de cigarrillos electrónicos---------------------------------------------")
print("Cantidad de respuestas afirmativas:", contador_yes_e_cig)
print("Cantidad de respuestas negativas:", contador_no_e_cig)

#Imprimir resultados
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

results_df = spark.createDataFrame([
    ("Gender", "Female", contador_female),
    ("Gender", "Male", contador_male),
    ("Gender", "Trans", contador_trans),
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
    ("Sleep", "Average", media),
    ("Sleep", "Median", mediana),
    ("Sleep", "Mode", moda)], ["Category", "Value", "Count"])

# Guarda los resultados en un archivo CSV
results_df.write.csv("/home/vagrant/wellnes-app/wellnesap_spark/resultados1.csv", header=True)

# Cierra la sesión de Spark
spark.stop()

