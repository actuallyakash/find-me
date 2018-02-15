
/*click on bouncing pointer to jump
onto your location*/





var late=0,lone=0;
var myCenter=new google.maps.LatLng(5,5);
var api = "AIzaSyATdEOd1B1xUvso3KAnP5Zp5KLqjKnub6M";
/*my geo code*/
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
	late = position.coords.latitude;
	lone = position.coords.longitude;

	myCenter=new google.maps.LatLng(late,lone);
	revg();
	initialize(myCenter);
}

function revg()
{	
	$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+late+","+lone+"&key="+api, function(reverse){
		var city = reverse.results[0].address_components[3].long_name;
		document.getElementById('loc').innerHTML = city;
	});	
}

function initialize(myCenter){
	var mapProp = {
	center:myCenter,
	zoom:5,
	panControl:true,			//used for disabling
    zoomControl:true,			//controls on map
    mapTypeControl:false,
    scaleControl:false,
    streetViewControl:true,
    overviewMapControl:false,
    rotateControl:false,  
	mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	
	var marker=new google.maps.Marker({
		position:myCenter,
		animation:google.maps.Animation.BOUNCE
	});
	marker.setMap(map);
	
	/*var info = new google.maps.InfoWindow({
		content:"You are here!"
	});
	info.open(map,marker);*/
	
	google.maps.event.addListener(marker,'click',function(){
		map.setZoom(20);
		map.setCenter(marker.getPosition());
	});
	google.maps.event.addDomListener(window,'load',initialize);
}