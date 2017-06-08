# hie
基于fis3和Flask框架的前端解决方案,直接采用jinja2模板开发,前端不再需要"套模板"

## 安装

    npm install hie -g
    
## 使用

整套方案是基于[pip-fis](https://github.com/fancyboynet/pip-fis)的,请先阅读

1.初始化运行框架

    mkdir project
    cd project
    
    hie init -d example.com
    
    pip install virtualenv
    virtualenv venv 
    . venv/bin/activate
    pip install -r requirements.txt 
    
2.已经有框架的只要安装pip依赖即可  

    pip install fis3
    
3.初始化具体应用  
[单个应用的目录规范](https://github.com/fex-team/fis3/blob/master/doc/docs/api/config-commonly-used.md#制定目录规范).例如,新建一个www的应用

    cd static-src
    
    hie init --type app -d www
 

4.开发  

    cd www
    hie release -wLc
    
    
5.发布
    
    cd www
    hie release prod -c
    
6.模板语法
因为要收集页面的静态资源,所以模板需要采用扩展的语法,[参考](https://github.com/fancyboynet/pip-fis#扩展jinja2)
    
7.自定义构建配置 
默认是采用[fis3-postpackager-loader](https://github.com/fex-team/fis3-postpackager-loader)基于页面的打包,如果想用自己的配置,只要修改对应应用下的fis-conf.js文件

    fis.set('outputRoot', '../') //输出目录
    fis.set('staticRoot', 'static')//静态资源目录
    fis.set('tplRoot', 'templates')//模板目录
    fis.set('staticUrlPrefix', '/')//静态资源前缀

       