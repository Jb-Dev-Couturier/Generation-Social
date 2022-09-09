import { BsCode, BsEmojiSunglasses } from 'react-icons/bs';
import { GiCakeSlice, GiGalaxy, GiLipstick } from 'react-icons/gi';
import { FaPaw, FaMedal, FaGamepad } from 'react-icons/fa';

import { ImBooks } from 'react-icons/im';


export const topics = [
  {
    name: 'manga',
    icon: <ImBooks />,
  },
  {
    name: 'humour',
    icon: <BsEmojiSunglasses />,
  },
  {
    name: 'jeux',
    icon: <FaGamepad />,
  },
  {
    name: 'gastronomie',
    icon: <GiCakeSlice />,
  },
  {
    name: 'danse',
    icon: <GiGalaxy />,
  },
  {
    name: 'mode',
    icon: <GiLipstick />,
  },
  {
    name: 'animaux',
    icon: <FaPaw />,
  },
  {
    name: 'sports',
    icon: <FaMedal />,
  },
];

export const footerList1 = [
  'Apropos',
  'Actualités',
  'Magasin',
  'Contact',
  'Carrières',
  'J&K Web',
  
];
export const footerList2 = [
  'GenSocial',
  'Avertissements',
  'Devellopeurs',
  'Rewards',
];
export const footerList3 = [
  'Services',
  'Securité',
  'Conditions',
  'Compte Privé',
  'Portail',
  'Chart',
];