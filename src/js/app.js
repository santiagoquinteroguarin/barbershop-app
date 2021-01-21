let page = 1;

const cita = {
    name: '',
    date: '',
    time: '',
    services: [],
}

document.addEventListener('DOMContentLoaded', function() {
    startApp();
});

function startApp() {
    showServices();

    // Resalta el DIV actual según el tab al que se presiona
    showSection();

    // oculta o muestra una sección según el tab al que se presiona
    changeSection();

    // paginación siguiente y anterior
    nextPage();
    
    previousPage();

    // Comprueba la pagina actual para ocultar o mostrar la paginación
    pagerButtons();

    // muestra el resumen de la cita o mensaje de error
    showSummary();

    // almacena el nombre de la cita en el objeto
    nameAppointment();

    // alamcena la fecha de la cita en el objeto
    dateAppointment();

    // deshabilita días pasados
    disablePreviousDay();

    // Almacena la hora de la cita en el objeto
    timeAppointment();
}

function showSection() {
    // eliminar show-section de la section anterior
    const previousSection = document.querySelector('.show-section');
    if(previousSection) {
        previousSection.classList.remove('show-section');
    }

    const currentSection = document.querySelector(`#step-${page}`);
    currentSection.classList.add('show-section');

    const previousTab = document.querySelector('.tabs .current');
    if(previousTab) {
        // Eliminar la clase de current en el anterior
        previousTab.classList.remove('current');
    }
    
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

            // llamar la funcion de mostrar la seccion
            showSection();

            pagerButtons();
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
            const serviceName = document.createElement('P');
            serviceName.textContent = name;
            serviceName.classList.add('service-name');
            // Generar precio del servicio
            const servicePrice = document.createElement('P');
            servicePrice.textContent = `$ ${price}`;
            servicePrice.classList.add('service-price');

            // Generar div contenedor del servicio
            const serviceDiv = document.createElement('DIV');
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

        const id = parseInt(element.dataset.serviceId);
        // eliminar servicio
        deleteService(id);
    } else {
        element.classList.add('selected');

        const serviceObj = {
            id: parseInt(element.dataset.serviceId),
            name: element.firstElementChild.textContent,
            price: element.firstElementChild.nextElementSibling.textContent,
        }
        // agregar servicio
        addService(serviceObj);
    }
}

function deleteService() {
    const { services } = cita;
    cita.services = services.filter(service => service.id !== id);
}

function addService(serviceObj) {
    const { services } = cita;

    cita.services = [...services, serviceObj];
}

function nextPage() {
    const nextPage = document.querySelector('#next');
    nextPage.addEventListener('click', () => {
        page++;
        // volver a comprobar en que pagina esta el paginador
        pagerButtons();
    });
}

function previousPage() {
    const previousPage = document.querySelector('#previous');
    previousPage.addEventListener('click', () => {
        page--;
        // volver a comprobar en que pagina esta el paginador
        pagerButtons();
    });
}

function pagerButtons() {
    const nextPage = document.querySelector('#next');
    const previousPage = document.querySelector('#previous');

    if(page === 1) {
        previousPage.classList.add('hide')
    } else if(page === 3) {
        nextPage.classList.add('hide');
        previousPage.classList.remove('hide');
        // carga el resumen de la cita
        showSummary();
    } else {
        previousPage.classList.remove('hide');
        nextPage.classList.remove('hide');
    }

    // cambiar la seccion por la de la pagina
    showSection();
}

