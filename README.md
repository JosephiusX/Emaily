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

Time: 11:00

# 52 Logging out users
Setup up /api/logout rout in authRoutes.js

Test in browser with nodemon running at localhost:5000:

    /api/logout
    /api/current_user
      information that was there should be gone
we should be able to confirm by going through our authorization process again and refreshing current user to see the information populate again, and again refreshing api/logout and the currein_user information will again dissappear when refreshed.

# 53. [Optional] A Deeper Dive

# Section 5: Dev vs Prod Environments

# 54. Dev vs Prod Keys

# 55. Mongo DB Atlas Production Setup and Configuration
1. Sign in
2. From dashboard find current product dropdown, click it and select 'New Project'
3. Name project, click 'Next'
4. Click 'Create Project'
5. Click 'Build a Database'
6. Select 'Shared Free' click 'Create'
7. Leave options selected, click 'Create Cluster'
8. Fill out 'Username', and 'Autogenerate Secure Password'
9. Scroll down to 'My Local Environment' field. Enter 0.0.0.0/0
10. When cluster is ready, click 'Connect'
11. Select Connect 'Your Application'
12. Copy connection string. Select 'Built-in role'. close
13. Save connection string to safe place

To generate new connection string if environment is already setup:

    From db dashboard:
      click 'Database Access'
        click 'Edit'
          click 'Edit Password'
            setup 'Database User Privilages'
              'Update'
    Locate connection string:
      'Database' on upper left
        'connect'
          'connect your application'
            copy connection string, replace <password> with actual password. 

# 56. Generating Production Resources
    console.developers.google.com

    click current project dropdown 'New Project'

    project name 'emaily-prod', click 'create' wait for it to complete.

    from project selector change to new project
          
    'Enable APIs and services' , search google+' click 'Enable'

    on lefthand select 'Credentials'

    'Create Credintials'

    'Configure concent screen'
      ? External

    'OAuth Client ID'

    fill out product name, 'save'

    select 'Web Application'

        fill out Auth Origins and redirect URIs
Production URIs will be our Heroku, or Railway URIs. we can circle back and take care of that later once it's generated. 

* I have taken the infor from Email-dev and applying it to Emaily-prod, so I need to generate google and mongo keys for Emaily-dev again.

    At least dev resourses are working

#  57. Determining Environment

    in server : touch config/dev.js
      add to .gitignore
placed keys from 'keys.js' into 'dev.js' instead.

#Time: 11:43

# 58. Version Control Scheme

    touch config/prod.js
    .gitignore: dev.js

# 59 [Railway] Production Environment Variables.

1. click the application service button
  ? Settings>Shared variables.
2. Add production environment variables: Variables>New Variable
  as value key pairs.
    aslo add 'CI : false'

# 60. [Railway] Avoiding and Error.

    adjust auth/google/callback route

? Getting server error
  first maybe theres a different location for my production keys
  will try regenerating production keys
* I setup my variables in the wrong place. 
? still not working. Try regenerating prod keys. 
    keys have been updated without fixing provlem
* in dev environmont it works fine when removing from package.json:

       "engines": {
         "node": "8.1.1",
         "npm": "5.0.3"
       },
this step was recomended for heroku compatibility anyway. 
? still no luck.
? changeing passport to version 0.4.1
  still no luck
Moving on for now until I get an answer.
? adding https routs to my google authorized and redirect URIs
    ? no luck but the error changed
? Noticed my shared variables need to be added to the environment.
  Nope , same problem and error
? maybe if i change 'mongoURI' to 'MONGO_URI' in index.js.  
  same error.
    Nope

***** All that and I just needed to remove the '' from my environment variables. IT'S ALIVE.

Test:
    
    in server: railway up
    jolly-coal-production.up.railway.app/auth/google
    select google account
    jolly-coal-production.up.railway.app/api/current_user
    jolly-coal-production.up.railway.app/api/logout

    
# 61. [Heroku] Production Environment Variables

# 62. Fixing Proxy Issues.
in passport google strategy change callbackURL to add 'https://jolly-coal-production.up.railway.app' to the beginning of the route

    or

add 'proxy : true'
  

Time: 14:50

# 64. React App Generation

in server:

    npx create-react-app client

in client start our react app:

    npm start

66. Running the Client and Server

Configure server package.json "scripts".

    "client": "npm run start --prefic client",
    change the "dev" script to be named server 
    "dev": "concurrently \"npm run server\" \"npm run client\""
    install concurrently in server:
      npm i concurrently

