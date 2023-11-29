//para conocer mas sobre el API de google maps,entrar al siguiente url.
//vienen tutoriales, reglas y especificaciones ,ademas de ejemplos que son  los que utilizo aqui.
//https:developers.google.com/maps/documentacion/javascript/tutorial?hl=es

//variables
let mapa=null; //mapa  de google maps
//iniciamos con la ubicacion de la  FEI
let latitud=19.541142
let longitud= -96.9271873;
// coordenadas de donde esta el cliente
let latitudehome;
let longitudehome;
let trasportesselect=document.getElementById("transporte");
let rutacheck = document.querySelector("#Ruta");
let directionsRenderer =new google.maps.DirectionsRender();
// Esta funcion dibuja el mapa  y coloca  un marcador selecccionable en la FEI
function dibujamapa(){
mapa=$('mapa').locationpicker({
  location:{latitude:latitud,longitude:longitud },
  radius:300,
  addressformat:'point_of_interest',
  inputBiding:{
    latitudeinput: $('#Latitud'),
    longituddeInput: $('#Longitud'),
    locationNameInput: $('#Localizador')

  } ,
  enableAutocomplete: true,
  enableReverseGeocode: true,
  onchanged: function (currentLocation,radius,isMarkerDropped){
    latitud = currentLocation.latitude;
    longitud = currentLocation.longitude;
    distancia();
  }
});
}
function miubicacion(){
//obtiene el mapa
let mapContext= mapa.locationpicker('map');
//probamos el API HTML5 de geolocalizacion esta disponible en el cliente
if (navigator.geolocation){
navigator.geolocation.getcurrentposition(
    (position)=>{
        latitudehome= position.coords.latitude;
        longitudehome =position.coords.longitude;
        new google.maps.marker({
            position: {lat:latitude,ing:longitudHome},
            map:mapContext.map,
            title:"esta es tu ubicacion actual",
            icon:"images/home.png"
        });
        distancia();
    },

() => {
    $('Distancia').val("La localizacion no esta activada.");
}
);
    }else{
        $('#Distancia').val("el navegador no soporta geolocalizacion")
    }

}
function distancia(){
    // obtiene el mapa
    let mapcontext =mapa.locationpicker('map');

    //inicia los servicios para la distancia
    const service = new google.maps.distanceMatrixService();
    const selectedmode =document.getElementById("transporte").value;
    //Peticion para la distancia
    const origen ={lat:latitudHome, Lng:longitudhome};
    const destino ={lat:latitud,Lng:longitud}
    const request ={
        origins:[origen],
        destinations:[destino],
        travelmode:google.maps.Travelmode[selectMode],
        unitSystem:google.maps.unitSystem,METRIC,
        avoidHigways:false,
        avoidTolls:false,
    };
//obtiene distancia utilizando google matrix
service.getDistancematrix(request).then((response)=>{
    if(response.rows.leng > 0) {
        $('#Distancia').val (response.rows[0].elements[0].distance.text);
        $('#Tiempo').val (response.rows[0].elements.duration.text);
    }
    });

    //haora vamos a dibujar la ruta
    if (rutaCheck.checked){
        const directionService =new google.maps.directionService();
        directionsRenderer.setMap(mapcontext.map);

        directionService
        .route({
            origin:origen,
            destination:destino,
            //javascript nos permite acceder  a la constante usando corchetes y un valor 
            // de cadena de la propiedad
            travelmode: google.maps,Travelmode[selectMode]
        });
    }else{
        directionsRenderer.setmap(null);
    }
}
//calcula la distancia al cambiar de transporte
[transportesselect,rutacheck].forEach(item=>{
    item.addEventlistener("chage",function() {
        distancia();
    });
});

//se inicia cuando la pagina ha cargado por completo
$(function(){
    dibujamapa();
    miubicacion();
});
        
    








