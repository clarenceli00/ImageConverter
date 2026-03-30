# Stage 1: Build using a verified Maven + Java 25 tag
FROM maven:3.9-eclipse-temurin-25-noble AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Run using the official Java 25 JRE
FROM eclipse-temurin:25-jre-noble
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
