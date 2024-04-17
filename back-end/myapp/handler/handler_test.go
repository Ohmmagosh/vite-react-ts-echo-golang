package handler

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestHealthCheck(t *testing.T) {
	e := echo.New()

	req := httptest.NewRequest(http.MethodGet, "/", nil)

	rec := httptest.NewRecorder()

	c := e.NewContext(req, rec)

	err := HealthCheck(c)

	assert.NoError(t, err)

	assert.Equal(t, http.StatusOK, rec.Code)

	assert.Equal(t, "service is alive!!", rec.Body.String())
}

func TestHelloAdmin(t *testing.T) {
	e := echo.New()

	req := httptest.NewRequest(http.MethodGet, "/admin/main", nil)

	rec := httptest.NewRecorder()

	c := e.NewContext(req, rec)

	err := HelloAdmin(c)

	assert.NoError(t, err)

	assert.Equal(t, http.StatusOK, rec.Code)

	assert.Equal(t, "Welcome to admin main page", rec.Body.String())
}
