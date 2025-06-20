import { pedirImagenes } from './fetchPics.js';
import { mostrarImagenes } from './showPics.js';
import { mostrarBusquedasRecientes } from './utils.js';

export function inicializarSearchBar() {
  const formulario = document.querySelector('#formularioBusqueda');
  const input = document.querySelector('#inputBusqueda');
  const contenedor = document.querySelector('#contenedorImagenes');
  const logo = document.getElementById('logo');

  
  cargarYMostrar('busquedaInicial');

  
  formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const texto = input.value.trim();

    if (texto.length < 2) {
      contenedor.innerHTML = '<p class="mensaje-error">Introduce al menos 2 caracteres.</p>';
      return;
    }

    await buscarYMostrar(texto, contenedor, input, true);
  });

  
  logo.addEventListener('click', async () => {
    await cargarYMostrar('busquedaInicial');
  });

  
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      formulario.dispatchEvent(new Event('submit'));
    }
  });
}

async function buscarYMostrar(texto, contenedor, input, guardarPrimera) {
  try {
    if (guardarPrimera && !localStorage.getItem('busquedaInicial')) {
      localStorage.setItem('busquedaInicial', texto);
    }

    localStorage.setItem('ultimaBusqueda', texto);

    const imagenes = await pedirImagenes(texto);

    if (!imagenes || imagenes.length === 0) {
      const fallback = await pedirImagenes('gatos');
      contenedor.innerHTML = '<p class="mensaje-error">No se encontraron resultados. Mostramos gatos.</p>';
      mostrarImagenes(fallback, contenedor);
    } else {
      mostrarImagenes(imagenes, contenedor);
    }

    input.value = '';
    mostrarBusquedasRecientes();

  } catch (error) {
    console.error('Error al buscar y mostrar imágenes:', error);
    contenedor.innerHTML = '<p class="mensaje-error">Hubo un error al cargar las imágenes.</p>';
  }
}

async function cargarYMostrar(clave) {
  const texto = localStorage.getItem(clave);
  if (texto) {
    const contenedor = document.querySelector('#contenedorImagenes');
    await buscarYMostrar(texto, contenedor, document.querySelector('#inputBusqueda'), false);
  }
}

