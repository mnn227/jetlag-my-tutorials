import { Picture } from "../renderables/Picture"
import { Renderable } from "../renderables/Renderable"
import { Obstacle } from "../renderables/Obstacle"
import { Hero } from "../renderables/Hero"
import { Goodie } from "../renderables/Goodie"
import { Enemy } from "../renderables/Enemy"
import { Destination } from "../renderables/Destination"
import { WorldActor } from "../renderables/WorldActor";
import { TimedEvent } from "../misc/Timer";
import { ProjectilePool } from "../misc/ProjectilePool";
import { ParallaxLayer } from "../renderables/ParallaxLayer";
import { Animation } from "../renderables/Animation";
import { Svg } from "../misc/Svg";
import { JetLagKeys, JetLagDevice } from "../misc/JetLagDevice";
import { JetLagConfig } from "../JetLagConfig";
import { Stage } from "../stage/Stage";
import { Score } from "../misc/Score";

/**
 * WorldApi provides the functionality needed for putting things into the world
 * (the main part of the game)
 */
export class WorldApi {
    /**
     * Construct a level.  Since Level is merely a facade, this method need only store references to
     * the actual game objects.
     *
     * @param manager the StageManager for the game
     */
    constructor(private device: JetLagDevice, private config: JetLagConfig, private stage: Stage, private score: Score) { }

    /**
     * Set the background music for this level
     *
     * @param musicName Name of the music file to play.  Remember: this file must
     *                  have been registered as Music, not as a Sound
     */
    public setMusic(musicName: string): void {
        this.stage.music = this.device.getSpeaker().getMusic(musicName);
    }

    /**
     * Draw a picture on the current level
     *
     * Note: the order in which this is called relative to other actors will determine whether they
     * go under or over this picture (within the Z plane).
     *
     * @param x       X coordinate of top left corner, in meters
     * @param y       Y coordinate of top left corner, in meters
     * @param width   Width of the picture, in meters
     * @param height  Height of this picture, in meters
     * @param imgName Name of the picture to display
     * @param zIndex  The z index of the image. There are 5 planes: -2, -2, 0, 1, and 2. By default,
     *                everything goes to plane 0
     * @returns The picture, so that it can be shown and hidden in the future.
     */
    public drawPicture(x: number, y: number, width: number, height: number, imgName: string, zIndex: number): Picture {
        return this.stage.world.makePicture(x, y, width, height, imgName, zIndex);
    }

    /**
     * This method lets us change the behavior of tilt, so that instead of applying a force, we
     * directly set the velocity of objects using the accelerometer data.
     *
     * @param toggle This should usually be false. Setting it to true means that tilt does not cause
     *               forces upon objects, but instead the tilt of the phone directly sets velocities
     */
    public setTiltAsVelocity(toggle: boolean) {
        this.stage.world.tiltVelocityOverride = toggle;
    }

    /**
     * Draw some text in the scene, centering it on a specific point
     *
     * @param centerX   The x coordinate of the center
     * @param centerY   The y coordinate of the center
     * @param fontName  The name of the font to use
     * @param fontColor The color of the font
     * @param fontSize  The size of the font
     * @param tp        A TextProducer that will generate the text to display
     * @param zIndex    The z index of the text
     * @return A Renderable of the text, so it can be enabled/disabled by program code
     */
    public addTextCentered(centerX: number, centerY: number, fontName: string, fontColor: string, fontSize: number, tp: () => string, zIndex: number): Renderable {
        return this.stage.world.addTextCentered(centerX, centerY, fontName, fontColor, fontSize, tp, zIndex);
    }

    /**
     * Draw some text in the scene, using a top-left coordinate
     *
     * @param x         The x coordinate of the top left corner
     * @param y         The y coordinate of the top left corner
     * @param fontName  The name of the font to use
     * @param fontColor The color of the font
     * @param fontSize  The size of the font
     * @param producer        A TextProducer that will generate the text to display
     * @param zIndex    The z index of the text
     * @return A Renderable of the text, so it can be enabled/disabled by program code
     */
    public addText(x: number, y: number, fontName: string, fontColor: string, fontSize: number, producer: () => string, zIndex: number): Renderable {
        return this.stage.world.addText(x, y, fontName, fontColor, fontSize, producer, zIndex);
    }

