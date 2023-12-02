package RSSParser

import (
	"github.com/mmcdole/gofeed"
)

type RSSParser struct {
	parser gofeed.Parser
}

func NewRSSParser() *RSSParser {
	return &RSSParser{
		parser: *gofeed.NewParser(),
	}
}

func (parser *RSSParser) ParserByURL(url string) (feed *gofeed.Feed, err error) {
	feed, err = parser.parser.ParseURL(url)
	if err != nil {
		return nil, err
	}

	return feed, nil
}
