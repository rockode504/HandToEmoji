Webcam.set
({
   width:350,
   height:260,
   image_format: 'png',
   flip_horiz: true,
   png_quality: 1000
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function takeShot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML='<img id="capturedImage" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/EwPQBJyZn/model.json", modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!");
}

function checkShot()
{
    img=document.getElementById("capturedImage");
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("resultEmotion").innerHTML=results[0].label;

        toSpeak="";

        if(results[0].label=="Peace")
        {
            toSpeak="Peace!";
            document.getElementById("updateEmoji").innerHTML="✌🏽"; 
        }
        if(results[0].label=="Good")
        {
            toSpeak="Good!";
            document.getElementById("updateEmoji").innerHTML="👍🏽"; 
        }
        if(results[0].label=="Yo")
        {
            toSpeak="Yo!";
            document.getElementById("updateEmoji").innerHTML="&#129304;"; 
        }

        speak();
    }
}

function speak()
{
    var synth=window.speechSynthesis;4
    speakData=toSpeak;
    var utterThis= new SpeechSynthesisUtterance(speakData);
    synth.speak(utterThis);
}