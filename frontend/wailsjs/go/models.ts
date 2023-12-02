export namespace ext {
	
	export class DublinCoreExtension {
	    title?: string[];
	    creator?: string[];
	    author?: string[];
	    subject?: string[];
	    description?: string[];
	    publisher?: string[];
	    contributor?: string[];
	    date?: string[];
	    type?: string[];
	    format?: string[];
	    identifier?: string[];
	    source?: string[];
	    language?: string[];
	    relation?: string[];
	    coverage?: string[];
	    rights?: string[];
	
	    static createFrom(source: any = {}) {
	        return new DublinCoreExtension(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.creator = source["creator"];
	        this.author = source["author"];
	        this.subject = source["subject"];
	        this.description = source["description"];
	        this.publisher = source["publisher"];
	        this.contributor = source["contributor"];
	        this.date = source["date"];
	        this.type = source["type"];
	        this.format = source["format"];
	        this.identifier = source["identifier"];
	        this.source = source["source"];
	        this.language = source["language"];
	        this.relation = source["relation"];
	        this.coverage = source["coverage"];
	        this.rights = source["rights"];
	    }
	}
	export class ITunesOwner {
	    email?: string;
	    name?: string;
	
	    static createFrom(source: any = {}) {
	        return new ITunesOwner(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.email = source["email"];
	        this.name = source["name"];
	    }
	}
	export class ITunesCategory {
	    text?: string;
	    // Go type: ITunesCategory
	    subcategory?: any;
	
	    static createFrom(source: any = {}) {
	        return new ITunesCategory(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.text = source["text"];
	        this.subcategory = this.convertValues(source["subcategory"], null);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class ITunesFeedExtension {
	    author?: string;
	    block?: string;
	    categories?: ITunesCategory[];
	    explicit?: string;
	    keywords?: string;
	    owner?: ITunesOwner;
	    subtitle?: string;
	    summary?: string;
	    image?: string;
	    complete?: string;
	    newFeedUrl?: string;
	    type?: string;
	
	    static createFrom(source: any = {}) {
	        return new ITunesFeedExtension(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.author = source["author"];
	        this.block = source["block"];
	        this.categories = this.convertValues(source["categories"], ITunesCategory);
	        this.explicit = source["explicit"];
	        this.keywords = source["keywords"];
	        this.owner = this.convertValues(source["owner"], ITunesOwner);
	        this.subtitle = source["subtitle"];
	        this.summary = source["summary"];
	        this.image = source["image"];
	        this.complete = source["complete"];
	        this.newFeedUrl = source["newFeedUrl"];
	        this.type = source["type"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace gofeed {
	
	export class Enclosure {
	    url?: string;
	    length?: string;
	    type?: string;
	
	    static createFrom(source: any = {}) {
	        return new Enclosure(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.length = source["length"];
	        this.type = source["type"];
	    }
	}
	export class Item {
	    title?: string;
	    description?: string;
	    content?: string;
	    link?: string;
	    links?: string[];
	    updated?: string;
	    // Go type: time
	    updatedParsed?: any;
	    published?: string;
	    // Go type: time
	    publishedParsed?: any;
	    author?: Person;
	    authors?: Person[];
	    guid?: string;
	    image?: Image;
	    categories?: string[];
	    enclosures?: Enclosure[];
	    dcExt?: ext.DublinCoreExtension;
	    // Go type: ext
	    itunesExt?: any;
	    extensions?: {[key: string]: };
	    custom?: {[key: string]: string};
	
	    static createFrom(source: any = {}) {
	        return new Item(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.description = source["description"];
	        this.content = source["content"];
	        this.link = source["link"];
	        this.links = source["links"];
	        this.updated = source["updated"];
	        this.updatedParsed = this.convertValues(source["updatedParsed"], null);
	        this.published = source["published"];
	        this.publishedParsed = this.convertValues(source["publishedParsed"], null);
	        this.author = this.convertValues(source["author"], Person);
	        this.authors = this.convertValues(source["authors"], Person);
	        this.guid = source["guid"];
	        this.image = this.convertValues(source["image"], Image);
	        this.categories = source["categories"];
	        this.enclosures = this.convertValues(source["enclosures"], Enclosure);
	        this.dcExt = this.convertValues(source["dcExt"], ext.DublinCoreExtension);
	        this.itunesExt = this.convertValues(source["itunesExt"], null);
	        this.extensions = source["extensions"];
	        this.custom = source["custom"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Image {
	    url?: string;
	    title?: string;
	
	    static createFrom(source: any = {}) {
	        return new Image(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.title = source["title"];
	    }
	}
	export class Person {
	    name?: string;
	    email?: string;
	
	    static createFrom(source: any = {}) {
	        return new Person(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.email = source["email"];
	    }
	}
	export class Feed {
	    title?: string;
	    description?: string;
	    link?: string;
	    feedLink?: string;
	    links?: string[];
	    updated?: string;
	    // Go type: time
	    updatedParsed?: any;
	    published?: string;
	    // Go type: time
	    publishedParsed?: any;
	    author?: Person;
	    authors?: Person[];
	    language?: string;
	    image?: Image;
	    copyright?: string;
	    generator?: string;
	    categories?: string[];
	    dcExt?: ext.DublinCoreExtension;
	    itunesExt?: ext.ITunesFeedExtension;
	    extensions?: {[key: string]: };
	    custom?: {[key: string]: string};
	    items: Item[];
	    feedType: string;
	    feedVersion: string;
	
	    static createFrom(source: any = {}) {
	        return new Feed(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.description = source["description"];
	        this.link = source["link"];
	        this.feedLink = source["feedLink"];
	        this.links = source["links"];
	        this.updated = source["updated"];
	        this.updatedParsed = this.convertValues(source["updatedParsed"], null);
	        this.published = source["published"];
	        this.publishedParsed = this.convertValues(source["publishedParsed"], null);
	        this.author = this.convertValues(source["author"], Person);
	        this.authors = this.convertValues(source["authors"], Person);
	        this.language = source["language"];
	        this.image = this.convertValues(source["image"], Image);
	        this.copyright = source["copyright"];
	        this.generator = source["generator"];
	        this.categories = source["categories"];
	        this.dcExt = this.convertValues(source["dcExt"], ext.DublinCoreExtension);
	        this.itunesExt = this.convertValues(source["itunesExt"], ext.ITunesFeedExtension);
	        this.extensions = source["extensions"];
	        this.custom = source["custom"];
	        this.items = this.convertValues(source["items"], Item);
	        this.feedType = source["feedType"];
	        this.feedVersion = source["feedVersion"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	

}

