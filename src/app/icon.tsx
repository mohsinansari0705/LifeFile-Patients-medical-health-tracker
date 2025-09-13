import type { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#4682B4',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 8,
        }}
      >
        L
      </div>
    ),
    {
      ...size,
    }
  );
}
