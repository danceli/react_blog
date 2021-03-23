##### 前端项目部署
* * *
之前很少接触前端项目的部署，为了更全面的学习购买了一个云主机，在云服务上练习了如何把一个React || Vue写的spa项目部署到这个云服务上。由于Linux也是刚接触不久，所以整个过程还是遇到了很多坑，这里记录下

###### 准备
* * *
当你拿到一台Linux主机( *可以是自己搭建的或者云服务（ecs）,这里以阿里云ecs云为例* )时首先要做的就是调试网络，没有网络寸步难行。

> ` cd etc/sysconfig/network-scripts ` 里面有一个ifcfg-eth0的网络配置文件   
>  `vim etc/sysconfig/network-scripts/ifcfg-eth0` 修改里面的ONBOOT=yes即可  
> ` service network restart ` || ` /etc/init.d/network restart` 这两个命令都可以重新启动网络服务  
> `ping baidu.com` ping通即完成网络连接

###### 安装node
* * *  
使用yum 直接yum install nodejs12 是无法安装的因为没有源，所以需要添加源

> ` curl --silent --location https://rpm.nodesource.com/setup_12.x | sudo bash - ` 执行此命令就已经源加入到yum源中
> ` yum install -y nodejs ` 此时node就已经完成安装了

###### 安装Nginx
* * *
同样直接yum install 是无法安装的，也是先添加源<https://nginx.org/> 里面找Linux packages

>`vim /etc/yum.repos.d/nginx.repo` 执行此命令新建nginx源文件    
然后把这段配置复制到里面
```
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```
然后保存执行 `yum install nginx -y`既安装成功

* 接下来就是需要配置Nginx,主要配置文件在`/etc/nginx/conf.d/default.conf` 用vim打开找到location字段  
```
location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
}
```
该字段显示存放静态文件的root文件夹在 /usr/share/nginx/html
* `vim /usr/share/nginx/html/index.html` 随便写点东西作为测试
* 使用`nginx -s reload` 来启动nginx服务即可

> 此时nodejs 和nginx都启动了但是node访问的时候需要带上后面的端口例如`http://localhost:8080/`没有哪个网站访问服务的时候需要带端口的所以我们还需要在配置端口转发
* `vim /etc/nginx/conf.d/default.conf`加入一段配置 以下为配置：
```
location /node {
    proxy_pass  http://localhost:8080;
}
```
* 然后`nginx -s reload` 重启nginx服务即可  
* 最后配置node服务中的域名转发，当我们访问公网ip/node服务时的http请求header里面的host: localhost:8080,而不是我们想要的公网ip所以我们需要配置ngxin  
`vim /etc/nginx/conf.d/default.conf` 将 location /node配置改为：
```
location /node {
    proxy_set_header host $host;
    proxy_pass  http://localhost:8080;
}
```
然后重启nginx -s reload 即可得到我们想要的host

> 此时80端口web服务也配置好了,node也配置好了  

** 此时我们得node和Nginx都已经完成配置 **

###### 安装mariaDB(和mysql一摸一样)
* * *
mysql被原作者卖给Oracle后，但是由于Oracle逐渐的不开源，作者就为开源界做了一份贡献，重新写了MariaDB，用法和mysql一模一样
 >
 * ` yum install mariadb-server -y `
