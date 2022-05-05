// WITH COLOR
// let img = "";
let cnv;
const apikey = "563492ad6f917000010000014e46cda0204346158c800d5f018c30e2";
var imgURL;
let searchWord = prompt("Please enter search word: ");
let fetchURL = `https://api.pexels.com/v1/search?query=${searchWord}`;

// *** Lists ***
let urlLyst = [];
let imgLyst = [];
let XoffSetLyst = [];
let YoffSetLyst = [];


// *** LAUNCHPAD CODE ***
// console.log(navigator);
let device;

if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(success, failure);
}

function failure() {
  console.log("Could not connect MIDI");
}

function updateDevices(event) {
  console.log(event);
}

function success(midiAccess) {
  //console.log(midiAccess);
  midiAccess.addEventListener('statechange', updateDevices);
  const inputs = midiAccess.inputs;
  //console.log(inputs);

  for (var output of midiAccess.outputs.values()) {
    device = output;
    console.log('Output device selected', device);
  }

  inputs.forEach((input) => {
      //console.log(input);
      input.addEventListener('midimessage', handleInput);
  })

  setupColor();
}

function colorKeys(key, clr) {
  device && device.send([0x90, key, clr]);
}

function setupColor() {
  // set 1
  colorKeys(84, 5);
  colorKeys(68, 5);
  colorKeys(52, 5);
  colorKeys(36, 5);
  
  // set 2
  colorKeys(85, 9);
  colorKeys(69, 9);
  colorKeys(53, 9);
  colorKeys(37, 9);

  // set 3
  colorKeys(86, 13);
  colorKeys(70, 13);
  colorKeys(54, 13);
  colorKeys(38, 13);

  // set 4
  colorKeys(87, 17);
  colorKeys(71, 17);
  colorKeys(55, 17);
  colorKeys(39, 17);

  // set 5
  colorKeys(88, 21);
  colorKeys(72, 21);
  colorKeys(56, 21);
  colorKeys(40, 21);

  // set 6
  colorKeys(89, 25);
  colorKeys(73, 25);
  colorKeys(57, 25);
  colorKeys(41, 25);

  // set 7 
  colorKeys(90, 29);
  colorKeys(74, 29);
  colorKeys(58, 29);
  colorKeys(42, 29);
  
  // set 8
  colorKeys(91, 33);
  colorKeys(75, 33);
  colorKeys(59, 33);
  colorKeys(43, 33);
  
  // set 9
  colorKeys(92, 37);
  colorKeys(76, 37);
  colorKeys(60, 37);
  colorKeys(44, 37);

  // set 10
  colorKeys(93, 41);
  colorKeys(77, 41);
  colorKeys(61, 41);
  colorKeys(45, 41);

  // set 11
  colorKeys(94, 45);
  colorKeys(78, 45);
  colorKeys(62, 45);
  colorKeys(46, 45);

  // set 12
  colorKeys(95, 47);
  colorKeys(79, 47);
  colorKeys(63, 47);
  colorKeys(47, 47);

  // set 13
  colorKeys(96, 49);
  colorKeys(80, 49);
  colorKeys(64, 49);
  colorKeys(48, 49);

  // set 14
  colorKeys(97, 53);
  colorKeys(81, 53);
  colorKeys(65, 53);
  colorKeys(49, 53);

  // set 15
  colorKeys(98, 57);
  colorKeys(82, 57);
  colorKeys(66, 57);
  colorKeys(50, 57);

  // set 16
  colorKeys(99, 95);
  colorKeys(83, 95);
  colorKeys(67, 95);
  colorKeys(51, 95);
}

function handleInput(input) {
  const command   = input.data[0];
  const note      = input.data[1];
  const velocity  = input.data[2];

  if (velocity > 0) {
    // console.log(`command: ${command}, note: ${note}, velocity: ${velocity}`);
    noteOn(note);
  }
}

function noteOn(note) {
  console.log(`note:${note} // on`);
  let hueValue = -1;
  let imgIndex = -1;
  switch(note) {
    case 84:
    case 68:
    case 52:
    case 36:
      hueValue = 1;
      break;
    case 85:
    case 69:
    case 53:
    case 37:
      hueValue = 2;
      break;
    case 86:
    case 70:
    case 54:
    case 38:
      hueValue = 3;
      break;
    case 87:
    case 71:
    case 55:
    case 39:
      hueValue = 4;
      break;
    case 88:
    case 72:
    case 56:
    case 40:
      hueValue = 5;
      break;
    case 89:
    case 73:
    case 57:
    case 41:
      hueValue = 6;
      break;
    case 90:
    case 74:
    case 58:
    case 42:
      hueValue = 7;
      break;
    case 91:
    case 75:
    case 59:
    case 43:
      hueValue = 8;
      break;
    case 92:
    case 76:
    case 60:
    case 44:
      hueValue = 9;
      break;
    case 93:
    case 77:
    case 61:
    case 45:
      hueValue = 10;
      break;
    case 94:
    case 78:
    case 62:
    case 46:
      hueValue = 11;
      break;
    case 95:
    case 79:
    case 63:
    case 47:
      hueValue = 12;
      break;
    case 96:
    case 80:
    case 64:
    case 48:
      hueValue = 13;
      break;
    case 97:
    case 81:
    case 65:
    case 49:
      hueValue = 14;
      break;
    case 98:
    case 82:
    case 66:
    case 50:
      hueValue = 15;
      break;
    case 99:
    case 83:
    case 67:
    case 51:
      hueValue = 16;
      break;
  }
  if (note >= 36 && note <= 51) {
    show_color(0, hueValue);
  }
  if (note >= 52 && note <= 67) {
    show_color(1, hueValue);
  }
  if (note >= 68 && note <= 83) {
    show_color(2, hueValue);
  }
  if (note >= 84 && note <= 99) {
    show_color(3, hueValue);
  }
}

