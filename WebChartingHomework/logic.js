let quakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

let plates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"


function markerSize(magnitude) {
    return magnitude * 5;};

let earthquakes = new L.LayerGroup();

d3.json(quakes, function (geoJson) {
    L.geoJSON(geoJson.features, {
        pointToLayer: function (geoJsonPoint, latlng) {
            return L.circleMarker(latlng, { radius: markerSize(geoJsonPoint.properties.mag) });
        },

        style: function (geoJsonFeature) {
            return {
                fillColor: Color(geoJsonFeature.properties.mag),
                fillOpacity: 1.0,
                weight: 0.5,
                color: 'white'}
        },
  
    }).addTo(earthquakes);
    createMap(earthquakes);
});

let plateborder = new L.LayerGroup();

d3.json(plates, function (geoJson) {
    L.geoJSON(geoJson.features, {
        style: function (geoJsonFeature) {
            return {
                weight: 5,
                color: 'black'}
        },
    }).addTo(plateborder);
})

function Color(magnitude) {
    if (magnitude > 7) {return 'pink'}
     else if (magnitude > 6) {return 'red'}
     else if (magnitude > 5) {return 'purple'} 
     else if (magnitude > 4) {return 'blue'} 
     else if (magnitude > 3) {return 'turquoise'} 
     else if (magnitude > 2) {return 'green'} 
     else if (magnitude > 1) {return 'yellow'} 
     else {return 'orange'}};

function createMap() {

    let streetMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiY2FycmVwMjciLCJhIjoiY2poMWFob3V0MDFiYjJ5bnhrN2Z2NzRxcCJ9.6SpNp1g7xpdhG6XVTf2wpQ'});

    let darkMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox.dark',
        accessToken: 'pk.eyJ1IjoiY2FycmVwMjciLCJhIjoiY2poMWFob3V0MDFiYjJ5bnhrN2Z2NzRxcCJ9.6SpNp1g7xpdhG6XVTf2wpQ'});

    let satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox.satellite',
        accessToken: 'pk.eyJ1IjoiY2FycmVwMjciLCJhIjoiY2poMWFob3V0MDFiYjJ5bnhrN2Z2NzRxcCJ9.6SpNp1g7xpdhG6XVTf2wpQ'});

    let baseLayers = {
        "Street": streetMap,
        "Dark": darkMap,
        "Satellite": satellite};

    let overlays = {
        "Earthquakes": earthquakes,
        "Plate Boundaries": plateborder};

    let mymap = L.map('mymap', {
        center: [50, -100],
        zoom: 3,
        layers: [satellite, earthquakes, plateborder] 
    });

    L.control.layers(baseLayers, overlays).addTo(mymap);


    let legend = L.control({ position: 'bottomleft' });

    legend.onAdd = function (map) {

        let div = L.DomUtil.create('div', 'info legend'),
            magnitude = [0, 1, 2, 3, 4, 5,6,7];
            // labels = [];

        div.innerHTML += "<h3 style='margin:2px'>Magnitude</h3>"

        for (var i = 0; i < magnitude.length; i++) {
            div.innerHTML +=
                '<i style="background:' + Color(magnitude[i] + 1) + '"></i> ' +
                magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
        }

        return div;
    };
    legend.addTo(mymap);
}

