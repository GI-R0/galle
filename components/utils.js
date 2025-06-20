
export function guardarBusqueda(termino) {
  if (!termino) return;

  let historial = JSON.parse(localStorage.getItem('historial')) || [];

  
  historial = historial.filter(item => item !== termino);
  historial.unshift(termino);

  
  if (historial.length > 10) {
    historial = historial.slice(0, 10);
  }

  localStorage.setItem('historial', JSON.stringify(historial));
}


export function mostrarBusquedasRecientes() {
  const contenedor = document.getElementById('busquedasRecientes');
  if (!contenedor) return;

  const historial = JSON.parse(localStorage.getItem('historial')) || [];
  contenedor.innerHTML = '';

  historial.forEach(termino => {
    const boton = document.createElement('button');
    boton.textContent = termino;
    boton.classList.add('botonReciente');

    boton.addEventListener('click', async () => {
      try {
        const { pedirImagenes } = await import('./fetchPics.js');
        const { mostrarImagenes } = await import('./showPics.js');

        const input = document.querySelector('#inputBusqueda');
        const contenedorImagenes = document.querySelector('#contenedorImagenes');
        if (!input || !contenedorImagenes) return;

        input.value = termino;

        const resultados = await pedirImagenes(termino);
        mostrarImagenes(resultados, contenedorImagenes);

        input.value = '';
      } catch (error) {
        console.error('Error al buscar desde el historial:', error);
      }
    });

    contenedor.appendChild(boton);
  });
}
