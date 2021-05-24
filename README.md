# React Native Personal Website
react native supposed to be used every where right? how about personal websites ...

This is an application created by react-native to act as a personal app which can be seamlessly ported to an website. 

This might become handy for deploying your modern website in just few minutes.

Check out sample run of this app as my website [here](https://parsa-ra.github.io).


# Customization 

* Theme: Head over `./theme/Colors.js` file and modify the colors as you please. I think the names(keys) are pretty self descriptive.
* Modify the `Screen` directory content. note that after adding or removing an entire screen re-run the `npm start` to update the `env.json` with new screens. The portion of the code that you can edit is depicted via `START_HERE` to `TILL HERE` comments. 
* Content of `Screens` can be both on-demand Like `About` Screen which it's content is `fetched` from `About.md` (this can be any network address here it served as an asset), or static like the ones which their content is embedded into the code. the second approach is I think more suitable since the content in this way is better managed using version control systems.
* You can change the `TextStyles` in `Text.js` (e.g. change font size, font family, ... ).

# Instructions
* Install `expo-cli` using `npm install --global expo-cli`.
* Clone this repo by `git clone git@github.com:parsa-ra/react-native-personal-website.git`
* Install Dependencies by `cd react-native-personal-website && expo install`
* run `npm run web` to start development server.

Build optimized version of the webpage for deployment by running `npm run build` and will be saved in `web-build` directory. you can serve the directory using tools such as `serve`. 

# Deploying to the Github Pages 
To create a `github-page` website create a repo and named it like `{your-user-name}\{your-user-name}.github.io`.

Make sure to change the  `"deploy": "gh-pages -r git@github.com:parsa-ra/parsa-ra.github.io.git deploy -d web-build"` entry in `package.json`, in order to deploy the files to your github-page (Change to `git@github.com:{your-user-name}/{your-user-name}.io.git`) Note that this method use the `ssh` so you have to deploy your public key in you github account. alternatively you cloud use the `https://github.com/{your-user-name}/{your-user-name}.github.io.git` but command line will require you to enter `User`, `Password` of your account for authentication. (preferably use the SSH method).

Currently github doesn't support any means to deploy Single-Page-Application(SPAs) like this to the Github-Pages, [this](https://github.com/rafgraph/spa-github-pages) repo provide a work around, For deployment to github pages I just automate suggested method and apply that to the build folder. When you run `npm deploy` it automatically modify the content of the build directory accordingly and publish it to your `website repo`.


## Configuring
The configuration options are in `spa-github-pages-config.json`.
The execution of each option is depicted by `exec` member, For example if someone don't want to copy the `404.html` just needs to set the `exec` to `false`.

### Description: 
* `destination_path`: It's the build path of the Expos web port, default is "./web-build",
* `copy_404`: Will copy the modified 404.html described [here](https://github.com/rafgraph/spa-github-pages) to the build directory. REQUIRED for Github Pages
* `override_index_spa_script`: Will add linking handle to the `index.html` build generated using `expo`. "REQUIRED" for Github Pages.
* `create_robot_and_sitemap`: Will create and copy `robot.txt` and `sitemap.txt` for Googles crawlers.
* `copy_google_search_console_proof`: When you sign in to the Googles Search Console in order to proof that you own this to be deployed web site google will give you an `html` proof file. in this case add the path to that file it will copy that file to the final serve directory before deployment.
* `copy_google_analytic_tag`: Like previous entry, in order to proof that the website is owned by you Google will give you an script tag that is required to be added to the final html. populate your given script(From Googles Search Console) to the `data` member of this entry or just populate the `id` which is a unique string depicted for your site in the form of `G-XXXXXXX`.

A bit of Gotcha, when submitting the `sitemap.txt` in the `Googles Search Console` it doesn't make any effect(I waited about 4 days), you should manually set the links in the `URL Inspector`
Update: The `sitemap` kick in after about 7 days, so if you have the time just wait about a week and everything will be fine witouht adding URLs manually.
