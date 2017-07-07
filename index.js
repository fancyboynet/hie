'use strict';
let fis = module.exports = require('fis3');
fis.require.prefixes.unshift('hie');
fis.cli.name = 'hie';
fis.cli.info = require('./package.json');

fis.initConfig = function (cwd) {
    fis.hook('commonjs');
    
    if(cwd === 'static-src'){
        fis.set('namespace', '')
        fis.set('outputRoot', '../') //输出目录
    }
    else{
        fis.set('namespace', cwd)
        fis.set('outputRoot', '../../') //输出目录
    }
    fis.config.set('namespace', fis.get('namespace'));
    fis.set('staticRoot', 'static')//静态资源目录
    fis.set('tplRoot', 'templates')//模板目录
    fis.set('staticUrlPrefix', '/static')//静态资源前缀

//排除不需要产出的目录
    fis.set('project.ignore', fis.get('project.ignore').concat([
        'package.json',
        '.gitignore',
        'README.md',
        'config/**',
        'test/**'
    ]))

// 所有的文件产出到 {static} 目录下
    fis.match('*', {
        release: '${staticRoot}/${namespace}/$0',
        useHash : false
    })

    fis.match('config/**', {
        release : false
    })

// 所有模板放到 {tpl} 目录下
    fis.match('*.html', {
        release: '${tplRoot}/${namespace}/$0',
        parser: fis.plugin('jinja2', {
            namespace : fis.get('namespace')
        })
    })


//npm 组件
    fis.match('/{node_modules,components,widget}/**.js', {
        isMod: true,
        useSameNameRequire: true
    })

    fis.match('/{page,widget}/**', {
        isMod: true,
        useSameNameRequire: true
    })

    fis.match('/static/**', {
        isMod: false,
        useSameNameRequire: false
    })

    fis.match('**.css', {
        postprocessor: fis.plugin('autoprefixer', {
            "browsers": ["last 2 versions","Android >= 4.0"]
        })
    })

    fis.match('/node_modules/**.css', {
        parser: null,
        postprocessor: null
    })

// 添加css和image加载支持
    fis.match('*.js', {
        preprocessor: [
            fis.plugin('js-require-css'),
            fis.plugin('js-require-file', {
                useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
            })
        ]
    })
//静态引用增加url前缀
    fis.match('*.{js,css,es,es6,png,gif,jpg,jpeg,eot,ttf,woff,svg,json}', {
        url : '${staticUrlPrefix}/${namespace}$0'
    })

//babel
    fis.match('/{page,widget}/**.js', {
        parser: fis.plugin('babel-5.x', {
            stage: 3,
            blacklist: ["useStrict"]
        })
    })

    fis.match('*.{es6, es}', {
        isJsLike: true,
        rExt : 'js',
        isMod: true,
        useSameNameRequire: true,
        parser: fis.plugin('babel-5.x', {
            stage: 3,
            blacklist: ["useStrict"]
        })
    })


// 禁用components
    fis.unhook('components')
    fis.hook('node_modules', {
        ignoreDevDependencies: true,
        shimProcess : false
    })

    fis.match('*', {
        deploy: fis.plugin('local-deliver', {
            to: fis.get('outputRoot')
        })
    })
// pack
    fis.media('prod')
        .match('/{page,widget,pkg}/**', {
            useHash : true
        })
        .match('/static/**/*.{png,gif,jpg,jpeg}', {
            useHash : true
        })
        .match('/{page,widget}/**.html', {
            useHash : false
        })
        .match('*.js', {
            optimizer: fis.plugin('uglify-js', {
                mangle: {
                    expect: ['require', 'define']
                }
            })
        })
        .match('*.css', {
            useSprite: true,
            optimizer: fis.plugin('clean-css', {
                'keepSpecialComments': 0
            })
        })
        .match('*.png', {
            optimizer: fis.plugin('png-compressor')
        })
        .match('!page/**.html', {
            loaderLang: false
        })
        .match('::package', {
            postpackager: fis.plugin('loader', {
                resourceType: 'mod',
                allInOne: {
                    ignore: ['static/lib/**', 'node_modules/jquery/**']
                }
            })
        })
}
