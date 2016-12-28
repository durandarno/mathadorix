var nombre1,nombre2;
var etape;
var nb1,nb2,nb3,nb4,nb5,cible;
var nombreselectionne2=0;
var opselectionnee="";
var nombreselectionne1=0;
var chronoarrete=0;
const pi=3.141592754
var secon=59; //initialise les secondes
var points=0;
var nb_operations_restantes=4;

function horloge()
{
		var SVG_NS ="http://www.w3.org/2000/svg";
			var p=document.getElementById("marques");
			var b=document.getElementById("small");
			for (i=0;i<60;i++){
				a=document.createElementNS(SVG_NS, "circle");
				a.setAttribute("cx", Math.cos((i-15)/30*pi)*47+50);
				a.setAttribute("cy", Math.sin((i-15)/30*pi)*47+50);
				a.setAttribute("r", "2");
				if (i%15==0){
					a.setAttribute("fill", "black");
				}else if (i%5==0){
					a.setAttribute("fill", "#ffd34e");
				}else{
					a.setAttribute("fill", "white");
				}
				a.setAttribute("stroke-width", "0.3");
				p.appendChild(a);
			}
}

function perdu()
{
	clearTimeout(compte) ;
	document.getElementById("opencours").value = "PERDU!";
	chronoarrete=1;
	
	
}

function victoire()
{
	clearTimeout(compte);
	document.getElementById("opencours").value ="VICTOIRE";
	chronoarrete=1;
}

function chrono(){
	secon--; //incrémentation des secondes de 1
	 //si les dixièmes > 9, on les réinitialise à 0 et on incrémente les secondes de 1
	document.getElementById("secondes").setAttribute("x2", Math.cos((secon-15)/30*pi)*45+50);
	document.getElementById("secondes").setAttribute("y2", Math.sin((secon-15)/30*pi)*45+50);
	if (secon<15)
	{
		document.getElementById("secondes").setAttribute("stroke","red");
	}
	else
	{
		document.getElementById("secondes").setAttribute("stroke","black");
	}
	document.getElementById("seca").value=" "+secon //on affiche les secondes
	if (secon == 0)
	{	
		perdu();
	}
	else
	{
		compte=setTimeout(chrono,1000) //la fonction est relancée tous les 10° de secondes
	}
}

function rasee(){ //fonction qui remet les compteurs à 0
	clearTimeout(compte) //arrête la fonction chrono()
	secon=59;
	document.getElementById("seca").value=" "+secon;
}
		  
