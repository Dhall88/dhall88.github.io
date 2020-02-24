
$(() => {

  let scene, camera, renderer, blueLight, currentCloudNum, BlueLightPower, greenLightPower, cloud, cloud2, greenLight, purpleLight, redLight
  let lightningBoolean=false;
  let disco=false;
  let backLight=false;
  let cloudRotation=0;
  let boolean=false;
  let cloudParticles = [];
  let cloudParticles2 = [];
  let uuid=[];
  let firstPass=false
  let originalPurple=0x5b4870;
  let originalGreen=0x487053;
  let originalRed=0x875d54;
  let discoPurple=0x6a2a78;
  let discoGreen=0x32a852;
  let discoRed=0xfc0f03;
var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'macho_man.mp3');


  function init() {
    currentCloudNum=1;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;
    let ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0xff8c19);
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
    renderer.setSize(window.innerWidth/1.5,window.innerHeight/1.5);
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
  cloud.position.set(
    Math.random()*400 -200,
    500,
    Math.random()*300-400
  );
  cloud.rotation.x = 1.16;
  cloud.rotation.y = -0.12;
  cloud.rotation.z = Math.random()*2*Math.PI;
    cloud.material.opacity=0.2
  cloud.material.opacity = 0;
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
  $(window).scroll(function(event){
    let scrollPosition=$(window).scrollTop();
    var lastScrollTop = 0;
     // if (scrollPosition >= lastScrollTop){
         // downscroll code
         if(cloudParticles[0]!=undefined&&scrollPosition>windowHeight/2) {
           cloudParticles[0].material.opacity=(scrollposition-windowHeight/2)/(windowHeight/2)*0.2
         }
         if(scrollPosition>(windowHeight+(windowHeight/40)) && scrollPosition<2*windowHeight) {
           console.log(Math.floor(scrollPosition/windowHeight)*40);
           cloudParticles[Math.floor((scrollPosition-windowHeight)/windowHeight*39)+1].material.opacity=((40*scrollPosition/windowHeight)-Math.floor(scrollPosition/windowHeight *40))*.2
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
         if (scrollPosition>4*windowHeight&&scrollPosition<5*windowHeight) {
          lightningBoolean=true;
          // console.log('in lightning if');
         }



       lastScrollTop = scrollPosition;
     });

     let yCoord, xCoord
      $(document).mousemove(function(event){
        yCoord = event.pageY;
        xCoord = event.pageX;
        console.log(xCoord);
        console.log(windowWidth);
        if(xCoord>windowWidth-30&&yCoord>5*windowHeight) {
          if(firstPass===true){

          }else {
            disco=true;
            lightningBoolean=false;
            audioElement.play();

          }
        } else if (xCoord<windowWidth-30||yCoord<5*windowHeight){
          disco=false;
          firstPass=false;
          lightningBoolean=true;
          purpleLight.color.setHex(originalPurple);
          greenLight.color.setHex(originalGreen);
          redLight.color.setHex(originalRed)
          // audioElement.pause();
          // audioElement.prop("currentTime",0);
        }
   })

 //   if (xCoord>windowWidth-20) {
 //   console.log(yCoord);
 //   console.log(5*windowHeight);
 // }


  function render() {

    cloudParticles.forEach((cloud,index) => {
        cloud.rotation.z -= cloudRotation
      });
      if(lightningBoolean===true) {
      if(Math.random() > 0.95 || lightning.intensity > 30) {
        if(lightning.intensity < 30)
        lightning.position.set(
                 Math.random()*400,
                 100 + Math.random() *200,
                 100 - Math.random() *100
              );
      lightning.intensity = 10 + Math.random() * 50;
    }
  }



    if(disco) {
      disco=false;
      if(!firstPass) {
        purpleLight.color.setHex(discoPurple);
        greenLight.color.setHex(discoGreen);
        redLight.color.setHex(discoRed);
        firstPass=true;
      }
      setTimeout(()=>{

        let temp = purpleLight.color.getHex();
        purpleLight.color.setHex(greenLight.color.getHex())
        greenLight.color.setHex(redLight.color.getHex());
        redLight.color.setHex(temp)
        console.log('in disco lights');
        disco=true;

      },1000)
    }


  renderer.render(scene,camera)
  requestAnimationFrame(render);
  }
  init();

})
