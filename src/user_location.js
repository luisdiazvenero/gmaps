class UserLocation {
  constructor(callback){
    // Se ejecuta cuando new UserLocation

    // Geolocataion => Navigator
    if(navigator.geolocation){
      // Si tienen la api de geolocalizacion
      navigator.geolocation.getCurrentPosition((localizacion)=> {
        // esto se ejecuta cuando ya tenemos la geolocalizacion
        this.latitude = localizacion.coords.latitude;
        this.longitude = localizacion.coords.longitude;

        callback()

        // localizacion contiene la latitud y longitud en la que se encuentra el usuario
        //console.log(localizacion);
        //console.log("Latitud: " + localizacion.coords.latitude);
        //console.log("Longitud: " + localizacion.coords.longitude);
      })
    } else {
      alert("Tu navegador no soporta las funcionalidades de esta página");
    }
  }
}
