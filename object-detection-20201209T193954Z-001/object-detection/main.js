img="";
status="";
objects=[];
function preload(){
 img=loadImage("bear.jpg");
}
function setup(){
 canvas=createCanvas(380,380)
 canvas.center()
 

 video=createCapture(VIDEO)
 video.size(380,380)
 video.hide()


}
function start(){

 objectDetector = ml5.objectDetector('cocossd', modelLoaded)
 document.getElementById("status").innerHTML = "Status : dectecting objects"
}
function draw(){
  image(video,0,0,380,380)
  
  if(status!=""){
    r=random(255);
    g=random(225);
    b=random(255);
   objectDetector.detect(video,gotResult)

    for(var i=0; i<objects.length; i++ ){
       
      document.getElementById("status").innerHTML = "Status : dectecting objects"
      document.getElementById("number_of_objects").innerHTML="number of objects detected:" + objects.length
      fill(r,g,b)
      textSize(25)
      text(objects[i].label, objects[i].x, objects[i].y)
      noFill()
      push()
      stroke(r,g,b)
      strokeWeight(5)
      rect(objects[i].x , objects[i].y , objects[i].width, objects[i].height)
      pop()
    
    }
  }


}
function modelLoaded(){
  console.log("model loaded")
  status=true;
  objectDetector.detect(video, gotResults)

}
function gotResults(error,results){
 if(error){
 console.log(error)
 }
 else {
  console.log(results)
  objects = results;
 }
}
