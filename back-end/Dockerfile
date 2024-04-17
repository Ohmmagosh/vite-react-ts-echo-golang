FROM golang:1.22.2-bookworm

WORKDIR /app

COPY ./myapp /app/

RUN go build ./

EXPOSE 8000

CMD [ "./myapp" ]
