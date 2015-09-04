'use strict';
var inherits = require('./inherits');
var ParentNode = require('./parent-node');

function Dom() {
	ParentNode.call(this);
}
inherits(Dom, ParentNode);

module.exports = Dom;
