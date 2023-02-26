*# 10 to run server locally
*Hosted location @ # 16 along with how to save changes and shut down instructions to save credits.

# 9.
    use npm not yarn
    nvm install 8.1.1
    using latest version though 19.7.0
    mkdir server
    cd server
    git init
    npm init -y 
    npm i express :  
       Lib has helpers to simplify HTTP traffic.

# 10.
    in server:
      touch index.js 
import express into index.js ,setup basic express app.

Test
      
    in server run:
      node index.js
        view localhost:5000 in the browser. 

# 13. Deployment checklist

Dynamic Port Binding

    setup PORT const in index.js
    pass it in to app.listen

Specify Node Environment 

    add configuration block in package.json "engines" to specify specific node and npm versions.

Specify start script 

    setup start script to run: node index.js

Create .gitignore file

    in server:
      touch .gitignore
        add node_modules

## Railway Deployment
# 14. [Railway] Registering for Railway and Installing Railway CLI (free demo option)(no card required)

1.Register for Railway Account(Heroku alternative):

    https://railway.app/login

2.Install CLI (windows):

    npm i -g @railway/cli

3.Test the Railway CLI:

    railway

4.Login to the Railway CLI

    railway login
  success

# 15. [Railway] Creating a Railway Project and Application Service

1.Navigate to the server directory
2.nitialize the Railway project

    railway init
      select Empty Project, enter project name
        add service pop up option appears
3.Create a new service

    click Add New Service button in popup window
      select "Empty Service"
4.Generate a Domain Name

    click on newly created service
      click settings
        click "Generate Domain"
      "jolly-coal-production.up.railway.app"

# 16 [Railway] Deploying App to Railway

1.Navigate to server directory
2.Run the deploy command

    in server:
      railway up
        may need to verify
          accept terms , add payment or Connect GitHub Account.
I chose GitHub verification (account at least 90 days old)

    railway up

3.View the Application

    provided in previous step.
      https://jolly-coal-production.up.railway.app

4.Making Changes

    make a change to a response.
    railway up
5.Save credits

    railway down

# 17 - 19 [Heroku] Deployment options. 

# 22 Overview of Passport js:
Helper lib for handleing authentication tasks in our express app

### passport: General helpers for handleing auth in Express apps

### passport strategy: Helpers for authenticating with one very specific method(email/password, Google, Facebook, etc)
we will be using a specific stratigy for google auth but will need other stratigies for other methods. check out the docs to wire up facebook stratigies for example.

https://passportjs.org/docs

# 23 Passport Setup

    in server
      npm i --save passport passport-google-oauth20
    in index.js  
      import passport and stratigey
      create passport instance
        pass in strategy