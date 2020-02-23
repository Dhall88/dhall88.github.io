
$(() => {

  let scene, camera, renderer, blueLight, currentCloudNum, BlueLightPower, greenLightPower, cloud, cloud2, greenLight, purpleLight, redLight
  let lightningBoolean=false;
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

  purpleLight = new THREE.PointLight(0x6a2a78,1,450,1.7);
  purpleLight.position.set(50,300,100);
  scene.add(purpleLight);

  greenLight = new THREE.PointLight(0x32a852,1,450,1.7);
  greenLight.position.set(50,500,-100);
  scene.add(greenLight);

  redLight = new THREE.PointLight(0xfc0f03,1,450,1.7);
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

  $(window).scroll(function(event){
    let windowHeight=$(window).height();
    let scrollPosition=$(window).scrollTop();
    var lastScrollTop = 0;
     // if (scrollPosition >= lastScrollTop){
         // downscroll code
         if(cloudParticles[0]!=undefined && scrollPosition<2*windowHeight && scrollPosition>windowHeight/20) {
           console.log(Math.floor(scrollPosition/windowHeight)*20);
           cloudParticles[Math.floor(scrollPosition/windowHeight*20)].material.opacity=((20*scrollPosition/windowHeight)-Math.floor(scrollPosition/windowHeight *20))*.2
           console.log('in cloud particle if');
         }
         if (scrollPosition>2*windowHeight) {
           cloudRotation=0.001
           console.log('in rotation if');
         }
         if (scrollPosition>3*windowHeight&&scrollPosition<4*windowHeight) {
           console.log('in backlight if');
           purpleLight.intensity=25;
           greenLight.intensity=25;
           redLight.intensity=25;
           // (scrollPosition-3*windowHeight)/windowHeight*
         }
         if (scrollPosition>4*windowHeight&&scrollPosition<5*windowHeight) {
          lightningBoolean=true;
          console.log('in lightning if');
         }
         if(scrollPosition>5*windowHeight) {
            $("body").mousemove(function(event){
              var relPageCoords = event.pageY
              console.log(relPageCoords);
         })
         console.log('in final if');
       }


       lastScrollTop = scrollPosition;
     });

  function render() {

    console.log(purpleLight.intensity);

    cloudParticles.forEach((cloud,index) => {
        cloud.rotation.z -= cloudRotation
      });
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
