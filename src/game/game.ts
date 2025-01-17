import { initializeAndLaunch } from "../jetlag/Stage";
import { JetLagGameConfig } from "../jetlag/Config";
import { ManualMovement, ChaseMovement, PathMovement, Path } from "../jetlag/Components/Movement";
import { BoxBody, CircleBody, PolygonBody } from "../jetlag/Components/RigidBody";
import { Destination, Hero, Obstacle, Enemy } from "../jetlag/Components/Role";
import { Actor, } from "../jetlag/Entities/Actor";
import { KeyCodes } from "../jetlag/Services/Keyboard";
import { stage } from "../jetlag/Stage";
import { GridSystem } from "../jetlag/Systems/Grid";
import { FilledBox, FilledPolygon, TextSprite, ImageSprite } from "../jetlag/Components/Appearance";
import { MusicComponent } from "../jetlag/Components/Music";

/**
 * Screen dimensions and other game configuration, such as the names of all
 * the assets (images and sounds) used by this game.
 */
class Config implements JetLagGameConfig {
  // If your game is in landscape mode, it's very unlikely that you'll want to
  // change these next values. Hover over them to see what they mean.  If your
  // game is in portrait mode, you probably will want to swap the width and
  // height
  pixelMeterRatio = 100;
  screenDimensions = { width: 1600, height: 900 };
  adaptToScreenSize = true;

  canVibrate = true;            // Turn off except for some mobile games
  forceAccelerometerOff = true; // Turn on except for some mobile games
  storageKey = "--no-key--";    // This needs to be globally unique to your game
  hitBoxes = true;              // Turn off before deploying!

  resourcePrefix = "./assets/"; // All sounds and images go in this subfolder
  musicNames = ["song.mp3", "blank.mp3"];              // Audio files that you want to loop
  soundNames = [];              // Short audio files that you don't want to loop
  imageNames = ["asbeltnews1824.png", "luhawk.png", "astrobasicp.png", "astrobcustomhigh.png", "astrobcustomlow.png", "astrobhomehigh.png", "astrobhomelow.png", "astrobighigh.png", "astrobiglow.png", "astrobsethigh11111.png", "astrobsetlow.png", "astrobsetlow11111.png", "astroselectp.png", "astrowbackp.png", "astrobsethigh.png", "galaxybackgroundstatic", "back.png", "impsd.png", "mousenorm.png", "rock.png", "venetorsd.png", "xwing.png"];              // All image files and sprite sheet json files
}

/**
 * This function draws the first scene that shows when the game starts.  In this
 * code, it's an interactive world that cannot be won or lost.  After your game
 * starts becoming more polished, you will probably want to use several
 * functions like this one as a way to organize the parts of your game (levels,
 * chooser, welcome screen, store, etc).
 *
 * @param level Which level of the game should be displayed
 */
