import { IUser } from "../models/userModel.js";

type Color =
  | "Preto"
  | "Bege"
  | "Marrom"
  | "Cinza"
  | "Branco"
  | "Verde"
  | "Laranja"
  | "Azul"
  | "Amarelo";

type Product = {
  name: string;
  category: "Bolsas e Mochilas" | "Decoração" | "Essenciais" | "Interior";
  price: string;
  description: string;
  images: string[];
  hero?: {
    image: string;
    title: string;
  };
  colors: Color[];
  rating: number;
  reviews: {
    user: IUser;
    rating: number;
    date: Date;
    comment: string;
  }[];
};

const products: Product[] = [
  {
    name: "Cadeira Concha Moderna",
    category: "Interior",
    price: "208.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: [
      "product-classic-chair",
      "product-classic-chair-2",
      "product-classic-chair-3",
    ],
    colors: ["Preto", "Bege", "Marrom"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Luminária Pendente",
    category: "Interior",
    price: "89.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-pendant-lamp", "product-pendant-lamp-2"],
    colors: ["Marrom", "Cinza", "Branco"],
    rating: 4,
    hero: {
      image: "slider-pendant-lighting",
      title: "Iluminação Pendente Contemporânea",
    },
    reviews: [],
  },
  {
    name: "Lanterna de Farol",
    category: "Decoração",
    price: "69.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-lighthouse-lantern", "product-lighthouse-lantern-2"],
    colors: ["Branco"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Relógio de Parede",
    category: "Decoração",
    price: "79.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-wall-clock", "product-wall-clock-2"],
    hero: {
      image: "slider-wall-clock",
      title: "Relógio de Parede com Disco Giratório Minimalista",
    },
    colors: ["Verde", "Laranja"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Mochila Hans",
    category: "Bolsas e Mochilas",
    price: "79.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-hans-backpack", "product-hans-backpack-2"],
    colors: ["Marrom"],
    rating: 3,
    reviews: [],
  },
  {
    name: "Óculos Specs",
    category: "Essenciais",
    price: "109.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-specs-sunglasses", "product-specs-sunglasses-2"],
    colors: ["Marrom"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Cafeteira de Prensa",
    category: "Essenciais",
    price: "39.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-press-coffee-maker", "product-press-coffee-maker-2"],
    colors: ["Azul", "Branco"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Peso de Porta",
    category: "Decoração",
    price: "29.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-door-stop", "product-door-stop-2"],
    colors: [],
    rating: 4,
    reviews: [],
  },
  {
    name: "Bolsa para Notebook",
    category: "Bolsas e Mochilas",
    price: "19.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-laptop-bag", "product-laptop-bag-2"],
    colors: ["Azul"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Garrafa de Vidro Simples",
    category: "Essenciais",
    price: "12.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-plain-glassbottle", "product-plain-glassbottle-2"],
    colors: [],
    rating: 4,
    reviews: [],
  },
  {
    name: "Suporte para Vela de Cerâmica",
    category: "Decoração",
    price: "28.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: [
      "product-ceramic-tealight-holder",
      "product-ceramic-tealight-holder-2",
    ],
    colors: ["Laranja", "Verde"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Cesta de Lona",
    category: "Interior",
    price: "39.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-canvas-basket", "product-canvas-basket-2"],
    colors: ["Branco"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Loção Corporal Âmbar",
    category: "Essenciais",
    price: "12.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-amber-body-lotion", "product-amber-body-lotion-2"],
    colors: [],
    rating: 4,
    reviews: [],
  },
  {
    name: "Óculos Havana",
    category: "Essenciais",
    price: "89.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-havana-sunglasses", "product-havana-sunglasses-2"],
    colors: [],
    rating: 4,
    reviews: [],
  },
  {
    name: "Mochila Henry",
    category: "Bolsas e Mochilas",
    price: "79.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-henry-backpack", "product-henry-backpack-2"],
    colors: ["Azul"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Bolsa de Lona Listrada",
    category: "Bolsas e Mochilas",
    price: "29.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-striped-canvas-bag", "product-striped-canvas-bag-2"],
    colors: ["Laranja", "Azul"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Mesa de Bandeja Redonda",
    category: "Interior",
    price: "79.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-round-tray-table", "product-round-tray-table-2"],
    colors: ["Branco"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Relógio de Cerâmica",
    category: "Essenciais",
    price: "259.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-ceramic-watch", "product-ceramic-watch-2"],
    colors: ["Cinza", "Verde", "Laranja"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Cesto de Revistas",
    category: "Interior",
    price: "28.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-magazine-basket", "product-magazine-basket-2"],
    colors: [],
    rating: 4,
    reviews: [],
  },
  {
    name: "Garrafa Térmica",
    category: "Essenciais",
    price: "79.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-thermo-flask", "product-thermo-flask-2"],
    colors: ["Azul", "Laranja"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Vaso Gold Motif",
    category: "Interior",
    price: "79.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-gold-motif-vase", "product-gold-motif-vase-2"],
    colors: [],
    rating: 4,
    reviews: [],
  },
  {
    name: "Necessaire de Couro",
    category: "Bolsas e Mochilas",
    price: "21.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-leather-wash-bag", "product-leather-wash-bag-2"],
    colors: [],
    rating: 4,
    reviews: [],
  },
  {
    name: "Jogo para Banheiro",
    category: "Interior",
    price: "29.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-bathroom-set", "product-bathroom-set-2"],
    colors: ["Branco"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Bolsa de Tricô com Listras",
    category: "Bolsas e Mochilas",
    price: "29.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-marine-stripe-bag", "product-marine-stripe-bag-2"],
    colors: ["Azul", "Marrom"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Bolsa Esponja",
    category: "Bolsas e Mochilas",
    price: "59.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-sponge-bag", "product-sponge-bag-2"],
    colors: ["Laranja", "Amarelo"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Jarro de Vidro",
    category: "Essenciais",
    price: "79.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-glass-pitcher", "product-glass-pitcher-2"],
    colors: [],
    rating: 4,
    reviews: [],
  },
  {
    name: "Pantufa Wedge",
    category: "Essenciais",
    price: "29.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-wedge-slippers", "product-wedge-slippers-2"],
    colors: ["Cinza"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Bolsa de Alça",
    category: "Bolsas e Mochilas",
    price: "46.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-navy-bag", "product-navy-bag-2"],
    colors: ["Azul", "Verde"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Mochila Jersey",
    category: "Bolsas e Mochilas",
    price: "39.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-jersey-backpack", "product-jersey-backpack-2"],
    colors: ["Cinza"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Saquinho Perfumado Floral",
    category: "Decoração",
    price: "19.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: [
      "product-floral-scented-sachet",
      "product-floral-scented-sachet-2",
    ],
    colors: ["Azul", "Verde"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Vaso de Vidro Colorido",
    category: "Decoração",
    price: "39.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-stained-glass-vase", "product-stained-glass-vase-2"],
    colors: ["Azul", "Laranja"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Jogo de Pratos",
    category: "Decoração",
    price: "19.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-coaster-set", "product-coaster-set-2"],
    colors: [],
    rating: 4,
    reviews: [],
  },
  {
    name: "Necessaire Adrian",
    category: "Bolsas e Mochilas",
    price: "29.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-adrian-wash-bag", "product-adrian-wash-bag-2"],
    colors: ["Azul"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Loção Corporal ECO",
    category: "Essenciais",
    price: "12.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["eco-lotion", "eco-lotion-2"],
    colors: [],
    rating: 4,
    reviews: [],
  },
  {
    name: "Cesta Trançado",
    category: "Interior",
    price: "59.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-plaited-basket", "product-plaited-basket-2"],
    hero: {
      image: "slider-basket",
      title: "Cesto com Padrão Zigue-zague de Bambu",
    },
    colors: ["Laranja", "Azul"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Bloco de Notas Texturizado",
    category: "Essenciais",
    price: "79.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-textured-notebook", "product-textured-notebook-2"],
    colors: [],
    rating: 4,
    reviews: [],
  },
  {
    name: "Mochila Emil",
    category: "Bolsas e Mochilas",
    price: "79.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-emil-backpack", "product-emil-backpack-2"],
    colors: ["Azul"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Headphone Solo",
    category: "Essenciais",
    price: "190.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-emil-backpack", "product-emil-backpack-2"],
    colors: ["Branco", "Marrom"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Jogo para Banheiro de Madeira",
    category: "Interior",
    price: "29.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-wooden-dispencer", "product-wooden-dispencer-2"],
    colors: [],
    rating: 4,
    reviews: [],
  },
  {
    name: "Cabides Multicoloridos",
    category: "Interior",
    price: "12.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-wooden-dispencer", "product-wooden-dispencer-2"],
    colors: [],
    rating: 4,
    reviews: [],
  },
  {
    name: "Porta-Copos Coloridos",
    category: "Decoração",
    price: "19.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-multicolor-hangers", "product-multicolor-hangers-2"],
    colors: ["Laranja", "Verde"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Sapatilha Bordada",
    category: "Essenciais",
    price: "179.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-embrodiered-slippers", "product-embrodiered-slippers-2"],
    colors: ["Azul"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Bolsa para Vários Dispositivos",
    category: "Bolsas e Mochilas",
    price: "55.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-multi-device-bag", "product-multi-device-bag-2"],
    colors: ["Cinza"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Calendário Dobrável",
    category: "Essenciais",
    price: "12.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-folder-calendar", "product-folder-calendar-2"],
    colors: ["Azul", "Laranja"],
    rating: 4,
    reviews: [],
  },
  {
    name: "Travessa de Madeira",
    category: "Decoração",
    price: "39.00",
    description:
      "Projetada para simplicidade e feita com materiais de alta qualidade. Sua geometria elegante e combinações de materiais criam um visual moderno e personalizado.",
    images: ["product-wood-tray", "product-wood-tray-2"],
    colors: ["Branco"],
    rating: 4,
    reviews: [],
  },
];

export default products;
