import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Link as MuiLink,
} from '@mui/material';
import { motion } from 'framer-motion';
import ResponsiveIframe from './ResponsiveIframe';

interface BaseItem {
  id: number;
  description: string;
  link?: string;
  linkTitle?: string; // New optional field for custom link titles
  name?: string;
  title?: string;
  price?: string;
  venue?: string;
}

interface ImageItem extends BaseItem {
  mediaType: 'image';
  mediaUrl: string;
}

interface VideoItem extends BaseItem {
  mediaType: 'video';
  mediaUrl: string;
}

type MediaItem = ImageItem | VideoItem;

interface ItemCardProps {
  item: MediaItem;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card variant="outlined">
        <CardActionArea
          component={item.link ? 'a' : 'div'}
          href={item.link}
          target={item.link ? '_blank' : undefined}
          rel={item.link ? 'noopener noreferrer' : undefined}
        >
          {item.mediaType === 'image' ? (
            <CardMedia
              component="img"
              height="200"
              image={item.mediaUrl}
              alt={item.title}
              loading="lazy" // Optional: Improve performance with lazy loading
            />
          ) : (
            <ResponsiveIframe src={item.mediaUrl} title={item.title} />
          )}
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            {item.link && item.linkTitle && (
              <Typography variant="body2" color="primary">
                <MuiLink
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  {item.linkTitle}
                </MuiLink>
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};

export default ItemCard;