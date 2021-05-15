/*** As a chain of build process this should be called in prebuild event to update the @lastModifiedDate on pages.
*/
const fs = require("fs") ; 
const path = require("path") ; 

console.log("Running pre-build tasks") ; 


const env = fs.readFileSync(path.join(__dirname, "env.json"), 'utf-8') ; 
const envjson = JSON.parse(env) ; 


// Updating Date
const mDate = new Date() ; 
let modDate = mDate.toUTCString() ; 

envjson.lastModifiedDate = modDate ; 

//Updating Screens





fs.writeFileSync(path.join(__dirname, "env.json"), JSON.stringify(envjson)) ; 

