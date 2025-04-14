import fs from 'fs';
import ffmpegStatic from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';
import { Canvas, createCanvas, } from 'canvas';
import { stitchFramesToVideo } from './utils/stitchFramesToVideo.js';
import { fadeBox, flipAnimation, resizeingElement, rotateBox } from './utils/allAnimation.js';
import { fontLoader, imageLoder, shapesLoder } from './utils/loadElements.js';

// Tell fluent-ffmpeg where it can find FFmpeg
ffmpeg.setFfmpegPath(ffmpegStatic);


// const timmerArray = { 0: ['e1', 'e7'], 120: ['e3', 'e1', 'e2'], 150: ['e3','e5', 'e1', 'e2', 'e4'] };
const timmerArray = {
  // 0: ['e3'], 
  0: ['e1', 'e2'],
  120: ['e3', 'e1', 'e2'],
  180: ['e1', 'e2', 'e3', 'e4', 'e5'],
  300: ['e6', 'e7', 'e8', 'e4', 'e5'],
  420: ['e9', 'e10', 'e11', 'e12',],
  540: ['e13', 'e14', 'e15', 'e16', , 'e17', 'e18'],
  660: ['e19', 'e20', 'e21', 'e22',],
};
const timmerArrayKeys = Object.keys(timmerArray);
//  For get value from the timmerArray array by using loop 
let randerFrames = 0;
const timer = {
  // First 2 second
  e1: {
    Number: 'e1',
    toY: 0, setY: 0, toX: -1280, setX: 0,
    Y: 0, X: -1280,
    starttinging: 0, timing: 2, frametiming: 2,
    animationName: "moveBox", opacity: 1,
    element: 'shape', width: 1280, height: 240, shape: 'react', borderr: 0, bg: '#FF671F'
  },
  e2: {
    Number: 'e2',
    toY: 480, setY: 480, toX: 1280, setX: 0,
    Y: 480, X: 1280,
    starttinging: 0, timing: 2, frametiming: 2,
    animationName: "moveBox", opacity: 1,
    element: 'shape', width: 1280, height: 240, shape: 'react', borderr: 0, bg: '#046A38'
  },
  // 3 second
  e3: {
    Number: 'e3',
    Y: 260, X: 540,
    starttinging: 0, timing: 2, frametiming: 4,
    animationName: "fadeBox", opacity: 0, opacitylast: 1, opacityfrom: 0, opacityto: 1,
    element: 'image', width: 200, height: 200, borderr: 0, url: 'public/assets/images/ashoka-chakra.png'
  },
  // // 4 second
  e4: {
    Number: 'e4',
    toY: 80, setY: 80, toX: -80, setX: 40,
    Y: 80, X: -80,
    starttinging: 0, timing: 1, frametiming: 4,
    animationName: "moveBox", opacity: 1,
    element: 'text', width: 200, height: 240, borderr: 0, color: '#000', textvalue: '2023',
    fontsize: 50, fontfamily: 'public/assets/images/Caveat-VariableFont_wght.ttf'
  },
  e5: {
    Number: 'e5',
    Y: 260, X: 540,
    starttinging: 0, timing: 1, frametiming: 4, animationName: "rotateBox", opacity: 1,
    loop: 'infinity', position: 'clockwise', rotate: 0, startrotate: 0, endrotate: 160,
    element: 'image', width: 200, height: 200, borderr: 0, url: 'public/assets/images/ashoka-chakra.png',
  },
  // // 5 second


  e6: {
    Number: 'e6',
    toY: 0, setY: 0, toX: 0, setX: -1280,
    Y: 0, X: 0,
    starttinging: 0, timing: 2, frametiming: 7,
    animationName: "moveBox", opacity: 1,
    element: 'shape', width: 1280, height: 240, shape: 'react', borderr: 0, bg: '#FF671F'
  },
  e7: {
    Number: 'e7',
    toY: 480, setY: 480, toX: 0, setX: -1280,
    Y: 480, X: 0,
    starttinging: 0, timing: 2, frametiming: 7,
    animationName: "moveBox", opacity: 1,
    element: 'shape', width: 1280, height: 240, shape: 'react', borderr: 0, bg: '#046A38'
  },
  e8: {
    Number: 'e8',
    toY: 260, setY: 260, toX: 540, setX: -540,
    Y: 260, X: 540,
    starttinging: 0, timing: 2, frametiming: 7,
    animationName: "moveBox", opacity: 1,
    element: 'image', width: 200, height: 200, borderr: 0, url: 'public/assets/images/ashoka-chakra.png'
  },



  e9: {
    Number: 'e9',
    toY: 250, setY: 250, toX: 500, setX: 100,
    Y: 50, X: 50,
    starttinging: 0, timing: 2, frametiming: 9,
    animationName: "resizeBox", opacity: 1,
    element: 'shape', width: 500, height: 250, shape: 'react', borderr: 0, bg: '#FF671F'
  },
  e10: {
    Number: 'e10',
    toY: 500, setY: 100, toX: 200, setX: 200,
    Y: 50, X: 600,
    starttinging: 0, timing: 2, frametiming: 9,
    animationName: "resizeBox", opacity: 1,
    element: 'shape', width: 200, height: 500, shape: 'react', borderr: 0, bg: '#671FFF'
  },
  e11: {
    Number: 'e11',
    toY: 250, setY: 250, toX: 500, setX: 100,
    Y: 300, X: 50,
    starttinging: 0, timing: 2, frametiming: 9,
    animationName: "resizeBox", opacity: 1, resizeflow: 'right',
    element: 'shape', width: 500, height: 250, shape: 'react', borderr: 0, bg: '#F1FF67'
  },
  e12: {
    Number: 'e12',
    toY: 500, setY: 100, toX: 200, setX: 200,
    Y: 50, X: 800,
    starttinging: 0, timing: 2, frametiming: 9,
    animationName: "resizeBox", opacity: 1, resizeflow: 'bottom',
    element: 'shape', width: 200, height: 500, shape: 'react', borderr: 0, bg: '#67F1FF'
  },



  e13: {
    Number: 'e13',
    Y: 50, X: 50,
    starttinging: 0, timing: 2, frametiming: 11,
    animationName: "fadeBox", resizing: true, opacity: 0, opacitylast: 1, opacityfrom: 0, opacityto: 1,
    element: 'text', width: 10, height: 500, borderr: 0, color: '#f00',
    textvalue: 'bhupnder', fontfamily: 'public/assets/images/Caveat-VariableFont_wght.ttf'
  },
  e14: {
    Number: 'e14',
    toY: 100, setY: 100, toX: 10, setX: 500,
    Y: 50, X: 50,
    starttinging: 0, timing: 2, frametiming: 11,
    animationName: "resizeBox", opacity: 'e1', resizeflow: 'textUpdate',
    element: 'text', width: 10, height: 500, borderr: 0, color: '#f00',
    textvalue: 'bhupnder', fontfamily: 'public/assets/images/Caveat-VariableFont_wght.ttf'
  },

  e15: {
    Number: 'e15',
    Y: 250, X: 250,
    starttinging: 0, timing: 2, frametiming: 11,
    animationName: "fadeBox", resizing: true, opacity: 1, opacitylast: 0, opacityfrom: 1, opacityto: 0,
    element: 'shape', width: 100, height: 100, shape: 'react', borderr: 0, bg: '#ff0000'
  },
  e16: {
    Number: 'e16',
    toY: 100, setY: 500, toX: 100, setX: 500,
    Y: 250, X: 250,
    starttinging: 0, timing: 2, frametiming: 11,
    animationName: "resizeBox", opacity: 'e1', resizeflow: 'all',
    element: 'shape', width: 100, height: 100, shape: 'react', borderr: 0, bg: '#ff0000'
  },
  e17: {
    Number: 'e17',
    Y: 500, X: 250,
    starttinging: 0, timing: 2, frametiming: 11,
    animationName: "fadeBox", resizing: true, opacity: 1, opacitylast: 0, opacityfrom: 1, opacityto: 0,
    element: 'shape', width: 500, height: 500, shape: 'react', borderr: 0, bg: '#ff0000'
  },
  e18: {
    Number: 'e18',
    toY: 500, setY: 100, toX: 500, setX: 100,
    Y: 500, X: 250,
    starttinging: 0, timing: 2, frametiming: 11,
    animationName: "resizeBox", opacity: 'e1', resizeflow: 'all',
    element: 'shape', width: 500, height: 500, shape: 'react', borderr: 0, bg: '#ff0000'
  },


  e19: {
    Number: 'e19',
    flipX: 1, flipY: 1, flipstatusY: 1, fliptoY: -1, flipbox: "Y",
    Y: 50, X: 50,
    starttinging: 0, timing: 2, frametiming: 13,
    animationName: "flipbox", opacity: 1,
    element: 'image', width: 200, height: 200, borderr: 0, url: 'public/assets/images/free-images.png'
  },
  e20: {
    Number: 'e20',
    flipX: 1, flipY: -1, flipstatusY: -1, fliptoY: 1, flipbox: "Y",
    Y: 50, X: 500,
    starttinging: 0, timing: 2, frametiming: 13,
    animationName: "flipbox", opacity: 1,
    element: 'image', width: 200, height: 200, borderr: 0, url: 'public/assets/images/free-images.png'
  },

  e21: {
    Number: 'e21',
    flipY: 1, flipX: 1, flipstatusX: 1, fliptoX: -1, flipbox: "X",
    Y: 450, X: 50,
    starttinging: 0, timing: 2, frametiming: 13,
    animationName: "flipbox", opacity: 1,
    element: 'image', width: 200, height: 200, borderr: 0, url: 'public/assets/images/free-images.png'
  },
  e22: {
    Number: 'e22',
    flipY: 1, flipX: -1, flipstatusX: -1, fliptoX: 1, flipbox: "X",
    Y: 450, X: 500,
    starttinging: 0, timing: 2, frametiming: 13,
    animationName: "flipbox", opacity: 1,
    element: 'image', width: 200, height: 200, borderr: 0, url: 'public/assets/images/free-images.png'
  },
}


