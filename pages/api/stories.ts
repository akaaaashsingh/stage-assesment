import type { NextApiRequest, NextApiResponse } from 'next';

interface Story {
  id: string;
  imageUrl: string;
  duration: number; 
}

const stories: Story[] = [
  { id: '1', imageUrl: 'https://images3.alphacoders.com/108/1082567.jpg', duration: 5 },
  { id: '2', imageUrl: 'https://w0.peakpx.com/wallpaper/1014/995/HD-wallpaper-hood-black-grey-man-random-white.jpg', duration: 5 },
  { id: '3', imageUrl: 'https://e0.pxfuel.com/wallpapers/126/740/desktop-wallpaper-modern-random-b-scb-modern-earth.jpg', duration: 5 },
  { id: '4', imageUrl: 'https://pics.craiyon.com/2023-11-04/e2186f71271447feb9a01e4f68f55cab.webp', duration: 5 },
  { id: '5', imageUrl: 'https://wallpaperswide.com/download/random_bottle_on_the_street-wallpaper-3840x2400.jpg', duration: 5 },
  { id: '6', imageUrl: 'https://c0.wallpaperflare.com/preview/754/833/65/perspective-street-photography-people-random.jpg', duration: 5 },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Story[]>
) {
  res.status(200).json(stories);
}