import React from 'react';
import { Box } from '@mui/material';

interface ResponsiveIframeProps {
  src: string;
  title: string | undefined;
}

const ResponsiveIframe: React.FC<ResponsiveIframeProps> = ({ src, title }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        paddingTop: '56.25%', // 16:9 Aspect Ratio
      }}
    >
      <iframe
        src={src}
        title={title}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Box>
  );
};

export default ResponsiveIframe;