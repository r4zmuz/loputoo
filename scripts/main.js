
function test()
{
    var textinput = /^[A-ZÜÕÖÄa-züõöä0-9 :;,.'@"-]+$/;
    
    if(!$.trim(document.getElementById('comments').value).match(textinput))
    {
        alert ("Palun kasutada ainult tähti ja numbreid.");
        return false;
	}
	else
	alert('Täname tagasiside eest')
}

//JQuery kasutamine navbaris
$(document).ready(function(){ //jquery kasklus et oleks html sisseloetud
    $('nav ul li > a:not(:only-child)').click(function(e){ //puuan kinni dropdown ja annan klikkimisel funktsiooni
        $(this).siblings('.nav-dropdown').toggle(); //toggle muudab css display parameetrit
        $('.nav-dropdown').not($(this).siblings()).hide(); // varjab dropdown elemendi mida ei ole valitud
        e.stopPropagation(); //antud funktsioon garanteerib et kaks dropdown ei oleks korraga avatud, event funktsioon
                                
    });
    $('html').click(function(){ //puuan kinni html ehk kogu veebilehe pinna
        $('.nav-dropdown').hide(); //klikkimisel ukskoik kuhu veebilehel sulgub dropdown.
    });
    $('#nav-toggle').on('click', function () {
        this.classList.toggle('active') //liidame hiirega vajutamisel active klassi span elemendile, mis muudab seda X kujuks
      });
    $('#nav-toggle').click(function () {
        $('nav ul').toggle() // toob hiire vajutusel nahtavale navbar peidetud elemendid
    });

//slideshow script
    $('#checkbox').click(function(){
        //anname autoplay funktsiooni kui linnuke kasti teha     
        if ($(this).is(':checked'))
        {
        
        $(this).change(function(){
            setInterval(function () {
                liiguParemale();
            }, 3000);
            
        });
        
        }

       if ($(this).is(':checked')==false) 
             {
                 //$('#slider ul').stop(true, true); // ei toimi millegi parast
                 //var leht = $('#slider');
                 //$(this).load('incdex.html',function(){ // laadimine onnestub
                   // jQuery.fx.off = true; ei toimi
                   //stopAnimatsioon();
                     //$('#slider').stop(true, true); //ei toimi ka klassikaline stop funktsioon
                 //});

                location.reload();  
                    
             }
            
        });
        

            /* function stopAnimatsioon(){ 
                 alert('funktsioon kaivitub')//saab alerti katte
                $('#checkbox').change(function(){ 
                    setInterval(function () {
                        liiguParemale();
                    }, 0);

                });
            }*/
    
//tekitame animatsiooni slideshowle
        var slaidideArv = $('#slider ul li').length; // omastame muutujale vaartuse list elementide koguarvu
        var slaidideLaius = $('#slider ul li').width(); //tagastatakse laiuse vaartus mis on elemendile maaratud css's
        var slaidideKorgus = $('#slider ul li').height();//sama mis eelmine ainult et korgus
        var slaidideKorrutis = slaidideArv * slaidideLaius;// slaidide koguaerv korrutatakse slaidide laiusega ja omastatakse see vaartus muutujale
        
        $('#slider').css({ width: slaidideLaius, height: slaidideKorgus }); //css()funktsiooniga anname #slider elemendile tema laiuse ja korguse
        
        $('#slider ul').css({ width: slaidideKorrutis, marginLeft: - slaidideLaius });//css()funktsiooniga anname #slider ul elemendile tema laiuse ja margin-left vaartuse
        
        $('#slider ul li:last-child').prependTo('#slider ul'); // tostab viimase child elemendi esimeseks peale ul elementi
    
        function liiguVasakule() {
            $('#slider ul').animate({
                left: + slaidideLaius //liigutame slaidi paremale liites slaidi kogupikkuse juurde
                }, 600, function () { //kuna vaja mitu kordust animatsioonile teha siis lisan jargneva koodi:
                $('#slider ul li:last-child').prependTo('#slider ul');//tostame viimase list elemendi esimeseks peale ul elementi, et animatsioon saaks korduda
                $('#slider ul').css('left', '');//anname liikuva effekti, mitte niisama ei vahetu pilt
            });
        };
    
        function liiguParemale() {
            $('#slider ul').animate({
                left: - slaidideLaius //liigutame slaidi vasakule lahutades slaidi kogulaiuse
            }, 600, function () {
               $('#slider ul li:first-child').appendTo('#slider ul');//tostame esimese list elemendi viimaseks elemendiks peale ul elementi, et animatsioon saaks korduda
                $('#slider ul').css('left', '');//anname pildile liikuva effekti, mitte niisama ei vahetu pilt
            });
        };
        //maarame funktsiooni kui klikkida noolele
        $('a.control_prev').click(function () {
            liiguVasakule();
        });
    
        $('a.control_next').click(function () {
            liiguParemale();
        });
    
        //kuna tekkis probleem et noolele klikkides varskendas kogu lehte ja viskas algusesse, siis lisasin jargneva koodi
        $('#slider').on('click','.control_next, .control_prev',function(e){ 
            e.preventDefault(); //  tühistab ärä hiire kliki ja ei viska lehe algusesse 
          });

});

