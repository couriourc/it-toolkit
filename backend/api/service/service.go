package service

import (
	RSSParser "changeme/backend/api/tools/RSSParser"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type BackgroundServer struct{}

func NewBackgroundServer() *BackgroundServer {
	return &BackgroundServer{}
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
	r := gin.Default()
	r.Use(cors())
	r.GET("/rss_parser", func(context *gin.Context) {
		url := context.Query("url")
		parser := RSSParser.NewRSSParser()
		feed, err := parser.ParserByURL(url)
		fmt.Println(url)
		if err != nil {
			context.JSON(http.StatusBadRequest, err)
			return
		}
		context.JSON(http.StatusOK, feed)
		return
	})
	r.Run().Error()
}
