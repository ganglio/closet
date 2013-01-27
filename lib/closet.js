var closet = exports;

var fs = require('fs');

closet.storage = null;
closet.json = {};

closet.init = function(storage_file,cb) {
	this.storage = storage_file;
	if (cb) cb(storage_file);
	return this;
}

closet.set = function(key,value,cb) {
	this.json[key]=value;
	if (cb) cb(key,value);
	return this;
}

closet.get = function(key,cb) {
	if (cb) cb(key,this.json[key]);
	return this.json[key];
}

closet.del = function(key,cb) {
	if (cb) cb(key,this.json[key])
	delete this.json[key];
	return this;
}

closet.persist = function(cb) {
	if (this.storage) {
		try {
			fs.writeFileSync(this.storage,JSON.stringify(this.json));
		} catch (err) {
			if (cb) cb(err);
		}
		if (cb) cb(true);
		return this;
	}
	if (cb) cb(false);
	return false;
}

closet.load = function(cb) {
	if (this.storage && fs.existsSync(this.storage)) {
		try {
			this.json = JSON.parse(fs.readFileSync(this.storage));
		} catch (err) {
			if (cb) cb(err);
		}
		if (cb) cb(true);
		return this;
	}
	if (cb) cb(false);
	return false;
}