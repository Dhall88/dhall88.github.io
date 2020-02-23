
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

  purpleLight = new THREE.PointLight(0x5b4870,1,450,1.7);
  purpleLight.position.set(50,300,100);
  scene.add(purpleLight);

  greenLight = new THREE.PointLight(0x487053,1,450,1.7);
  greenLight.position.set(50,500,-100);
  scene.add(greenLight);

  redLight = new THREE.PointLight(0x875d54,1,450,1.7);
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
  if(p===0){
    cloud.material.opacity=0.2
  } else {
  cloud.material.opacity = 0;
}
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
         if(cloudParticles[0]!=undefined && scrollPosition<2*windowHeight && scrollPosition>windowHeight/20) {
           console.log(Math.floor(scrollPosition/windowHeight)*20);
           cloudParticles[Math.floor(scrollPosition/windowHeight*20)].material.opacity=((20*scrollPosition/windowHeight)-Math.floor(scrollPosition/windowHeight *20))*.2
           console.log('in cloud particle if');
         }
         if (scrollPosition>2*windowHeight&&scrollPosition<3*windowHeight) {
           cloudRotation=(scrollPosition-2*windowHeight)/windowHeight*0.003
           console.log('in rotation if');
         }
         if (scrollPosition>3*windowHeight&&scrollPosition<4*windowHeight) {
           console.log('in backlight if');
           purpleLight.intensity=(scrollPosition-3*windowHeight)/windowHeight*10;
           greenLight.intensity=(scrollPosition-3*windowHeight)/windowHeight*10;
           redLight.intensity=(scrollPosition-3*windowHeight)/windowHeight*10;
           // (scrollPosition-3*windowHeight)/windowHeight*
         }
         if (scrollPosition>4*windowHeight&&scrollPosition<5*windowHeight) {
          lightningBoolean=true;
          console.log('in lightning if');
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
          disco=true;
        } else {
          disco=false
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
      if(Math.random() > 0.93 || lightning.intensity > 60) {
        if(lightning.intensity < 100)
        lightning.position.set(
                 Math.random()*400,
                 100 + Math.random() *200,
                 100 - Math.random() *100
              );
      lightning.intensity = 50 + Math.random() * 100;
    }
  }

  // 6a2a78 vibrant purple
  // 32a852 vibrant green
  // fc0f03 vibrant red

  if(disco) {
    disco=false;
    let temp;
    console.log(purpleLight.color.getHex());
    // setTimeout(()=> {
    //   temp=purpleLight.color
    // })
  }

   //
   //  if(lightningBoolean===true) {
   //    console.log('in lightning render');
   //    if(Math.random() > 0.95 && blueLight.power<100) {
   //
   //      blueLight.position.set(
   //        Math.random()*400,
   //        100 + Math.random() *200,
   //        100 + Math.random() *100
   //      );
   //      blueLight.power=(Math.random()*300 + 300);
   //  }
   //   setTimeout(()=>{blueLight.power = 10;},Math.random()*100)
   // }

  renderer.render(scene,camera)
  requestAnimationFrame(render);
  }
  init();

})
