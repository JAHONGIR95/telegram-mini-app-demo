import About from '@/pages/About';
import Gallery from '@/pages/Gallery';
import Home from '@/pages/Home';
import type { ComponentType, JSX } from 'react';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: Home, title: 'Home' },
  { path: '/about', Component: About, title: 'about' },
  { path: '/gallery', Component: Gallery, title: 'gallery' },
];
