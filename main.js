img ="";
status = "";
objects = [];
sound = "";
function preload()
{
    sound = loadSound("purge_siren.mp3");
}
function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start ()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}
function modelLoaded()
{
    console.log("model Loaded!");
    status = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
    
function draw()
{
    image(video,0,0,380,380);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++)
        {
            
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width, objects[i].height);
            if(objects.length == 0)
            {
                document.getElementById("status").innerHTML = "Status : Baby Not Detected";
                sound.play();
            }
            if(objects[i].label == "person")
            {
                document.getElementById("status").innerHTML = "Status : Baby Detected";
                sound.stop();
                console.log("stop");
            }
            else
            {
                document.getElementById("status").innerHTML = "Status : Baby Not Detected";
                sound.play();
                console.log("play"); 
            }
            
        }
    }
}
