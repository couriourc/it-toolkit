package tool_hub

import (
	img_convert_tool "changeme/backend/api/tools/img_convert"
)

type ToolsHub struct {
	image_convert img_convert_tool.ImgConvert
}

func InitToolsHub() *ToolsHub {
	return &ToolsHub{
		image_convert: *img_convert_tool.NewImageConvertTool(),
	}
}
func (hub *ToolsHub) GetImageConvert() {

}
