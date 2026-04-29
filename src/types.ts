export interface Song {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  category: string;
  lyrics?: string;
}

export type Category = 
  | 'Worship' 
  | 'Praise' 
  | 'Contemporary' 
  | 'Traditional' 
  | 'Urban' 
  | 'Hymns';
