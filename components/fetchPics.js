const ACCESS_KEY = 'cfzDr_24QkWcoep2hVT8TrBAVK_BRBOcOOHI8sYrezw';

const URL_BASE = 'https://api.unsplash.com/search/photos';


async function fetchUnsplash(query) {
  const url = `${URL_BASE}?query=${encodeURIComponent(query)}&per_page=30&client_id=${ACCESS_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: No se pudo conectar con Unsplash`);
  }

  const data = await response.json();
  return data.results || [];
}


export async function pedirImagenes(busqueda) {
  try {
    const resultados = await fetchUnsplash(busqueda);

    if (resultados.length > 0) {
      return resultados;
    }

    const fallback = await fetchUnsplash('gatos');
    if (fallback.length > 0) {
      alert('No se encontraron imágenes para tu búsqueda. Mostramos imágenes de gatos.');
      return fallback;
    }

    alert('No hay imágenes disponibles en este momento.');
    return [];

  } catch (error) {
    console.error('Error al conectar con Unsplash:', error.message);
    alert('Hubo un problema al buscar imágenes. Intenta más tarde.');
    return [];
  }
}
