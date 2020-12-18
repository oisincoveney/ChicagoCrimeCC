Spark-shell
import org.apache.spark.sql.SQLContext
val sqlContext = new SQLContext(sc)
val df = sqlContext.read.format("com.databricks.spark.csv").option("header", "true").option("inferSchema", "true").load("hdfs://cluster-6a54-m/user/Chicago_Crimes_2012_to_2017.csv")
val selectedData = df.select("Case Number", "Date" , "Block","Primary Type","Description","Location Description","Arrest","Domestic","Beat","Ward","Year","Updated On","Latitude","Longitude").filter("Latitude is not NULL and Longitude is not NULL").filter(df("Latitude").isNotNull && df("Longitude").isNotNull).filter(col("Latitude").isNotNull && col("Longitude").isNotNull)
selectedData.write.format("org.apache.spark.sql.json").save("hdfs://cluster-6a54-m/user/output51/crimes.json");

hadoop fs -getmerge /user/output51/crimes.json/ ./cleaned-crimes.json

