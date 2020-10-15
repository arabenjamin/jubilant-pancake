FROM golang:1.9


copy app/server.go server.go

WORKDIR .
EXPOSE 8080


CMD ["go", "run", "server.go"]

