$(() => {

const terrain = (width, height, displace, roughness) => {
    let points = [],
        // Gives us a power of 2 based on our width
        power = Math.pow(2, Math.ceil(Math.log(width) / (Math.log(2))));

    // Set the initial left point
    points[0] = height / 2 + (Math.random() * displace * 2) - displace;
    // set the initial right point
    points[power] = height / 2 + (Math.random() * displace * 2) - displace;
    displace *= roughness;

    // Increase the number of segments
    for (let i = 1; i < power; i *= 2) {
        // Iterate through each segment calculating the center point
        for (let j = (power / i) / 2; j < power; j += power / i) {
            points[j] = ((points[j - (power / i) / 2] + points[j + (power / i) / 2]) / 2);
            points[j] += (Math.random() * displace * 6) - displace
                while (points[j]>height/1.3-30) {
                    points[j] = ((points[j - (power / i) / 2] + points[j + (power / i) / 2]) / 2);
                    points[j] += (Math.random() * displace * 2) - displace
                }
        }
        // reduce our random range
        displace *= roughness;
    }
    return points;
}

const win = (color) => {
    let $end = $('<div>').addClass('end');
    let $playAgain = $('<div>').addClass('playAgain').text('play again?');
    $playAgain.on('click',gameStart);
    let $description = $('<p>').addClass('description').text(`Conratulations ${color}!
    Would you like to play again?`);
    $end.append($description).append($playAgain);
    $('.container').append($end);
}

const addTanks = () => {
    player1 = new Tank(200,Math.round(terPoints[200]-5),'blue',45);
    $cannon1 = $('<div>').addClass('cannon').css({'left':`${player1.xPos}px`
        ,'top':`${player1.yPos-10}px`,'background-color': `${player1.color}`,'transform':`rotate(${90-player1.angle}deg)`});
    $player1 = $('<div>').addClass('tank').css({'left':`${player1.xPos-7}px`
        ,'top':`${player1.yPos}px`,'background-color': `${player1.color}`});
    player2 = new Tank(800,Math.round(terPoints[800]-5),'red',135);
    $cannon2 = $('<div>').addClass('cannon').css({'left':`${player2.xPos-1}px`
        ,'top':`${player2.yPos-10}px`,'background-color': `${player2.color}`,'transform':`rotate(${90-player2.angle}deg)`});
    $player2 = $('<div>').addClass('tank').css({'left':`${player2.xPos-7}px`
        ,'top':`${player2.yPos}px`,'background-color': `${player2.color}`});
    $('.container').append($player1).append($player2).append($cannon1).append($cannon2);
    
    $('.health1').text(player1.health);
    $('.power1').text(player1.power);
    $('.angle1').text(player1.angle);
    $('.health2').text(player2.health);
    $('.power2').text(player2.power);
    $('.angle2').text(player2.angle);
    ammoIndex1 = 0;
    ammoIndex2 = 0
    $('.ammo1').text(`${player1.ammoType[ammoIndex1]}: ${player1.ammo[ammoIndex1]}`)
    $('.ammo2').text(`${player2.ammoType[ammoIndex2]}: ${player2.ammo[ammoIndex2]}`)
}

const gameStart = () => {
    $('.end').hide();
    $('.instructions').hide();
    $('h5').on('click', () => {
        $('.instructions').show()
    })
    $('.close').on('click', () => {
        $('.instructions').hide();
    })
    wind = Math.floor(Math.random()*100-50);
    $('.wind').text(Math.abs(wind))
    $('.negDirection').hide();
    $('.posDirection').hide();
    if (wind<0){
        $('.negDirection').show();
    } else if (wind>0){
        $('.posDirection').show();
    } 
    
    $('.tank').remove();
    $('.cannon').remove();
    ctx.clearRect(0,0,1000,500);

    // get the points
    terPoints = terrain(width, height*1.3, height / 4, 0.45);
    // draw the points
    ctx.beginPath();
    ctx.moveTo(0, terPoints[0]);
    for (var t = 1; t < terPoints.length; t++) {
        ctx.lineTo(t, terPoints[t]);
    }
    // finish creating the rect so we can fill it
    ctx.lineTo($canvas.width, $canvas.height);
    ctx.lineTo(0, $canvas.height);
    ctx.closePath();
    ctx.fillStyle = "green"
    ctx.fill();

    player = true;

    addTanks();
}

class Tank {
    constructor(xPos, yPos, color, angle) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.color = color;
        this.health = 10;
        this.power = 60;
        this.angle = angle;
        this.tScale = .1;
        this.powerScale = .5;
        this.ammo=[99,3,3,3,1];
        this.ammoType=['Pear Bomb','Banana Cluster','Homeing-dew Melon','Grapes of Wrath','Nuke-terine'];
        this.monkey = 1;
        
    }

    ammoSelection(num) {
        let vx = this.power*this.powerScale*Math.cos(this.angle*Math.PI/180);
        let vy = this.power*this.powerScale*Math.sin(this.angle*Math.PI/180);
        if (num===0) {
            let projectile = new Projectile(this.xPos,this.yPos,vx,vy,30);
            $projectile.show().css('animation-name','');
            $projectile.removeClass('explosion').addClass('projectile')
            .css({'background-image':`url("project-imgs/pear.png")`,'background-size':'100% 100%',});
            return projectile;
        } else if (num===1) {
            let projectile = new Projectile(this.xPos,this.yPos,vx,vy,25);
            $projectile.show().css('animation-name','');
            $projectile.attr('class','').addClass('projectile')
            .css({'background-image':`url("project-imgs/banana-bunch.png")`,'background-size':'100% 100%'});
            banana1 = new Projectile(0,0,
                (Math.random()*30)-15,Math.random()*10,20)
            banana2 = new Projectile(0,0,
                (Math.random()*30)-15,Math.random()*10,20)
            banana3 = new Projectile(0,0,
                (Math.random()*30)-15,Math.random()*10,20)
            banana4 = new Projectile(0,0,
                (Math.random()*30)-15,Math.random()*10,20)
            banana5 = new Projectile(0,0,
                (Math.random()*20)-10,Math.random()*10,20)
                bananaBoolean1 = false;
                bananaBoolean2 = false;
                bananaBoolean3 = false;
                bananaBoolean4 = false;
                bananaBoolean5 = false;
            $banana1.attr('class','').css('animation-name','').addClass('projectile').hide()
            .css({'background-image':`url("project-imgs/single-banana.png")`,'background-size':'100% 100%'});
            $banana2.attr('class','').css('animation-name','').addClass('projectile').hide()
            .css({'background-image':`url("project-imgs/single-banana.png")`,'background-size':'100% 100%'});
            $banana3.attr('class','').css('animation-name','').addClass('projectile').hide()
            .css({'background-image':`url("project-imgs/single-banana.png")`,'background-size':'100% 100%'});
            $banana4.attr('class','').css('animation-name','').addClass('projectile').hide()
            .css({'background-image':`url("project-imgs/single-banana.png")`,'background-size':'100% 100%'});
            $banana5.attr('class','').css('animation-name','').addClass('projectile').hide()
            .css({'background-image':`url("project-imgs/single-banana.png")`,'background-size':'100% 100%'});
            return projectile;
             } else if (num===2){
            let projectile = new Projectile(this.xPos,this.yPos,vx,vy,25);
            $projectile.show().css('animation-name','');
            $projectile.removeClass('explosion').addClass('projectile')
            .css({'background-image':`url("project-imgs/melon.png")`,'background-size':'100% 100%'});
            return projectile;
            
        } else if (num===3) {
            let projectile = new Projectile(this.xPos,this.yPos,vx,vy,30);
            bananaBoolean1=false;
            $projectile.show().css('animation-name','');
            $projectile.attr('class','').addClass('projectile')
            .css({'background-image':`url("project-imgs/grape-bunch.png")`,'background-size':'100% 100%'});
            $banana1.attr('class','').css('animation-name','').addClass('projectile').hide()
            .css({'background-image':`url("project-imgs/grape.png")`,'background-size':'100% 100%'});
            $banana2.attr('class','').css('animation-name','').addClass('projectile').hide()
            .css({'background-image':`url("project-imgs/grape.png")`,'background-size':'100% 100%'});
            $banana3.attr('class','').css('animation-name','').addClass('projectile').hide()
            .css({'background-image':`url("project-imgs/grape.png")`,'background-size':'100% 100%'});
            $banana4.attr('class','').css('animation-name','').addClass('projectile').hide()
            .css({'background-image':`url("project-imgs/grape.png")`,'background-size':'100% 100%'});
            return projectile;
        } else {
            let projectile = new Projectile(this.xPos,this.yPos,vx,vy,75);
            $projectile.show().css('animation-name','');
            $projectile.removeClass('explosion').addClass('projectile')
            .css({'background-image':`url("project-imgs/tangerine.png")`,'background-size':'100% 100%'});
            return projectile;
        }         
    }

    fire(i,obj,$div,boolean,ammoIndex) {
         setTimeout(() => {
             if (obj.xO !== melonProj.xO && boolean === false) {
                 console.log('killed loop')
                 return
             }

            let coords = obj.path(i*this.tScale);

            $div.css('left',`${coords[0]}px`);
            $div.css('top',`${coords[1]}px`);
            if (obj.y<terPoints[Math.round(obj.x)-5]) { 
                ++i;   
                this.fire(i,obj,$div,boolean,ammoIndex);    
            } else {
                if ((ammoIndex===0 || ammoIndex === 1||ammoIndex===3) && boolean === false) {
                    $div.attr('class','').addClass('explosion')
                    .css('animation-name','explosion').delay(2000).hide(0); 
                } else if (ammoIndex===2){
                    $div.attr('class','').addClass('explosion')
                    .css('animation-name','explosion').delay(2000).hide(0);  
                } else if (ammoIndex===4) {
                    $div.attr('class','').addClass('explosion')
                    .css('animation-name','nuke').delay(2000).hide(0);
                }
                    else {
                    $div.attr('class','').addClass('explosion')
                    .css('animation-name','small-explosion').delay(2000).hide(0);
                    bananaBoolean1=false;
                    bananaBoolean2=false;
                    bananaBoolean3=false;
                    bananaBoolean4=false;
                    bananaBoolean5=false;
                }  
                    this.bombDamage(obj,$div);   
                    
                    if (ammoIndex === 1 && boolean === false) {

                        bananaBoolean1 = true;
                        bananaBoolean2 =true;
                        bananaBoolean3 =true;
                        bananaBoolean4 =true;
                        bananaBoolean5 =true;
                        $banana1.show().css({'left':`${obj.x}px`,'top':`${obj.y+5}`})
                        $banana2.show().css({'left':`${obj.x}px`,'top':`${obj.y+5}`})
                        $banana3.show().css({'left':`${obj.x}px`,'top':`${obj.y+5}`})
                        $banana4.show().css({'left':`${obj.x}px`,'top':`${obj.y+5}`})
                        $banana5.show().css({'left':`${obj.x}px`,'top':`${obj.y+5}`})
                        banana1.xO = obj.x;
                        banana1.yO = obj.y-20;
                        banana2.xO = obj.x;
                        banana2.yO = obj.y-20;
                        banana3.xO = obj.x;
                        banana3.yO = obj.y-20;
                        banana4.xO = obj.x;
                        banana4.yO = obj.y-20;
                        banana5.xO = obj.x;
                        banana5.yO = obj.y-20;
                        this.fire(0,banana1,$banana1,bananaBoolean1,ammoIndex)
                        this.fire(0,banana2,$banana2,bananaBoolean2,ammoIndex)
                        this.fire(0,banana3,$banana3,bananaBoolean3,ammoIndex)
                        this.fire(0,banana4,$banana4,bananaBoolean4,ammoIndex)
                        this.fire(0,banana5,$banana5,bananaBoolean5,ammoIndex)
                    } else {
                        boolean = false;
                    }
                
            }
        }, 10);
    }

    bombDamage (obj,$div) {
        let projX = parseInt($div.css('left'));
        let damage = obj.damage;
        for(let i=0;i<=damage;i++) {
            if ((projX===player1.xPos-i) || (projX===player1.xPos+i)) {
                damage = damage - i;
                player1.health=player1.health-damage;
                $('.health1').text(player1.health)
                if(player1.health<=0) {
                    win('Red')
                }
                return;
            } else if ((projX===player2.xPos-i) || (projX===player2.xPos+i)) {
                damage = damage - i;
                player2.health=player2.health-damage;
                $('.health2').text(player2.health)
                if(player2.health<=0) {
                    win('Blue')
                }
                return;
            }
        }        
    }
}

class Projectile {
    constructor(xO,yO,vxO,vyO,damage){
        this.xO = xO;
        this.yO = yO;
        this.vxO = vxO
        this.vx = 0;
        this.vyO = vyO
        this.vy = 0;
        this.x,this.y;
        this.damage = damage;
    }
    path(time) {
        this.x = this.xO+this.vxO*time+(.01*wind*time*time);
        this.y = this.yO-this.vyO*time+time*time;
        this.vx = this.vxO +(.02*wind*time)
        this.vy = this.vyO-2*time;
        let coords = [this.x,this.y];
        return coords;
    }
}

let $canvas = $("#canvas")[0],
    ctx = $canvas.getContext("2d"),
    width = 1000,
    height = 500;

$canvas.width = width;
$canvas.height = height;
$('.container').attr('width',`${width}px`);
$('.container').attr('height',`${height}px`);

let $projectile = $('<div>');
let $banana1 = $('<div>');
let $banana2 = $('<div>');
let $banana3 = $('<div>');
let $banana4 = $('<div>');
let $banana5 = $('<div>');
$('.container').append($projectile).append($banana1).append($banana2).append($banana3)
.append($banana4).append($banana5);

let banana1,banana2,banana3,banana4,banana5;
let bananaBoolean1,bananaBoolean2,bananaBoolean3,bananaBoolean4,bananaBoolean5;
let $player1, $player2, player1, player2, 
$cannon1, $cannon2, ammoIndex2, ammoIndex1, currentProjectile, melonProj,terPoints, wind;

$(document).keydown(function(e){
    if (e.which == 37) { 
        if (player === true) {
            player1.angle++
            $('.angle1').text(player1.angle)
            $cannon1.css('transform',`rotate(${90-player1.angle}deg)`);
            return false;
        } else {
            player2.angle++
            $('.angle2').text(player2.angle)
            $cannon2.css('transform',`rotate(${90-player2.angle}deg)`);
            return false;
        }
    } else if (e.which == 39) { 
        if (player === true) {
            player1.angle--
            $('.angle1').text(player1.angle)
            $cannon1.css('transform',`rotate(${90-player1.angle}deg)`);
            return false;
        } else {
            player2.angle--
            $('.angle2').text(player2.angle)
            $cannon2.css('transform',`rotate(${90-player2.angle}deg)`);

            return false;
        }
    } else if (e.which == 38) {
        if (player === true) {
            player1.power++
            $('.power1').text(player1.power);
            return false;
        } else {
            player2.power++
            $('.power2').text(player2.power);
            return false;
        }
    } else if (e.which == 40) {
        if (player === true) {
            player1.power--
            $('.power1').text(player1.power);
            return false;
        } else {
            player2.power--
            $('.power2').text(player2.power);
            return false;
        }
    } else if (e.which == 32) {
        if (player === true) {
            currentProjectile=player1.ammoSelection(ammoIndex1)
            melonProj = currentProjectile;
            console.log(bananaBoolean1)
            player1.fire(0,currentProjectile,$projectile,bananaBoolean1,ammoIndex1);
            player1.ammo[ammoIndex1]--;
            $('.ammo1').text(`${player1.ammoType[ammoIndex1]}: ${player1.ammo[ammoIndex1]}`)
            player = !player;
            return false;
        } else {
            currentProjectile=player2.ammoSelection(ammoIndex2)
            melonProj = currentProjectile;
            player2.fire(0,currentProjectile,$projectile,bananaBoolean1,ammoIndex2);
            player2.ammo[ammoIndex2]--;
            console.log(ammoIndex2)
            $('.ammo2').text(`${player2.ammoType[ammoIndex2]}: ${player2.ammo[ammoIndex2]}`)
            player = !player;
            return false;
        }
    } else if (e.which == 65) { 
        if (player === true) {
            ammoIndex1--;
            if (ammoIndex1 === -1) {
                ammoIndex1 = 4;
            }
            $('.ammo1').text(`${player1.ammoType[ammoIndex1]}: ${player1.ammo[ammoIndex1]}`)
            return false;
        } else {
            ammoIndex2--;
            if (ammoIndex2 === -1) {
                ammoIndex2 = 4;
            }
            $('.ammo2').text(`${player2.ammoType[ammoIndex2]}: ${player2.ammo[ammoIndex2]}`)
            return false;
        }
    } else if (e.which == 68) { 
        if (player === true) {
            ammoIndex1++;
            if (ammoIndex1 === 5) {
                ammoIndex1 = 0;
                console.log('in ammo reset if')
            }
            console.log(ammoIndex1)
            $('.ammo1').text(`${player1.ammoType[ammoIndex1]}: ${player1.ammo[ammoIndex1]}`)
            return false;
        } else {
            ammoIndex2++;
            if (ammoIndex2 === 5) {
                ammoIndex2 = 0;
            }
            $('.ammo2').text(`${player2.ammoType[ammoIndex2]}: ${player2.ammo[ammoIndex2]}`)
            return false;
        }
    } else if (e.which == 67) { 
        if (player===false){
            if (ammoIndex1===2) {
                melonProj = new Projectile(currentProjectile.x,currentProjectile.y,
                    currentProjectile.vx*4,currentProjectile.vy*4,currentProjectile.damage);
                player1.fire(0,melonProj,$projectile,false);
                return false;
            } else if (ammoIndex1===3) {
                bananaBoolean1=true;
            bananaBoolean2=true;
            bananaBoolean3=true;
            bananaBoolean4=true;
            $banana1.show().css({'left':`${currentProjectile.x}px`,'top':`${currentProjectile.y}`})
            $banana2.show().css({'left':`${currentProjectile.x}px`,'top':`${currentProjectile.y}`})
            $banana3.show().css({'left':`${currentProjectile.x}px`,'top':`${currentProjectile.y}`})
            $banana4.show().css({'left':`${currentProjectile.x}px`,'top':`${currentProjectile.y}`})
            banana1 = new Projectile(currentProjectile.x,currentProjectile.y,
                currentProjectile.vx+(Math.random()*10-5),currentProjectile.vy+(Math.random()*10-5),20)
            banana2 = new Projectile(currentProjectile.x,currentProjectile.y,
                currentProjectile.vx+(Math.random()*10-5),currentProjectile.vy+(Math.random()*10-5),20)
            banana3 = new Projectile(currentProjectile.x,currentProjectile.y,
                currentProjectile.vx+(Math.random()*10-5),currentProjectile.vy+(Math.random()*10-5),20)
            banana4 = new Projectile(currentProjectile.x,currentProjectile.y,
                currentProjectile.vx+(Math.random()*10-5),currentProjectile.vy+(Math.random()*10-5),20)

                melonProj=currentProjectile;
                player1.fire(0,banana1,$banana1,bananaBoolean1,3);
                player1.fire(0,banana2,$banana2,bananaBoolean2,3);
                player1.fire(0,banana3,$banana3,bananaBoolean3,3);
                player1.fire(0,banana4,$banana4,bananaBoolean4,3);
                        }
        } else { 
            if (ammoIndex2===2) {
                melonProj = new Projectile(currentProjectile.x,currentProjectile.y,
                    currentProjectile.vx*4,currentProjectile.vy*4,currentProjectile.damage);
                player2.fire(0,melonProj,$projectile,bananaBoolean1,ammoIndex2);
                return false;
            } else if (ammoIndex2===3) {
                bananaBoolean1=true;
            bananaBoolean2=true;
            bananaBoolean3=true;
            bananaBoolean4=true;
            $banana1.show().css({'left':`${currentProjectile.x}px`,'top':`${currentProjectile.y}`})
            $banana2.show().css({'left':`${currentProjectile.x}px`,'top':`${currentProjectile.y}`})
            $banana3.show().css({'left':`${currentProjectile.x}px`,'top':`${currentProjectile.y}`})
            $banana4.show().css({'left':`${currentProjectile.x}px`,'top':`${currentProjectile.y}`})
            banana1 = new Projectile(currentProjectile.x,currentProjectile.y,
                currentProjectile.vx+(Math.random()*10-5),currentProjectile.vy+(Math.random()*10-5),20)
            banana2 = new Projectile(currentProjectile.x,currentProjectile.y,
                currentProjectile.vx+(Math.random()*10-5),currentProjectile.vy+(Math.random()*10-5),20)
            banana3 = new Projectile(currentProjectile.x,currentProjectile.y,
                currentProjectile.vx+(Math.random()*10-5),currentProjectile.vy+(Math.random()*10-5),20)
            banana4 = new Projectile(currentProjectile.x,currentProjectile.y,
                currentProjectile.vx+(Math.random()*10-5),currentProjectile.vy+(Math.random()*10-5),20)

                melonProj=currentProjectile;
                player2.fire(0,banana1,$banana1,bananaBoolean1,3);
                player2.fire(0,banana2,$banana2,bananaBoolean2,3);
                player2.fire(0,banana3,$banana3,bananaBoolean3,3);
                player2.fire(0,banana4,$banana4,bananaBoolean4,3);
            } 
        }
    } else if (e.which == 71) { 
        if (player === true) {
            if (player1.monkey >0){
                let $monkey = $('<div>').addClass('monkey').css({'background-image':
                'url(project-imgs/monkey.png)', 'background-size': '100% 100%',
                'top':`${player1.yPos-5}px`,'left':`${player1.xPos-10}px`,
                'animation-name':'monkey'}).delay(2000).hide(0);
                $('.container').append($monkey);
                player1.monkey--;
                player1.health = player1.health+50;
                if (player1.health > 100) {
                    player1.health = 100;
                }
                $('.health1').text(player1.health);
            }
            return false;
        } else {
            if (player2.monkey >0){
                let $monkey = $('<div>').addClass('monkey').css({'background-image':
                'url(project-imgs/monkey.png)', 'background-size': '100% 100%',
                'top':`${player2.yPos-5}px`,'left':`${player2.xPos-10}px`,
                'animation-name':'monkey'}).delay(2000).hide(0)
                $('.container').append($monkey);
                player2.monkey--;
                player2.health = player2.health+50;
                if (player2.health > 100) {
                    player2.health = 100;
                }
                $('.health2').text(player2.health);
            }
            return false;
        }
    }
});

gameStart();

})
