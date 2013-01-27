var vows = require('vows'),
		assert = require('assert'),
		path = require('path'),
		fs = require('fs'),
		closet = require('../lib/closet');

var storage_file = path.join(__dirname,'tmp','db.json');

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
			'then get()': {
				'if the key exists': function(topic) {
					assert.equal(topic.get('test_key'),'test_value');
				},
				'if the key does not exist': function(topic) {
					assert.equal(topic.get('no_key'),undefined);
				}
			},
			'then del()': {
				'if the key exists': function(topic) {
					assert.equal(topic.del('test_key'),'test_value');
					assert.equal(topic.del('test_key'),undefined);
				},
				'if the key does not exist': function(topic) {
					assert.equal(topic.del('no_key'),undefined);
				}
			}
		},
		'persist()': {
			'if the storage is initialised': function(topic) {
				topic.init(storage_file);
				topic.set('key','value');
				topic.persist();
				var storage = JSON.parse(fs.readFileSync(storage_file));
				//console.log(storage);
				assert.equal(storage.key,'value');
				clean();
			},
			'if the storage is not initialised': function(topic) {
				topic.persist();
			}
		}
	}
}).export(module);