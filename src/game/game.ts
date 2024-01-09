import { initializeAndLaunch } from "../jetlag/Stage";
import { JetLagGameConfig } from "../jetlag/Config";
import { ManualMovement } from "../jetlag/Components/Movement";
import { BoxBody, PolygonBody } from "../jetlag/Components/RigidBody";
import { Destination, Hero, Obstacle } from "../jetlag/Components/Role";
import { Actor } from "../jetlag/Entities/Actor";
import { KeyCodes } from "../jetlag/Services/Keyboard";
import { stage } from "../jetlag/Stage";
import { GridSystem } from "../jetlag/Systems/Grid";
import { FilledBox, FilledPolygon, ImageSprite } from "../jetlag/Components/Appearance";

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
  musicNames = [];              // Audio files that you want to loop
  soundNames = [];              // Short audio files that you don't want to loop
  imageNames = ["rock.png", "mousenorm.png", "asbeltnews1824.png", "astrowbackp.png", "astrobasicp.png", "galaxybackgroundstatic.png", "astrohomep.png", "venetorsd.png", "back.png"];              // All image files and sprite sheet json files
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
  if (level == 1) {
    stage.score.onWin = { level, builder };
    stage.score.onLose = { level, builder };
    // Draw a grid on the screen, to help us think about the positions of actors.
    // Remember that when `hitBoxes` is true, clicking the screen will show
    // coordinates in the developer console.
    GridSystem.makeGrid(stage.world, { x: 0, y: 0 }, { x: 1.6, y: .9 });
    // mnn227 set up the background
    stage.backgroundColor = "#17b4ff";
    stage.background.addLayer({ anchor: { cx: -8, cy: 4.5, }, imageMaker: () => new ImageSprite({ width: 16, height: 9, img: "astrohomep.png" }), speed: 0 });
    stage.world.camera.setBounds(0, 0, 16, 9);
    // mnn227 make an onscreen mouse for users without keyboards
    let h = new Actor({
      appearance: new ImageSprite({ width: .25, height: .25, img: "mousenorm.png", z: 1 }),
      rigidBody: new PolygonBody({ cx: 6, cy: 4.5, vertices: [-.05, -.1, .1, .05, 0, .05, -.05, .05] }, { collisionsEnabled: false }),
      role: new Hero(),
      movement: new ManualMovement(),

    });

    // mnn227 ASBELT game dev news image
    new Actor({
      appearance: new ImageSprite({ width: 6.5, height: 3.94, img: "asbeltnews1824.png", z: 1 }),
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


    //Making the 4 buttons to select the menu page
    // Button 1/4
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, .75, 4, .75, 4, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 7, cy: 5, vertices: [-4.2, -.8, -4.2, -.25, -2.25, -.25, -2.25, -.8] }),
      gestures: { tap: () => { stage.switchTo(builder, 11); return true } }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 11) } }), // mnn227 arrow controls aswd
    });

    // Button 2/4
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, .75, 4, .75, 4, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 7, cy: 5, vertices: [-5.5, 0, -5.5, .5, -1, .5, -1, 0] }),
      gestures: { tap: () => { stage.switchTo(builder, 2); return true } }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 2) } }), // mnn227 arrow controls aswd
    });

    // Button 3/4
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, .75, 4, .75, 4, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
      rigidBody: new PolygonBody({ cx: 7, cy: 5, vertices: [-4.6, 1.3, -4.6, 0.75, -1.95, .75, -1.95, 1.3] }),
      gestures: { tap: () => { stage.switchTo(builder, 3); return true } }, // mnn227 mouse controls 
      role: new Obstacle({ heroCollision: () => { stage.switchTo(builder, 3) } }), // mnn227 arrow controls aswd
    });

    // Button 4/4
    new Actor({
      appearance: new FilledPolygon({ vertices: [0, 0, 0, .75, 4, .75, 4, 0], fillColor: "#000000", lineWidth: 4, lineColor: "#00ff00" }),
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
    GridSystem.makeGrid(stage.world, { x: 0, y: 0 }, { x: 1.6, y: .9 });
    // mnn227 set up the background
    stage.backgroundColor = "#17b4ff";
    stage.background.addLayer({ anchor: { cx: -8, cy: 4.5, }, imageMaker: () => new ImageSprite({ width: 16, height: 9, img: "astrowbackp.png" }), speed: 0 });
    stage.world.camera.setBounds(0, 0, 16, 9);

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
    GridSystem.makeGrid(stage.world, { x: 0, y: 0 }, { x: 1.6, y: .9 });
    // mnn227 set up the background
    stage.backgroundColor = "#17b4ff";
    stage.background.addLayer({ anchor: { cx: -8, cy: 4.5, }, imageMaker: () => new ImageSprite({ width: 16, height: 9, img: "astrowbackp.png" }), speed: 0 });
    stage.world.camera.setBounds(0, 0, 16, 9);

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


  }

  if (level == 4) {
    stage.score.onWin = { level, builder };
    stage.score.onLose = { level, builder };
    // Draw a grid on the screen, to help us think about the positions of actors.
    // Remember that when `hitBoxes` is true, clicking the screen will show
    // coordinates in the developer console.
    GridSystem.makeGrid(stage.world, { x: 0, y: 0 }, { x: 1.6, y: .9 });
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
    GridSystem.makeGrid(stage.world, { x: 0, y: 0 }, { x: 1.6, y: .9 });
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
