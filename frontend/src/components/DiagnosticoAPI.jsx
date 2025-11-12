// Componente de diagnóstico temporal
import React from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export function DiagnosticoAPI() {
  return (
    <div style={{
      padding: '20px',
      margin: '20px',
      background: '#f0f0f0',
      borderRadius: '8px',
      fontFamily: 'monospace'
    }}>
      <h2>🔍 Diagnóstico de API</h2>
      <div style={{ marginTop: '20px' }}>
        <p><strong>VITE_API_URL desde import.meta.env:</strong></p>
        <code style={{ background: 'yellow', padding: '5px', display: 'block', marginTop: '10px' }}>
          {import.meta.env.VITE_API_URL || 'undefined (no configurada)'}
        </code>
      </div>
      <div style={{ marginTop: '20px' }}>
        <p><strong>API_BASE_URL que se está usando:</strong></p>
        <code style={{ background: API_BASE_URL.includes('localhost') ? '#ffcccc' : '#ccffcc', padding: '5px', display: 'block', marginTop: '10px' }}>
          {API_BASE_URL}
        </code>
        {API_BASE_URL.includes('localhost') && (
          <p style={{ color: 'red', marginTop: '10px' }}>
            ❌ ERROR: Está usando localhost. La variable VITE_API_URL NO está configurada correctamente.
          </p>
        )}
        {!API_BASE_URL.includes('localhost') && (
          <p style={{ color: 'green', marginTop: '10px' }}>
            ✅ CORRECTO: Está usando el backend de producción.
          </p>
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        <p><strong>Todas las variables de entorno disponibles:</strong></p>
        <pre style={{ background: 'white', padding: '10px', overflow: 'auto' }}>
          {JSON.stringify(import.meta.env, null, 2)}
        </pre>
      </div>
      <div style={{ marginTop: '20px', padding: '10px', background: '#fff3cd', borderRadius: '5px' }}>
        <p><strong>⚠️ Si ves "undefined" o "localhost":</strong></p>
        <ol>
          <li>Ve a Render → tu Static Site → Environment</li>
          <li>Verifica que existe: <code>VITE_API_URL = https://generador-de-horarios-backend.onrender.com</code></li>
          <li>Ve a Manual Deploy → "Clear build cache & deploy"</li>
          <li>Espera a que termine el deploy</li>
          <li>Borra la caché del navegador y recarga</li>
        </ol>
      </div>
    </div>
  );
}

export default DiagnosticoAPI;
