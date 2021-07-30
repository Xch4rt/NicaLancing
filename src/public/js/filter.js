$(document).ready(function(){

   $('.category_item').click(function(){
     var catService = $(this).attr('category');
     //alert(catService);
     //Ocultando productos
     $('.product-item').hide();
     //Mostrando los solicitados
     $('.product-item[category="'+catService+'"]').show();
   });
 });