// Clean up the temporary directories first
for (const path of ['video-module/output', 'video-module/tmp/output']) {
  if (fs.existsSync(path)) {
    await fs.promises.rm(path, { recursive: true });
  }
  await fs.promises.mkdir(path, { recursive: true });
}

const canvas = new Canvas(1280, 720);
const context = canvas.getContext('2d');

// The video length and frame rate, as well as the number of frames required
// to create the video
const duration = 20;
const frameRate = 60;
const frameCount = Math.floor(duration * frameRate);

// const logo = await loadImage('public/assets/images/ashoka-chakra.png');


// Render each frame
for (let i = 0; i < frameCount; i++) {
  // Clear the canvas with a white background color. This is required as we are
  // reusing the canvas with every frame
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);


  if (i === Number(timmerArrayKeys[randerFrames + 1])) {
    randerFrames++;
  }
  renderFrame(timmerArray[timmerArrayKeys[randerFrames]], i);


  console.log(`You are on ${i}`);
  // Store the image in the directory where it can be found by FFmpeg
  const output = canvas.toBuffer('image/png');
  const paddedNumber = String(i).padStart(4, '0');
  await fs.promises.writeFile(`video-module/tmp/output/frame-${paddedNumber}.png`, output);
}

// Stitch all frames together with FFmpeg
await stitchFramesToVideo(
  'video-module/tmp/output/frame-%04d.png',
  'public/assets/images/catch-up-loop-119712.mp3',
  'video-module/output/video.mp4',
  duration,
  frameRate,
);
 

