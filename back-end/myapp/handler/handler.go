package handler

import (
	"encoding/json"
	"io"
	"log"
	"myapp/helper"
	"net/http"

	"github.com/labstack/echo/v4"
)

type User struct {
	UserName string `json:"username"`
	PassWord string `json:"password"`
	Role     string `json:"role"`
}

type LoginSesseion struct {
	UserName string `json:"username"`
	Role     string `json:"role"`
}

type Details struct {
	Data LoginSesseion `json:"data"`
}

func HealthCheck(c echo.Context) error {
	return c.String(http.StatusOK, "service is alive!!")
}

func HelloAdmin(c echo.Context) error {
	return c.String(http.StatusOK, "Welcome to admin main page")
}

func GetAllUsers(c echo.Context) error {
	users, err := helper.ReadCSVFile("clients.csv")
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to read the file")
	}
	// log.Println(users)
	allUsers := []User{}
	for _, user := range users {
		allUsers = append(allUsers, User{
			UserName: user[0],
			PassWord: user[1],
			Role:     user[2],
		})
	}
	return c.JSON(http.StatusOK, allUsers)
}

func Register(c echo.Context) error {
	r := User{}

	defer c.Request().Body.Close()
	b, err := io.ReadAll(c.Request().Body)

	if err != nil {
		log.Println("Fail to reading the request: ", err)
		return c.String(http.StatusInternalServerError, "")
	}
	err = json.Unmarshal(b, &r)
	if err != nil {
		log.Println("Failed to unmarshaling in addUser: ", err)
		return c.String(http.StatusInternalServerError, "")
	}
	helper.UpdateCSVFile(r.UserName, r.PassWord, r.Role, "clients.csv")
	return c.String(http.StatusOK, "signup successful!")
}

func HelloClient(c echo.Context) error {
	return c.String(http.StatusOK, "Welcome to client main page")
}

func Login(c echo.Context) error {
	l := User{}

	defer c.Request().Body.Close()
	b, err := io.ReadAll(c.Request().Body)

	if err != nil {
		log.Println("Fail to reading the request: ", err)
		return c.String(http.StatusInternalServerError, "")
	}

	err = json.Unmarshal(b, &l)
	if err != nil {
		log.Println("Failed to unmarshaling in addUser: ", err)
		return c.String(http.StatusInternalServerError, "")
	}

	clientExits, role, clientErr := helper.CheckCredentials(l.UserName, l.PassWord, "clients.csv")
	// adminExits, adminErr := helper.CheckCredentials(l.UserName, l.PassWord, "admin.csv")
	if clientErr != nil {
		return c.String(http.StatusInternalServerError, "Failed to check credentials")
	}
	if !clientExits {
		return c.String(http.StatusUnauthorized, "Invalid credentials")
	}
	user := LoginSesseion{
		UserName: l.UserName,
		Role:     role,
	}
	return c.JSON(http.StatusOK, user)
}

func GetClientData(c echo.Context) error {
	csv, data, err := helper.ReadCustomerDataCsv("client.csv")
	if err != nil {
		return c.String(http.StatusInternalServerError, "Failed to read the file")
	}
	if !csv {
		return c.String(http.StatusInternalServerError, "Failed to read the file")
	}
	return c.JSON(http.StatusOK, data)
}

func GetAdminData(c echo.Context) error {
	clientCsv, clientData, clientErr := helper.ReadCustomerDataCsv("client.csv")
	adminCsv, adminData, adminErr := helper.ReadCustomerDataCsv("admin.csv")
	if clientErr != nil || adminErr != nil {
		return c.String(http.StatusInternalServerError, "Failed to read the file")
	}
	if !clientCsv || !adminCsv {
		return c.String(http.StatusInternalServerError, "Failed to read the file")
	}

	data := append(clientData, adminData...)
	return c.JSON(http.StatusOK, data)
}
