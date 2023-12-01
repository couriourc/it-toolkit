package service

import (
	"github.com/gin-gonic/gin"
)

type BackgroundServer struct{}

func NewBackgroundServer() *BackgroundServer {
	return &BackgroundServer{}
}

func (server *BackgroundServer) Startup() {
	r := gin.Default()
	r.GET("/", func(context *gin.Context) {
	})
}