function init()
{
	nb1 = Math.floor((Math.random() * 4) + 1);//dé de 4
	document.getElementById("nb1").value = nb1;
	nb2 = Math.floor((Math.random() * 6) + 1);//dé de 6
	document.getElementById("nb2").value = nb2;
	nb3 = Math.floor((Math.random() * 8) + 1);//dé de 8
	document.getElementById("nb3").value = nb3;
	nb4 = Math.floor((Math.random() * 12) + 1);//dé de 12
	document.getElementById("nb4").value = nb4;
	nb5 = Math.floor((Math.random() * 20) + 1);//dé de 20
	document.getElementById("nb5").value = nb5;
	cible= Math.floor((Math.random() * 59) + 10);//dé de 1 à 6 (dizaine) et dé de 0 à 9 (unité)
	document.getElementById("cible").value = cible;
	document.getElementById("secondes").setAttribute("x2", Math.cos((59-15)/30*pi)*45+50);
	document.getElementById("secondes").setAttribute("y2", Math.sin((59-15)/30*pi)*45+50);
	document.getElementById("secondes").setAttribute("stroke","black");
	chrono();
	horloge();	
	document.getElementById('plus').addEventListener('click', function(){   operation('+');},true);
	document.getElementById('moins').addEventListener('click', function(){   operation('-');},true);
	document.getElementById('fois').addEventListener('click', function(){   operation('x');},true);
	document.getElementById('diviser').addEventListener('click', function(){   operation(':');},true);
	
	
	document.getElementById('nb1').addEventListener('click', function(){  nb(document.getElementById('nb1').value,'nb1');},true);
	document.getElementById('nb2').addEventListener('click', function(){  nb(document.getElementById('nb2').value,'nb2');},true);
	document.getElementById('nb3').addEventListener('click', function(){  nb(document.getElementById('nb3').value,'nb3');},true);
	document.getElementById('nb4').addEventListener('click', function(){  nb(document.getElementById('nb4').value,'nb4');},true);
	document.getElementById('nb5').addEventListener('click', function(){  nb(document.getElementById('nb5').value,'nb5');},true);
	
	document.getElementById('annuler').addEventListener('click', annuler,true);
	document.getElementById('nouveaujeu').addEventListener('click', raz,true);

	document.getElementById('avecsanspoints').addEventListener('change', affichepoint,true);	
	document.getElementById('avecsanspoints').checked=false;
}
function affichepoint()
{
	if (document.getElementById('avecsanspoints').checked==true)
	{
		document.getElementById('lespoints').style.display="";
	}
	else
	{
		document.getElementById('lespoints').style.display="none";
	}
	
}
function raz()
{	  
	nb1 = Math.floor((Math.random() * 4) + 1);
	document.getElementById("nb1").value = nb1;
	nb2 = Math.floor((Math.random() * 6) + 1);
	document.getElementById("nb2").value = nb2;
	nb3 = Math.floor((Math.random() * 8) + 1);
	document.getElementById("nb3").value = nb3;
	nb4 = Math.floor((Math.random() * 12) + 1);
	document.getElementById("nb4").value = nb4;
	nb5 = Math.floor((Math.random() * 20) + 1);
	document.getElementById("nb5").value = nb5;
	cible= Math.floor((Math.random() * 60) + 10);
	document.getElementById("cible").value = cible;
	document.getElementById("secondes").setAttribute("x2", Math.cos((59-15)/30*pi)*45+50);
	document.getElementById("secondes").setAttribute("y2", Math.sin((59-15)/30*pi)*45+50);
	document.getElementById("secondes").setAttribute("stroke","black");
	document.getElementById("opencours").value = "";
	points=0;
	document.getElementById("points").value =points;
	nb_operations_restantes=4;
	rasee();
	chrono();
}

function operation(op)
{
	if (nombreselectionne1!=0)
	{
			valeur=document.getElementById("opencours").value;
			if (opselectionnee!="")
			{
				valeur=valeur.substring(0,valeur.length-1);
			}
			document.getElementById("opencours").value =valeur+op;
			opselectionnee=op;
	}
}  

function nb(valeur,caseselectionnee)
{
	if (opselectionnee=="")//c'est le premier nombre de l'opération
	{

		if (valeur=="") //si la case sur laquelle on clique est vide, on remet la valeur du dé choisi s'il y en a un qui a été selectionné
		{
			if ((document.getElementById("opencours").value!="")&&(nombreselectionne1!=''))
			{
				document.getElementById(caseselectionnee).value =document.getElementById("opencours").value;
				document.getElementById("opencours").value="";
				nombreselectionne1="";
			}
		}
		else //si la case sur laquelle on clique n'est pas vide
		{
			if (nombreselectionne1!="")
			{
				document.getElementById(nombreselectionne1).value =document.getElementById("opencours").value;
			}
				document.getElementById("opencours").value =valeur;
				nombreselectionne1=caseselectionnee;
				document.getElementById(caseselectionnee).value ="";
		}
	}
	else //c'est le deuxième nombre qui est cliqué
	{
		if (valeur=="") //si la case sur laquelle on clique est vide, on remet la valeur du dé choisi s'il y en a un qui a été selectionné
		{
			if (document.getElementById("opencours").value!="")
			{
				document.getElementById(caseselectionnee).value =document.getElementById("opencours").value.substring(0,document.getElementById("opencours").value.length-1);
				document.getElementById("opencours").value="";
				nombreselectionne1="";
				opselectionnee="";
			}
		}
		else //si la case sur laquelle on clique n'est pas vide
		{
			res=calculeroperation(valeur,caseselectionnee);
			if (res==cible)
			{
				victoire();
				points+=Math.ceil(secon);
				document.getElementById("points").value=points;
			}
			else
			{
				if (nb_operations_restantes==0)
				{
					if (document.getElementById("opencours").value!="VICTOIRE") // si la victoire n'est pas faite alors annoncer la perte
					{
						perdu();
						points+=Math.ceil(secon);
						points-=Math.abs(cible-res);
						document.getElementById("points").value=points;
						
					}
				}
			}

		}
	}
	
}