// *** P5 CODE ***
function preload() {
  setupColor();
  fetch(fetchURL, {
    headers: {
      Authorization: apikey
    }
  })
    .then(resp => {
      return resp.json()
    })
    .then(data => {
      // console.log(data.photos);
      // console.log(data.photos[0].src.large);
      // imgURL = data.photos[0].src.large;
      urlLyst[0] = data.photos[0].src.large;
      urlLyst[1] = data.photos[1].src.large;
      urlLyst[2] = data.photos[2].src.large;
      urlLyst[3] = data.photos[3].src.large;
      // console.log(`imgURL: ${imgURL}`);
      console.log(`urlLyst[0] = ${urlLyst[0]}`);
      console.log(`urlLyst[1] = ${urlLyst[1]}`);
      console.log(`urlLyst[2] = ${urlLyst[2]}`);
      console.log(`urlLyst[3] = ${urlLyst[3]}`);
      // img = loadImage(imgURL);
      imgLyst[0] = loadImage(urlLyst[0]);
      imgLyst[1] = loadImage(urlLyst[1]);
      imgLyst[2] = loadImage(urlLyst[2]);
      imgLyst[3] = loadImage(urlLyst[3]);
      return imgLyst;
    })

  // TEST IMAGE
  // img = loadImage('https://media.istockphoto.com/photos/abstract-exhibition-background-with-ultraviolet-neon-lights-glowing-picture-id1298834196?b=1&k=20&m=1298834196&s=170667a&w=0&h=YHZkqjKMZishTRcAcqkn9FQGKc_DFs7HP0cRi3yJBz4=');
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight - 20);
  background(25);
  // console.log(`window - w: ${windowWidth} - h: ${windowHeight}`);
  // console.log(`image - w ${img.width} - h ${img.height}`);
  // let newCanvasX = (windowWidth - imgLyst[0].width)/2;
  // let newCanvasY = (windowHeight - imgLyst[0].height)/2;
  // console.log('Canvas Created');
}


function draw_point(xPos, yPos, c, max_size) {
    noFill();
    stroke(color(c))
    strokeWeight(random(max_size));
    point(xPos, yPos);
}

function getHue(r, g, b) {
  let calcR = r/255.0;
  let calcG = g/255.0;
  let calcB = b/255.0;
  let mx = max(r, g, b);
  let mn = min(r, g, b);
  let df = mx - mn;
  var h = -1;
  if (mx == r) {
    h = (60 * ((g-b)/df) + 360) % 360;
  }
  if (mx == g) {
    h = (60 * ((b-r)/df) + 120) % 360;
  }
  if (mx == b) {
    h = (60 * ((r-g)/df) + 240) % 360;
  }
  if (r === g && r === b) {
    return r;
  }
  // console.log(`r: ${r}, g: ${g}, b: ${b}`);
  return h
}

function show_color(imgIndex, hue_range) {
  // Idea: Determine size based off duration of user's press?
  let s = 10;
  // let xCenterOffSet = (windowWidth/2)   - (img.width/2);
  // let yCenterOffSet = (windowHeight/2)  - (img.height/2);
  XoffSetLyst[imgIndex] = (windowWidth/2)  - (imgLyst[imgIndex].width/2);
  YoffSetLyst[imgIndex] = (windowHeight/2) - (imgLyst[imgIndex].height/2);
  // console.log(`xCenterOffSet = ${xCenterOffSet}`);
  // console.log(`yCenterOffSet = ${yCenterOffSet}`)
  for(let col = 0; col < imgLyst[imgIndex].width; col += s) {
    for (let row = 0; row < imgLyst[imgIndex].height; row += s) {
      let xPos = col;
      let yPos = row;
      let c = imgLyst[imgIndex].get(xPos, yPos);
      
      let h = getHue(c[0], c[1], c[2]);
      
      let min_hue = 22.5 * (hue_range - 1);
      let max_hue = 22.5 * hue_range;

      xPos += XoffSetLyst[imgIndex];
      yPos += YoffSetLyst[imgIndex];
      
      if (h >= min_hue && h <= max_hue) {
        draw_point(xPos, yPos, c, 2 * s);
      }
      // Default: Draw all points
      // draw_point(xPos, yPos, c, 2 * s);
    }
  }
}
