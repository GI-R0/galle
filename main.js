import './style.css';
import { mostrarBusquedasRecientes } from './components/utils.js';
import { inicializarSearchBar } from './components/searchbar.js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    inicializarSearchBar();
    mostrarBusquedasRecientes();
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error);
  }
});

const menu = document.querySelector('.menu');
const burger = document.querySelector('.hamburger');

burger?.addEventListener('click', () => {
  menu.classList.toggle('active');
});


