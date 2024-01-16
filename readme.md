

## Setup

step 1 : create a db name NCAC

step 2 : 
```
cd Project
```
step 3 : 
```
npm i --force
```
step 4 : 
```
cd import_csv
```

step 5 :
```
 node parser.js
```
step 6 : import the output jsons in db

step 7 : add .env in /Project/.env  directory
```env
        PORT=5000
        JWT_SECRET="jwt_secret_Token_here"
```
step 8 : now run the app from Project folder 
```
npm start
```