function builder(level: number) {
  // mnn227 Says if the spacship is not defined it will be the venetor 
  if (stage.storage.getSession("starship") == undefined)
    stage.storage.setSession("starship", 1);
  console.log(stage.storage.getSession("starship"))

  // mnn227 Says if the contrast is not defined it will be low contrast 
  if (stage.storage.getSession("homep") == undefined)
    stage.storage.setSession("homep", 1);
  console.log(stage.storage.getSession("homep"))

  // mnn227 Says if the contrast is not defined it will be low contrast 
  if (stage.storage.getSession("settingp") == undefined)
    stage.storage.setSession("settingp", 2);
  console.log(stage.storage.getSession("settingp"))

  // mnn227 Says if the contrast is not defined it will be low contrast 
  if (stage.storage.getSession("ingamep") == undefined)
    stage.storage.setSession("ingamep", 1);
  console.log(stage.storage.getSession("ingamep"))

  // mnn227 Says if the contrast is not defined it will be low contrast 
  if (stage.storage.getSession("shipp") == undefined)
    stage.storage.setSession("shipp", 1);
  console.log(stage.storage.getSession("shipp"))

  // mnn227 Says if the contrast is not defined it will be low contrast 
  if (stage.storage.getSession("song") == undefined)
    stage.storage.setSession("song", 1);
  console.log(stage.storage.getSession("song"))




  if (level == 1) {
    stage.score.onWin = { level, builder };
    stage.score.onLose = { level, builder };
    // Draw a grid on the screen, to help us think about the positions of actors.
    // Remember that when `hitBoxes` is true, clicking the screen will show
    // coordinates in the developer console.
    GridSystem.makeGrid(stage.world, { x: 0, y: 0 }, { x: -1.6, y: -.9 });
    // mnn227 set up the background
    if (stage.storage.getSession("homep") == 1)
      new Actor({
        appearance: new ImageSprite({ width: 16, height: 9, img: "astrobhomelow.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, 0, 0, 0, 0, 0, 0, 0] }),
      });
    else if (stage.storage.getSession("homep") == 2)
      new Actor({
        appearance: new ImageSprite({ width: 16, height: 9, img: "astrobhomehigh.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, 0, 0, 0, 0, 0, 0, 0] }),
      });


    // mnn227 music
    if (stage.storage.getSession("song") == 1)
      stage.levelMusic = new MusicComponent(stage.musicLibrary.getMusic("song.mp3"));
    else if (stage.storage.getSession("song") == 2)
      stage.levelMusic = new MusicComponent(stage.musicLibrary.getMusic("blank.mp3"));







    // mnn227 make an onscreen mouse for users without keyboards
    let h = new Actor({
      appearance: new ImageSprite({ width: .25, height: .25, img: "mousenorm.png", z: 1 }),
      rigidBody: new PolygonBody({ cx: 6, cy: 4.5, vertices: [-.05, -.1, .1, .05, 0, .05, -.05, .05] }, { collisionsEnabled: false }),
      role: new Hero(),
      movement: new ManualMovement(),

    });

    // mnn227 ASBELT game dev news image
    if (stage.storage.getSession("settingp") == 2)
      new Actor({
        appearance: new ImageSprite({ width: 6.5, height: 3.94, img: "asbeltnews1824.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 11, cy: 5.5, vertices: [0, 0, 0, 0, 0, 0, 0, 0] }),
      });
    else if (stage.storage.getSession("settingp") == 1)
      new Actor({
        appearance: new ImageSprite({ width: 6.5, height: 3.94, img: "luhawk.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 11, cy: 5.5, vertices: [0, 0, 0, 0, 0, 0, 0, 0] }),
      });











    // mnn227 this lets it move laterally
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(-7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    // mnn227 this lets it move vertically
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(-5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(0); });


    // mnn227 Making the 4 buttons to select the menu page
    // Button 1/4



    // mnn227 ASBELT game dev news image
    if (stage.storage.getSession("shipp") == 1)
      new Actor({
        appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
        rigidBody: new PolygonBody({ cx: 7, cy: 5, vertices: [-4.2, -.8, -4.2, -.25, -2.25, -.25, -2.25, -.8] }),
        gestures: { tap: () => { stage.switchTo(builder, 11); return true } }, // mnn227 mouse controls 
        role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 12) } }), // mnn227 arrow controls aswd
      });
    else if (stage.storage.getSession("shipp") == 2)
      new Actor({
        appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
        rigidBody: new PolygonBody({ cx: 7, cy: 5, vertices: [-4.2, -.8, -4.2, -.25, -2.25, -.25, -2.25, -.8] }),
        gestures: { tap: () => { stage.switchTo(builder, 12); return true } }, // mnn227 mouse controls 
        role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 12) } }), // mnn227 arrow controls aswd
      });


    // Button 2/4
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 7, cy: 5, vertices: [-5.5, 0, -5.5, .5, -1, .5, -1, 0] }),
      gestures: { tap: () => { stage.switchTo(builder, 2); return true } }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 2) } }), // mnn227 arrow controls aswd
    });

    // Button 3/4
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 7, cy: 5, vertices: [-4.6, 1.3, -4.6, 0.75, -1.95, .75, -1.95, 1.3] }),
      gestures: { tap: () => { stage.switchTo(builder, 3); return true } }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 3) } }), // mnn227 arrow controls aswd
    });

    // Button 4/4
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 7, cy: 5, vertices: [-3.95, 2.1, -3.95, 1.5, -2.5, 1.5, -2.5, 2.1] }),
      role: new Obstacle({ heroCollision: () => { stage.exit() } }), // mnn227 arrow controls aswd
    });
    //mnn227 4 key works to take you to dev lv 4 which is used for testing features
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_DIGIT4, () => { stage.switchTo(builder, 4) });
  }

  if (level == 2) {
    stage.score.onWin = { level, builder };
    stage.score.onLose = { level, builder };
    // Draw a grid on the screen, to help us think about the positions of actors.
    // Remember that when `hitBoxes` is true, clicking the screen will show
    // coordinates in the developer console.
    GridSystem.makeGrid(stage.world, { x: 0, y: 0 }, { x: -1.6, y: -.9 });
    // mnn227 set up the background

    // mnn227 music
    if (stage.storage.getSession("song") == 1)
      stage.levelMusic = new MusicComponent(stage.musicLibrary.getMusic("song.mp3"));
    else if (stage.storage.getSession("song") == 2)
      stage.levelMusic = new MusicComponent(stage.musicLibrary.getMusic("blank.mp3"));

    if (stage.storage.getSession("homep") == 1)
      new Actor({
        appearance: new ImageSprite({ width: 16, height: 9, img: "astrobcustomlow.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, 0, 0, 0, 0, 0, 0, 0] }),
      });
    else if (stage.storage.getSession("homep") == 2)
      new Actor({
        appearance: new ImageSprite({ width: 16, height: 9, img: "astrobcustomhigh.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, 0, 0, 0, 0, 0, 0, 0] }),
      });



    let h = new Actor({
      appearance: new ImageSprite({ width: .25, height: .25, img: "mousenorm.png", z: 1 }),
      rigidBody: new PolygonBody({ cx: 8, cy: 7, vertices: [-.05, -.1, .1, .05, 0, .05, -.05, .05] }, { collisionsEnabled: false }),
      role: new Hero(),
      movement: new ManualMovement(),

    });
    // mnn227 Making the 4 buttons to select the menu page
    // Button 1/3
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 1.5, cy: 3.2, vertices: [0, 0, 0, 3, 4, 3, 4, 0] }),
      gestures: {
        tap: () => {
          stage.storage.setSession("starship", 1);
          stage.switchTo(builder, 1); return true
        }
      }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 111) } }), // mnn227 arrow controls aswd
    });

    // Button 2/3
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 6.1, cy: 3.2, vertices: [0, 0, 0, 3, 4, 3, 4, 0] }),
      gestures: {
        tap: () => {
          stage.storage.setSession("starship", 2);
          stage.switchTo(builder, 1); return true
        }
      }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 112) } }), // mnn227 arrow controls aswd
    });

    // Button 3/3
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 10.6, cy: 3.2, vertices: [0, 0, 0, 3, 4, 3, 4, 0] }),
      gestures: {
        tap: () => {
          stage.storage.setSession("starship", 3);
          stage.switchTo(builder, 1); return true
        }
      }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 113) } }), // mnn227 arrow controls aswd
    });



    // mnn227 this lets it move laterally
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(-7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    // mnn227 this lets it move vertically
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(-5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(0); });

    //mnn227 esc key works as a back button to the prior page
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_ESCAPE, () => { stage.switchTo(builder, 1) });

    // mnn227 onscren back button
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 1, cy: 7.2, vertices: [.1, .35, .1, .9, 1.85, .9, 1.85, .35] }),
      role: new Destination(),
      gestures: { tap: () => { stage.switchTo(builder, 1); return true } },
    });

    stage.score.setVictoryDestination(1);
    stage.score.onWin = { level: 1, builder: builder }

  }

  if (level == 3) {
    stage.score.onWin = { level, builder };
    stage.score.onLose = { level, builder };
    // Draw a grid on the screen, to help us think about the positions of actors.
    // Remember that when `hitBoxes` is true, clicking the screen will show
    // coordinates in the developer console.
    GridSystem.makeGrid(stage.world, { x: 0, y: 0 }, { x: -1.6, y: -.9 });
    // mnn227 set up the background
    if (stage.storage.getSession("homep") == 1)
      new Actor({
        appearance: new ImageSprite({ width: 16, height: 9, img: "astrobsetlow.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, 0, 0, 0, 0, 0, 0, 0] }),
      });
    else if (stage.storage.getSession("homep") == 2)
      new Actor({
        appearance: new ImageSprite({ width: 16, height: 9, img: "astrobsethigh.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, 0, 0, 0, 0, 0, 0, 0] }),
      });

    // mnn227 music
    if (stage.storage.getSession("song") == 1)
      stage.levelMusic = new MusicComponent(stage.musicLibrary.getMusic("song.mp3"));
    else if (stage.storage.getSession("song") == 2)
      stage.levelMusic = new MusicComponent(stage.musicLibrary.getMusic("blank.mp3"));


    //mnn227 esc key works as a back button to the prior page
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_ESCAPE, () => { stage.switchTo(builder, 1) });
    // mnn227 onscreen mouse
    let h = new Actor({
      appearance: new ImageSprite({ width: .25, height: .25, img: "mousenorm.png", z: 1 }),
      rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [-.05, -.1, .1, .05, 0, .05, -.05, .05] }, { collisionsEnabled: false }),
      role: new Hero(),
      movement: new ManualMovement(),

    });


    // mnn227 this lets it move laterally
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(-7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    // mnn227 this lets it move vertically
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(-5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(0); });

    //mnn227 esc key works as a back button to the prior page
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_ESCAPE, () => { stage.switchTo(builder, 1) });
    //mnn227 onscreen back Button
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 1, cy: 7.2, vertices: [.1, .35, .1, .9, 1.85, .9, 1.85, .35] }),
      role: new Destination(),
      gestures: { tap: () => { stage.switchTo(builder, 1); return true } },
    });

    stage.score.setVictoryDestination(1);
    stage.score.onWin = { level: 1, builder: builder }



    // mnn227 Button 1/4
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 4.18, cy: 3.11, vertices: [0, 0, 0, .3, .55, .3, .55, 0] }),
      gestures: {
        tap: () => {
          stage.storage.setSession("homep", 1);
          stage.switchTo(builder, 3); return true
        }
      }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 3) } }), // mnn227 arrow controls aswd
    });
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 3.6, cy: 3.11, vertices: [0, 0, 0, .3, .35, .3, .35, 0] }),
      gestures: {
        tap: () => {
          stage.storage.setSession("homep", 2);
          stage.switchTo(builder, 3); return true
        }
      }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 3) } }), // mnn227 arrow controls aswd
    });

    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 4.18, cy: 3.81, vertices: [0, 0, 0, .3, .55, .3, .55, 0] }),
      gestures: {
        tap: () => {
          stage.storage.setSession("settingp", 1);
          stage.switchTo(builder, 3); return true
        }
      }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 3) } }), // mnn227 arrow controls aswd
    });
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 3.6, cy: 3.81, vertices: [0, 0, 0, .3, .35, .3, .35, 0] }),
      gestures: {
        tap: () => {
          stage.storage.setSession("settingp", 2);
          stage.switchTo(builder, 3); return true
        }
      }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 3) } }), // mnn227 arrow controls aswd
    });

    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 4.18, cy: 2.4, vertices: [0, 0, 0, .3, .55, .3, .55, 0] }),
      gestures: {
        tap: () => {
          stage.storage.setSession("shipp", 2);
          stage.switchTo(builder, 3); return true
        }
      }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 3) } }), // mnn227 arrow controls aswd
    });
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 3.6, cy: 2.4, vertices: [0, 0, 0, .3, .35, .3, .35, 0] }),
      gestures: {
        tap: () => {
          stage.storage.setSession("shipp", 1);
          stage.switchTo(builder, 3); return true
        }
      }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 3) } }), // mnn227 arrow controls aswd
    });

    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 4.18, cy: 4.55, vertices: [0, 0, 0, .3, .55, .3, .55, 0] }),
      gestures: {
        tap: () => {
          stage.storage.setSession("song", 2);
          stage.switchTo(builder, 3); return true
        }
      }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 3) } }), // mnn227 arrow controls aswd
    });
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 3.6, cy: 4.55, vertices: [0, 0, 0, .3, .35, .3, .35, 0] }),
      gestures: {
        tap: () => {
          stage.storage.setSession("song", 1);
          stage.switchTo(builder, 3); return true
        }
      }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 3) } }), // mnn227 arrow controls aswd
    });

  }

  if (level == 4) {
    stage.score.onWin = { level, builder };
    stage.score.onLose = { level, builder };
    // Draw a grid on the screen, to help us think about the positions of actors.
    // Remember that when `hitBoxes` is true, clicking the screen will show
    // coordinates in the developer console.
    GridSystem.makeGrid(stage.world, { x: 0, y: 0 }, { x: -1.6, y: -.9 });
    // mnn227 set up the background
    stage.backgroundColor = "#17b4ff";
    stage.background.addLayer({ anchor: { cx: -8, cy: 4.5, }, imageMaker: () => new ImageSprite({ width: 16, height: 9, img: "astrowbackp.png" }), speed: 0 });
    stage.world.camera.setBounds(0, 0, 16, 9);


    // mnn227 onscreen mouse
    let h = new Actor({
      appearance: new ImageSprite({ width: .25, height: .25, img: "mousenorm.png", z: 1 }),
      rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [-.05, -.1, .1, .05, 0, .05, -.05, .05] }, { collisionsEnabled: false }),
      role: new Hero(),
      movement: new ManualMovement(),

    });
    // mnn227 music
    if (stage.storage.getSession("song") == 1)
      stage.levelMusic = new MusicComponent(stage.musicLibrary.getMusic("song.mp3"));
    else if (stage.storage.getSession("song") == 2)
      stage.levelMusic = new MusicComponent(stage.musicLibrary.getMusic("blank.mp3"));
    // mnn227 this lets it move laterally
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(-7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    // mnn227 this lets it move vertically
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(-5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(0); });

    //mnn227 esc key works as a back button to the prior page
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_ESCAPE, () => { stage.switchTo(builder, 1) });







    //create screen overlay
    // Button 1/4
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }), //this line says the box we create is vissually black but is 0 by 0 in size so it doesnt exist
      rigidBody: new PolygonBody({ cx: 0, cy: 0, vertices: [0, 0, 0, 9, 16, 9, 16, 0] }), //this line sets the hitbox of the box which covers the full screen
      gestures: {
        mouseHover: (actor, worldCoords) => {
          console.log(worldCoords);
          h.rigidBody.setCenter(worldCoords.x, worldCoords.y)
          return true;
        }
      }
      // mnn227 mouse controls 
    });








    // mnn227 onscreen back button
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, 0, 0, 0, 0, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 1, cy: 7.2, vertices: [.1, .35, .1, .9, 1.85, .9, 1.85, .35] }),
      role: new Destination(),
      gestures: { tap: () => { stage.switchTo(builder, 1); return true } },
    });

    stage.score.setVictoryDestination(1);
    stage.score.onWin = { level: 1, builder: builder }

  }

  if (level == 11) {
    stage.score.onWin = { level, builder };
    stage.score.onLose = { level, builder };
    // Draw a grid on the screen, to help us think about the positions of actors.
    // Remember that when `hitBoxes` is true, clicking the screen will show
    // coordinates in the developer console.
    GridSystem.makeGrid(stage.world, { x: 0, y: 0 }, { x: -1.6, y: -.9 });


    // mnn227 music
    if (stage.storage.getSession("song") == 1)
      stage.levelMusic = new MusicComponent(stage.musicLibrary.getMusic("song.mp3"));
    else if (stage.storage.getSession("song") == 2)
      stage.levelMusic = new MusicComponent(stage.musicLibrary.getMusic("blank.mp3"));

    if (stage.storage.getSession("homep") == 1)
      new Actor({
        appearance: new ImageSprite({ width: 16, height: 9, img: "astrobiglow.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, 0, 0, 0, 0, 0, 0, 0] }),
      });
    else if (stage.storage.getSession("homep") == 2)
      new Actor({
        appearance: new ImageSprite({ width: 16, height: 9, img: "astrobighigh.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, 0, 0, 0, 0, 0, 0, 0] }),
      });

    // Make a hero
    let h = new Actor({
      appearance: new ImageSprite({ width: 3, height: 2, img: "venetorsd.png", z: 1 }),
      rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, -1, 1.4, .25, 0, 1, -1.4, .25] }, { collisionsEnabled: false }),
      role: new Hero(),
      movement: new ManualMovement(),
    });

    //pae225 enemy that will chase you
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: 'rock.png' }),
      rigidBody: new CircleBody({ cx: 0, cy: 8, radius: 0.4 }, { dynamic: true }),
      movement: new ChaseMovement({ target: h, speed: 1 }),
      role: new Enemy(),
      extra: { weak: false }
    });


    // pae225 enemy moves horizontally across screen
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: "rock.png" }),
      rigidBody: new CircleBody({ radius: .5, cx: 0, cy: 4 }),
      role: new Enemy(),
      movement: new ChaseMovement({ target: h, speed: 1.5 }),
    });
    // pae225 when hit by enemy will send you back to home screen
    stage.score.onLose = { level, builder }

    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 8, cy: -.05, width: 16, height: .1 }),
      role: new Enemy(),
    });
    // pae225 top boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 16, cy: -2, width: 16, height: .1 }),
      role: new Enemy(),
    });
    // pae2225 botttom boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 8, cy: 9.5, width: 16, height: .1 }),
      role: new Enemy(),
    });
    // pae225 right boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 17, cy: 0, width: 0, height: 16 }),
      role: new Enemy(),
    });
    // pae225 left boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: -1, cy: 0, width: 0, height: 16 }),
      role: new Enemy(),
    });
    // pae225 text that says tutorial
    new Actor({
      rigidBody: new CircleBody({ cx: 1.2, cy: 1.4, radius: .01 }),
      appearance: new TextSprite({ center: true, face: "Arial", size: 77, color: "#0000FF" }, "Tutorial")
    });
    // pae225 Text that moves telling you how to play the game
    new Actor({
      rigidBody: new BoxBody({ cx: 2, cy: 1, width: .5, height: .5 }),
      appearance: new TextSprite({ center: true, face: "Arial", size: 64, color: "#FF0000aa", strokeColor: "#0000FF", strokeWidth: 2 }, "Use A,W,S,D for movement"),
      movement: new PathMovement(new Path().to(1, 1).to(20, 1), 2, false),
    });
    new Actor({
      rigidBody: new BoxBody({ cx: 1, cy: 1, width: .5, height: .5 }),
      appearance: new TextSprite({ center: true, face: "Arial", size: 64, color: "#FF0000aa", strokeColor: "#0000FF", strokeWidth: 2 }, "Use Arrows for tilt"),
      movement: new PathMovement(new Path().to(-15, 1).to(20, 1), 2, false),
    });
    new Actor({
      rigidBody: new BoxBody({ cx: 1, cy: 1, width: .5, height: .5 }),
      appearance: new TextSprite({ center: true, face: "Arial", size: 64, color: "#FF0000aa", strokeColor: "#0000FF", strokeWidth: 2 }, "Avoid the Astroids"),
      movement: new PathMovement(new Path().to(-25, 1).to(20, 1), 2, false),
    });
    new Actor({
      rigidBody: new BoxBody({ cx: 1, cy: 1, width: .5, height: .5 }),
      appearance: new TextSprite({ center: true, face: "Arial", size: 64, color: "#FF0000aa", strokeColor: "#0000FF", strokeWidth: 2 }, "You win when time runs out"),
      movement: new PathMovement(new Path().to(-32, 1).to(20, 1), 2, false),
    });
    //pae225 enemy that will chase you
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: 'rock.png' }),
      rigidBody: new CircleBody({ cx: 0, cy: 8, radius: 0.4 }, { dynamic: true }),
      movement: new ChaseMovement({ target: h, speed: 1 }),
      role: new Enemy(),
      extra: { weak: false }
    });

    //pae225 enemy come across middle of the screen
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: 'rock.png' }),
      rigidBody: new CircleBody({ cx: 1, cy: 1, radius: 0.4 }, { dynamic: true }),
      movement: new PathMovement(new Path().to(3, 4).to(15.5, .5), 3, false),
      role: new Enemy(),
      extra: { weak: false }
    });

    // pae225 when hit by enemy will send you back to home screen
    stage.score.onLose = { level, builder }

    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 8, cy: -.05, width: 16, height: .1 }),
      role: new Enemy(),
    });
    // pae225 top boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 16, cy: -2, width: 16, height: .1 }),
      role: new Enemy(),
    });
    // pae2225 botttom boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 8, cy: 9.5, width: 16, height: .1 }),
      role: new Enemy(),
    });
    // pae225 right boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 17, cy: 0, width: 0, height: 16 }),
      role: new Enemy(),
    });
    // pae225 left boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: -1, cy: 0, width: 0, height: 16 }),
      role: new Enemy(),
    });




    // Make an obstacle that is a rectangle
    new Actor({
      rigidBody: new BoxBody({ cx: 300, cy: 4, width: 1, height: 1 }),
      appearance: new FilledBox({ width: 1, height: 1, fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      role: new Obstacle(),
    })

    // Make an obstacle that is a polygon
    new Actor({
      rigidBody: new PolygonBody({ cx: 1000, cy: 5, vertices: [0, -.5, .5, 0, 0, .5, -1, 0] }),
      appearance: new FilledPolygon({ vertices: [0, -.5, .5, 0, 0, .5, -1, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      role: new Obstacle(),
    })

    new Actor({
      rigidBody: new PolygonBody({ cx: 700, cy: 5, vertices: [0, -.5, .5, 0, 0, .5, -1, 0] }),
      appearance: new FilledPolygon({ vertices: [0, -.5, .5, 0, 0, .5, -1, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      role: new Obstacle(),
    })


    // imput code here
    // mnn227 game countdown
    new Actor({
      appearance: new TextSprite({ center: false, face: "Arial", size: 20, color: "#0ff000" }, () => stage.score.getWinCountdownRemaining() ? "Time Until Win: " + stage.score.getWinCountdownRemaining()?.toFixed(2) : "Matthew"),
      rigidBody: new CircleBody({ cx: .1, cy: 1.9, radius: .01 }, { scene: stage.hud })
    });
    // mnn227 Automatically win in 30 seconds
    stage.score.setVictorySurvive(30);

    // mnn227 this lets arrows work as rotation
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_LEFT, () => { h.rigidBody.body.SetAngularVelocity(-6); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_LEFT, () => { h.rigidBody.body.SetAngularVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_RIGHT, () => { h.rigidBody.body.SetAngularVelocity(6); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_RIGHT, () => { h.rigidBody.body.SetAngularVelocity(0); });
    // mnn227 this lets it move laterally
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(-7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    // mnn227 this lets it move vertically
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(-5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(0); });

    //mnn227 esc key works as a back button to the prior page there will be a popup to verify that you want this to happen
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_ESCAPE, () => { stage.switchTo(builder, 1) });
  }
  if (level == 12) {
    stage.score.onWin = { level, builder };
    stage.score.onLose = { level, builder };
    // Draw a grid on the screen, to help us think about the positions of actors.
    // Remember that when `hitBoxes` is true, clicking the screen will show
    // coordinates in the developer console.
    GridSystem.makeGrid(stage.world, { x: 0, y: 0 }, { x: -1.6, y: -.9 });
    // set up the background

    // mnn227 music
    if (stage.storage.getSession("song") == 1)
      stage.levelMusic = new MusicComponent(stage.musicLibrary.getMusic("song.mp3"));
    else if (stage.storage.getSession("song") == 2)
      stage.levelMusic = new MusicComponent(stage.musicLibrary.getMusic("blank.mp3"));

    if (stage.storage.getSession("homep") == 1)
      new Actor({
        appearance: new ImageSprite({ width: 16, height: 9, img: "astrobiglow.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, 0, 0, 0, 0, 0, 0, 0] }),
      });
    else if (stage.storage.getSession("homep") == 2)
      new Actor({
        appearance: new ImageSprite({ width: 16, height: 9, img: "astrobighigh.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, 0, 0, 0, 0, 0, 0, 0] }),
      });





    // Make a hero
    let h: Actor;
    if (stage.storage.getSession("starship") == 1)
      h = new Actor({
        appearance: new ImageSprite({ width: 3, height: 2, img: "venetorsd.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, -1, 1.4, .25, 0, 1, -1.4, .25] }, { collisionsEnabled: false }),
        role: new Hero(),
        movement: new ManualMovement(),
      });
    else if (stage.storage.getSession("starship") == 2)
      h = new Actor({
        appearance: new ImageSprite({ width: 3, height: 2, img: "impsd.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, -1, 1.4, .25, 0, 1, -1.4, .25] }, { collisionsEnabled: false }),
        role: new Hero(),
        movement: new ManualMovement(),
      });
    else
      h = new Actor({
        appearance: new ImageSprite({ width: 3, height: 2, img: "xwing.png", z: 1 }),
        rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, -1, 1.4, .25, 0, 1, -1.4, .25] }, { collisionsEnabled: false }),
        role: new Hero(),
        movement: new ManualMovement(),
      });





    //pae225 enemy that will chase you
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: 'rock.png' }),
      rigidBody: new CircleBody({ cx: 0, cy: 8, radius: 0.4 }, { dynamic: true }),
      movement: new ChaseMovement({ target: h, speed: 1 }),
      role: new Enemy(),
      extra: { weak: false }
    });
    //pae225 enemy come across middle of the screen
    new Actor({
      appearance: new ImageSprite({ width: 2, height: 2, img: 'rock.png' }),
      rigidBody: new CircleBody({ cx: 5, cy: 1, radius: 0.4 }, { dynamic: true }),
      movement: new ChaseMovement({ target: h, speed: 2 }),
      role: new Enemy(),
      extra: { weak: false }
    });
    // pae225 enemy moves horizontally across screen
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: "rock.png" }),
      rigidBody: new CircleBody({ radius: .5, cx: 0, cy: 4 }),
      role: new Enemy(),
      movement: new ChaseMovement({ target: h, speed: 1.5 }),
    });
    // pae225 when hit by enemy will send you back to home screen





    //pae225 enemy that will chase you
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: 'rock.png' }),
      rigidBody: new CircleBody({ cx: 0, cy: 8, radius: 0.4 }, { dynamic: true }),
      movement: new ChaseMovement({ target: h, speed: 1 }),
      role: new Enemy(),
      extra: { weak: false }
    });
    //pae225 enemy that will chase you
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: 'rock.png' }),
      rigidBody: new CircleBody({ cx: 8, cy: 8, radius: 0.4 }, { dynamic: true }),
      movement: new ChaseMovement({ target: h, speed: 1 }),
      role: new Enemy(),
      extra: { weak: false }
    });
    //pae225 enemy that will chase you
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: 'rock.png' }),
      rigidBody: new CircleBody({ cx: 14, cy: 9, radius: 0.4 }, { dynamic: true }),
      movement: new ChaseMovement({ target: h, speed: 1 }),
      role: new Enemy(),
      extra: { weak: false }
    });
    //pae225 enemy come across middle of the screen
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: 'rock.png' }),
      rigidBody: new CircleBody({ cx: 1, cy: 1, radius: 0.4 }, { dynamic: true }),
      movement: new PathMovement(new Path().to(3, 4).to(15.5, .5), 3, false),
      role: new Enemy(),
      extra: { weak: false }
    });
    // pae225 enemy moves horizontally across screen
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: "rock.png" }),
      rigidBody: new CircleBody({ radius: .5, cx: 8, cy: 4 }),
      role: new Enemy(),
      movement: new PathMovement(new Path().to(12, 8).to(15.5, .5), 3, false),
    });
    // pae225 when hit by enemy will send you back to home screen
    stage.score.onLose = { level, builder }

    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 8, cy: -.05, width: 16, height: .1 }),
      role: new Enemy(),
    });
    // pae225 top boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 16, cy: -2, width: 16, height: .1 }),
      role: new Enemy(),
    });
    // pae2225 botttom boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 8, cy: 9.5, width: 16, height: .1 }),
      role: new Enemy(),
    });
    // pae225 right boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 17, cy: 0, width: 0, height: 16 }),
      role: new Enemy(),
    });
    // pae225 left boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: -1, cy: 0, width: 0, height: 16 }),
      role: new Enemy(),
    });




    // Make an obstacle that is a rectangle
    new Actor({
      rigidBody: new BoxBody({ cx: 300, cy: 4, width: 1, height: 1 }),
      appearance: new FilledBox({ width: 1, height: 1, fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      role: new Obstacle(),
    })

    // Make an obstacle that is a polygon
    new Actor({
      rigidBody: new PolygonBody({ cx: 1000, cy: 5, vertices: [0, -.5, .5, 0, 0, .5, -1, 0] }),
      appearance: new FilledPolygon({ vertices: [0, -.5, .5, 0, 0, .5, -1, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      role: new Obstacle(),
    })

    new Actor({
      rigidBody: new PolygonBody({ cx: 700, cy: 5, vertices: [0, -.5, .5, 0, 0, .5, -1, 0] }),
      appearance: new FilledPolygon({ vertices: [0, -.5, .5, 0, 0, .5, -1, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      role: new Obstacle(),
    })

    // imput code here
    // mnn227 game countdown
    new Actor({
      appearance: new TextSprite({ center: false, face: "Arial", size: 20, color: "#0ff000" }, () => stage.score.getWinCountdownRemaining() ? "Time Until Win: " + stage.score.getWinCountdownRemaining()?.toFixed(2) : "Matthew"),
      rigidBody: new CircleBody({ cx: .1, cy: 1.9, radius: .01 }, { scene: stage.hud })
    });
    // mnn227 Automatically win in 30 seconds
    stage.score.setVictorySurvive(30);

    // mnn227 this lets arrows work as rotation
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_LEFT, () => { h.rigidBody.body.SetAngularVelocity(-6); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_LEFT, () => { h.rigidBody.body.SetAngularVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_RIGHT, () => { h.rigidBody.body.SetAngularVelocity(6); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_RIGHT, () => { h.rigidBody.body.SetAngularVelocity(0); });
    // mnn227 this lets it move laterally
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(-7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    // mnn227 this lets it move vertically
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(-5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(0); });

    //mnn227 esc key works as a back button to the prior page there will be a popup to verify that you want this to happen
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_ESCAPE, () => { stage.switchTo(builder, 1) });
  }
  if (level == 13) {

    // Draw a grid on the screen, to help us think about the positions of actors.
    // Remember that when `hitBoxes` is true, clicking the screen will show
    // coordinates in the developer console.
    GridSystem.makeGrid(stage.world, { x: 0, y: 0 }, { x: -1.6, y: -.9 });
    // set up the background
    stage.backgroundColor = "#17b4ff";
    stage.background.addLayer({ anchor: { cx: 0, cy: 4.5, }, imageMaker: () => new ImageSprite({ width: 16, height: 9, img: "galaxybackgroundstatic.png" }), speed: 0 });
    stage.world.camera.setBounds(0, 0, 16, 9);
    // Make a hero
    let h = new Actor({
      appearance: new ImageSprite({ width: 3, height: 2, img: "xwing.png", z: 1 }),
      rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, -1, 1.4, .25, 0, 1, -1.4, .25] }, { collisionsEnabled: false }),
      role: new Hero(),
      movement: new ManualMovement(),
    });



    //pae225 enemy that will chase you
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: 'rock.png' }),
      rigidBody: new CircleBody({ cx: 0, cy: 8, radius: 0.4 }, { dynamic: true }),
      movement: new ChaseMovement({ target: h, speed: 1 }),
      role: new Enemy(),
      extra: { weak: false }
    });
    //pae225 enemy that will chase you
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: 'rock.png' }),
      rigidBody: new CircleBody({ cx: 8, cy: 8, radius: 0.4 }, { dynamic: true }),
      movement: new ChaseMovement({ target: h, speed: 1 }),
      role: new Enemy(),
      extra: { weak: false }
    });
    //pae225 enemy that will chase you
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: 'rock.png' }),
      rigidBody: new CircleBody({ cx: 14, cy: 9, radius: 0.4 }, { dynamic: true }),
      movement: new ChaseMovement({ target: h, speed: 1 }),
      role: new Enemy(),
      extra: { weak: false }
    });
    //pae225 enemy come across middle of the screen
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: 'rock.png' }),
      rigidBody: new CircleBody({ cx: 1, cy: 1, radius: 0.4 }, { dynamic: true }),
      movement: new PathMovement(new Path().to(3, 4).to(15.5, .5), 3, false),
      role: new Enemy(),
      extra: { weak: false }
    });
    // pae225 enemy moves horizontally across screen
    new Actor({
      appearance: new ImageSprite({ width: 1.5, height: 1.5, img: "rock.png" }),
      rigidBody: new CircleBody({ radius: .5, cx: 8, cy: 4 }),
      role: new Enemy(),
      movement: new PathMovement(new Path().to(12, 8).to(15.5, .5), 3, false),
    });
    // pae225 when hit by enemy will send you back to home screen


    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 8, cy: -.05, width: 16, height: .1 }),
      role: new Enemy(),
    });
    // pae225 top boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 16, cy: -2, width: 16, height: .1 }),
      role: new Enemy(),
    });
    // pae2225 botttom boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 8, cy: 9.5, width: 16, height: .1 }),
      role: new Enemy(),
    });
    // pae225 right boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: 17, cy: 0, width: 0, height: 16 }),
      role: new Enemy(),
    });
    // pae225 left boundary
    new Actor({
      appearance: new FilledBox({ width: 16, height: .1, fillColor: "#ff0000" }),
      rigidBody: new BoxBody({ cx: -1, cy: 0, width: 0, height: 16 }),
      role: new Enemy(),
    });




    // Make an obstacle that is a rectangle
    new Actor({
      rigidBody: new BoxBody({ cx: 300, cy: 4, width: 1, height: 1 }),
      appearance: new FilledBox({ width: 1, height: 1, fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      role: new Obstacle(),
    })

    // Make an obstacle that is a polygon
    new Actor({
      rigidBody: new PolygonBody({ cx: 1000, cy: 5, vertices: [0, -.5, .5, 0, 0, .5, -1, 0] }),
      appearance: new FilledPolygon({ vertices: [0, -.5, .5, 0, 0, .5, -1, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      role: new Obstacle(),
    })

    new Actor({
      rigidBody: new PolygonBody({ cx: 700, cy: 5, vertices: [0, -.5, .5, 0, 0, .5, -1, 0] }),
      appearance: new FilledPolygon({ vertices: [0, -.5, .5, 0, 0, .5, -1, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      role: new Obstacle(),
    })

    // imput code here
    // mnn227 game countdown
    new Actor({
      appearance: new TextSprite({ center: false, face: "Arial", size: 20, color: "#0ff000" }, () => stage.score.getWinCountdownRemaining() ? "Time Until Win: " + stage.score.getWinCountdownRemaining()?.toFixed(2) : "Matthew"),
      rigidBody: new CircleBody({ cx: .1, cy: 1.9, radius: .01 }, { scene: stage.hud })
    });
    // mnn227 Automatically win in 30 seconds
    stage.score.setVictorySurvive(30);

    // mnn227 this lets arrows work as rotation
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_LEFT, () => { h.rigidBody.body.SetAngularVelocity(-6); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_LEFT, () => { h.rigidBody.body.SetAngularVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_RIGHT, () => { h.rigidBody.body.SetAngularVelocity(6); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_RIGHT, () => { h.rigidBody.body.SetAngularVelocity(0); });
    // mnn227 this lets it move laterally
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(-7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    // mnn227 this lets it move vertically
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(-5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(0); });

    //mnn227 esc key works as a back button to the prior page there will be a popup to verify that you want this to happen
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_ESCAPE, () => { stage.switchTo(builder, 1) });
  }
  if (level == 20) {


    // Draw a grid on the screen, to help us think about the positions of actors.
    // Remember that when `hitBoxes` is true, clicking the screen will show
    // coordinates in the developer console.
    GridSystem.makeGrid(stage.world, { x: 0, y: 0 }, { x: -1.6, y: -.9 });
    // set up the background
    stage.backgroundColor = "#17b4ff";
    stage.background.addLayer({ anchor: { cx: 0, cy: 4.5, }, imageMaker: () => new ImageSprite({ width: 16, height: 9, img: "galaxybackgroundstatic.png" }), speed: 0 });
    stage.world.camera.setBounds(0, 0, 16, 9);
    // Make a hero
    let h = new Actor({
      appearance: new ImageSprite({ width: 3, height: 2, img: "venetorsd.png", z: 1 }),
      rigidBody: new PolygonBody({ cx: 8, cy: 4.5, vertices: [0, -1, 1.4, .25, 0, 1, -1.4, .25] }, { collisionsEnabled: false }),
      role: new Hero(),
      movement: new ManualMovement(),
    });

    // Make an obstacle that is a rectangle
    new Actor({
      rigidBody: new BoxBody({ cx: 300, cy: 4, width: 1, height: 1 }),
      appearance: new FilledBox({ width: 1, height: 1, fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      role: new Obstacle(),
    })

    // Make an obstacle that is a polygon
    new Actor({
      rigidBody: new PolygonBody({ cx: 1000, cy: 5, vertices: [0, -.5, .5, 0, 0, .5, -1, 0] }),
      appearance: new FilledPolygon({ vertices: [0, -.5, .5, 0, 0, .5, -1, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      role: new Obstacle(),
    })

    new Actor({
      rigidBody: new PolygonBody({ cx: 700, cy: 5, vertices: [0, -.5, .5, 0, 0, .5, -1, 0] }),
      appearance: new FilledPolygon({ vertices: [0, -.5, .5, 0, 0, .5, -1, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      role: new Obstacle(),
    })

    // imput code here


    // mnn227 this lets arrows work as rotation
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_LEFT, () => { h.rigidBody.body.SetAngularVelocity(-6); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_LEFT, () => { h.rigidBody.body.SetAngularVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_RIGHT, () => { h.rigidBody.body.SetAngularVelocity(6); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_RIGHT, () => { h.rigidBody.body.SetAngularVelocity(0); });
    // mnn227 this lets it move laterally
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(-7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_A, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(7.5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_D, () => { (h.movement as ManualMovement).updateXVelocity(0); });
    // mnn227 this lets it move vertically
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(-5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_W, () => { (h.movement as ManualMovement).updateYVelocity(0); });
    stage.keyboard.setKeyDownHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(5); });
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_S, () => { (h.movement as ManualMovement).updateYVelocity(0); });

    //mnn227 esc key works as a back button to the prior page there will be a popup to verify that you want this to happen
    stage.keyboard.setKeyUpHandler(KeyCodes.KEY_ESCAPE, () => { stage.switchTo(builder, 1) });
  }
}

// call the function that starts running the game in the `game-player` div tag
// of `index.html`
initializeAndLaunch("game-player", new Config(), builder);
