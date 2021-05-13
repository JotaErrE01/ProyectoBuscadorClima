const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

//funciones
function buscarClima(e){
    e.preventDefault();
    
    //validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    
    // console.log(ciudad)
    // console.log(pais)
    if(!ciudad || !pais){
        //hubo un error
        mostrarError('Ambos Campos son Obligatorios');
        return;
    }

    //consultar api
    consultarAPI(ciudad, pais);
}

function mostrarError(msj){

    const alerta = document.querySelector('.bg-red-100');

    if (!alerta){
        //crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${msj}</span>
        `

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function consultarAPI(ciudad, pais){

    const appId = '46d47191554bd5f45de574d6d063a907';

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data.cod === "404"){
                mostrarError('Ciudad no Encontrada');
                return;
            }

            //imprime la respuesta en el html
            mostrarClima(data);
        })
}

function mostrarClima(data){

    limpiarhtml();

    const { main: { temp, temp_max, temp_min } } = data;
    const centigrados = parseInt(temp - 273.15);
    const temperaturaHtml = document.createElement('p');

    temperaturaHtml.innerHTML = `${centigrados} &#8451`;
    temperaturaHtml.classList.add('font-bold', 'text-6xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(temperaturaHtml);

    resultado.appendChild(resultadoDiv);
}

function limpiarhtml(){
    if(resultado.firstChild){
        resultado.firstChild.remove();
    }
}

//eventos
window.addEventListener('load', _ => {
    formulario.addEventListener('submit', buscarClima);
});