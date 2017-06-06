# hie
基于fis3和Flask框架的前端解决方案

## 安装

    npm install hie -g
    
## 使用

1.初始化运行框架

    mkdir project
    cd project
    
    hie init -d example.com
    
    pip install virtualenv
    virtualenv venv 
    . venv/bin/activate
    pip install -r requirements.txt 
    
2.已经有框架的只要安装pip依赖即可

    pip install FIS
    
2.替代Flask的*render_template*,采用FIS来渲染模板  
下面是一个带有蓝图的demo,具体可以参考[这里](git@github.com:fancyboynet/hie-framework-scaffold.git)

    from flask import Flask
    from fis3 import FIS
    import config
    from blueprints import www, m
    
    app = Flask(__name__)
    app.config.from_object(config)
    app.register_blueprint(www)
    app.register_blueprint(m)
    
    FIS(app, static_folder=config.FIS_STATIC_FOLDER, template_folder=config.FIS_STATIC_FOLDER, debug=config.FIS_DEBUG)
    
    
    if __name__ == '__main__':
        app.run()
    
3.初始化具体应用  
[单个应用的目录规范](https://github.com/fex-team/fis3/blob/master/doc/docs/api/config-commonly-used.md#制定目录规范).例如,新建一个www的应用

    cd static-src
    
    hie init --type app -d www
 

4.开发  

    cd www
    npm run dev
    
5.发布
    
    cd www
    npm run prod
    
6.自定义  
默认是采用[fis3-postpackager-loader](https://github.com/fex-team/fis3-postpackager-loader)基于页面的打包,如果想用自己的配置,只要修改对应应用下的fis-conf.js文件

    fis.set('outputRoot', '../') //输出目录
    fis.set('staticRoot', 'static')//静态资源目录
    fis.set('tplRoot', 'templates')//模板目录
    fis.set('staticUrlPrefix', '/')//静态资源前缀

       