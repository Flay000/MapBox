import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Substitua pelo seu token de acesso do Mapbox
const MAPBOX_TOKEN = 'pk.eyJ1Ijoiam9hby1zaWx2YTEyMyIsImEiOiJjbTMzc2trYmgxazg4MmtxMjR1MWU3eGkxIn0.jOAOBslRde3h13MH8Fov7A';  // Seu token
//-20.309855327738497, -40.29066001692854
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
    <div style={{ height: '100vh' }}>
      <ReactMapGL
        {...viewport}
        width="100%"
        height="100%"
        mapboxApiAccessToken={MAPBOX_TOKEN}  // Certifique-se de que o token está correto
        mapStyle="mapbox://styles/mapbox/streets-v11" // Estilo do mapa
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {/* Adicionando um marcador no local desejado */}
        <Marker latitude={markerLatitude} longitude={markerLongitude}>
          <div
            style={{ cursor: 'pointer' }}
            onClick={handleMarkerClick}  // Adiciona evento de clique ao marcador
          >
            <img src="https://i.imgur.com/WbfgjYk.png" alt="Marcador" style={{ width: 30, height: 30 }} />
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
  );
};

export default App;
