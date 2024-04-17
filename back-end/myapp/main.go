package main

import (
	"github.com/labstack/echo/v4"

	"myapp/helper"
	m "myapp/middleware"
	r "myapp/routes"

	_ "github.com/swaggo/echo-swagger/example/docs"
)

func main() {
	e := echo.New()

	helper.SetCSVFile()
	// middleware
	m.SetMiddleWare(e)
	//routes
	r.Routes(e)

	e.Logger.Fatal(e.Start(":8000"))
}
