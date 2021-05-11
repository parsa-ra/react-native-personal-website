// This script is used to automate procedures required to adapt to the workaround suggested in
// https://github.com/rafgraph/spa-github-pages
// in order to prevent 404 errors while routing around the website which is served by github pages.
// there is an pending proposal 
//https://github.community/t/proposal-spa-single-page-application/10778
//for the official support of the feature in github pages.

// Make sure to run it after web-build in package.json.


const fs = require("fs") ; 
const path = require("path") ;
const parse = require("node-html-parser") ; 
const config = require("./spa-github-pages-config.json") ;
const build_path = config.destination_path ; 

const html_script = 
`<script type="text/javascript">
// Single Page Apps for GitHub Pages
// MIT License
// https://github.com/rafgraph/spa-github-pages
// This script checks to see if a redirect is present in the query string,
// converts it back into the correct url and adds it to the
// browser's history using window.history.replaceState(...),
// which won't cause the browser to attempt to load the new url.
// When the single page app is loaded further down in this file,
// the correct url will be waiting in the browser's history for
// the single page app to route accordingly.
(function(l) {
  if (l.search[1] === '/' ) {
    var decoded = l.search.slice(1).split('&').map(function(s) { 
      return s.replace(/~and~/g, '&')
    }).join('?');
    window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
    );
  }
}(window.location))
</script>`

if(config.copy_404.exec){
    console.log("Copying 404.html") ; 
    try {
        let notfound_name = '404.html'
        fs.copyFileSync(path.join(__dirname, notfound_name), path.join(__dirname, build_path, notfound_name)) ; 
    } catch (error) {
        console.error(error) ; 
    }   
}

if(config.override_index.exec){
console.log("Adding Script to index.html and Overriding it") ; 
const index_html = fs.readFileSync(path.join(__dirname, build_path, 'index.html'), 'utf-8') ; 
const root = parse.parse(index_html) ; 
const script_elem = parse.parse(html_script) ; 

const html_content_elements = root.childNodes[1].childNodes ; 
const head_index = html_content_elements.map((elem)=>{return elem.rawTagName}).indexOf('head') ; 
console.log(root.childNodes[1].childNodes[1].appendChild(script_elem));

try{
    fs.writeFileSync(path.join(__dirname, build_path, 'index.html'), root.toString()) ; 
}catch(error){
    console.error(error) ; 
}

// couldn't play around with the constructor
// const script_elem = new parse.HTMLElement({
//     tagName: 'script' ,
// }) ; 
// script_elem.setAttribute('type', 'text/javascript')  ;
//console.log(root.querySelector('#head')) ;
// head.appendChild(script_elem) ; 
//console.log(head.lastChild) ; 
}


if(config.create_robot_and_sitemap.exec){
    console.log("Writing robot.txt and sitemap.txt") ; 

    let robotString = `Sitemap:${config.domain}sitemap.txt` ; 
    let siteMapString = `${config.domain}\n`;

    config.routes.map((route) => {
        siteMapString += config.domain + "?/" + route + "\n" ; 
    })

    console.log(siteMapString) ; 

    try{
        fs.writeFileSync(path.join(__dirname, build_path, 'robot.txt'), robotString) ;
        fs.writeFileSync(path.join(__dirname, build_path, 'sitemap.txt'), siteMapString) ; 
    } catch (error){
        console.error(error) ; 
    }

}


if(config.copy_google_search_console_proof.exec) {

    let copySource = path.join(__dirname, config.copy_google_search_console_proof.path);
    let copyDest = path.join(__dirname, build_path, config.copy_google_search_console_proof.path.split("/").pop()) ; 

    try{
        fs.copyFileSync(copySource, copyDest) ; 
    } catch(error){
        console.log(error); 
    }

    console.log(`Google's ownership proof copied in ${copyDest}`) ; 

}