
import React from 'react';
import { Project, KeyConfig } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'EGKey',
    description: 'A custom built split ergonomic keyboard',
    techStack: ['PCB', 'CAD/3D modeling', 'QMK code', 'VIAL support'],
    imageUrl: 'https://efficient-gray-t6qa5jg1pk.edgeone.app/image_2026-01-14_155412680.png',
    link: 'https://github.com/Sh4rk-glitch/EGKey'
  },
  {
    id: '2',
    title: 'PeerPath',
    description: 'PeerPath is a collaborative learning platform where students join or host live study sessions, build skills through interactive pathways, and learn together with peer mentoring.',
    techStack: ['React', 'TypeScript', 'Supabase', 'Vercel', 'Vite'],
    imageUrl: 'https://huge-peach-hktrucu9fi.edgeone.app/image_2026-01-14_161511837.png',
    link: 'https://github.com/Sh4rk-glitch/PeerPath-learning'
  },
  {
    id: '3',
    title: 'Rubiks Cube Solving Robot',
    description: 'A lego rubiks cube solving bot that follows F2L to solve a cube in a minute and 30 seconds',
    techStack: ['3D Visualization', 'Python 3', 'Linux Environment', 'F2L Solver'],
    imageUrl: 'https://giant-moccasin-ikbzicjudu.edgeone.app/image_2026-01-14_165246657.png',
    link: 'https://www.instagram.com/reel/DEgcJFJMteV/'
  },
  {
    id: '4',
    title: 'FRC',
    description: 'FRC is a high energy robotics competition where teams design, build, and program full scale robots to tackle complex engineering challenges under real world pressure.',
    techStack: ['Java', 'CAD', 'C++', 'Electronics & build'],
    imageUrl: 'https://due-harlequin-qfq7t8xuwv.edgeone.app/image_2026-01-14_165526445.png',
    link: undefined 
  }
];

export const getKeyWidth = (config: KeyConfig) => {
  if (config.isSpecial) return 110;
  const id = config.id.toLowerCase();
  if (id === 'back' || id === 'bck') return 88;
  if (id === 'enter' || id === 'ent') return 94;
  if (id === 'shift-l' || id === 'shift-r') return 98;
  if (id === 'tab') return 72;
  if (id === 'caps') return 82;
  if (['ctrl', 'opt', 'cmd'].includes(id.split('-')[0])) return 58;
  return 48; 
};
