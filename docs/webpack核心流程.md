## webpack核心流程

webpack是一种打包工具，可以将各种类型的资源，例如图片、css、js等转成js格式的bundle文件

#### webpack构建
1、初始化阶段
+ 初始化参数：从配置文件、配置对象和Shell参数中读取并和默认参数合并，组合生成最终使用的参数。
+ 创建编译对象：生成compiler对象
+ 初始化编译环境：注入内置插件、注册各种模块工场、初始化RuleSet集合、加载配置的插件

2、构建阶段
+ 开始编译：执行Complier对象的run方法，创建Compilation对象
+ 确认编译入口：
+ 编译模块：
+ 完成模块编译：处理好所有模块之后，得到模块的编译产物和依赖关系图

3、生成阶段
+ 输出资源（seal）：根据入口与模块之间的依赖关系，组装成多个包含多个模块的chunk，再把每个chunk转换成一个asset加入到输出列表
+ 写入文件系统（emitAssets）：