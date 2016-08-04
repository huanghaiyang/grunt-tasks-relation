'use strict';

const _ = require('underscore');

const name = 'tasksRelation';

module.exports = function(grunt) {
	grunt.registerMultiTask(name, 'find out tasks realtion.', function() {
		let _tasks = grunt.task._tasks;
		let taskNames = _.chain(_tasks).omit(name).keys().value();
		if (_.isEmpty(taskNames)) {
			grunt.log.writeln('no tasks defined in Gruntfile.js');
		} else {
			// let collect = {};
			taskNames.forEach((task) => {
				console.log();
			});
		}
	});
};