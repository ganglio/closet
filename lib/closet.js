var closet = exports;

var fs = require('fs');

closet.storage = null;
closet.json = {};

closet.init = function(storage_file) {
	this.storage = storage_file;
	return this;
}

closet.set = function(key,value,cb) {
	this.json[key]=value;
	return this;
}

closet.get = function(key) {
	return this.json[key];
}

closet.del = function(key) {
	delete this.json[key];
	return this;
}

closet.persist = function() {
	if (this.storage) {
		fs.writeFileSync(this.storage,JSON.stringify(this.json));
		return this;
	} else
		return false;
}

closet.load = function() {
	if (this.storage && fs.existsSync(this.storage)) {
		this.json = JSON.parse(fs.readFileSync(this.storage));
		return this;
	} else
		return false;
}