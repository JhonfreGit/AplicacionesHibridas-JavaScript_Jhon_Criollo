var resultadoOperacion = 0;
var primerNumero = 0;
var segundoNumero = 0;
var operacion = false;
var tipoOperacion = "";
var cantOper = 0;

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
    cantOper = 0;
    mostrarPantalla()
  }else if(alt=="signo"){
    if(primerNumero!=0){
      resultadoOperacion = parseFloat(resultadoOperacion)*(-1);
      mostrarPantalla()
    }
  }else if(alt=="raiz"){
    alert("Esta función todavía no está implementada en esta calculadora");
  }else if(alt=="dividido"){
    realizarOperacion(alt);
  }else if(alt=="menos"){
    realizarOperacion(alt);
  }else if(alt=="por"){
    realizarOperacion(alt);
  }else if(alt=="mas"){
    realizarOperacion(alt);
  }else if(alt=="igual"){
    mostrarPantalla();
  }else if(alt=="punto"){
    if(resultadoOperacion.indexOf(".")==-1){
      resultadoOperacion = resultadoOperacion+".";
      mostrarPantalla();
    }
  }else{
    cantOper = 0;
    if(!operacion){
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

  return numCal;
}

function realizarOperacion(tO){
  var res = 0;
  operacion = true;
  tipoOperacion = tO;

  if(cantOper>1){
    cantOper++;
    return;
  }

  if (tipoOperacion=="mas"){
    res = Calculadora.operacionSumar(parseFloat(primerNumero),parseFloat(segundoNumero));
  }else if (tipoOperacion=="menos"){
    res = Calculadora.operacionRestar(parseFloat(primerNumero),parseFloat(segundoNumero));
  }

  if(primerNumero!=0){
    if (tipoOperacion=="por"){
      res = Calculadora.operacionMultiplicar(parseFloat(primerNumero),parseFloat(segundoNumero));
    }else if (tipoOperacion=="dividido"){
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
    primerNumero = resultadoOperacion;
    segundoNumero = 0;
    mostrarPantalla();
    tipoOperacion = tO;
  }else
    alert("La operación realizada da como resultado un número con longitud mayor a la permitida en esta calculadora por lo tanto no se puede realizar");
}

function mostrarPantalla(){
  $("#display").html(resultadoOperacion);
}
