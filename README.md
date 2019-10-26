# dhall88.github.io

Fruit Fight

This variation of the classic game Tanks relies on HTML, CSS, and Jquery.

Fruit Fight takes fireing angles, power input, and a few other options to launch fruit artillary at your opponent.  Inspiration was taken from Tanks, Angry Birds, and Worms.

Two major classes, Tank and Projectile create the divs and objects that are seen in the program and house the methods responsible for almost all of the computation.

Projecitle.path(time) calculates the path of the projectile using classic neutonian physics equations and initial conditions passed as arguments.  

Tank.ammoSelection(ammoIndex) creates Projectile objects and corresponding divs based on user input.

Tank.fire(i,obj,$div,boolean,ammoIndex) takes an index used as time in the .path() method. obj and $div correspond to the selected projctile and corresponding div. boolean is used for the Banana Cluster and Grapes of Wrath to handle the children of the original projectiles. ammoIndex is used in logic statements so that the correct explosion animations are applied to the projectiles upon impact.

Tank.bombDamage(obj) takes a projectile as an agument, extracts the final landing position and uses that calculate damage as a linear gradient. Ex. A Nuke-terine with 75 damage that lands 30 pixels away from the target will do 45 damage.

Terrain generation uses midpoint displacement to create random terrain each time.

Unsolved problems: All projectiles should have their own method dictacting behaver.  At the moment, the fire method, which currently handles all projectile behavior, has become so big and complex that any additions tend to lead to other projectiles breaking.