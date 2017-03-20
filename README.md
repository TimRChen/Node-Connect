# Node-Connect
Connect study code
# Connect
    基于http模块API之上的Connect，提供了一些工具方法能够让这些重复性的处理便于实现，以至于让开发者能够更专注在应用本身。它很好的体现了DRY模式: Don't Repreat Yourself
# 中间件
    使用use()方法来添加中间件
# 关于中间件更新
    connect中有一些中间件已移除或更新:
        connect.static ——> serve-static 需要安装模块 npm install serve-static
        connect.logger ——> morgan   需要安装模块 npm install morgan 详情看https://www.npmjs.com/package/morgan