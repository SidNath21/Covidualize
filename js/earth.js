let sphere, renderer, camera, scene, stars = [];
let radius = 30;
let phi, theta;
let longitude = [];
let latitude = [];
let x = [];
let y = [];
let z = [];
let x2 = [], y2 = [], z2 = [];
let numDeaths = [];
let numRecovered = [];
let originVector = new THREE.Vector3(0, 0, 0);

let cName = document.querySelector(".countryName");
let cData = document.querySelector(".countryData");
let cDiv = document.querySelector(".countryInfo");

const texture2 = new THREE.TextureLoader().load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_4096.jpg', () => { renderer.render(scene, camera) })
texture2.anisotropy = 1;

function addSphere() {


  for (let z = -1000; z < 1000; z += 20) {

    let geometry = new THREE.SphereGeometry(0.5, 32, 32)
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    let sphere = new THREE.Mesh(geometry, material)

    sphere.position.x = Math.random() * 1000 - 500;
    sphere.position.y = Math.random() * 1000 - 500;
    sphere.position.z = z;

    sphere.scale.x = sphere.scale.y = 2;

    scene.add(sphere);
    stars.push(sphere);
  }
}

function animateStars() {

  for (var i = 0; i < stars.length; i++) {

    star = stars[i];
    star.position.z += i / 10;
    if (star.position.z > 1000) star.position.z -= 2000;

  }

}

function init() {

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 60;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene.add(earth());

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.update();

  const light = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(light);


}

function earth() {

  let geometry = new THREE.SphereGeometry(radius, 32, 32);

  const material = new THREE.MeshLambertMaterial({ map: texture2 });
  sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(0, 0, 0);

  return sphere;

}


function block() {

  let materialA = new THREE.MeshBasicMaterial({ color: 0xC21807, wireframe: false });
  let materialB = new THREE.MeshBasicMaterial({ color: 0x008000, wireframe: false });

  fetch("https://www.trackcorona.live/api/countries")
    .then(function (response) { return response.json() })
    .then(function (locations) {

      console.log(locations.data);


      for (let i = 0; i < locations.data.length; i++) {


       


        latitude[i] = locations.data[i]["latitude"];
        longitude[i] = locations.data[i]["longitude"];


        phi = (latitude[i]) * Math.PI / 180;
        theta = (longitude[i] - 180) * Math.PI / 180;

        numDeaths[i] = locations.data[i]["dead"];
        numRecovered[i] = locations.data[i]["recovered"];


        heightA = getHeight(numDeaths[i]);

        heightB = (numRecovered[i] * heightA) / numDeaths[i];

        x[i] = -1 * (radius) * Math.cos(phi) * Math.cos(theta);

        y[i] = (radius) * Math.sin(phi);

        z[i] = (radius) * Math.cos(phi) * Math.sin(theta);



        x2[i] = -1 * (radius + heightA) * Math.cos(phi) * Math.cos(theta);

        y2[i] = (radius + heightA) * Math.sin(phi);

        z2[i] = (radius + heightA) * Math.cos(phi) * Math.sin(theta);


        let geoA = new THREE.BoxGeometry(0.5, 0.5, heightA);
        let cubeA = new THREE.Mesh(geoA, materialA);

        let geoB = new THREE.BoxGeometry(0.5, 0.5, heightA);
        let cubeB = new THREE.Mesh(geoB, materialB);

        cubeA.position.set(x[i], y[i], z[i]);
        cubeA.lookAt(originVector);
        scene.add(cubeA);

        cubeB.position.set(x2[i], y2[i], z2[i]);
        cubeB.lookAt(originVector);
        scene.add(cubeB);

        
        let countryName = locations.data[i]["location"];


        domEvents.addEventListener(cubeA, "click", function () {

          console.log(countryName, "Num Deaths", numDeaths[i]);
          cName.textContent = countryName;
          cData.textContent = `Total Deaths: ${numDeaths[i]}`;
          cDiv.style.borderColor = "#C21807";
          cName.style.borderColor = "#C21807";
          cData.style.borderColor = "#C21807";

        });

        domEvents.addEventListener(cubeB, "click", function(){

          console.log(countryName, "Num Recoveries", numRecovered[i]);
          cName.textContent = countryName;
          cData.textContent = `Total Recoveries: ${numRecovered[i]}`;
          cDiv.style.borderColor = "green";
          cName.style.borderColor = "green";
          cData.style.borderColor = "green";

        });

        domEvents.addEventListener(cubeA, "touchstart", function () {

          console.log(countryName, "Num Deaths", numDeaths[i]);
          cName.textContent = countryName;
          cData.textContent = `Total Deaths: ${numDeaths[i]}`;
          cDiv.style.borderColor = "#C21807";
          cName.style.borderColor = "#C21807";
          cData.style.borderColor = "#C21807";

        });

        domEvents.addEventListener(cubeB, "touchstart", function(){

          console.log(countryName, "Num Recoveries", numRecovered[i]);
          cName.textContent = countryName;
          cData.textContent = `Total Recoveries: ${numRecovered[i]}`;
          cDiv.style.borderColor = "green";
          cName.style.borderColor = "green";
          cData.style.borderColor = "green";

        });






      }

    })
    .catch(function () {
      console.log("Location error");
    })

}

var animate = function () {

  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  animateStars();

};

function getHeight(val) {

  let OldMax = 117853;
  let OldMin = 0;
  let NewMax = 10;
  let NewMin = 1;

  let OldValue = val;

  let OldRange = (OldMax - OldMin);
  let NewRange = (NewMax - NewMin);
  let NewValue = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin;

  return NewValue;

}

function getDeathHeight(val) {

  let OldMax = 2162144;
  let OldMin = 1;
  let NewMax = 180;
  let NewMin = 0;

  let OldValue = val;

  let OldRange = (OldMax - OldMin);
  let NewRange = (NewMax - NewMin);
  let NewValue = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin;

  return NewValue;

}

window.addEventListener("resize", function () {
  let w = window.innerWidth;
  let h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();

})





init();

let domEvents = new THREEx.DomEvents(camera, renderer.domElement);

addSphere();
animate();
block();