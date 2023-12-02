package main

import (
	service "changeme/backend/api/service"
	"embed"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	server := service.NewBackgroundServer()
	server.Startup()

	// Create an instance of the app structure
	//app := backend.NewApp()
	//// Create application with options
	//err := wails.Run(&options.App{
	//	Title: "c-toolkit",
	//	AssetServer: &assetserver.Options{
	//		Assets: assets,
	//	},
	//	BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 0},
	//	OnStartup:        app.Startup,
	//	Bind: []interface{}{
	//		app,
	//		rssparser.NewRSSParser(),
	//	},
	//})
	//
	//if err != nil {
	//	println("Error:", err.Error())
	//}
}
