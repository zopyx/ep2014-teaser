module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            options: {
                sassDir: 'app/assets/sass',
                cssDir: 'app/assets/css',
                imagesDir: 'app/assets/images'
            },
            server: {},
            dist: {
                options: {
                    outputStyle: 'compressed'
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {expand: true, cwd: 'app', src: ['assets/images/*.png', 'assets/css/*', 'index.html'], dest: 'dist'}
                ]
            }
        },
        clean: {
            dist: ['dist'],
            compass: ['app/assets/css/*']
        },
        connect: {
            livereload: {
                options: {
                    open: true
                }
            },
            options: {
                port: 9000,
                base: "app",
                livereload: 35729
            }
        },
        watch: {
            compass: {
                files: ['app/assets/sass/*.scss'],
                tasks: ['compass:server']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/assets/css/*.css',
                    'app/assets/images/*',
                    'app/index.html'
                ]
            }
        },
        concurrent: {
            server: ['compass:server']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['server']);

    grunt.registerTask('server', function(target) {
        grunt.task.run([
            'clean',
            'concurrent:server',
            'connect:livereload',
            'watch'
        ])
    });

    grunt.registerTask('dist', function(target) {
        grunt.task.run([
            'clean',
            'compass:dist',
            'copy:dist'
        ]);
    });
};