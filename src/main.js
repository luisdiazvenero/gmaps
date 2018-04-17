const nombre = "Luis";
var travelMode;

google.maps.event.addDomListener(window,"load",()=>{
  const user_location = new UserLocation(()=>{
    //console.log("ya tenemos la localizacion yeee");
    //console.log(user_location);

    // Aqui ya se cargaron los mapas y ademas cargamos geolocalizacion
    travelMode = document.getElementById('travel-mode').value;

    if(travelMode == "0"){
      document.getElementById('travel-mode').addEventListener("change", (ev)=> {
        document.getElementById('travel-screen').style.display = "none";
        travelMode = ev.target.value;
      })
    } else {
      document.getElementById('travel-screen').style.display = "none";
    }


    const mapOptions = {
        zoom: 14,
        center: {
          lat:user_location.latitude,
          lng:user_location.longitude,
        }
    }

    const mapa_element = document.getElementById("map");
    const map = new google.maps.Map(mapa_element, mapOptions);

    const search_input = document.getElementById("search-place");
    const autocomplete = new google.maps.places.Autocomplete(search_input);

    const marker = new google.maps.Marker({
      map: map
    });

    autocomplete.bindTo("bounds",map);

    google.maps.event.addListener(autocomplete,"place_changed", ()=>{
      console.log("cambiamos el lugar");

      const place = autocomplete.getPlace();

      if(place.geometry.viewport){
        map.fitBounds(place.geometry.viewport);
      }else{
        map.setCenter(place.geometry.location);
        map.setZoom(15);
      }

      marker.setPlace({
        placeId: place.place_id,
        location: place.geometry.location
      });

      marker.setVisible(true);

      calculateDistance(place,user_location);

    });

  });

})

function calculateDistance(place, origen){
  var origin = new google.maps.LatLng(origen.latitude, origen.longitude);

  var service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix({
    origins: [origin],
    destinations: [place.geometry.location],
    travelMode: travelMode
  },(respuesta,status)=>{
    // se ejecuta cuando el servicio de distacia de maps nos responde
    const info = respuesta.rows[0].elements[0];

    const distancia = info.distance.text;
    const duracion = info.duration.text;


    document.getElementById("info").innerHTML = `Estas a ${distancia} y ${duracion} de dicho destino`;
  })
}
