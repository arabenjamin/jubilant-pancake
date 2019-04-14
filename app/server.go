package main

import (
	"crypto/md5"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

/* log the response */
func log_req(req *http.Request) {
	fmt.Printf("[%v] [%v] [%v] [%v %v] %v\n", time.Now(), req.RemoteAddr, req.Method, req.Proto, req.URL.Path, req.Header["User-Agent"])
	/*TODO: return request hashmap */
}

func respond(res http.ResponseWriter, payload map[string]interface{}) {

	thisJson, _ := json.Marshal(payload)
	res.Header().Set("Content-Type", "application/json")
	res.Header().Set("Access-Control-Allow-Origin", "*")
	res.WriteHeader(http.StatusOK)
	res.Write(thisJson)

}

func clientHash(req *http.Request) string {
	hash := md5.New()
	clientString := fmt.Sprintf("%v%v%v%v", req.RemoteAddr, req.URL.Path, req.Header["User-Agent"], time.Now())
	io.WriteString(hash, clientString)
	return fmt.Sprintf("%x\n", hash.Sum(nil))
}

func ping(resp http.ResponseWriter, req *http.Request) {

	log_req(req)
	thisRequest := map[string]interface{}{
		"time":           time.Now(),
		"client_address": req.RemoteAddr,
		"resource":       req.URL.Path,
		"user_agent":     req.Header["User-Agent"],
		"client":         clientHash(req),
	}

	thisResponse := map[string]interface{}{
		"status":       "ok",
		"this_request": thisRequest,
	}

	respond(resp, thisResponse)
	return
}

func main() {

	fmt.Println("Starting WebApp")
	mux := http.NewServeMux()
	mux.HandleFunc("/ping", ping)
	http.ListenAndServe(":8080", mux)

}
