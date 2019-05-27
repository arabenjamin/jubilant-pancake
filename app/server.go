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
func logReq(req *http.Request) {
	fmt.Printf("[%v] [%v] [%v] [%v %v] %v\n", time.Now().Unix(), req.RemoteAddr, req.Method, req.Proto, req.URL.Path, req.Header["User-Agent"])
	/*TODO: return request hashmap */
}

func respond(res http.ResponseWriter, payload map[string]interface{}) {

	thisJSON, _ := json.Marshal(payload)
	res.Header().Set("Content-Type", "application/json")
	res.Header().Set("Access-Control-Allow-Origin", "*")
	res.WriteHeader(http.StatusOK)
	res.Write(thisJSON)

}

func clientHash(req *http.Request) string {
	hash := md5.New()
	clientString := fmt.Sprintf("%v%v%v%v", req.RemoteAddr, req.URL.Path, req.Header["User-Agent"], time.Now().Unix())
	io.WriteString(hash, clientString)
	return fmt.Sprintf("%x", hash.Sum(nil))
}

func ping(resp http.ResponseWriter, req *http.Request) {

	thisRequest := map[string]interface{}{
		"time":           time.Now().Unix(),
		"client_address": req.RemoteAddr,
		"resource":       req.URL.Path,
		"user_agent":     req.Header["User-Agent"],
		"client":         clientHash(req),
	}

	thisResponse := map[string]interface{}{
		"status":       "ok",
		"message":      "pong!",
		"this_request": thisRequest,
	}

	logReq(req)
	respond(resp, thisResponse)
	return
}

func main() {

	fmt.Println("Starting WebApp")
	mux := http.NewServeMux()
	mux.HandleFunc("/ping", ping)
	http.ListenAndServe(":8080", mux)

}
