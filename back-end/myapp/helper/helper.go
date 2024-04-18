package helper

import (
	"encoding/csv"
	"fmt"
	"os"
)

func SetCSVFile() {
	createCSVFile("clients.csv")
	UpdateCSVFile("admin", "admin", "admin", "clients.csv")
	UpdateCSVFile("client", "client", "client", "clients.csv")
}

type Customer struct {
	Index            int
	CustomerId       string
	FirstName        string
	LastName         string
	Company          string
	City             string
	Country          string
	Phone1           string
	Phone2           string
	Email            string
	SubscriptionDate string
	Website          string
}

func UpdateCSVFile(username, password, role, filename string) error {
	// Open the file
	file, err := os.OpenFile(filename, os.O_APPEND|os.O_WRONLY, os.ModeAppend)
	if err != nil {
		return err
	}
	defer file.Close()

	// Create a new CSV writer
	writer := csv.NewWriter(file)
	defer writer.Flush()

	// Write the record to the file
	record := []string{username, password, role}
	if err := writer.Write(record); err != nil {
		return err
	}

	return nil
}

func ReadCSVFile(filename string) ([][]string, error) {
	// Open the file
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// Create a new CSV reader
	reader := csv.NewReader(file)

	// Read all the records
	records, err := reader.ReadAll()
	if err != nil {
		return nil, err
	}

	return records, nil
}

func createCSVFile(filename string) error {
	// Create a new file
	file, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer file.Close()

	// Create a new CSV writer
	writer := csv.NewWriter(file)
	defer writer.Flush()

	// Write header
	header := []string{"username", "password", "role"}
	if err := writer.Write(header); err != nil {
		return err
	}

	return nil
}

func CheckCredentials(username, password, filename string) (bool, string, error) {
	records, err := ReadCSVFile(filename)
	if err != nil {
		fmt.Println("error ReadCsvFile: ", err)
		return false, "", err
	}
	for _, record := range records {
		if record[0] == username && record[1] == password {
			return true, record[2], nil
		}
	}

	return false, "", nil
}

func CheckRole(username, role, validateRole string) (bool, error) {
	data, err := ReadCSVFile("clients.csv")
	if err != nil {
		return false, err
	}
	for _, record := range data {
		if record[0] == username && record[2] == role && record[2] == validateRole {
			return true, nil
		}
	}

	return false, nil

}

func ReadCustomerDataCsv(filename string) (bool, []Customer, error) {
	// Open the file
	file, err := os.Open(filename)
	if err != nil {
		return false, nil, err
	}
	defer file.Close()

	// Create a new CSV reader
	reader := csv.NewReader(file)

	// Read all the records
	records, err := reader.ReadAll()
	if err != nil {
		return false, nil, err
	}

	var customers []Customer
	for i, record := range records {
		if i == 0 {
			continue
		}
		customer := Customer{
			Index:            i,
			CustomerId:       record[1],
			FirstName:        record[2],
			LastName:         record[3],
			Company:          record[4],
			City:             record[5],
			Country:          record[6],
			Phone1:           record[7],
			Phone2:           record[8],
			Email:            record[9],
			SubscriptionDate: record[10],
			Website:          record[11],
		}
		customers = append(customers, customer)
	}

	return true, customers, nil
}

