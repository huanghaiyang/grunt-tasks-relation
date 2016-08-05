## grunt-tasks-relation
grunt plugin for tasks relation.

## install
```
npm install grunt-tasks-relation --save-dev
```

## how to use
load plugin in Gruntfile.js
```
grunt.loadNpmTasks('grunt-tasks-relation');

```
test example 
```
grunt.initConfig({
    jshint: {
      all: [
        'src/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    clean: {
      tests: ['tmp']
    },
    tasksRelation: {
      files: []
    },
    watch: {
      tasks: ['clean', 'jshint'],
      scripts: {
        files: 'src/**/*.js',
        tasks: ['jshint'],
        options: {
          interrupt: true,
        }
      }
    }
  });
```

see ```tasksRelation```

now you can run ```grunt tasksRelation``` on your command

## example result
please execute ```npm test``` in this project, you will see

```
Running "tasksRelation:files" (tasksRelation) task
+-------------------------------------------------+
+these tasks defined or used in your Gruntfile.js.+
+-------------+-------------+------+-------------+
|test         |jshint       |clean |tasksRelation|
|test1        |tasksRelation|      |             |
|watch        |clean        |jshint|             |
|tasksRelation|             |      |             |
|jshint       |             |      |             |
|clean        |             |      |             |
+-------------+-------------+------+-------------+
```