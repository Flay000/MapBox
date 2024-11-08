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
  const markerLatitude = -20.309;
  const markerLongitude = -40.290;

  // Função para adicionar um popup ao clicar no marcador
  const handleMarkerClick = () => {
    setPopupInfo({
      latitude: markerLatitude,
      longitude: markerLongitude,
      name: 'Multicar Mega Store',
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
            Como Chegar Na Multicar Mega Store
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
          mapStyle="mapbox://styles/joao-silva123/cm384g2xn01hm01pd6olb5ft1" // Estilo do mapa
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          {/* Adicionando um marcador no local desejado */}
          <Marker latitude={markerLatitude} longitude={markerLongitude}>
            <div
              style={{ cursor: 'pointer' }}
              onClick={handleMarkerClick}  // Adiciona evento de clique ao marcador
            >
              <img src={logo} alt="Marcador" style={{ width: 80, height: 80 }} />
            </div>
          </Marker>

          {/* Exibe o popup quando o marcador é clicado */}
          {popupInfo && (
            <Popup
              latitude={popupInfo.latitude}
              longitude={popupInfo.longitude}
              onClose={() => setPopupInfo(null)} // Fecha o popup
            >
              <div>{popupInfo.name}</div>
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
  color: '#0a1721'
};

export default App;
