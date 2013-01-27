var vows = require('vows'),
		assert = require('assert'),
		path = require('path'),
		fs = require('fs'),
		closet = require('../lib/closet');

var storage = path.join(__dirname,'tmp','db.json');

function clean() {
	try {
		fs.unlinkSync(storage);
	} catch (err) {
		if (err.code !== 'ENOENT' ) throw err;
	}
}

vows.describe('closet').addBatch({
	
	'Testing functionality of ': {
		topic: function(){ return closet; },

		'init()': {
			'that should initialise the storage': function(topic) {
				topic.init('test.json');
				assert.equal(topic.storage,'test.json');
			},
			'then set()': function(topic) {
				topic.set('test_key','test_value');
				assert.equal(topic.json.test_key,'test_value');
			},
			'then get()': function(topic) {
				assert.equal(topic.get('test_key'),'test_value');
			}
		}
	}
}).export(module);