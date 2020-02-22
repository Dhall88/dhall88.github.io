
$(() => {

  let scene, camera, renderer, blueLight, currentCloudNum, BlueLightPower, bluePurpleLightPower, cloud;
  let cloudParticles = [];

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

  let purpleLight = new THREE.PointLight(0x6a2a78,25,450,1.7);
  // purpleLight.position.set(200,300,100);
  purpleLight.position.set(150,350,100);
  scene.add(purpleLight);
  let bluePurpleLight = new THREE.PointLight(0x5a42f5,25,450,1.7);
  bluePurpleLight.position.set(50,550,100);
  scene.add(bluePurpleLight);
  blueLight = new THREE.PointLight(0x3677ac,25,450,1.7);
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
  cloudMaterial = new THREE.MeshLambertMaterial({
  map:texture,
  transparent: true
  });
  for(let p=0; p<40; p++) {
  cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
  cloud.position.set(
    Math.random()*400 -200,
    500,
    Math.random()*300-400
  );
  cloud.rotation.x = 1.16;
  cloud.rotation.y = -0.12;
  cloud.rotation.z = Math.random()*2*Math.PI;
  cloud.material.opacity = 0;
  cloudParticles.push(cloud);
  scene.add(cloud);
  }
  });



  render();
  }
  function render() {
    let windowHeight=$(window).height();
    let scrollPosition=$(window).scrollTop();
  // cloudParticles.forEach((p,index) => {
  //   if (scrollPosition<windowHeight){
  //     console.log(index);
      if(cloudParticles[0]==undefined) {
        return
      }else {
        console.log('in else');
        cloudParticles[0].material.opacity=0.2
      // p.material.opacity=0.2
      }
  //
  //   }
    // else if (scrollPosition>windowHeight) {
    //   console.log('in else if');
    //   p.material.opacity=0.2
    // }
    //   p.rotation.z -=0.001;
    // });
    // console.log(cloudParticles);
    // console.log(cloudParticles[0]);
    // cloud = cloudParticles[0];
    // cloud.material.opacity=0.2;
    // console.log(cloud);

    if(Math.random() > 0.95 && blueLight.power<100) {

        blueLight.position.set(
          Math.random()*400,
          100 + Math.random() *200,
          100 + Math.random() *100
        );
        blueLight.power=(Math.random()*300 + 300);
    }
     setTimeout(()=>{blueLight.power = 10;},Math.random()*100)

  renderer.render(scene,camera)
  requestAnimationFrame(render);
  }
  init();

})
