package tools

type Tool struct {
	name        string
	description string
}

func NewTool(name string, description string) *Tool {
	return &Tool{}
}
