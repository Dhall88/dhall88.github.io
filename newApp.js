
$(() => {

  // ThreeJS varibales

  let scene, camera, renderer, cloud, greenLight, purpleLight, redLight, ambient, directionalLight, discoCounter=0, discoTimer=920,
  lightningBoolean=false, disco=false, killDisco=false, cloudRotation=0, cloudParticles = [], firstPass=false;

  // light color variables

  let originalPurple=0x28023d, originalGreen=0x023d07, originalRed=0x420703,
  discoPurple=0x6a2a78, discoGreen=0x32a852, discoRed=0xfc0f03;

  // Disco music setup

  let audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'macho_man_snippet.mp3');

  // Define jQuery variables

  let $intro = $(".intro"), $body = $("body"), $window = $(window), yCoord, xCoord, 
  windowHeight=$window.height(), windowWidth=$window.width();

  // Reset to top upon refresh

  $window.scrollTop(0)
  
  // Removes the landing page banner
  
  removeBanner = () => {
    $intro.css('transform', `translate(0,${-window.innerHeight-100}px)`)
  }
  
  // Allows scrolling after interacting with screen,
  // critical to allow sound later on

  $intro.click(removeBanner)
  $body.click(enableScroll)

  // Scrolling is initally disabled. Turns on scrolling
  // by removing css class

  enableScroll = () => {
    $body.removeClass("stop-scrolling");
  }

  // Three JS initialization using previously defined variables

  init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,1000);
  camera.position.z = 1;
  camera.rotation.x = 1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 0.27;
  ambient = new THREE.AmbientLight(0x555555,0);
  scene.add(ambient);

  directionalLight = new THREE.DirectionalLight(0xff8c19,0);
  directionalLight.position.set(0,0,1);
  scene.add(directionalLight);

  purpleLight = new THREE.PointLight(originalPurple,0,450,1.7);
  purpleLight.position.set(50,300,100);
  scene.add(purpleLight);

  greenLight = new THREE.PointLight(originalGreen,0,450,1.7);
  greenLight.position.set(50,500,-100);
  scene.add(greenLight);

  redLight = new THREE.PointLight(originalRed,0,450,1.7);
  redLight.position.set(300,300,-100);
  scene.add(redLight);

  lightning = new THREE.PointLight(0x3677ac,0,450,1.7);
  lightning.position.set(700,300,50);
  scene.add(lightning);
  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(window.innerWidth/1.2,window.innerHeight/1.2);
  renderer.setClearColor(0x000000,0);
  document.getElementById("nebula").appendChild(renderer.domElement);

  let loader = new THREE.TextureLoader();

  loader.load("smoke-1.png", function(texture){

    cloudGeo = new THREE.PlaneBufferGeometry(400,400);

    for(let p=0; p<40; p++) {
      cloudMaterial = new THREE.MeshLambertMaterial({
      map:texture,
      transparent: true
    });

    cloud = new THREE.Mesh(cloudGeo, cloudMaterial);

    // Sets one cloud opacity to .2, all others are set to 0 until scrolling event
    if(p===0) {
      cloud.material.opacity=0.2
      cloud.position.set(
        0,
        500,
        -250
      );
    } else {
      cloud.material.opacity = 0;
      cloud.position.set(
        Math.random()*400 -200,
        500,
        Math.random()*300-400
      );
    }
    cloud.rotation.x = 1.16;
    cloud.rotation.y = -0.12;
    cloud.rotation.z = Math.random()*2*Math.PI;
    cloudParticles.push(cloud);
    scene.add(cloud);
    }
  });

  render();
}

  $window.scroll(function(event){
      let scrollPosition=$window.scrollTop();

         if(scrollPosition>(.25*windowHeight) && scrollPosition<windowHeight) {
           cloudParticles[Math.floor(((scrollPosition-(windowHeight*.25))/(windowHeight*.75))*40)].material.opacity=.2
           cloudParticles[Math.ceil(((scrollPosition-(windowHeight*.25))/(windowHeight*.75))*40)].material.opacity=.2
         }

         if (scrollPosition>1.25*windowHeight&&scrollPosition<2*windowHeight) {
           cloudRotation=(scrollPosition-1.25*windowHeight)/(.75*windowHeight)*0.003
         }

         if (scrollPosition>2*windowHeight&&scrollPosition<3*windowHeight) {
           purpleLight.intensity=(scrollPosition-2*windowHeight)/windowHeight*15;
           greenLight.intensity=(scrollPosition-2*windowHeight)/windowHeight*15;
           redLight.intensity=(scrollPosition-2*windowHeight)/windowHeight*15;
         }
         

         if (scrollPosition>3.25*windowHeight&&scrollPosition<4*windowHeight) {
          lightningBoolean=true;
         } else if (scrollPosition<3.25*windowHeight) {
           lightningBoolean=false;
         }
     });

  $(document).mousemove(function(event){
    yCoord = event.pageY;
    xCoord = event.pageX;
      if(xCoord>windowWidth-30&&yCoord<5.3*windowHeight&&yCoord>4*windowHeight) {
        if(firstPass===true){

        }else {
          disco=true;
          lightningBoolean=false;
          killDisco=false;
          audioElement.play();
        }
      }
      else if(xCoord<windowWidth-100&&yCoord<5.3*windowHeight&&yCoord>4*windowHeight) {
        killDisco=true;
        lightningBoolean=true
      }
    }
  )

  // Renders Three JS scene, updates rotation and lights based on scroll events
  
  function render() {
    cloudParticles.forEach((cloud,index) => {
        cloud.rotation.z -= cloudRotation
      });
            lightning.intensity = 0;
      if(lightningBoolean===true) {
      if(Math.random() > 0.95 || lightning.intensity > 20) {
        if(lightning.intensity < 20)
        lightning.position.set(
                 Math.random()*400,
                 100 + Math.random() *200,
                 100 - Math.random() *100
              );
      lightning.intensity = 5 + Math.random() * 50;
    }
  }

    // Controls disco light timing

    if(disco) {
      disco=false;
      if(!firstPass) {
        purpleLight.color.setHex(discoPurple);
        greenLight.color.setHex(discoGreen);
        redLight.color.setHex(discoRed);
        purpleLight.intensity=25;
        greenLight.intensity=25;
        redLight.intensity=25;
        discoCounter=0
        firstPass=true;
      }

      setTimeout(()=>{
        discoCounter++;
        if(discoCounter>1&&discoCounter<4) {
          discoTimer=460;
        } else {
          discoTimer=910;
        }
        if (discoCounter===20) {
          killDisco=true;
        }

        if(killDisco){
          disco=false;
          firstPass=false;
          killDisco=false;
          purpleLight.color.setHex(originalPurple);
          greenLight.color.setHex(originalGreen);
          redLight.color.setHex(originalRed);
          purpleLight.intensity=10;
          greenLight.intensity=10;
          redLight.intensity=10;
          audioElement.pause();
          audioElement.currentTime=0;
        }else {
          let temp = purpleLight.color.getHex();
          purpleLight.color.setHex(greenLight.color.getHex())
          greenLight.color.setHex(redLight.color.getHex());
          redLight.color.setHex(temp)
          disco=true;
        }
      },discoTimer)
    }

  renderer.render(scene,camera)
  requestAnimationFrame(render);
  }

  init();

})
