var himalaya = require('himalaya');
var html = require('fs').readFileSync('creative/index.html');
var json = himalaya.parse(html);

var cssparser = require("cssparser");
var fs = require("fs");
var request = require("request");

function uploadCss(newUrl, file) {
    // css and js files
    var images3 = [];
 	var main = json[2].children;

	for(i=0; i < main.length; i++) { 
		var content = main[i];
		var strJSON = JSON.stringify(content);
		var stylesheet = 'stylesheet';
		var javascript = 'script';   
		var proverka = strJSON.indexOf(stylesheet);
		var proverka2 = strJSON.indexOf(javascript); 
		
		if (proverka !== -1) {
        		position = main.indexOf(content);            
                var current = main[position];
                var path = current.attributes.href;
                images3.push(path);
        } 
        if (proverka2 !== -1) {
                position2 = main.indexOf(content);
                var current2 = main[position2];
                var path2 = current2.attributes.src;
                images3.push(path2); 
        } 
    } 

    // Request for css/js files
    for(i=0; i < images3.length; i++) {
        var imageName3 = images3[i];         
        var imageWay3 = 'creative/' + imageName3;       
        var formData3 = {
            'template[component][asset]': fs.createReadStream('/home/alexander/node_modules/himalaya/bin/' + imageWay3)
        };

        var request4 = require('request');
        request4.post({url: newUrl , formData: formData3}, function (error, response, body) {
            if (!error && response.statusCode == 200) {          
               console.log(body);
            }
        });          
    }    
}

function parsing(url) {
    var newUrl = url; 
	var blockarr = [];
	var parser = new cssparser.Parser();
	var data = fs.readFileSync('creative/creative.min.css', 'utf8');
	var uploadimage = function(imagepath){
    var formData = {
    'template[component][asset]': fs.createReadStream("creative/images/" + imagepath),
    };
   request.post({url: newUrl, formData: formData}, function optionalCallback(err, httpResponse, body){
    if(err){
      return console.log("Upload Failed", err);
    }
    return JSON.parse(body).asset_url;
  })
  }
  
var writeResults = function(uf){
  mres = {};
  for(url in uf){
    re = /original\/.*\?\d+$/;
    substr = uf[url].match(re)[0].replace('original/','').replace(/\?\d+$/, '');
    mres[substr] = uf[url];
  }
  objkeys = Object.keys(mres);
  maindata = fs.readFileSync('creative/creative.min.css', 'utf-8')

  for(key in objkeys){
    hh = objkeys[key];
    re1 = new RegExp(objkeys[key], "g");
    maindata = maindata.replace(re1, '"http://172.16.55.14:3000/' + mres[hh] + '"');
  }
  fs.writeFile('/home/alexander/node_modules/himalaya/bin/creative/creative.min.css', maindata, 'utf-8',
   function() { uploadCss(newUrl,'/home/alexander/node_modules/himalaya/bin/creative/creative.min.css') }
   );
}

var parsecss = function(data){
  var json = parser.parse(data);
  var readyblocks = [];
  for (ss in json.rulelist) {
    if(json.rulelist[ss]['type'] !== 'media') {
    	if(json.rulelist[ss].declarations["background"]){
      		if(json.rulelist[ss].declarations["background"].indexOf('url') > -1){
        		backarr = json.rulelist[ss].declarations["background"].split(" ");
        		blockarr.push(backarr[0]);
        		success_request = 0;
      		}
    	}
  	}
  }
  success_request = 0;
  for(url in blockarr){
    var myvar  = blockarr[url];
    console.log(myvar.split("(")[1].split(")")[0]);
    var formData = {
           'template[component][asset]': fs.createReadStream("creative/images/" + myvar.split("(")[1].split(")")[0]),
         };
    request.post({url: newUrl, formData: formData}, function optionalCallback(err, httpResponse, body){
         if(err){
             return console.log("Upload Failed", err);
           }		   
              readyblocks.push(JSON.parse(body).asset_url);
              success_request++;
              if (success_request == blockarr.length){
                 writeResults(readyblocks);
              }
           });
  }
}

fs.readFile('/home/alexander/node_modules/himalaya/bin/creative/creative.min.css', 'utf8', function(err, contents) {
  parsecss(contents);
});
}

request.post (
    'http://172.16.55.14:3000/templates',
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            rr = JSON.parse(body);
            arr = rr.uuid;
            var url = "http://172.16.55.14:3000/templates/" + arr + "/components";
            var url2 = "http://172.16.55.14:3000/templates/" + arr + "/blocks";
            var images = [];
            var images2 = [];
            var keys = [];
			
            // Images from html
              function parse(json) {
                var i;
                for(var child in json) {
                  i = json[child];
                  if (typeof i === 'string' || typeof i === 'number') {
                    if(typeof i !== 'number') {
                      if(i.indexOf('images') !== -1) {
                            images.push(i);
                                      }
                                   }      
                               }
                else if (typeof i === 'object' && i.hasOwnProperty('src') && i.type !== 'text/javascript') {
                      var id = Math.floor((Math.random() * 10000) + 267);
                      i.assetid=id;
                      keys.push(id);
                      parse(i);     
                      }
      	     else {
            parse(i);
               }
            }
          }
    
           parse(json);
            
			// Request to create images from html         
           for(i=0; i < images.length; i++) {             
              var id2 = keys[i];
              var imageName = images[i];             
              var imageWay = "creative/" + imageName;
              var formData = {
              'template[component][asset]': fs.createReadStream(imageWay),
              assetid: id2
               };
			   
               var request2 = require('request');
              request2.post({url: url , formData: formData}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            }
              });        
              }

              // Create html blocks
              var bd = json.filter(function(obj) {
					return obj['tagName'] == 'body';
				});
                         
              for(i=0; i < bd[0].children.length; i++) {			
                 contentBd = bd[0].children[i];
                 positionBd = bd[0].children.indexOf(contentBd);         
                 blocktype = 'json';                      
                 var request3 = require('request');
                 request3.post(
                  url2,
                 { json: { block: {content: contentBd, position: positionBd, blocktype: blocktype } } },
                 function (error, response, body) {
                 if (!error && response.statusCode == 200) {
              console.log(body);
                     }
                   }
                 );
                } 
				
                parsing(url);
           }
         }
       );
   


         