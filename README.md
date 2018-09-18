# JetLag: 2D Games for Web and Mobile

JetLag is a framework for making 2D games that run in desktop and mobile
browsers.  It is the evolution of LibLOL, and at a high level, it is faithful to
the spirit of LibLOL.  In particular:
* JetLag is designed for beginners
* JetLag strives to put all of the code for a level of the game in a single 
  section of a single file

As an HTML5 project, JetLag differs from LibLOL in a few ways:
* It uses PIXI.js and PhysicsType2D instead of LibGDX and Box2D, so some names 
  and features are a little bit different
* It uses TypeScript instead of Java, which leads to simpler, cleaner code

Note that JetLag still is a mobile-first framework.  It uses Hammer.js for 
multi-touch and gesture support, and also enables accelerometer by default.

## Getting Started
Once you have downloaded JetLag, enter the JetLag directory and type 
`npm install` to fetch all of the supporting code for JetLag.  Once you have 
done that, you can run `npm start` to compile your code.  JetLag uses webpack 
for compilation, so every time you make a change, the code will recompile.  
To test your game, open a browser and navigate to http://localhost:8080.

To develop a game, we recommend that you start by reading the code in 
src/game/Levels.ts, to understand how JetLag works.  Then edit the first level 
of that file to start creating your game.

To add images and sounds to JetLag, follow these steps:
1. Copy the image or sound file into the assets folder
2. Add the name of the file to the appropriate list in src/game/myconfig.ts

That's it.  Once you follow those two steps, you can refer to the asset by its 
filename in your code.

## JetLag Status
This is an initial port of JetLag.  It is under active development.  While many 
parts of JetLag are effectively stable, we reserve the right to change any and
all APIs and interfaces.