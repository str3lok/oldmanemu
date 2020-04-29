$(document).ready(function(){
         
         
var myMap;

ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [48.454237, 35.004688],
        zoom: 16,
        controls: []
    });
    myMap.behaviors
        .disable(['drag', /*'MultiTouch',*/ 'scrollZoom']);
		
    var myPlacemark = new ymaps.Placemark([48.454237, 35.004688], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'images/svg/icon-marker.svg',
            iconImageSize: [25, 36],            
    });

    myMap.geoObjects.add(myPlacemark);
});

       
});
