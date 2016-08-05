'use strict';

const _ = require('underscore');
const Table = require("terminal-table");

const name = 'tasksRelation',
	infoReg = /Alias\sfor\s(("[\w]+",?\s)*)tasks?\./im;

module.exports = function(grunt) {
	grunt.registerMultiTask(name, 'find out tasks realtion.', function() {
		let _tasks = grunt.task._tasks;
		let taskNames = _.chain(_tasks).keys().value();
		let initConfigTasks = {};
		let registedTasks = {};
		let initConfigSpecTasks = {};
		if (_.isEmpty(taskNames)) {
			grunt.log.writeln('no tasks defined in Gruntfile.js');
		} else {
			taskNames.forEach((taskName) => {
				let taskConfig = grunt.config.get(taskName);
				// task load by initConfig()
				if (taskConfig) {
					if (taskName === 'watch') {
						initConfigSpecTasks[taskName] = _.uniq(_.flatten(_.without((_.flatten(taskConfig.tasks || []))
							.concat(_.keys(taskConfig).map((key) => {
								let child_task = taskConfig[key];
								if (_.isObject(child_task) && _.has(child_task, 'tasks') && _.isArray(child_task['tasks'])) {
									return child_task['tasks'];
								} else {
									return undefined;
								}
							})), undefined)));
					} else {
						initConfigTasks[taskName] = taskConfig;
					}
				} else { // task registed by registerTask()
					let info = _tasks[taskName].info;
					let matches = info.match(infoReg);
					if (matches && matches.length >= 2) {
						let deps = matches[1];
						deps = deps.split(/,/).map((dep) => {
							return dep.replace(/^\s*"|"\s*$/ig, '');
						});
						registedTasks[taskName] = deps;
					}
				}
			});
			var t = new Table({
				borderStyle: 1
			});
			console.log('+-------------------------------------------------+');
			console.log('+these tasks defined or used in your Gruntfile.js.+');
			for (let i in registedTasks) {
				t.push([i, ...registedTasks[i]]);
			}
			for (let i in initConfigSpecTasks) {
				t.push([i, ...initConfigSpecTasks[i]]);
			}
			for (let i in initConfigTasks) {
				t.push([i]);
			}

			console.log("" + t);
		}
	});
};