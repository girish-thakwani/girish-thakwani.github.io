
var tiles=document.querySelectorAll(".tile");
var icons=['photos/manisha.jpg','photos/liza.jpg','photos/lavina.jpg','photos/harshita.jpg','photos/sargam.jpg','photos/simmi.jpg','photos/chunia.jpg'];
var mess=document.getElementById('mess');
var gifts=["gifts/1.jpg","gifts/2.jpg","gifts/3.jpg","gifts/4.jpg","gifts/5.jpg"];
var startButton=document.getElementById("start");
var h2=document.querySelectorAll("h2");
var container=document.getElementById("container");
var score=document.getElementById("score");
var photo=document.getElementById('tile');
var nam=document.getElementById('nam');
var names = document.getElementById("name").options;
var gift_tile=[];
var g1,g2,g3;
var correct=0,clicked=0;
$(window).on("load",function(){
function result()
{
	for(var i=0;i<tiles.length;i++)
	{
		tiles[i].style.backgroundImage="url(same.jpg)";
		tiles[i].style.backgroundSize="cover";
	}
	for(var i=0;i<tiles.length;i++)
	{
		tiles[i].addEventListener("click",function(){
			if(this.style.opacity!=0.5)
			clicked++;
			this.style.opacity="0.5";
			if(this.id==g1||this.id==g2||this.id==g3)
				{correct++;}
			if(clicked===3)
			{
				displayScore(correct);
			}				
		});

	}
}
function displayScore(x)
{
	
	container.style.display="none";
	document.getElementById("bar").style.display="block";
	if(x==3){
	var name=document.getElementById('name').selectedIndex;
	score.textContent="Congratulation!!! You Got a Win "+names[name].text+'.';
	photo.style.backgroundImage="url("+icons[names[name].index-1]+")";
	mess.textContent="Go! Go! Go! Get Your Gift From Him !!!";
}	
	else
	score.textContent="You Lost!! Just refresh the page to get your gift.";
}
startButton.addEventListener("click",function(){
		nam.style.display="none";
		startButton.style.display="none";
		for(var i=0;i<h2.length;i++)
		{
			h2[i].style.display="none";
		}
		generateGrid();
		container.style.display="block";
		setTimeout(result,2200);
});
function randomNum(x)
{
	
	var rand=Math.floor(Math.random()*x);
	return rand;
}


function generateGrid(){

for(var i=0;i<tiles.length;i++)
{
	var r=randomNum(7);
	tiles[i].style.backgroundImage="url("+icons[r]+")";
}

var unique=1,p=randomNum(25);
gift_tile.push(p);
for(var i=0;i<tiles.length;i++)
{
	var r=randomNum(7);
	tiles[i].style.backgroundImage="url("+icons[r]+")";
}
while(unique<=2)
{
	p=randomNum(25);
	var flag=0;
	for(var z=0;z<gift_tile.length;z++)
	{
		if(gift_tile[z]===p)
		{
			flag=1;
			break;
		}
	}
	if(flag===0)
	{
		gift_tile.push(p);
		unique++;
	}

}

for(var i=0;i<3;i++)
{
	r=randomNum(5);
	tiles[gift_tile[i]].style.backgroundImage="url("+gifts[r]+")";
	tiles[gift_tile[i]].style.backgroundSize="cover";
	
}
g1=gift_tile[0];
g2=gift_tile[1];
g3=gift_tile[2];

}//end of grid generator
})