    /**
     * Draw an obstacle with an underlying circle shape
     *
     * @param x       X coordinate of the top left corner
     * @param y       Y coordinate of the top left corner
     * @param width   Width of the obstacle
     * @param height  Height of the obstacle
     * @param imgName Name of image file to use
     * @return The obstacle, so that it can be further modified
     */
    public makeObstacleAsCircle(x: number, y: number, width: number, height: number, imgName: string): Obstacle {
        let radius: number = Math.max(width, height);
        let o: Obstacle = new Obstacle(this.stage.world, this.device, this.config, radius, radius, imgName);
        o.setCirclePhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, radius / 2);
        this.stage.world.addActor(o, 0);
        return o;
    }

    /**
     * Draw an obstacle with an underlying box shape
     *
     * @param x       X coordinate of the top left corner
     * @param y       Y coordinate of the top left corner
     * @param width   Width of the obstacle
     * @param height  Height of the obstacle
     * @param imgName Name of image file to use
     * @return The obstacle, so that it can be further modified
     */
    public makeObstacleAsBox(x: number, y: number, width: number, height: number, imgName: string): Obstacle {
        let o: Obstacle = new Obstacle(this.stage.world, this.device, this.config, width, height, imgName);
        o.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y);
        this.stage.world.addActor(o, 0);
        return o;
    }

    /**
     * Draw an obstacle with an underlying polygon shape
     *
     * @param x       X coordinate of the top left corner
     * @param y       Y coordinate of the top left corner
     * @param width   Width of the obstacle
     * @param height  Height of the obstacle
     * @param imgName Name of image file to use
     * @param verts   Up to 16 coordinates representing the vertexes of this polygon, listed as
     *                x0,y0,x1,y1,x2,y2,...
     * @return The obstacle, so that it can be further modified
     */
    public makeObstacleAsPolygon(x: number, y: number, width: number, height: number, imgName: string, verts: number[]): Obstacle {
        let o: Obstacle = new Obstacle(this.stage.world, this.device, this.config, width, height, imgName);
        o.setPolygonPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, verts);
        this.stage.world.addActor(o, 0);
        return o;
    }

    /**
     * Make a Hero with an underlying circular shape
     *
     * @param x       X coordinate of the hero
     * @param y       Y coordinate of the hero
     * @param width   width of the hero
     * @param height  height of the hero
     * @param imgName File name of the default image to display
     * @return The hero that was created
     */
    public makeHeroAsCircle(x: number, y: number, width: number, height: number, imgName: string): Hero {
        let radius: number = Math.max(width, height);
        let h: Hero = new Hero(this.stage.world, this.device, this.config, this.stage, this.score, radius, radius, imgName);
        this.score.heroesCreated++;
        h.setCirclePhysics(PhysicsType2d.Dynamics.BodyType.DYNAMIC, x, y, radius / 2);
        this.stage.world.addActor(h, 0);
        return h;
    }

    /**
     * Make a Hero with an underlying rectangular shape
     *
     * @param x       X coordinate of the hero
     * @param y       Y coordinate of the hero
     * @param width   width of the hero
     * @param height  height of the hero
     * @param imgName File name of the default image to display
     * @return The hero that was created
     */
    public makeHeroAsBox(x: number, y: number, width: number, height: number, imgName: string): Hero {
        let h: Hero = new Hero(this.stage.world, this.device, this.config, this.stage, this.score, width, height, imgName);
        this.score.heroesCreated++;
        h.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.DYNAMIC, x, y);
        this.stage.world.addActor(h, 0);
        return h;
    }


    /**
     * Draw a hero with an underlying polygon shape
     *
     * @param x       X coordinate of the top left corner
     * @param y       Y coordinate of the top left corner
     * @param width   Width of the obstacle
     * @param height  Height of the obstacle
     * @param imgName Name of image file to use
     * @param verts   Up to 16 coordinates representing the vertexes of this polygon, listed as
     *                x0,y0,x1,y1,x2,y2,...
     * @return The hero, so that it can be further modified
     */
    public makeHeroAsPolygon(x: number, y: number, width: number, height: number, imgName: string, verts: number[]): Hero {
        let h: Hero = new Hero(this.stage.world, this.device, this.config, this.stage, this.score, width, height, imgName);
        this.score.heroesCreated++;
        h.setPolygonPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, verts);
        this.stage.world.addActor(h, 0);
        return h;
    }

    /**
     * Make an enemy that has an underlying circular shape.
     *
     * @param x       The X coordinate of the top left corner
     * @param y       The Y coordinate of the top right corner
     * @param width   The width of the enemy
     * @param height  The height of the enemy
     * @param imgName The name of the image to display
     * @return The enemy, so that it can be modified further
     */
    public makeEnemyAsCircle(x: number, y: number, width: number, height: number, imgName: string): Enemy {
        let radius = Math.max(width, height);
        let e = new Enemy(this.stage.world, this.device, this.config, this.score, radius, radius, imgName);
        this.score.enemiesCreated++;
        e.setCirclePhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, radius / 2);
        this.stage.world.addActor(e, 0);
        return e;
    }

    /**
     * Make an enemy that has an underlying rectangular shape.
     *
     * @param x       The X coordinate of the top left corner
     * @param y       The Y coordinate of the top right corner
     * @param width   The width of the enemy
     * @param height  The height of the enemy
     * @param imgName The name of the image to display
     * @return The enemy, so that it can be modified further
     */
    public makeEnemyAsBox(x: number, y: number, width: number, height: number, imgName: string): Enemy {
        let e: Enemy = new Enemy(this.stage.world, this.device, this.config, this.score, width, height, imgName);
        this.score.enemiesCreated++;
        e.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y);
        this.stage.world.addActor(e, 0);
        return e;
    }

    /**
     * Draw an enemy with an underlying polygon shape
     *
     * @param x       X coordinate of the top left corner
     * @param y       Y coordinate of the top left corner
     * @param width   Width of the obstacle
     * @param height  Height of the obstacle
     * @param imgName Name of image file to use
     * @param verts   Up to 16 coordinates representing the vertexes of this polygon, listed as
     *                x0,y0,x1,y1,x2,y2,...
     * @return The enemy, so that it can be further modified
     */
    public makeEnemyAsPolygon(x: number, y: number, width: number, height: number, imgName: string, verts: number[]): Enemy {
        let e: Enemy = new Enemy(this.stage.world, this.device, this.config, this.score, width, height, imgName);
        this.score.enemiesCreated++;
        e.setPolygonPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, verts);
        this.stage.world.addActor(e, 0);
        return e;
    }

    /**
     * Make a destination that has an underlying circular shape.
     *
     * @param x       The X coordinate of the top left corner
     * @param y       The Y coordinate of the top right corner
     * @param width   The width of the destination
     * @param height  The height of the destination
     * @param imgName The name of the image to display
     * @return The destination, so that it can be modified further
     */
    public makeDestinationAsCircle(x: number, y: number, width: number, height: number, imgName: string): Destination {
        let radius = Math.max(width, height);
        let d: Destination = new Destination(this.stage.world, this.device, this.config, radius, radius, imgName);
        d.setCirclePhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, radius / 2);
        d.setCollisionsEnabled(false);
        this.stage.world.addActor(d, 0);
        return d;
    }

    /**
     * Make a destination that has an underlying rectangular shape.
     *
     * @param x       The X coordinate of the top left corner
     * @param y       The Y coordinate of the top right corner
     * @param width   The width of the destination
     * @param height  The height of the destination
     * @param imgName The name of the image to display
     * @return The destination, so that it can be modified further
     */
    public makeDestinationAsBox(x: number, y: number, width: number, height: number, imgName: string): Destination {
        let d: Destination = new Destination(this.stage.world, this.device, this.config, width, height, imgName);
        d.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y);
        d.setCollisionsEnabled(false);
        this.stage.world.addActor(d, 0);
        return d;
    }

    /**
     * Draw a destination with an underlying polygon shape
     *
     * @param x       X coordinate of the top left corner
     * @param y       Y coordinate of the top left corner
     * @param width   Width of the obstacle
     * @param height  Height of the obstacle
     * @param imgName Name of image file to use
     * @param verts   Up to 16 coordinates representing the vertexes of this polygon, listed as
     *                x0,y0,x1,y1,x2,y2,...
     * @return The destination, so that it can be further modified
     */
    public makeDestinationAsPolygon(x: number, y: number, width: number, height: number, imgName: string, verts: number[]): Destination {
        let d: Destination = new Destination(this.stage.world, this.device, this.config, width, height, imgName);
        d.setPolygonPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, verts);
        d.setCollisionsEnabled(false);
        this.stage.world.addActor(d, 0);
        return d;
    }

    /**
     * Draw a goodie with an underlying circle shape, and a default score of [1,0,0,0]
     *
     * @param x       X coordinate of top left corner
     * @param y       Y coordinate of top left corner
     * @param width   Width of the image
     * @param height  Height of the image
     * @param imgName Name of image file to use
     * @return The goodie, so that it can be further modified
     */
    public makeGoodieAsCircle(x: number, y: number, width: number, height: number, imgName: string): Goodie {
        let radius: number = Math.max(width, height);
        let g: Goodie = new Goodie(this.stage.world, this.device, this.config, radius, radius, imgName);
        g.setCirclePhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, radius / 2);
        g.setCollisionsEnabled(false);
        this.stage.world.addActor(g, 0);
        return g;
    }

    /**
     * Draw a goodie with an underlying box shape, and a default score of [1,0,0,0]
     *
     * @param x       X coordinate of top left corner
     * @param y       Y coordinate of top left corner
     * @param width   Width of the image
     * @param height  Height of the image
     * @param imgName Name of image file to use
     * @return The goodie, so that it can be further modified
     */
    public makeGoodieAsBox(x: number, y: number, width: number, height: number, imgName: string): Goodie {
        let g: Goodie = new Goodie(this.stage.world, this.device, this.config, width, height, imgName);
        g.setBoxPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y);
        g.setCollisionsEnabled(false);
        this.stage.world.addActor(g, 0);
        return g;
    }

    /**
     * Draw a goodie with an underlying polygon shape
     *
     * @param x       X coordinate of the top left corner
     * @param y       Y coordinate of the top left corner
     * @param width   Width of the obstacle
     * @param height  Height of the obstacle
     * @param imgName Name of image file to use
     * @param verts   Up to 16 coordinates representing the vertexes of this polygon, listed as
     *                x0,y0,x1,y1,x2,y2,...
     * @return The goodie, so that it can be further modified
     */
    public makeGoodieAsPolygon(x: number, y: number, width: number, height: number, imgName: string, verts: number[]): Goodie {
        let g: Goodie = new Goodie(this.stage.world, this.device, this.config, width, height, imgName);
        g.setPolygonPhysics(PhysicsType2d.Dynamics.BodyType.STATIC, x, y, verts);
        g.setCollisionsEnabled(false);
        this.stage.world.addActor(g, 0);
        return g;
    }

    /**
     * Turn on accelerometer support so that tilt can control actors in this level
     *
     * @param xGravityMax Max X force that the accelerometer can produce
     * @param yGravityMax Max Y force that the accelerometer can produce
     */
    public enableTilt(xGravityMax: number, yGravityMax: number) {
        this.stage.world.tiltMax.x = xGravityMax;
        this.stage.world.tiltMax.y = yGravityMax;
        if (!this.device.getAccelerometer().getSupported()) {
            this.device.getKeyboard().setKeyUpHandler(JetLagKeys.UP, () => { this.device.getAccelerometer().setY(0); });
            this.device.getKeyboard().setKeyUpHandler(JetLagKeys.DOWN, () => { this.device.getAccelerometer().setY(0); });
            this.device.getKeyboard().setKeyUpHandler(JetLagKeys.LEFT, () => { this.device.getAccelerometer().setX(0); });
            this.device.getKeyboard().setKeyUpHandler(JetLagKeys.RIGHT, () => { this.device.getAccelerometer().setX(0); });

            this.device.getKeyboard().setKeyDownHandler(JetLagKeys.UP, () => { this.device.getAccelerometer().setY(-5); });
            this.device.getKeyboard().setKeyDownHandler(JetLagKeys.DOWN, () => { this.device.getAccelerometer().setY(5); });
            this.device.getKeyboard().setKeyDownHandler(JetLagKeys.LEFT, () => { this.device.getAccelerometer().setX(-5); });
            this.device.getKeyboard().setKeyDownHandler(JetLagKeys.RIGHT, () => { this.device.getAccelerometer().setX(5); });
        }
    }

    /**
     * Draw a box on the scene
     * 
     * Note: the box is actually four narrow rectangles
     *
     * @param x0         X coordinate of left side
     * @param y0         Y coordinate of top
     * @param x1         X coordinate of right side
     * @param y1         Y coordinate of bottom
     * @param imgName    name of the image file to use when drawing the rectangles
     * @param density    Density of the rectangle. When in doubt, use 1
     * @param elasticity Elasticity of the rectangle. When in doubt, use 0
     * @param friction   Friction of the rectangle. When in doubt, use 1
     */
    public drawBoundingBox(x0: number, y0: number, x1: number, y1: number, imgName: string, density: number, elasticity: number, friction: number): void {
        let bottom: Obstacle = this.makeObstacleAsBox(x0 - 1, y1, Math.abs(x0 - x1) + 2, 1, imgName);
        bottom.setPhysics(density, elasticity, friction);

        let top: Obstacle = this.makeObstacleAsBox(x0 - 1, y0 - 1, Math.abs(x0 - x1) + 2, 1, imgName);
        top.setPhysics(density, elasticity, friction);

        let left: Obstacle = this.makeObstacleAsBox(x0 - 1, y0 - 1, 1, Math.abs(y0 - y1) + 2, imgName);
        left.setPhysics(density, elasticity, friction);

        let right: Obstacle = this.makeObstacleAsBox(x1, y0 - 1, 1, Math.abs(y0 - y1) + 2, imgName);
        right.setPhysics(density, elasticity, friction);
    }

    /**
     * Configure the camera bounds for a level
     *
     * NB: we should set upper and lower bounds, instead of assuming a lower bound of (0, 0)
     *
     * @param width  width of the camera
     * @param height height of the camera
     */
    public setCameraBounds(width: number, height: number): void {
        this.stage.world.camera.setBounds(width, height);
    }

    /**
     * Identify the actor that the camera should try to keep on screen at all times
     *
     * @param actor The actor the camera should chase
     */
    public setCameraChase(actor: WorldActor) {
        this.stage.world.cameraChaseActor = actor;
    }

    /**
     * Manually set the zoom level of the game.  A zoom is actually a 
     * pixel/meter ratio, so bigger numbers mean zooming in, and smaller ones
     * mean zooming out.  The base value to consider is whatever you have set in
     * your game's configuration.
     *
     * @param zoom The new zoom level
     */
    public setZoom(zoom: number): void {
        this.stage.world.camera.setScale(zoom);
    }

    /**
     * Get the current zoom level of the game.  See setZoom() for more info
     * about the meaning of this number (it's a pixel/meter ratio)
     */
    public getZoom(): number {
        return this.stage.world.camera.getScale();
    }

    /**
     * Indicate that some code should run after a fixed amount of time passes
     * 
     * @param interval The time until the event happens (or happens again)
     * @param repeat Should the event repeat?
     * @param action The action to perform when the timer expires
     */
    public addTimer(interval: number, repeat: boolean, action: () => void) {
        this.stage.world.timer.addEvent(new TimedEvent(interval, repeat, action));
    }

    /**
     * Change the gravity in a running level
     *
     * @param newXGravity The new X gravity
     * @param newYGravity The new Y gravity
     */
    public resetGravity(newXGravity: number, newYGravity: number): void {
        this.stage.world.world.SetGravity(new PhysicsType2d.Vector2(newXGravity, newYGravity));
    }

    /**
    * Describe the behavior of projectiles in a scene. You must call this if you intend to use
    * projectiles in your scene.
    *
    * @param size     number of projectiles that can be thrown at once
    * @param width    width of a projectile
    * @param height   height of a projectile
    * @param imgName  image to use for projectiles
    * @param strength specifies the amount of damage that a projectile does to an enemy
    * @param zIndex   The z plane on which the projectiles should be drawn
    * @param isCircle Should projectiles have an underlying circle or box shape?
    */
    public configureProjectiles(size: number, width: number, height: number, imgName: string,
        strength: number, zIndex: number, isCircle: boolean): void {
        this.stage.world.projectilePool = new ProjectilePool(this.stage.world, this.device, this.config,
            size, width, height, imgName, strength, zIndex, isCircle);
    }

    /**
     * Add a background image that auto-repeats in X, and that moves in relation to the hero
     * movement
     *
     * @param x       The X of the bottom left corner of one instance of the image.  The image will
     *                be tiled from that point onward, in all directions.
     * @param y       The Y of the bottom left corner of one instance of the image.  The image will
     *                be tiled from that point onward, in all directions.
     * @param width   The width of the image being used as a background layer
     * @param height  The height of the image being used as a background layer
     * @param xSpeed  Speed that the picture seems to move in the X direction. "1" is the same speed
     *                as the camera; "0" is not at all; ".5f" is at half the camera's speed
     * @param imgName The name of the image file to use as the background
     */
    public addHorizontalBackgroundLayer(x: number, y: number, width: number, height: number, xSpeed: number, imgName: string) {
        let pl = new ParallaxLayer(x, y, width, height, xSpeed, true, false, imgName, this.config, this.device);
        this.stage.background.addLayer(pl);
    }

    /**
     * Add a background image that auto-repeats in Y, and that moves in relation to the hero
     * movement
     *
     * @param x       The X of the bottom left corner of one instance of the image.  The image will
     *                be tiled from that point onward, in all directions.
     * @param y       The Y of the bottom left corner of one instance of the image.  The image will
     *                be tiled from that point onward, in all directions.
     * @param width   The width of the image being used as a background layer
     * @param height  The height of the image being used as a background layer
     * @param ySpeed  Speed that the picture seems to move in the Y direction. "1" is the same speed
     *                as the camera; "0" is not at all; ".5f" is at half the camera's speed
     * @param imgName The name of the image file to use as the background
     */
    public addVerticalBackgroundLayer(x: number, y: number, width: number, height: number, ySpeed: number, imgName: string) {
        let pl = new ParallaxLayer(x, y, width, height, ySpeed, false, false, imgName, this.config, this.device);
        this.stage.background.addLayer(pl);
    }

    /**
     * Add a foreground image that auto-repeats, and that moves in relation to the hero movement
     *
     * @param x       The X of the bottom left corner of one instance of the image.  The image will
     *                be tiled from that point onward, in all directions.
     * @param y       The Y of the bottom left corner of one instance of the image.  The image will
     *                be tiled from that point onward, in all directions.
     * @param width   The width of the image being used as a background layer
     * @param height  The height of the image being used as a background layer
     * @param xSpeed  Speed that the picture seems to move in the X direction. "1" is the same speed
     *                as the camera; "0" is not at all; ".5f" is at half the camera's speed
     * @param imgName The name of the image file to use as the background
     */
    public addHorizontalForegroundLayer(x: number, y: number, width: number, height: number, xSpeed: number, imgName: string) {
        let pl = new ParallaxLayer(x, y, width, height, xSpeed, true, false, imgName, this.config, this.device);
        this.stage.foreground.addLayer(pl);
    }

    /**
     * Add a background image that auto-repeats, and that moves at a fixed X velocity
     *
     * @param x       The X of the bottom left corner of one instance of the image.  The image will
     *                be tiled from that point onward, in all directions.
     * @param y       The Y of the bottom left corner of one instance of the image.  The image will
     *                be tiled from that point onward, in all directions.
     * @param width   The width of the image being used as a background layer
     * @param height  The height of the image being used as a background layer
     * @param xSpeed  Speed that the picture seems to move in the X direction. "1" is the same speed
     *                as the camera; "0" is not at all; ".5f" is at half the camera's speed
     * @param imgName The name of the image file to use as the background
     */
    public addHorizontalAutoBackgroundLayer(x: number, y: number, width: number, height: number, xSpeed: number, imgName: string) {
        let pl = new ParallaxLayer(x, y, width, height, xSpeed / 1000, true, true, imgName, this.config, this.device);
        this.stage.background.addLayer(pl);
    }

    /**
     * Add a background image that auto-repeats, and that moves at a fixed Y velocity
     *
     * @param x       The X of the bottom left corner of one instance of the image.  The image will
     *                be tiled from that point onward, in all directions.
     * @param y       The Y of the bottom left corner of one instance of the image.  The image will
     *                be tiled from that point onward, in all directions.
     * @param width   The width of the image being used as a background layer
     * @param height  The height of the image being used as a background layer
     * @param ySpeed  Speed that the picture seems to move in the Y direction. "1" is the same speed
     *                as the camera; "0" is not at all; ".5f" is at half the camera's speed
     * @param imgName The name of the image file to use as the background
     */
    public addVerticalAutoBackgroundLayer(x: number, y: number, width: number, height: number, ySpeed: number, imgName: string) {
        let pl = new ParallaxLayer(x, y, width, height, ySpeed / 1000, false, true, imgName, this.config, this.device);
        this.stage.background.addLayer(pl);
    }

    /**
     * Specify a limit on how far away from the Hero a projectile can go.  Without this, projectiles
     * could keep on traveling forever.
     *
     * @param distance Maximum distance from the hero that a projectile can travel
     */
    public setProjectileRange(distance: number): void {
        for (let p of this.stage.world.projectilePool.pool)
            p.range = distance;
    }

    /**
     * Indicate that projectiles should feel the effects of gravity. Otherwise, they will be (more
     * or less) immune to gravitational forces.
     */
    public setProjectileGravityOn(): void {
        for (let p of this.stage.world.projectilePool.pool)
            p.body.SetGravityScale(1);
    }

    /**
    * The "directional projectile" mechanism might lead to the projectiles moving too fast. This
    * will cause the speed to be multiplied by a factor
    *
    * @param factor The value to multiply against the projectile speed.
    */
    public setProjectileVectorDampeningFactor(factor: number): void {
        this.stage.world.projectilePool.directionalDamp = factor;
    }

    /**
     * Indicate that all projectiles should participate in collisions, rather than disappearing when
     * they collide with other actors
     */
    public enableCollisionsForProjectiles(): void {
        this.stage.world.projectilePool.sensor = false;
    }

    /**
     * Indicate that projectiles thrown with the "directional" mechanism should have a fixed
     * velocity
     *
     * @param velocity The magnitude of the velocity for projectiles
     */
    public setFixedVectorThrowVelocityForProjectiles(velocity: number): void {
        this.stage.world.projectilePool.enableFixedVectorVelocity = true;
        this.stage.world.projectilePool.fixedVectorVelocity = velocity;
    }

    /**
     * Indicate that projectiles thrown via the "directional" mechanism should be rotated to face in
     * their direction or movement
     */
    public setRotateVectorThrowForProjectiles(): void {
        this.stage.world.projectilePool.rotateVectorThrow = true;
    }

    /**
     * Indicate that when two projectiles collide, they should both remain on screen
     */
    public setCollisionOkForProjectiles(): void {
        for (let p of this.stage.world.projectilePool.pool)
            p.disappearOnCollide = false;
    }

    /**
     * The "directional projectile" mechanism might lead to the projectiles moving too fast or too
     * slow. This will cause the speed to be multiplied by a factor
     *
     * @param factor The value to multiply against the projectile speed.
     */
    public setProjectileMultiplier(factor: number) {
        this.stage.world.projectilePool.directionalDamp = factor;
    }

    /**
     * Set a limit on the total number of projectiles that can be thrown
     *
     * @param number How many projectiles are available
     */
    public setNumberOfProjectiles(number: number): void {
        this.stage.world.projectilePool.remaining = number;
    }

    /**
     * Specify a sound to play when the projectile is thrown
     *
     * @param soundName Name of the sound file to play
     */
    public setThrowSound(soundName: string): void {
        this.stage.world.projectilePool.throwSound = this.device.getSpeaker().getSound(soundName);
    }

    /**
     * Specify the sound to play when a projectile disappears
     *
     * @param soundName the name of the sound file to play
     */
    public setProjectileDisappearSound(soundName: string): void {
        this.stage.world.projectilePool.projectileDisappearSound =
            this.device.getSpeaker().getSound(soundName);
    }

    /**
    * Generate a random number x in the range [0,max)
    *
    * @param max The largest number returned will be one less than max
    * @return a random integer
    */
    public getRandom(max: number) {
        return Math.floor(Math.random() * max);
    }

    /**
     * Create a new animation that can be populated via the "to" function
     *
     * @param sequenceCount The number of frames in the animation
     * @param repeat        True if the animation should repeat when it reaches the end
     * @return The animation
     */
    public makeComplexAnimation(repeat: boolean) {
        return new Animation(repeat, this.device.getRenderer());
    }

    /**
     * Create a new animation that shows a set of images for the same amount of time
     *
     * @param timePerFrame The time to show each image
     * @param repeat       True if the animation should repeat when it reaches the end
     * @param imgNames     The names of the images that comprise the animation
     * @return The animation
     */
    public makeAnimation(timePerFrame: number, repeat: boolean, imgNames: string[]) {
        let a = new Animation(repeat, this.device.getRenderer());
        for (let i of imgNames)
            a.to(i, timePerFrame);
        return a;
    }

    /**
     * Specify how projectiles should be animated
     *
     * @param animation The animation object to use for each projectile that is thrown
     */
    public setProjectileAnimation(animation: Animation) {
        for (let p of this.stage.world.projectilePool.pool)
            p.setDefaultAnimation(animation.clone());
    }

    /**
     * Specify the image file from which to randomly choose projectile images
     *
     * @param imgName The file to use when picking images
     */
    public setProjectileImageSource(imgName: string) {
        for (let p of this.stage.world.projectilePool.pool)
            p.animator.updateImage(this.device.getRenderer(), imgName);
        this.stage.world.projectilePool.randomizeImages = true;
    }

    /**
     * Set the background color for the current level
     *
     * @param color The color, formated as 0xRRGGBB
     */
    public setBackgroundColor(color: number) {
        this.stage.backgroundColor = color;
    }

    /**
     * From an SVG file that consists only of paths, produce a bunch of 
     * obstacles that correspond to the line segments of those paths.
     * 
     * @param filename The name of the SVG file to load
     * @param xTranslate An amount to shift the SVG in the x dimension
     * @param yTranslate An amount to shift the SVG in the y dimension
     * @param xStretch A multiplier to stretch in the x dimension
     * @param yStretch A multiplier to stretch in the y dimension
     * @param callback Code to run on each obstacle once it is made
     */
    public drawSVG(filename: string, xTranslate: number, yTranslate: number, xStretch: number, yStretch: number, callback: (actor: WorldActor) => void) {
        let s = new Svg();
        s.processFile(filename, xTranslate, yTranslate, xStretch, yStretch, this, this.config, callback);
    }
}