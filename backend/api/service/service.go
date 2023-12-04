package service

import (
	RSSParser "changeme/backend/api/tools/RSSParser"
	"github.com/gin-gonic/gin"
	net "net"
	http "net/http"
	strconv "strconv"
)

func GetFreePort() (int, error) {
	addr, err := net.ResolveTCPAddr("tcp", "localhost:0")
	if err != nil {
		return 0, err
	}

	l, err := net.ListenTCP("tcp", addr)
	if err != nil {
		return 0, err
	}
	defer l.Close()
	return l.Addr().(*net.TCPAddr).Port, nil
}

type BackgroundServer struct {
	engin *gin.Engine
	Port  int
}

func NewBackgroundServer() *BackgroundServer {

	port, _ := GetFreePort()

	return &BackgroundServer{
		engin: gin.Default(),
		Port:  port,
	}
}

func cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

// 如果是网页服务
func (server *BackgroundServer) Startup() {
	r := server.engin
	r.Use(cors())
	r.GET("/rss_parser", func(context *gin.Context) {
		url := context.Query("url")
		parser := RSSParser.NewRSSParser()
		feed, err := parser.ParserByURL(url)
		print(url)
		if err != nil {
			context.JSON(http.StatusBadRequest, err)
			return
		}
		context.JSON(http.StatusOK, feed)
		return
	})

	r.Run("localhost:" + strconv.Itoa(server.Port)).Error()

}

func (server *BackgroundServer) Close() {

}
