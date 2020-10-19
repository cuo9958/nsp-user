# 现有接口整理

## 公开接口

### 注册

`http://127.0.0.1:18900/api_user/pub/auth/reg`

`username, password, nickname`

### 登录

`http://127.0.0.1:18900/api_user/pub/auth/login`

`username, password`

### 获取用户信息

`http://127.0.0.1:18900/api_user/pub/auth`

head 中添加`token`、`username`参数

## 内部接口

### 获取自己的用户信息

`http://127.0.0.1:18900/api_user/pub/user`

### 用户信息修改
