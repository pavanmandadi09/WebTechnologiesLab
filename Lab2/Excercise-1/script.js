// Get canvas and 2D drawing context
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Filled rectangle
ctx.fillStyle = "skyblue";
ctx.fillRect(20, 20, 150, 80);   // x, y, width, height

// Filled circle
ctx.beginPath();
ctx.arc(300, 80, 40, 0, 2 * Math.PI); // x, y, radius, startAngle, endAngle
ctx.fillStyle = "lightgreen";
ctx.fill();

// Straight line
ctx.beginPath();
ctx.moveTo(50, 200);   // start point
ctx.lineTo(450, 250);  // end point
ctx.strokeStyle = "red";
ctx.lineWidth = 3;
ctx.stroke();

// Text "HTML5 Canvas"
ctx.font = "24px Arial";
ctx.fillStyle = "black";
ctx.fillText("HTML5 Canvas", 170, 180); // text, x, y
