import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { motion } from 'framer-motion'; // Importa framer-motion
import 'mapbox-gl/dist/mapbox-gl.css';
import logo from '../src/logo-removebg-preview(2).png';

// Substitua pelo seu token de acesso do Mapbox
const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam9hby1zaWx2YTEyMyIsImEiOiJjbTMzc2UxM3Yxa3E5Mm1vZzBpMXcwejU3In0.stwZmeRfUx8xkmhcU0_sdA';

const App = () => {
  const [viewport, setViewport] = useState({
    latitude: -20.309,
    longitude: -40.290,
    zoom: 14,
  });

  const [popupInfo, setPopupInfo] = useState(null);

  // Coordenadas para o marcador
  const markerLatitude = -20.351;
  const markerLongitude = -40.297;
  // -20.351998642310924, -40.297696703406885

  // Função para adicionar um popup ao clicar no marcador
  const handleMarkerClick = () => {
    setPopupInfo({
      latitude: markerLatitude,
      longitude: markerLongitude,
      name: 'Multicar  Multimarcas',
    });
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Cabeçalho */}
      <header style={headerStyles}>
        <div style={logoContainerStyles}>
          <motion.img
            src={logo}
            alt="Logo"
            style={logoStyles}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
          <motion.h1
            style={titleStyles}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            Como Chegar Na Multicar Multimarcas 
          </motion.h1>
        </div>
      </header>

      {/* Mapa */}
      <div style={{ flex: 1 }}>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          mapboxApiAccessToken={MAPBOX_TOKEN}  // Certifique-se de que o token está correto
          mapStyle="mapbox://styles/joao-silva123/cm3f8idj6002401s15xsl5cti" // Estilo do mapa
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          {/* Adicionando um marcador no local desejado */}
          <Marker
            latitude={markerLatitude}
            longitude={markerLongitude}
            anchor="bottom" // Isso garante que o marcador será posicionado corretamente no ponto de ancoragem
          >
            <div
              style={{ cursor: 'pointer' }}
              onClick={handleMarkerClick}
            >
              <img
                src={logo}
                alt="Marcador"
                style={{ width: 50, height: 50 }} // Tamanho maior da imagem
              />
            </div>
          </Marker>

          {/* Exibe o popup quando o marcador é clicado */}
          {popupInfo && (
            <Popup
              latitude={popupInfo.latitude}
              longitude={popupInfo.longitude}
              onClose={() => setPopupInfo(null)} // Fecha o popup
              closeButton={false}  // Opcional: remove o botão de fechar do popup
              offset={[0, -30]}  // Ajusta a posição do popup
            >
              <div style={popupStyles}>
                <h3 style={popupTitleStyles}>{popupInfo.name}</h3>
                <p style={popupDescriptionStyles}>Encontre nossa loja e aproveite as ofertas!
                </p>
                <p style={popupDescriptionStyles}>
                (27) 3010-3805
                </p>
              </div>
            </Popup>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
};

// Estilos do cabeçalho
const headerStyles = {
  backgroundImage: 'linear-gradient(to right, #00bfff, black)', // Gradiente de azul
  padding: '10px 20px', // Padding interno
  color: '#fff', // Cor do texto
  textAlign: 'center', // Centraliza o conteúdo
};

// Contêiner para logo e título
const logoContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px', // Espaçamento entre logo e título
};

// Estilo do logo
const logoStyles = {
  width: 50,
  height: 50,
};

// Estilo do título
const titleStyles = {
  margin: 0,
  fontSize: '24px', // Tamanho do título
  fontFamily: "'Playfair Display', serif",
  color: '#0a1721',
};

// Estilos do popup (tooltip)
const popupStyles = {
  backgroundColor: '#179B97',
  padding: '10px 15px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra sutil
  width: '200px',
  fontFamily: 'Arial, sans-serif',
};

const popupTitleStyles = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'blue',
  margin: '0 0 5px 0',
};

const popupDescriptionStyles = {
  fontSize: '14px',
  color: '#555',
  margin: 0,
};

export default App;
