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

  ## Time 3.5 hours (into course)

Helper lib for handleing authentication tasks in our express app

### passport: General helpers for handleing auth in Express apps

### passport strategy: Helpers for authenticating with one very specific method(email/password, Google, Facebook, etc)
we will be using a specific stratigy for google auth but will need other stratigies for other methods. check out the docs to wire up facebook stratigies for example.

## Docs
https://passportjs.org/docs

# 23 Passport Setup

    in server
      npm i --save passport passport-google-oauth20
    in index.js  
      import passport and stratigey
      create passport instance
        pass in strategy

# 24 Google+ Deprecation
skip


# 25 Google Project Setup with new UI
1 Go to the Google Project Dashboard:
  https://console.cloud.google.com


2 Click CREATE PROJECT button
    search for "Create project" or "Manage Resources"

3 Name the project and click the CREATE button

    Emaily
    No organization

4 Click the menu button, select "API's & Services", then "OAuth Consent Screen"

5 select "External" and click CREATE

    may have firewall issues. 
    had to navigate out of the project, select "oAuth and consent", then select a project before "External" option was available.

6 Fill out the [ app Name ] field(Emaily). Then, add your [ email ] address to the User support email field. Scroll to the bottom under "Developer contact information" and add your [ email ]again.Click SAVE AND CONTINUE button. No other info should be filled out on the consent screen at this time. 
Fill out:

    App Name
    email
    email for dev
  SAVE AND CONTINUE

7 Click "Credintials" in the sidebar and then click the CREATE CREDENTIALS button

8 Select "OAuth client ID"
  Fill out:

    Name: Emaily

9 Select "Web Application" 
  Fill out Authorization URIs

    Origins: http://localhost:5000
    Redirect URI: http://localhost:5000/auth/google/callback
generates client ID , and secret. I saved them in .gitignore file "secret-note"

NEW* ignore the wildcard(*) after the URIs
## Time 4 hours

# 26 Enableing OAuth API
Deprecated instructions

# 27 Securing API keys.

    in server:
      mkdir config
    touch config/keys.js
    add keys.js to .gitignore
export the client ID and secret from keys.js