function showSummary() {
    const { name, date, time, services } = cita;

    // seleccionar resumen
    const summaryDiv = document.querySelector('.summary-content');

    // limpia el HTML previo
    while(summaryDiv.firstChild) {
        summaryDiv.removeChild(summaryDiv.firstChild);
    }

    // validación para saber que los campos estan vacios
    if(Object.values(cita).includes('')) {
        const noServices = document.createElement('P');
        noServices.textContent = 'Faltan datos de servicios, hora, fecha o nombre';
        noServices.classList.add('invalid-appointment');
        
        // agregar a resumen div
        summaryDiv.appendChild(noServices);

        return;
    }

    const headingAppointment = document.createElement('H3');
    headingAppointment.textContent = 'Resumen de Cita';

    // mostrar el resumen
    const nameAppointment = document.createElement('P');
    nameAppointment.innerHTML = `<span>Nombre:</span> ${name}`;

    const dateAppointment = document.createElement('P');
    dateAppointment.innerHTML = `<span>Fecha:</span> ${date}`;

    const timeAppointment = document.createElement('P');
    timeAppointment.innerHTML = `<span>Nombre:</span> ${time}`;

    const servicesAppointment = document.createElement('DIV');
    servicesAppointment.classList.add('summary-services');

    // creando titulo
    const headingServices = document.createElement('H3');
    headingServices.textContent = 'Resumen de Servicios';

    servicesAppointment.appendChild(headingServices);

    // iterar sobre el arreglo de servicios
    services.forEach(service => {
        const { name, price } = service;
        const containerService = document.createElement('DIV');
        containerService.classList.add('container-service');

        const textService = document.createElement('P');
        textService.textContent = name;

        const priceService = document.createElement('P');
        priceService.classList.add('price');
        priceService.textContent = price;

        // colocar precio y texto en el div
        containerService.appendChild(textService);
        containerService.appendChild(priceService);

        servicesAppointment.appendChild(containerService);
    });

    summaryDiv.appendChild(headingAppointment);
    summaryDiv.appendChild(nameAppointment);
    summaryDiv.appendChild(dateAppointment);
    summaryDiv.appendChild(timeAppointment);
    summaryDiv.appendChild(servicesAppointment);
}

function nameAppointment() {
    const nameInput = document.querySelector('#name');

    nameInput.addEventListener('input', (e) => {
        const nameText = e.target.value.trim();

        // validacion de que nombre texto debe tener algo
        if(nameText === '' || nameText.length < 2) {
            showAlert('Nombre no valído', 'error');
        } else {
            const alert = document.querySelector('.alert');
            if(alert) {
                alert.remove();
            }
            cita.name = nameText;
        }
    });
}

function dateAppointment() {
    const dateInput = document.querySelector('#date');

    dateInput.addEventListener('input', (e) => {
        const day = new Date(e.target.value).getUTCDay();
        
        // validacion de que nombre texto debe tener algo
        if([1, 0].includes(day)) {
            e.preventDefault();
            dateInput.value = '';
            showAlert('Seleccionaste lunes lo cual no es valido', 'error');
        } else {
            cita.date = dateInput.value;
        }
    });
}

function showAlert(message, type) {

    // Si hay una alerta previa no crear otra
    const alertPrevious = document.querySelector('.alert');
    if(alertPrevious) {
        return;
    }

    const alert = document.createElement('div');
    alert.textContent = message;
    alert.classList.add('alert');

    if(type === 'error') {
        alert.classList.add('error');
    }

    // insertar en el HTML
    const form = document.querySelector('form');
    form.appendChild(alert);

    // Eliminar la alerta despues de 3 seg
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function disablePreviousDay() {
    const inputDate = document.querySelector('#date');

    const nowDate = new Date();
    const year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1;
    const day = nowDate.getDate() + 1;

    if(month >= 1 && month < 9) {
        month = `0${month}`;
    }

    // formato AAAA-MM-DD
    const disableDate = `${year}-${month}-${day}`;
    inputDate.min = disableDate;
}

function timeAppointment() {
    const timeInput = document.querySelector('#hour');

    timeInput.addEventListener('input', e => {
        const timeAppointment = e.target.value;
        const hour = timeAppointment.split(':');

        if(hour[0] < 10 || hour[0] > 19) {
            showAlert('Hora no válida', 'error');
            setTimeout(() => {
                timeInput.value = '';
            }, 3000);
        } else {
            cita.time = timeAppointment;
        }
    });
}