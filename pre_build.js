// As a chain of build process this should be called in prebuild event to update the @lastModifiedDate on pages.

const fs = require("fs") ; 
const path = require("path") ; 

console.log("Running pre-build tasks") ; 

const env = fs.readFileSync(path.join(__dirname, "env.json"), 'utf-8') ; 

const mDate = new Date() ; 
let modDate = mDate.toUTCString() ; 

const envjson = JSON.parse(env) ; 
envjson.lastModifiedDate = modDate ; 

fs.writeFileSync(path.join(__dirname, "env.json"), JSON.stringify(envjson)) ; 

