var operacion = 0;
var operador = 0;
var botonOperacion = true;
var tipoOperacion = "";

var Calculadora = ( function(){
  var sumar = function( n1, n2 ){
    return n1 + n2;
  }

  var restar = function( n1, n2 ){
    return n1 - n2;
  }

  var multiplicar = function( n1, n2 ){
    return n1 * n2;
  }

  var dividir = function( n1, n2 ){
    return n1 / n2;
  }

  var menosTamanio = function( n1 ){
    return n1 * 0.99;
  }

  var masTamanio = function( n1 ){
    return n1 / 0.99;
  }

  return {
    operacionSumar : function( numero1, numero2 ){
     return sumar( numero1, numero2 )
    },
    operacionRestar : function( numero1, numero2 ){
     return restar( numero1, numero2 )
    },
    operacionMultiplicar : function( numero1, numero2 ){
     return multiplicar( numero1, numero2 )
    },
    operacionDividir : function( numero1, numero2 ){
     return dividir( numero1, numero2 )
    },
    disminuirImagen : function( numero1 ){
     return menosTamanio( numero1 )
    },
    ampliarImagen : function( numero1 ){
     return masTamanio( numero1 )
    }
  }
})();

$(document).ready(function() {
  $(".tecla").mousedown(function(){
    disminuirImagen(this.id);
    display(this.alt);
  });

  $(".tecla").mouseup(function(){
    ampliarImagen(this.id);
  });
});

function disminuirImagen(id){
  $("#"+id).width(Calculadora.disminuirImagen($("#"+id).width()));
  $("#"+id).height(Calculadora.disminuirImagen($("#"+id).height()));
}

function ampliarImagen(id){
  $("#"+id).width(Calculadora.ampliarImagen($("#"+id).width()));
  $("#"+id).height(Calculadora.ampliarImagen($("#"+id).height()));
}

function display(alt){
  if(alt=="On"){
    operacion = 0;
    operador = 0;
    $("#display").html(operacion);
  }else if(alt=="signo"){
    operador = parseFloat(operador)*(-1);
    $("#display").html(operador);
  }else if(alt=="raiz"){
    alert("Esta función todavía no está implementada en esta calculadora");
  }else if(alt=="dividido"){
    guardarOperacion(alt);
  }else if(alt=="menos"){
    guardarOperacion(alt);
  }else if(alt=="por"){
    guardarOperacion(alt);
  }else if(alt=="mas"){
    guardarOperacion(alt);
  }else if(alt=="igual"){
    display(tipoOperacion);
    $("#display").html(operacion);
    tipoOperacion = "";
  }else if(alt=="punto"){
    if(operador.indexOf(".")==-1)
      operador = operador+".";
    $("#display").html(operador);
  }else{
    if(botonOperacion){
      if(operador.toString().length < 8 ){
        if(operador==0)
          operador = alt;
        else
          operador = operador +""+ alt;
      }
    }else{
      operador = alt;
      botonOperacion = true;
    }

    $("#display").html(operador);
  }
}

function mostrarPantalla(){
  botonOperacion = false;
  operador = 0;
  if(operacion!=0)
    $("#display").html(operacion);
}

function guardarOperacion(tO){
  tipoOperacion = tO;
  if(operacion==0){
    if (tO=="mas")
      operacion = Calculadora.operacionSumar(parseFloat(operacion),parseFloat(operador));
    else if (tO=="menos")
      operacion = Calculadora.operacionRestar(parseFloat(operacion),parseFloat(operador));
    /*else if (tO=="por")
      operacion = Calculadora.operacionMultiplicar(parseFloat(operacion),parseFloat(operador));
    else if (tO=="dividido")
      operacion = Calculadora.operacionDividir(parseFloat(operacion),parseFloat(operador));*/
    botonOperacion = false;
  }else{
    if (tO=="mas")
      operacion = Calculadora.operacionSumar(parseFloat(operacion),parseFloat(operador));
    else if (tO=="menos")
      operacion = Calculadora.operacionRestar(parseFloat(operacion),parseFloat(operador));
    else if (tO=="por")
      operacion = Calculadora.operacionMultiplicar(parseFloat(operacion),parseFloat(operador));
    else if (tO=="dividido")
      operacion = Calculadora.operacionDividir(parseFloat(operacion),parseFloat(operador));
    mostrarPantalla();
  }
}
