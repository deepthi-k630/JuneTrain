# Build stage: compile the Java application
FROM eclipse-temurin:21-jdk-jammy AS builder
WORKDIR /app
COPY HelloWebServer.java /app/
RUN javac HelloWebServer.java

# Runtime stage: use a smaller JRE image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=builder /app/*.class /app/

EXPOSE 8080
CMD ["java", "-cp", "/app", "HelloWebServer"]