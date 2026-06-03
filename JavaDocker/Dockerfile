# Simple single-stage build
FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY HelloWebServer.java /app/
RUN javac HelloWebServer.java

EXPOSE 8080
CMD ["java", "-cp", "/app", "HelloWebServer"]