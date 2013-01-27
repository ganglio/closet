var closet = exports;

var fs = require('fs');

closet.storage = null;
closet.json = {};

closet.init = function(storage_file) {
	this.storage = storage_file;
}

closet.set = function(key,value) {
	this.json[key]=value;
}

closet.get = function(key) {
	return this.json[key];
}

closet.del = function(key) {
	var old = this.get(key);
	delete this.json[key];
	return old;
}

closet.persist = function() {
	if (this.storage)
		fs.writeFileSync(this.storage,JSON.stringify(this.json));
	else
		return false;
}

closet.load = function() {
	if (this.storage)
		this.json = JSON.parse(fs.readFileSync(this.storage));
	else
		return false;
}