let page = 1;

document.addEventListener('DOMContentLoaded', function() {
    startApp();
});

function startApp() {
    showServices();

    // Resalta el DIV actual según el tab al que se presiona
    showSection();

    // oculta o muestra una sección según el tab al que se presiona
    changeSection();
}

function showSection() {
    const currentSection = document.querySelector(`#step-${page}`);
    currentSection.classList.add('show-section');

    // resalta el tab actual
    const tab = document.querySelector(`[data-step="${page}"]`);
    tab.classList.add('current');
}

function changeSection() {
    const links = document.querySelectorAll('.tabs button');
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            page = parseInt(e.target.dataset.step);

            // eliminar show-section de la section anterior
            document.querySelector('.show-section').classList.remove('show-section');

            // agrega mostrar seccion donde dimos click
            const section = document.querySelector(`#step-${page}`);
            section.classList.add('show-section');

            // Eliminar la clase de current en el anterior
            document.querySelector('.tabs .current').classList.remove('current');

            // agregar la clase de actual en el nuevo tab
            const tab = document.querySelector(`[data-step="${page}"]`);
            tab.classList.add('current');
        })
    })
}

async function showServices() {
    try {
        const response = await fetch('./servicios.json');
        const data = await response.json();
        const { services } = data;

        // Generar HTML
        services.forEach(service => {
            const { id, name, price } = service;

            // DOM Scripting
            // Generar nombre del servicio
            const serviceName = document.createElement('p');
            serviceName.textContent = name;
            serviceName.classList.add('service-name');
            // Generar precio del servicio
            const servicePrice = document.createElement('p');
            servicePrice.textContent = `$ ${price}`;
            servicePrice.classList.add('service-price');

            // Generar div contenedor del servicio
            const serviceDiv = document.createElement('div');
            serviceDiv.classList.add('service');

            // inyectar precio y nombre al div del servicio
            serviceDiv.appendChild(serviceName);
            serviceDiv.appendChild(servicePrice);
            serviceDiv.dataset.serviceId = id;

            // selcciona un servicio para la cita
            serviceDiv.onclick = selectService;

            // inyectar al HTML
            document.querySelector('#services').appendChild(serviceDiv);
        });
    } catch (error) {
        console.log('error');
    }
}

function selectService(e) {
    let element;
    // forzar que el elemento al cual le damos click sea el div
    if(e.target.tagName === 'P') {
        element = e.target.parentElement;
    } else {
        element = e.target;
    }

    // cuando seleccionen un servicio añadirle la clase seleccionado
    if(element.classList.contains('selected')) {
        element.classList.remove('selected');
    } else {
        element.classList.add('selected');
    }
}