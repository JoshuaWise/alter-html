'use strict';

var Promise = require('bluebird');
var htmlparser = require("htmlparser2");
var Dom = require('./lib/dom');
var Tag = require('./lib/tag');
var Attribute = require('./lib/attribute');
var Text = require('./lib/text');

function alterHtml(string) {
	return new Promise(function (resolve, reject) {
		if (typeof string !== 'string') throw new Error('Argument must be a string.');
		
		var DOM = new Dom;
		var context = DOM;
		
		var parser = new htmlparser.Parser({
			onopentag: function (name, attribs) {
				var tag = new Tag(name);
				for (var key in attribs) {
					tag.addAttribute(new Attribute(key, attribs[key]));
				}
				context.appendChild(tag);
				context = tag;
			},
			ontext: function (text) {
				context.appendChild(new Text(text));
			},
			onclosetag: function (name) {
				if (!context.parent) throw new Error('Current context was not assigned a parent.');
				if (('' + name).toLowerCase() !== context.name.toLowerCase()) throw new Error('Reached a close tag that doesn\'t match the current context.');
				context = context.parent;
			},
			onerror: function (err) {
				throw err;
			},
			onend: function () {
				resolve('' + DOM);
			}
		}, {decodeEntities: false});
		
		parser.write(string);
		parser.end();
	});
}

module.exports = alterHtml;
module.exports.Tag = Tag;
module.exports.Attribute = Attribute;
module.exports.Text = Text;
