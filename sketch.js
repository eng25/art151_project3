let img = "";
let cnv;
const apikey = "563492ad6f917000010000014e46cda0204346158c800d5f018c30e2";
var imgURL;
let searchWord = prompt("Please enter search word: ");
let fetchURL = `https://api.pexels.com/v1/search?query=${searchWord}`;

// *** LAUNCHPAD CODE ***
// console.log(navigator);

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

  inputs.forEach((input) => {
      //console.log(input);
      input.addEventListener('midimessage', handleInput);
  })

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
  switch(note) {
    case 84:
      show_color(1);
      break;
    case 85:
      show_color(2);
      break;
    case 86:
      show_color(3);
      break;
    case 87:
      show_color(4);
      break;
    case 88:
      show_color(5);
      break;
    case 89:
      show_color(6);
      break;
    case 90:
      show_color(7);
      break;
    case 91:
      show_color(8);
      break;
    case 92:
      show_color(9);
      break;
    case 93:
      show_color(10);
      break;
    case 94:
      show_color(11);
      break;
    case 95:
      show_color(12);
      break;
    case 96:
      show_color(13);
      break;
    case 97:
      show_color(14);
      break;
    case 98:
      show_color(15);
      break;
    case 99:
      show_color(16);
      break;
  }
}

// *** P5 CODE ***
function preload() {
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
      imgURL = data.photos[0].src.large;
      console.log(`imgURL: ${imgURL}`);
      img = loadImage(imgURL);
      return img;
    })

  // TEST IMAGE
  // img = loadImage('https://media.istockphoto.com/photos/abstract-exhibition-background-with-ultraviolet-neon-lights-glowing-picture-id1298834196?b=1&k=20&m=1298834196&s=170667a&w=0&h=YHZkqjKMZishTRcAcqkn9FQGKc_DFs7HP0cRi3yJBz4=');
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight - 20);
  background(25);
  // console.log(`window - w: ${windowWidth} - h: ${windowHeight}`);
  // console.log(`image - w ${img.width} - h ${img.height}`);
  let newCanvasX = (windowWidth - img.width)/2;
  let newCanvasY = (windowHeight - img.height)/2;
  // console.log('Canvas Created');
}

function draw() {

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
  console.log(`r: ${r}, g: ${g}, b: ${b}`);
  return h
}

function show_color(hue_range) {
  // Idea: Determine size based off duration of user's press?
  let s = 10;
  let xCenterOffSet = (windowWidth/2)   - (img.width/2);
  let yCenterOffSet = (windowHeight/2)  - (img.height/2);
  // console.log(`xCenterOffSet = ${xCenterOffSet}`);
  // console.log(`yCenterOffSet = ${yCenterOffSet}`)
  for(let col = 0; col < img.width; col += s) {
    for (let row = 0; row < img.height; row += s) {
      let xPos = col;
      let yPos = row;
      let c = img.get(xPos, yPos);
      
      let h = getHue(c[0], c[1], c[2]);
      
      let min_hue = 22.5 * (hue_range - 1);
      let max_hue = 22.5 * hue_range;

      xPos += xCenterOffSet;
      yPos += yCenterOffSet;
      
      if (h >= min_hue && h <= max_hue) {
        draw_point(xPos, yPos, c, 2 * s);
      }
      // Default: Draw all points
      // draw_point(xPos, yPos, c, 2 * s);
    }
  }
}
