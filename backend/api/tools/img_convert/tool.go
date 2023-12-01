package img_convert

import "changeme/backend/api/tools"

type ImgConvert struct {
	details *tools.Tool
}

func NewImageConvertTool() *ImgConvert {
	toolDetails := tools.NewTool("file convert", "convert some file")
	return &ImgConvert{details: toolDetails}
}
