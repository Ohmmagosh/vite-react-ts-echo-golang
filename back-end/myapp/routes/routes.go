package routes

import (
	"myapp/handler"

	m "myapp/middleware"

	"github.com/labstack/echo/v4"
)

func Routes(e *echo.Echo) {
	e.GET("/", handler.HealthCheck)
	e.POST("/login", handler.Login)
	e.POST("/register", handler.Register)
	clientRoutes(e)
	adminRoutes(e)
}

func clientRoutes(e *echo.Echo) {

	c := e.Group("/client")
	c.GET("/main", handler.HelloClient, m.AuthMiddleware("clients.csv", "client"))
	c.GET("/data", handler.GetClientData, m.AuthMiddleware("clients.csv", "client"))
}

func adminRoutes(e *echo.Echo) {
	a := e.Group("/admin")
	a.GET("/main", handler.HelloAdmin, m.AuthMiddleware("clients.csv", "admin"))
	a.GET("/users", handler.GetAllUsers, m.AuthMiddleware("clients.csv", "admin"))
	a.GET("/data", handler.GetAdminData, m.AuthMiddleware("clients.csv", "admin"))
}
