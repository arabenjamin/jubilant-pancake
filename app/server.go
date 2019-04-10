package main

import (
	"fmt"
	"net/http"
)

func apphandler(resp http.ResponseWriter, req *http.Request) {

	//TODO: serve something....

}

func main() {

	fmt.Println("Starting WebApp")
	mux := http.NewServeMux()
	mux.HandleFunc("/", apphandler)
	http.ListenAndServe(":8080", mux)

}