function renderFrame(printObject, onFrame) {
  // This loop is looping on elements which are on dispaly on same frame time
  printObject.forEach(item => {
    const { animationName, frametiming, element } = timer[item];
    // Condition to check frames if over the return
    const offAnimationbyFrame = onFrame > (frametiming * frameRate);

    // Fade the box if it's not animation fadebox
    animationName == "fadeBox" ?
      fadeBox(timer, item, frameRate, onFrame) : '';

    // All shapes loder function called from here 
    if (element === 'shape') {
      shapesLoder(context, timer, item);
    }

    // Font loder function called from here 
    if (element === 'text') {
      fontLoader(context, timer, item)
    }

    // Flip the element
    if (animationName == "flipbox") {
      flipAnimation(timer, item, frameRate, onFrame)
    }

    // Rotate the element from it's center
    if (animationName == "rotateBox") {
      if (offAnimationbyFrame) return
      rotateBox(timer, item, frameRate, offAnimationbyFrame);
    }

    // Image loder function called from here 
    if (element === 'image') {
      imageLoder(context, timer, item)
    }

    // If frame time is over then return from here
    if (offAnimationbyFrame) return

    // Move box from one to second point
    if (animationName == "moveBox") {
      resizeingElement(timer, item, frameRate, 'moveBox')
    }

    // Resize the element size
    if (animationName == "resizeBox") {
      resizeingElement(timer, item, frameRate, 'resizeBox')
    }
  });

}


export { timer };