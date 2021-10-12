var express = require('express')
var app = express();

var zipCodes = []
//Insert
app.get('/insert/:zipcode',function(req,res){
    //Add the zipcode if does not exist
    if(!zipCodes.includes(req.params.zipcode))
    {    
    	zipCodes.push(req.params.zipcode)
    	console.log('insert')
    	res.write("Zip code "+req.params.zipcode+" inserted.")
    }
    else
    	res.write("Zip code "+req.params.zipcode+" already exists.")
    res.end('\n')
})
//Delete
app.get('/delete/:zipcode',function(req,res){
    console.log('delete')
    if(zipCodes.includes(req.params.zipcode))
    {
        zipCodes.splice(zipCodes.indexOf(req.params.zipcode),1)
        res.write("Zip code "+req.params.zipcode+" deleted.")
        
    }
    else
        res.write("Zip code "+req.params.zipcode+" do	es not exist.")
    res.end('\n')
})
//Display
app.get('/display',function(req,res){
    result = []
    var startGrouping = false
    var start;
    //Sort the array
    zipCodes.sort().forEach((element,ind) => {
        if(!startGrouping)
        {
            if(zipCodes[ind+1]-element == 1)
	    {   
	        startGrouping =true;
            	start = element
            }
            else if(ind != 0)
            	result.push(' '+element)
            else
            	result.push(element)
        }
        else if(startGrouping && zipCodes[ind+1]-element != 1)
        {
            startGrouping = false;
            ind != 0 ?  result.push(' '+start+'-'+element) : result.push(start+'-'+element)
        }
        
        
    });
    console.log('display')
    res.write(String(result))
    res.end('\n')
})
//Has
app.get('/has/:zipcode',function(req,res){
    console.log('has')
    res.write(String(zipCodes.includes(req.params.zipcode)))
    res.end('\n')
})

//Server
var server = app.listen(8081,function(){
    var host = server.address().address
    var port = server.address().port
    console.log('Listening on port: '+port+' ....')
})

