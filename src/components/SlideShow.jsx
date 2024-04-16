import React, {useEffect, useRef} from 'react'
import "./SlideShow.css"
import apple from '../assets/a.jpeg'
import gaming from '../assets/jl.jpeg'

import styled from 'styled-components'; // Importamos styled-components que es una librería que nos permite escribir css en js



export const SlideShow = () => {
    
const slideshow = useRef(null); // Creamos una referencia para el slideshow
let intervalId = useRef(null); // Referencia para almacenar el ID del intervalo

const siguiente = () => {
    if (slideshow.current.children.length > 0) {
        const primerElemento = slideshow.current.children[0]; // Obtenemos el primer elemento del slideshow
        slideshow.current.style.transition = `300ms ease-out all`; // Agregamos una transición al slideshow

        // Calculamos el ancho del primer elemento
        const tamañoSlide = primerElemento.offsetWidth;
        // Mover
        slideshow.current.style.transform = `translateX(-${tamañoSlide}px)`; // Movemos el slideshow a la izquierda

        const transicion = () => {
            // Reiniciamos el slideshow
            slideshow.current.style.transition = `none`;
            slideshow.current.style.transform = `translateX(0)`;

            // Tomamos el primer elemento y lo colocamos al final
            slideshow.current.appendChild(primerElemento);
        };

        slideshow.current.addEventListener('transitionend', transicion);
    }
};

// Función para iniciar el slideshow automático
const iniciarSlideShowAutomatico = () => {
    intervalId.current = setInterval(siguiente, 5000); 
};

// Función para detener el slideshow automático
const detenerSlideShowAutomatico = () => {
    clearInterval(intervalId.current); // Detiene el intervalo
};

// Efecto de useEffect para iniciar/detener el slideshow automático
useEffect(() => {
    iniciarSlideShowAutomatico(); // Iniciar el slideshow automático al cargar el componente

    // Detener el slideshow automático al salir del componente
    return () => {
        detenerSlideShowAutomatico();
    };
}, []); 
    
  return (
    <div className='container-principal'>
        <div className='container-slideShow' ref={slideshow}>
            <div className='slide'>
                <img src={apple} alt="Imagen 1"></img>
            </div>
            <div className='slide'>
                <img src={gaming} alt="Imagen 2"></img>
            </div>
            <div className='slide'>
                  <img src="https://via.placeholder.com/1200x400" alt="Imagen 2"></img>
            </div>
        </div>

    </div>
  )
}
