# Evolution
Evolution - The Game - Click - Click - Click, Click - ... -Awesome

to build the javascript file you have to do:

  npm install browserify -g

go to the root of this Project:

  npm install --save react react-dom babelify babel-preset-react (is working with node 4.x but not with 5.x)

to rebuild your code call (from the root of the Project):
  browserify -t [ babelify --presets [ react ] ] js/game.js -o js/bundle.js

open the index.html in your browser and you are ready =)
