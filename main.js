//Service Worker
if('serviceWorker' in navigator){
console.log("Puede usar los serviceWorker en tu navegador");
navigator.serviceWorker.register('./sw.js')
        .then(res => console.log('ServiceWorker cargado correctamente'. res))
        .catch(err => console.log('No se ha podido registrar',err));
}else {
    console.log("NO PUEDES usar los serviceWorker")
};



//Scroll suavizado

$(document).ready(function(){
    
    $("menu a").click(function(e){
        e.preventDefault();

        console.log($('#services').offset().top)
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });


        return false;
    });

});