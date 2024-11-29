import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { motion } from 'framer-motion'; // Importa framer-motion
import 'mapbox-gl/dist/mapbox-gl.css';
import logo from '../src/Remove-bg.ai_1732836512669.png'; // Verifique se o caminho está correto!

// Substitua pelo seu token de acesso do Mapbox
const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam9hby1zaWx2YTEyMyIsImEiOiJjbTMzc2UxM3Yxa3E5Mm1vZzBpMXcwejU3In0.stwZmeRfUx8xkmhcU0_sdA';

const App = () => {
  const markerLatitude = -20.345900879283594;
  const markerLongitude = -40.29448936333886;
  const [viewport, setViewport] = useState({
    latitude: markerLatitude,
    longitude: markerLongitude,
    zoom: 13.5,
  });

  const [popupInfo, setPopupInfo] = useState(null);



  // Função para adicionar um popup ao clicar no marcador
  const handleMarkerClick = () => {
    setPopupInfo({
      latitude: markerLatitude,
      longitude: markerLongitude,
      name: 'Et Lux',
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
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          <motion.h1
            style={titleStyles}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          >
            Como chegar na Et Lux 
          </motion.h1>
        </div>
      </header>

    

      {/* Mapa */}
      <div style={{ flex: 1 }}>
        <ReactMapGL
          {...viewport}
          width="100%"
          height="100%"
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/joao-silva123/cm3z66xqg00h401s0dm5b6fzr"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
          {/* Adicionando um marcador no local desejado */}
          <Marker
            latitude={markerLatitude}
            longitude={markerLongitude}
            anchor="bottom"
          >
            <motion.div
              style={{ cursor: 'pointer' }}
              onClick={handleMarkerClick}
              whileHover={{ scale: 1.2 }} // Animação de zoom ao passar o mouse
              transition={{ duration: 0.3 }}
            >
              <img
                src={logo}
                alt="Marcador"
                style={{ width: '75px', height: '75px', objectFit: 'contain' }}
              />
            </motion.div>
          </Marker>

          {/* Exibe o popup quando o marcador é clicado */}
          {popupInfo && (
            <Popup
              latitude={popupInfo.latitude}
              longitude={popupInfo.longitude}
              onClose={() => setPopupInfo(null)}
              closeButton={false}
              offset={[0, -30]}
            >
              <div style={popupStyles}>
                <h3 style={popupTitleStyles}>{popupInfo.name}</h3>
                <p style={popupDescriptionStyles}>
                  Et Lux - Av. Luciano das Neves, 1845 - Centro de Vila Velha, Vila Velha - ES, 29100-060
                </p>
                <p style={popupDescriptionStyles}>
                  (27) 99995-3755
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
  backgroundImage: 'linear-gradient(to right, #ffeb3b, #ffffff)', // Gradiente de amarelo para branco
  padding: '10px 20px', // Padding reduzido para menos espaço
  color: '#fff', // Cor do texto
  textAlign: 'center', // Centraliza o conteúdo
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Adiciona sombra sutil
  height: '80px', // Reduz a altura do cabeçalho
};

// Contêiner para logo e título
const logoContainerStyles = {
  display: 'flex',
  flexDirection: 'column', // Organiza logo e título em coluna
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px', // Menos espaço entre logo e título
};

// Estilo do logo
const logoStyles = {
  width: 50, // Reduz o tamanho do logo
  height: 50,
  objectFit: 'contain', // Mantém a proporção da imagem
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // Sombra sutil no logo
  borderRadius: '8px', // Bordas arredondadas
};

// Estilo do título
const titleStyles = {
  margin: 0,
  fontSize: '20px', // Reduz o tamanho do título
  fontFamily: "'Playfair Display', serif", // Fonte mais elegante
  color: '#0a1721', // Cor escura para bom contraste
  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)', // Sombra mais suave para o título
  fontWeight: 'bold', // Destaca o título
  textTransform: 'uppercase', // Faz o título em letras maiúsculas
};

// Estilos do popup (tooltip)
const popupStyles = {
  backgroundColor: 'black',
  padding: '10px 15px',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Sombra sutil
  width: '200px',
  fontFamily: 'Arial, sans-serif',
};

const popupTitleStyles = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#ffff',
  margin: '0 0 5px 0',
};

const popupDescriptionStyles = {
  fontSize: '14px',
  color: '#ffff',
  margin: 0,
};

// Responsividade para dispositivos móveis
const mediaQueries = `
  @media (max-width: 768px) {
    header {
      height: 120px;
    }
    header h1 {
      font-size: 18px;
    }
    header img {
      width: 40px;
      height: 40px;
    }
  }
  @media (max-width: 480px) {
    header {
      height: 100px;
      padding: 10px 15px;
    }
    header h1 {
      font-size: 16px;
    }
    header img {
      width: 35px;
      height: 35px;
    }
  }
`;

export default App;
