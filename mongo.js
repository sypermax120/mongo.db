// npm install request
// npm install cheerio
// npm install mongodb

const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://localhost:27017/test";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
 
var request = require('request');
var cheerio = require('cheerio');

// var url2 = "https://www.google.com.ua/search?q=%D0%BA%D0%BE%D1%82%D0%B8%D0%BA%D0%B8&sxsrf=ALeKk00qDRD8Sb02wR3XxEe__b0lbSWOOg:1587478366398&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjajvjg2fnoAhVCrosKHS29BU4Q_AUoAXoECBMQAw&biw=1920&bih=940";
var url2 = "https://imgur.com/search?q=cat";
var content = [];

mongoClient.connect(function(err, client){ 
    const db = client.db("usersdb");
    const collection = db.collection("users");

    request(url2, function(err, res, body) {
      var $ = cheerio.load(body);
      $('img').each(function(i, elem) {
          // content.push($(this).attr('src'));
          let user = {src: $(this).attr('src')};
          content.push(user);

          // console.log(user);

          // for (var i = 0; i<content.length; i++) {     
          //   console.log(content[i]);  

          // };
      });

      collection.insertMany(content, function(err, result){ 
        console.log('Зипись сделана');
        console.log(result);

        if(err){ 
          return console.log(err);
        };
      });

      console.log('База закрита')
      client.close();

    });
});