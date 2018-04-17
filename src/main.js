const nombre = "Luis";

window.addEventListener("load", ()=>{
  // Geolocataion => Navigator
  if(navigator.geolocation){
    // Si tienen la api de geolocalizacion
    navigator.geolocation.getCurrentPosition(function(localizacion) {
      // localizacion contiene la latitud y longitud en la que se encuentra el usuario
      console.log(localizacion);
      console.log("Latitud: " + localizacion.coords.latitude);
      console.log("Longitud: " + localizacion.coords.longitude);
    })
  } else {
    alert("Tu navegador no soporta las funcionalidades de esta página");
  }

})
