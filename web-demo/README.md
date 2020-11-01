# todo

## web applycation
1. 请求方法判断
2. URL路径解析
3. URL中查询字符串解析
4. cookie解析
5. basic认证
6. 表单数据解析
7. 任意格式的文件上传处理

### Session
只保留在服务器端
1. 基于cookie实现
    - session口令
    - 过期时间
    - 流程图
        1. 检查cookie里是否有sessionID
        2. true --》检查sessions里能否找到对应session
        3. true --》检查session是否过期
2. 通过查询字符串实现
3. 安全问题
    - 口令通过私钥加密进行签名 sign
        1. 将客户端的某些独有信息和口令作为原值
            - 用户IP 用户代理
    - 口令泄露 xxs攻击
### 协商缓存