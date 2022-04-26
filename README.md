# modules

    express
    dotenv
    http-errors
    nodemon

    mongoose
    joi  => validation request
    bcrypt => hash password
    jsonwebtoken => key of api => keygen.io
    crypto -> gen keygen
    redis

# connect mongodb

folder models

# flow login

login => validate data (username, password) => check exist user => create access token
refreshToken: giong nhu cmnd, access token giong nhu giay di duong. -> luu trong db (redis)

# link course

https://www.youtube.com/watch?v=baiyWCJUhWM&list=PLw0w5s5b9NK5m3558bDRdZoBVoV08ZpxI&index=8

# redis

- Remote Dictionary Server (Máy chủ từ điển từ xa).
- kho du lieu key-value
- toc do truy cap nhanh
- dung lam co so du lieu, bo nho dem, trinh chuyen tiep tin nhan
- luu danh sach tac vu cho xu li

# project

|** helpers : connection (db, redis), jwt, validation.
|** Models : models of db
|** Routes : routes of server  
"\_\_ controller
|** server.js : root oj project

# root file

    - include depedence (lib, route, db, env,...)
    - use: route, middlewares
    - run server

# access token het

    accessToken het han => dang nhap lai => bad. => 2 cach giai quyet
    C1: su dung axios interceptors, check request truoc khi gui => nhuoc diem: ton them 1 lan goi api.
        => tra ve accessToken, timeExpired => truoc khi gui request, check timeExpired => refreshToken() => return new AccessToken, timeExpired
        - Uu diem: tiet kiem request gui xuong server.
        - Nhuoc diem: moi may co thoi gian local khac nhau, => chinh thoi gian may de hack.
    C2: check token tu server.
    Co 3 cach luu tru accessToken o client. (localStorage, session, cookies)


     // "type": "module",
