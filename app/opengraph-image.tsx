import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Fillablank - Digital Engineering Studio';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #090a0f 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20, letterSpacing: '-0.03em' }}>Fillablank</div>
        <div style={{ fontSize: 38, opacity: 0.9, color: '#3b82f6', fontWeight: 600 }}>Digital Engineering Studio</div>
        <div
          style={{
            fontSize: 26,
            opacity: 0.8,
            marginTop: 30,
            maxWidth: '80%',
            textAlign: 'center',
            color: '#cbd5e1',
          }}
        >
          Mobile Apps • Web Platforms • Enterprise Systems
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
