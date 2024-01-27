video="";
Status="";
object=[];

function preload(){
    video=createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
}

function start(){
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";

}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;

}

function modelLoaded(){
    console.log("modelLoaded");
    Status=true;
    video.loop();
    video.speed(1.2);
    video.volume(0);

}

function draw(){
    image(video,0,0,480,380);
    if(Status!=""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Objects are: Detected";
            document.getElementById("noo").innerHTML="The amount of Objects are: "+object.length;
            
            fill("#ff0000");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke("#ff0000");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}