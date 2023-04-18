Railway setup instructions

    - register for railway account using github account for free credits: 
      https//railway.app.login

    - install cli : 
      npm i -g @railway/cli

    - test : 
      railway

    - login :  
      railway login

    - Navigate to server and initalize : 
      railway init
      railway open

    - select '+ plus'
        "Empty Project"
    
    - add service
        'Empty service'

    - click on the newly created service.
        click settings >"generate domain"

    - add environment variables.

    - add heroku postbuild command.

    - [heroku]configure engines in package.json:

            "engines": {
              "node": "8.1.1",
              "npm": "5.0.3"
            },