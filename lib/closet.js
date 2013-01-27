var closet = exports;

closet.storage = null;
closet.json = {};

closet.init = function(storage_file) {
	this.storage = storage_file;
}