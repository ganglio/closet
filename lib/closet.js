/*!
 * closet - JSON persistent storage with methods chainability and callbacks for asynchronous use.
 *
 * Roberto Torella <roberto.torella@gmail.com>
 * MIT License.
 */

var closet = exports;

var fs = require('fs');

closet.storage = null;
closet.json = {};

/**
 * Initialise the storage file
 * @param  {string}   storage_file  The filename of the JSON storage file
 * @param  [{Function} cb]          The callback function. Storage_file is passed as parameter
 * @return {Object}                 The closet object for chaining
 */
closet.init = function(storage_file,cb) {
	this.storage = storage_file;
	if (cb) cb(storage_file);
	return this;
}

/**
 * Set a key-value pair in the storage
 * @param {string}   key    A valid JSON key
 * @param {Mixed}    value  The value to be stored
 * @param [{Function} cb]   The callback function key and value are passed as parameters
 * @return {Object}         The closet object for chaining
 */
closet.set = function(key,value,cb) {
	this.json[key]=value;
	if (cb) cb(key,value);
	return this;
}

/**
 * Gets a value from the storage
 * @param  {String}   key   A valid JSON key
 * @param  [{Function} cb]  The callback function key and value are passed as parameters
 * @return {Mixed}          The stored value
 */
closet.get = function(key,cb) {
	if (cb) cb(key,this.json[key]);
	return this.json[key];
}

/**
 * Deletes a value from the storage
 * @param  {String}   key   A valid JSON key
 * @param  [{Function} cb]  The callback function key and the old value are passed as parameters
 * @return {Object}         The closet object for chaining
 */
closet.del = function(key,cb) {
	if (cb) cb(key,this.json[key])
	delete this.json[key];
	return this;
}

/**
 * Writes the JSON storage to the file
 * @param  [{Function} cb]  The callback function a result of the operation is passed as parameter. If the storage is not initialized the parameter is "false". If an error occurs the exception throws is passed. If everything is OK then it's "true"
 * @return {Object}         The closet object for chaining
 */
closet.persist = function(cb) {
	if (this.storage) {
		try {
			if (cb)
				fs.writeFile(this.storage,JSON.stringify(this.json),cb);
			else
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

/**
 * Loads the JSON storage from the file
 * @param  [{Function} cb]  The callback function a result of the operation is passed as parameter. If the storage is not initialized the parameter is "false". If an error occurs the exception throws is passed. If everything is OK then it's "true"
 * @return {Object}         The closet object for chaining
 */
closet.load = function(cb) {
	if (this.storage && fs.existsSync(this.storage)) {
		try {
			if (cb)
				fs.readFile(this.storage,function(err,data){
					this.json = JSON.parse(data);
					console.log("json",this.json);
					cb(err);
				})
			else
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