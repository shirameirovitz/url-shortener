const app = require("../app");
const express = require("express");
const dataBase = require("../dataBase");
//If user is logged in, this route will render a table of all short URLs created by them. If not logged in, will redirect to login
app.get("/urls", (req, res) => {
      let userUrlDatabase = filterURLs(Database, req);
      let templateVars = { urls:Database, user : users[req.session.user_id] };
      res.render("urls_index", templateVars);
   
  });
  function checkIfUrlExists(dataBase, currentUrl) {
           for(let i = 0; i < dataBase.length; i++) {        
                if(dataBase[i].originalUrl === currentUrl) {            
                     dataBase[i].count += 1;           
                       return dataBase[i].shortUrl;        
                     }    
                     }  
                    }
