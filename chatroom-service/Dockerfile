FROM alpine:latest

ARG POCKETBASE_VERSION=0.22.8
WORKDIR /app

RUN apk add --no-cache ca-certificates unzip wget curl zip zlib-dev
ADD https://github.com/pocketbase/pocketbase/releases/download/v${POCKETBASE_VERSION}/pocketbase_${POCKETBASE_VERSION}_linux_amd64.zip pocketbase.zip

RUN unzip pocketbase.zip && chmod +x ./pocketbase && rm pocketbase.zip

COPY . /app

HEALTHCHECK --interval=10s --timeout=5s --start-period=5s CMD curl -f http://localhost:8090/api/health || exit 1

CMD ["./pocketbase", "serve", "--http=0.0.0.0:8090"]
