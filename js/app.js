var resultadoOperacion = 0;
var primerNumero = 0;
var segundoNumero = 0;
var operacion = false;
var tipoOperacion = "";
var tipoOperacionAnterior = "";
var primeraOperacion = false;

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
    resultadoOperacion = 0;
    primerNumero = 0;
    segundoNumero = 0;
    operacion = false;
    tipoOperacion = "";
    tipoOperacionAnterior = "";
    mostrarPantalla()
  }else if(alt=="signo"){
    var numeroDisplay = $("#display").text();
    numeroDisplay = parseFloat(numeroDisplay)*(-1);
    $("#display").html(numeroDisplay);
  }else if(alt=="raiz"){
    alert("Esta función todavía no está implementada en esta calculadora");
  }else if(alt=="dividido" || alt=="menos" || alt=="por" || alt=="mas"){
    tipoOperacion = alt;
    operacion = true;
    realizarOperacion();
  }else if(alt=="igual"){
    realizarOperacion();
  }else if(alt=="punto"){
    if(!primeraOperacion){
      if(primerNumero!=0){
        if(primerNumero.toString().indexOf(".")==-1){
          primerNumero = primerNumero+".";
          $("#display").html(primerNumero);
        }
      }
    }else{
      if(segundoNumero!=0){
        if(segundoNumero.toString().indexOf(".")==-1){
          segundoNumero = segundoNumero+".";
          $("#display").html(segundoNumero);
        }
      }
    }
  }else{
    if(!primeraOperacion){
      if(primerNumero.toString().length < 8 ){
        primerNumero = agregarNumCalculadora(primerNumero,alt);
        $("#display").html(primerNumero);
      }
    }else{
      if(segundoNumero.toString().length < 8 ){
        segundoNumero = agregarNumCalculadora(segundoNumero,alt);
        $("#display").html(segundoNumero);
      }
    }
  }
}

function agregarNumCalculadora(numCal, num){
  if(numCal==0)
    numCal = num;
  else
    numCal = numCal +""+ num;

  operacion = false;

  return numCal;
}

function realizarOperacion(){
  var res = 0;

  if(!primeraOperacion)
    primeraOperacion = true;

  if (tipoOperacionAnterior=="mas"){
    res = Calculadora.operacionSumar(parseFloat(primerNumero),parseFloat(segundoNumero));
  }else if (tipoOperacionAnterior=="menos"){
    res = Calculadora.operacionRestar(parseFloat(primerNumero),parseFloat(segundoNumero));
  }

  if(primerNumero!=0){
    if (tipoOperacionAnterior=="por"){
      res = Calculadora.operacionMultiplicar(parseFloat(primerNumero),parseFloat(segundoNumero));
    }else if (tipoOperacionAnterior=="dividido"){
      if(segundoNumero!=0)
        res = Calculadora.operacionDividir(parseFloat(primerNumero),parseFloat(segundoNumero));
      else {
        alert("Esta operación no se pued realizar");
        return;
      }
    }
  }else
    alert("La operación seleccionada no se puede realizar");

  if(res.toString().length < 8 ){
    resultadoOperacion = res;
    segundoNumero = 0;
    if(resultadoOperacion!=0){
      mostrarPantalla();
      primerNumero = resultadoOperacion;
    }

    tipoOperacionAnterior = tipoOperacion;
    tipoOperacion = "";
    operacion = false;
  }else
    alert("La operación realizada da como resultado un número con longitud mayor a la permitida en esta calculadora por lo tanto no se puede realizar");
}

function mostrarPantalla(){
  $("#display").html(resultadoOperacion);
}
