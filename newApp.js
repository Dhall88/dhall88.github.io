
$(() => {

  let scene, camera, renderer, blueLight, currentCloudNum, BlueLightPower, greenLightPower, cloud, cloud2,
  greenLight, purpleLight, redLight, ambient, directionalLight, discoCounter=0, discoTimer=920;
  let lightningBoolean=false;
  let disco=false;
  let backLight=false;
       let killDisco=false;
  let cloudRotation=0;
  let boolean=false;
  let cloudParticles = [];
  let cloudParticles2 = [];
  let uuid=[];
  let firstPass=false
  let originalPurple=0x28023d;
  let originalGreen=0x023d07;
  let originalRed=0x420703;
  let discoPurple=0x6a2a78;
  let discoGreen=0x32a852;
  let discoRed=0xfc0f03;
var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'macho_man_snippet.mp3');


  function init() {
    currentCloudNum=1;
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
  // let nebCenter = new THREE.PointLight(0x3677ac,5,450,1.7);
  // nebCenter.position.set(0,400,0);
  // scene.add(nebCenter);
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth/1.2,window.innerHeight/1.2);
    renderer.setClearColor(0x000000,0);
    document.getElementById("nebula").appendChild(renderer.domElement);

    let loader = new THREE.TextureLoader();
    // loader.crossOrigin='anonomys';
    loader.load("smoke-1.png", function(texture){
  //texture is loaded
  cloudGeo = new THREE.PlaneBufferGeometry(400,400);
  for(let p=0; p<40; p++) {
    cloudMaterial = new THREE.MeshLambertMaterial({
      map:texture,
      transparent: true
    });
  cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
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
    // cloud.material.opacity=0.2
  cloudParticles.push(cloud);
  scene.add(cloud);
  }
  // for(let p=0; p<39; p++) {
  // cloud2 = new THREE.Mesh(cloudGeo, cloudMaterial);
  // cloud2.position.set(
  //   Math.random()*400 -200,
  //   500,
  //   Math.random()*300-400
  // );
  // cloud2.rotation.x = 1.16;
  // cloud2.rotation.y = -0.12;
  // cloud2.rotation.z = Math.random()*2*Math.PI;
  // cloud2.material.opacity = 0;
  // cloudParticles2.push(cloud2);
  // scene.add(cloud2);
  // }
  });





  render();
  }

  let windowHeight=$(window).height();
  let windowWidth=$(window).width();
  let scrollPosition;
  $(window).scroll(function(event){
    var lastScrollTop = 0;
      let scrollPosition=$(window).scrollTop();

         if(scrollPosition>(1.5*windowHeight+(windowHeight/80)) && scrollPosition<2*windowHeight) {
           cloudParticles[Math.floor(((scrollPosition-(windowHeight*1.5))/(windowHeight/2))*40)].material.opacity=.2

           console.log(Math.floor(((scrollPosition-(windowHeight*1.5))/(windowHeight/2))*40));

         }
         if (scrollPosition>2*windowHeight&&scrollPosition<3*windowHeight) {

           cloudRotation=(scrollPosition-2*windowHeight)/windowHeight*0.003
         }
         if (scrollPosition>3*windowHeight&&scrollPosition<4*windowHeight) {
           purpleLight.intensity=(scrollPosition-3*windowHeight)/windowHeight*10;
           greenLight.intensity=(scrollPosition-3*windowHeight)/windowHeight*10;
           redLight.intensity=(scrollPosition-3*windowHeight)/windowHeight*10;
           // (scrollPosition-3*windowHeight)/windowHeight*
         }
         if (scrollPosition>(4*windowHeight+(windowHeight/2))&&scrollPosition<5*windowHeight) {
          lightningBoolean=true;
          // console.log('in lightning if');
         }



       lastScrollTop = scrollPosition;
     });

     let yCoord, xCoord
      $(document).mousemove(function(event){
        yCoord = event.pageY;
        xCoord = event.pageX;
          if(xCoord>windowWidth-30&&yCoord>5*windowHeight) {
            console.log('in disco turn on');
            if(firstPass===true){

            }else {
              disco=true;
              lightningBoolean=false;
              killDisco=false;
              audioElement.play();
            }
          }
          else if(xCoord<windowWidth-100&&yCoord<6.3*windowHeight&&yCoord>5.2*windowHeight) {
            console.log('in disco turn off');
            killDisco=true;
            lightningBoolean=true
          }
        }
   )

 //   if (xCoord>windowWidth-20) {
 //   console.log(yCoord);
 //   console.log(5*windowHeight);
 // }


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

    if(disco) {
      console.log(discoCounter);
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
          discoTimer=920;
        }
        if (discoCounter===20) {
          killDisco=true;
        }

        if(killDisco){
          console.log('in kill disco');
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
          console.log('in run disco');
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