function calculeroperation(valeur,caseselectionnee)
{
	valeurtmp=document.getElementById("opencours").value;
	var nombre1=parseInt(valeurtmp.substring(0,valeurtmp.length-1));
	var nombre2=parseInt(valeur);
	var operationcomplete=valeurtmp +valeur;
	if (opselectionnee==":")
	{// on est dans le cas d'une division
		//test si le reste de la division est nul
		if (nombre1%nombre2==0)
		{
			//fin test
			nombreselectionne2=caseselectionnee;
			document.getElementById("opencours").value =operationcomplete+"="+Math.ceil(nombre1/nombre2);
			document.getElementById(caseselectionnee).value = Math.ceil(nombre1/nombre2);
			//modification du score
			points+=4;
			document.getElementById("points").value = points;
			//fin modif
			//modification du nombre d'opération possible à faire
			nb_operations_restantes-=1;
			//fin modif
			opselectionnee="";
			nombreselectionne1="";
			nombreselectionne2="";
			return Math.ceil(nombre1/nombre2);
		}
		else//on remet les des
		{
			document.getElementById(caseselectionnee).value=nombre2;
			document.getElementById(nombreselectionne1).value=nombre1;
			document.getElementById("opencours").value ="";
			opselectionnee="";
			nombreselectionne1="";
			return "";			
		}
	}
	else
	{
		if (opselectionnee=="-")
		{// on est dans le cas d'une soustraction
			//test si le reste de la soustraction est négatif
			if (nombre1-nombre2>=0)
			{
				//fin test
				nombreselectionne2=caseselectionnee;
				document.getElementById("opencours").value =operationcomplete+"="+Math.ceil(nombre1-nombre2);
				document.getElementById(caseselectionnee).value = Math.ceil(nombre1-nombre2);
				//modification du score
				points+=2;
				document.getElementById("points").value = points;
				//fin modif
				//modification du nombre d'opération possible à faire
				nb_operations_restantes-=1;
				//fin modif
				opselectionnee="";
				nombreselectionne1="";
				nombreselectionne2="";
				return Math.ceil(nombre1-nombre2);
			}
			else//on remet les des
			{
				document.getElementById(caseselectionnee).value=nombre2;
				document.getElementById(nombreselectionne1).value=nombre1;
				document.getElementById("opencours").value ="";
				opselectionnee="";
				nombreselectionne1="";
				return "";
			}
		}			
		else
		{
			
			if (opselectionnee=="x")
			{// on est dans le cas d'une multiplication
				nombreselectionne2=caseselectionnee;
				document.getElementById("opencours").value =operationcomplete+"="+Math.ceil(nombre1*nombre2);
				document.getElementById(caseselectionnee).value = Math.ceil(nombre1*nombre2);
				//modification du score
				points+=3;
				document.getElementById("points").value = points;
				//fin modif
				//modification du nombre d'opération possible à faire
				nb_operations_restantes-=1;
				//fin modif
				opselectionnee="";
				nombreselectionne1="";
				nombreselectionne2="";
				return Math.ceil(nombre1*nombre2);
			}
			else
			{//c'est une addition			
				nombreselectionne2=caseselectionnee;
				document.getElementById("opencours").value =operationcomplete+"="+Math.ceil(nombre1+nombre2);
				document.getElementById(caseselectionnee).value = Math.ceil(nombre1+nombre2);
				//modification du score
				points+=1;
				document.getElementById("points").value = points;
				//fin modif
				//modification du nombre d'opération possible à faire
				nb_operations_restantes-=1;
				//fin modif
				opselectionnee="";
				nombreselectionne1="";
				nombreselectionne2="";
				return Math.ceil(nombre1+nombre2);
			}
		}
	}
}
function annuler()
{
	if (chronoarrete)
	{
		chrono();
	}
	document.getElementById("nb1").value = nb1;
	document.getElementById("nb2").value = nb2;
	document.getElementById("nb3").value = nb3;
	document.getElementById("nb4").value = nb4;
	document.getElementById("nb5").value = nb5;
	points=0;
	document.getElementById("points").value =points;
	document.getElementById("opencours").value = "";
	opselectionnee="";
	nombreselectionne1="";
	nombreselectionne2="";
}

window.onload=init();
