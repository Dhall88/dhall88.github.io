
$(() => {

  let scene, camera, renderer, blueLight, currentCloudNum, BlueLightPower, bluePurpleLightPower, cloud, cloud2, bluePurpleLight, lightningBoolean
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

  // let purpleLight = new THREE.PointLight(0x6a2a78,25,450,1.7);
  // purpleLight.position.set(200,300,100);
  // purpleLight.position.set(150,350,100);
  // scene.add(purpleLight);
  bluePurpleLight = new THREE.PointLight(0x5a42f5,bluePurpleLightPower,450,1.7);
  bluePurpleLight.position.set(50,550,100);
  scene.add(bluePurpleLight);
  blueLight = new THREE.PointLight(0x3677ac,0,450,1.7);
  blueLight.position.set(700,300,50);
  scene.add(blueLight);
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
  }
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
  function render() {
    let windowHeight=$(window).height();
    let scrollPosition=$(window).scrollTop();
    var lastScrollTop = 0;
    $(window).scroll(function(event){
       // if (scrollPosition >= lastScrollTop){
           // downscroll code
           if(cloudParticles[0]!=undefined && scrollPosition<2*windowHeight && scrollPosition>windowHeight/20) {
             console.log(Math.floor(scrollPosition/windowHeight)*20);
             cloudParticles[Math.floor(scrollPosition/windowHeight*20)].material.opacity=((20*scrollPosition/windowHeight)-Math.floor(scrollPosition/windowHeight *20))*.2
           }
           if (scrollPosition>2*windowHeight) {
             cloudRotation=0.001
           }
           if (scrollPosition>3*windowHeight&&scrollPosition<4*windowHeight) {
             bluePurpleLight.power=25;
           }
           if (scrollPosition>4*windowHeight) {
            lightningBoolean=true;
           }
           if(scrollPosition>5*windowHeight) {
              $("body").mousemove(function(event){
                var relPageCoords = vent.pageY
                console.log(relPageCoordsz);
           })
           console.log('in final if');
         }
    // }
    // else {
    //      cloudParticles[Math.floor(scrollPosition/windowHeight*40)].material.opacity=0
    //    // upscroll code
    // }
    lastScrollTop = scrollPosition;
  });

    cloudParticles.forEach((cloud,index) => {
      cloud.material.opacity=scrollPosition/windowHeight*0.2
        cloud.rotation.z -= cloudRotation
      });

    if(lightningBoolean===true) {
      if(Math.random() > 0.95 && blueLight.power<100) {

        blueLight.position.set(
          Math.random()*400,
          100 + Math.random() *200,
          100 + Math.random() *100
        );
        blueLight.power=(Math.random()*300 + 300);
    }
     setTimeout(()=>{blueLight.power = 10;},Math.random()*100)
   }

  renderer.render(scene,camera)
  requestAnimationFrame(render);
  }
  init();

})
