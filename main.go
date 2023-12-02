package main

import (
	backend "changeme/backend"
	rssparser "changeme/backend/api/tools/RSSParser"
	"embed"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {

	// Create an instance of the app structure
	app := backend.NewApp()
	//// Create application with options
	err := wails.Run(&options.App{
		Title: "c-toolkit",
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 0},
		OnStartup:        app.Startup,
		Bind: []interface{}{
			app,
			rssparser.NewRSSParser(),
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