Now we can startup both servers by running:

    npm run dev

# 67. Imporntant Create React App Proxy Update

The following instructions are deprecated. Instead:

    touch client/setupProxy.js
    input proxy code

# 68. Routing Stumbling Block

add auth/google href for Sign in with google button.

Text:

    kill server
    relode with : npm run dev
? Im not getting to a google oauth screen yet like in the course. 
* 'setupProxy.js' needs to be in the src file, not just in the client. 

# 69. The Beauty of Create React App's Proxy

Update our dev Authorized redirects in our google console Uris to add:

    http://localhost:3000/auth/google/callback

? same problem from previous lesson

# 70. [Optional] Why This Architecture?

# Sec 7 Developing the Client side. 
Time: 18:50

# 71. Async/Await Syntax

# 72. Refactoring with Async/Await

# 74. Front End Tech

# 75. Client React Setup

index.js - Data layer control (Redux)

App.js - Rendering layer control (React Router)

#76. Installing Root Modules

    In the client mkdir src
    In src touch components
    in components touch App.js
Naming convention: If a file is exporting a component it starts with uppercase. If not, lowercase. 

# 76. Installing Root Modules

# 77. Troubleshooting NPM

# 78. Redux Review and Setup

We have a provider with the store passed in. The provider is the connector between the store and the app. The whole point is to make it easy to access data from anywhere, even deeply nested components.

# 79. The Auth Reducer

# 80. Finishing Reducer Setup

# 81. Why We Care About Auth

# 82. React Router Setup

# 83. Route Configuration

# 84. Matching Routes with Exact

# 85. Always Visible Components
Basic route structure setup, and working.

# 86. Materialize CSS

https://materializecss.com/

    only partial compatibility with react. The javascript components for examble wont work right out the box.
CDN can be used, but we want to install it as a npm module.

In client:

    npm i materialize-css

# 86. Materialize CSS

# 87. Webpack with CSS

Using Webpack allows us to import in as a module from node_modules.

We do need the file extention for non js files however.

no need to specify a relative path './asddf',. Without a relative path webpack assumes its a npm module(node_modules).  

No vairble is assigned with this type of import, all we need is import and the address.

# 88. Header Design

We change class to className when using materialize.

# 89. Current User API

# 90. Additional Proxy Rules

    npm i axios redux-thunk

axios is for making http requests to our backend api
redux-thunk makes asynchronous action creaters behave as expected

    in client/src/index.js
      import & use as middleware

    touch src/actions/index.js
      import axios
      define action creator

    inside actions:
      touch types.js

? not sure if the proxy is needed or not

# 91. Basics of Redux Thunk
with redux-thunk we dont have controle over function that dispatches the action. redux-thunk gives us controle. 

If redux sees we called a function instead of an action, it automatically passes dispatch into the function. We have control of when the function is dispatched. 
? why is this helpful?
* we can wait to dispatch the action until the axios request or response is completed.

# 92. Refactoring the App
As a class based component "App" can have access to a lifecycle method. 

# 93. Testing FetchUser
Time: 21:51

Test:

    With server running I can see the fetchUser payload in the log. The data object is populated with a id, and a googleId. If we logout the data is just an empty string.

# 94. Refactoring to Async/Await

  In actions/index
Time: 23:51
# 95. AuthReducer Return Values

# 96. Accessing State in the Header

# 97. Header Content

# 98. Redirecting a User on Auth
At this point I start with the Landing page with 'Login With Google' the button works, I select an email, and am directed to Dashboard page. 'Logout' in upper left dosen't work yet. but it conditionally renders based on state!!

# 99. Redirect on Logout

Full HTTP Request - Will cause entire browser page to refresh. Choosing to go the simple route as by the time the client is logging out, theyre done. 

AJAX Request - No Page refresh, but we have to handle action creators, reducer, etc, and redirect to landing page. Much faster for the user. 

I can complete the google OAuth flow from start to end via the user interface including logging out!!!

# 100. Landing Component

landing.js - in components

# 101. Link Tags
an unauthinticated client should be directed to the landing page, where an authenticated client should be directed back to their dashboard. 

Link - Navigate to a different route rendered by React Router.
    <Link to={}></Link>

a - Navigate to a completely different HTML document. 
    <a href=''>sdj<a/>

Its Alive!!!!

Time :25:51

# sec9

add code in index.js

in server npm i body-parser

update scripts for postbuild

update build command in railway settings for the deployment