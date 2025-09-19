
var mapOptions = {
    center: [49.7943031, 15.6404106],
    zoom: 7,
    zoomControl: false,
    scrollWheelZoom: true
    
}

var map = new L.map('mapid', mapOptions)

var basemap = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    
});


map.addLayer(basemap);


// get color depending on unemployment rate value
function choroplethColors(d) {
    return d > 8.33 ? '#660202 ' :
        d > 6.30 ? '#a03523' :
            d > 4.73 ? '#edac90' :
                d > 2.62 ? '#ffefdc' :
                    '#000000';
}

function style(feature) {
    return {
        fillColor: choroplethColors(feature.properties.MIRA_NEZAM),
        weight: 2,
        opacity: 1,
        color: '#000000',
        dashArray: '3',
        fillOpacity: 0.9
        
    };
}


//info popupn


function onEachPolygonFeature(feature, layer) {

    var popup = L.popup()
        .setContent(`<div><h2>Míra nezaměstnanosti v okresu</h2>
            <table class="table">
            <tbody>
            <tr>
            <th>Název okresu:</th>
            <td>${feature.properties.NAZ_LAU1}</td>
            </tr>
            <tr>
            <th>Počet obyvatel:</th>
            <td>${feature.properties.POCET_OBYV}</td>
            </tr>
            <tr>
            <th>Míra nezaměstnanosti:</th>
            <td>${feature.properties.MIRA_NEZAM.toFixed(2)}%</td>
            </tr>
            <tr>
            <th>Počet nezaměstnaných:</th>
            <td>${(feature.properties.POCET_OBYV / 100 * feature.properties.MIRA_NEZAM).toFixed(0)}</td>
            </tr>
            </tbody>
            </table>
            </div>`)

    layer.bindPopup(popup, { keepInView: true, autoPan: true, maxHeight: 300 });
}


//přidání polygonů okresů do mapy

var geojsonLayerPolygons = L.geoJSON(okresy, {
    onEachFeature: onEachPolygonFeature,
    style: style
})

geojsonLayerPolygons.addTo(map);














