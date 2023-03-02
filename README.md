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

# 28 Google Strategy Options
- Import keys.js into our index.js file
- Pass keys into the passport use instance
- add callbackURL property to google strategy. Route user is sent to once granted permission to the app.
- second arg to google strategy is an arrow function. (placeholder accessToken for now)

# 29 Testing OAuth
Add route handler, Kicks user into passport flow.

- in index.js: add /auth/google route handler

Test in browser (small error expected)

    in server:
      node index.js
check localhost:5000/auth/google

? didn't get error in course. I was shown my 2 email addresses. upon selection one I get "Cannot GET /aut/google/callback" error
  #? thinking this is a good sign.

# 30 Authorized Redirect URIs
Handled this earlyer in #25 due to the process being updated.

## Time 5 hours

# 31 OAuth Callbacks

Test oauth like in #29 
  We should see an email to login with, when selected we see:
    Caution GET /auth/google/callback

In index.js we setup google oAuth callback route

Testing:

    in server restart:
      node index.js

    check localhost:5000/auth/google

    select google account
same result as before because we havent added any information on the. Thats expected.  
  ? not getting the assess token like course predicts, via access token console.log in passport strategy.

# 32 Access and Refresh Tokens
Over of where we are in the google OAuth flow.
The function at the end of the google strategy that currently shows the access token is what we will use to use the information we got from the authorized google account. 

index.js add to google strategy callback function:

    in props add:
      refreshToken, profile, done
    console.log:
      access token, refresh token, profile
Test: 

    restart server
    run through OAuth flow again starting with:
      localhost:5000/auth/google
? Still not getting the logged information expected
  *callback was mispelled in callback route
#Time 5:40

# 33 Nodemon Setup

    npm i --save nodemon

set it up in a script(package.json):

    "dev": "nodemon index.js"
    in server run to setup:
      npm run dev

# Section 4 Adding MongoDB

# 34 Server Structure Refactor

Server
  config : Protected API keys and settings
  routes : All route handlers
  services : Helper modules and buisness logic
  index.js : Helper modules, buisness logic

    in server:
    mkdir routes
    touch routes/authRoutes.js
Cut 2 auth routes from indes.js and paste into auth Routes.
    
    mkdir services
    touch services/passport.js
    From index.js cut and paste passport config.

Import statements

    Move passport imports from index.js for passport GoogleStrategy, and keys.
    add '.' to keys import route sinse we moved it

    in index.js require passportConfig from ./services/passport

    in authRoutes require passport

We need to get the app object into 'authRoutes.js'

In auth routes wrap out routes in a module.exports function. Add app as arg. 
  In index.js import that file as 'authRoutes'
    Call auth routes with the app object 
      instead of named fn we can require it directly
Test:

    npm run dev
    visit localhost:/auth/google
    select email
Success! we get our info in the terminal. 

# 35 The Theory of Authentication

About how http is stateless but not https as well as how it works with tokens to remimber users for Authentication.

Time : 7:00
# 36 Signing In Users with OAuth
High level overview and again in detail. 

# 37 Introduction to MongoDB

# 38 MongoDB Atlas Setup and Configuration
1.  Go to https://www.mongodb.com/atlas/database and click the Try Free button (or Sign In if you already have an account)

2. Create user account. Get started free.

3. Accept privacy polocy and submit

4. Brief Questionere.

5. Create free 'Shared' cluster.

6. Click Create Cluster.

7. Security config screen, enter username/password. Copy in safe place.

8. Scrrol to 'Where would you like to connect  from'. Select 'My local Environment', enter '0.0.0.0/0' in 'IP Address' field.(imporntant to avoid connection errors). Click 'Finish' button.

9. Confirmation appears. Click 'Go to Database'

10. Cluster may take  a few minutes to generate(green circle to left when done). Click 'Connect' button.

11. Select 'Connect Your Application'.

12. Copy the full connection string and click the 'Close' button.

13. In 'config/keys.js', create 'mongoURI'. Add the add the copied URI.

14. Remember to replace <password> with the Atlas user's actual password. Next add a db name after slash before question mark.

15. Navigate to dbs that were created by selecting 'Browse Collections' tab.

16. Select 'database access' select a role for the user
    'built-in role'
      'read and write to any database'

using emaily-dev as it that I have already setup.

change password:

    From emaily-dev:
      Database Access
        Edit
          generate or create new password

# 40. Connecting Mongoose to Mongo

    npm i -s mongoose
    in index.js require mongoose
    import the mongoURI
    pass it into mongoose.connect
Test:

    restart nodemon

Time 7:22

# 41. Breather and Review

# 42. Mongoose Model Classes

    in server:
      mkdir models
      touch models/User.js
    in index.js require Users.js

# 43. Saving Model Instances
with server running visit :5000/auth/google

    require mongoose in passport.js

Test: 

    localhost:5000/auth/google , with nodemon running.
    check database to see collection is there
Its Alive!
?server immidietly crashes though. 

# 45. Mongoose Queries
We make sure not to create new user if one already exists with that id

# 46. Passport Callbacks
Time : 9:22
# 47. Encoding Users
serializerUser function in passport.js

# 48. Deserialize User
deserializeUser function in passport.js

# 49. Enabeling cookies
tell passport to use cookies to manage authentication inside our application.

    npm i -s cookie-session
in index.js:
    
    import cookieSession
    import passport
fill out cookiesSession inside app.use
in keys create a random cookieKey
in index.js

    pass that key into the keys array
    app.use statements both for initialize and session

# 50 Require Temporary Update for "req.session.regenerate is not a function'

    npm u passport
    npm i passport@0.5

# 51 Testing Authentication

in authRoutes.js setup /api/current_user route

Test : localhost:5000/auth/google
  in another window
    localhost:5000/aut/current_user
      we should get the id and the google id