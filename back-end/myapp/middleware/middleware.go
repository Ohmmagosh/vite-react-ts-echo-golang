package middleware

import (
	"net/http"

	"myapp/helper"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

var DefaultLoggerConfig = middleware.LoggerConfig{
	Skipper:          middleware.DefaultSkipper,
	Format:           "${time_rfc3339} ${method} ${status}  ${uri}\n",
	CustomTimeFormat: "2006-01-02 15:04:05.00000",
}

func SetMiddleWare(e *echo.Echo) {
	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format:           DefaultLoggerConfig.Format,
		CustomTimeFormat: DefaultLoggerConfig.CustomTimeFormat,
		Output:           DefaultLoggerConfig.Output,
	}))

	e.Use(middleware.Recover())
	e.Use(middleware.CORS())

}

func AuthMiddleware(filename, role string) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Extract username and password from basic auth header

			name := c.Request().Header.Get("name")
			userRole := c.Request().Header.Get("role")
			if name == "" || userRole == "" {
				return echo.NewHTTPError(http.StatusUnauthorized, "Missing credentials")
			}
			isRole, err := helper.CheckRole(name, userRole, role)
			if err != nil {
				return echo.NewHTTPError(http.StatusInternalServerError, "Failed to check role")
			}
			if !isRole {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid role")
			}

			return next(c)
		}
	}
}
