const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

//funciones
function buscarClima(e){
    e.preventDefault();
    console.log('buscando el clima');
}



//eventos
document.addEventListener('DOMContentLoaded', _ => {
    formulario.addEventListener('submit', buscarClima);
});