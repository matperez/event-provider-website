
import { Venue, Scenario, Testimonial } from './types';

export const VENUES: Venue[] = [
  {
    id: 'v1',
    name: 'Loft Industrial',
    description: 'Стильное пространство в центре города с кирпичными стенами и панорамными окнами.',
    capacity: 150,
    pricePerDay: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    tags: ['Лофт', 'Центр', 'Звук 10кВт']
  },
  {
    id: 'v2',
    name: 'Grand Manor House',
    description: 'Элегантный загородный особняк с ухоженным садом для выездных церемоний.',
    capacity: 300,
    pricePerDay: 120000,
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800',
    tags: ['Премиум', 'Сад', 'Особняк']
  },
  {
    id: 'v3',
    name: 'Azure Beach Club',
    description: 'Открытая площадка на берегу моря с бассеном и лаунж-зоной.',
    capacity: 200,
    pricePerDay: 85000,
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    tags: ['Пляж', 'Лето', 'Вечеринка']
  },
  {
    id: 'v4',
    name: 'Royal Cigar Lounge',
    description: 'Закрытый клуб с кожаной мебелью и отделкой из темного дерева. Идеально для покера и дегустаций.',
    capacity: 40,
    pricePerDay: 60000,
    imageUrl: 'https://images.unsplash.com/photo-1541535650810-10d26f5c2abb?auto=format&fit=crop&q=80&w=800',
    tags: ['VIP', 'Камерно', 'Элитно']
  },
  {
    id: 'v5',
    name: 'The Cyber Arena',
    description: 'Высокотехнологичный полигон с неоновым освещением. Оборудован для профессионального лазертага и VR-турниров.',
    capacity: 80,
    pricePerDay: 55000,
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    tags: ['Hi-Tech', 'Экшн', 'Неон']
  },
  {
    id: 'v6',
    name: 'Woodland Spa & Grill',
    description: 'Загородный комплекс с настоящей русской баней на дровах, большой верандой и зоной барбекю.',
    capacity: 30,
    pricePerDay: 40000,
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ad6ce6e8340?auto=format&fit=crop&q=80&w=800',
    tags: ['Природа', 'Уют', 'Релакс']
  },
  {
    id: 'v7',
    name: 'Penthouse Skyline',
    description: 'Роскошный пентхаус на 60-м этаже с круговой террасой и видом на весь город.',
    capacity: 50,
    pricePerDay: 95000,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    tags: ['Вид', 'Премиум', 'Терраса']
  },
  {
    id: 'v8',
    name: 'Art Gallery Space',
    description: 'Минималистичное пространство с белыми стенами и профессиональным выставочным светом.',
    capacity: 100,
    pricePerDay: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1531050171669-7df9b2089a61?auto=format&fit=crop&q=80&w=800',
    tags: ['Арт', 'Свет', 'Минимализм']
  },
  {
    id: 'v9',
    name: 'Secret Library',
    description: 'Уникальная локация со стеллажами до потолка, винтажной мебелью и атмосферой старой доброй Англии.',
    capacity: 25,
    pricePerDay: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800',
    tags: ['Атмосфера', 'Тихо', 'История']
  },
  {
    id: 'v10',
    name: 'Modern Canteen',
    description: 'Светлое и просторное кафе в скандинавском стиле. Идеально для завтраков и семейных бранчей.',
    capacity: 60,
    pricePerDay: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800',
    tags: ['Уют', 'Бюджетно', 'Светло']
  }
];

export const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    title: 'Neon Cyberpunk Night',
    description: 'Погружение в мир будущего с неоновым светом, VR-зонами и электронной музыкой.',
    duration: '6 часов',
    pricePerPerson: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    category: 'Corporate'
  },
  {
    id: 's2',
    title: 'Классическая Сказка',
    description: 'Традиционная свадьба с живой музыкой, цветочным оформлением и изысканным меню.',
    duration: '10 часов',
    pricePerPerson: 5500,
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
    category: 'Wedding'
  },
  {
    id: 's3',
    title: 'Космическое Приключение',
    description: 'Детский день рождения с аниматорами-астронавтами и квестом по поиску артефактов.',
    duration: '4 часа',
    pricePerPerson: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1530103043960-ef38714abb15?auto=format&fit=crop&q=80&w=800',
    category: 'Birthday'
  },
  {
    id: 's4',
    title: 'Покерная вечеринка',
    description: 'Профессиональные столы, дилеры и атмосфера закрытого клуба для истинных ценителей азарта.',
    duration: '5 часов',
    pricePerPerson: 3200,
    imageUrl: 'https://images.unsplash.com/photo-1541270656001-443b74966953?auto=format&fit=crop&q=80&w=800',
    category: 'Social'
  },
  {
    id: 's5',
    title: 'Алко-казино',
    description: 'Уникальный формат дегустации: делайте ставки на сорт, регион или крепость напитка в игровой форме.',
    duration: '3 часа',
    pricePerPerson: 4500,
    imageUrl: 'https://images.unsplash.com/photo-1596838132731-3301c3fd4317?auto=format&fit=crop&q=80&w=800',
    category: 'Corporate'
  },
  {
    id: 's6',
    title: 'Баня с шашлыками',
    description: 'Традиционный отдых в премиальном банном комплексе с услугами парильщика и фермерским мясом на углях.',
    duration: '8 часов',
    pricePerPerson: 5000,
    imageUrl: 'https://images.unsplash.com/photo-1515362655824-9a74989f318e?auto=format&fit=crop&q=80&w=800',
    category: 'Social'
  },
  {
    id: 's7',
    title: 'Лазертаг-сражение',
    description: 'Тактические игры на специально оборудованной арене. Драйв, адреналин и командная работа.',
    duration: '3 часа',
    pricePerPerson: 1800,
    imageUrl: 'https://images.unsplash.com/photo-1552061051-76678601859b?auto=format&fit=crop&q=80&w=800',
    category: 'Birthday'
  },
  {
    id: 's8',
    title: 'Турнир VR-игр',
    description: 'Последние новинки виртуальной реальности на мощном оборудовании. Соревнования в метавселенной.',
    duration: '4 часа',
    pricePerPerson: 2800,
    imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80&w=800',
    category: 'Corporate'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Александра Волкова',
    role: 'HR-директор TechFlow',
    content: 'Наш корпоратив в стиле Neon Cyberpunk превзошел все ожидания. Команда EventLux продумала каждую мелочь, от неоновых коктейлей до VR-квеста.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    relatedId: 's1'
  },
  {
    id: 't2',
    author: 'Михаил и Елена',
    role: 'Молодожены',
    content: 'Классическая свадьба в особняке стала настоящей сказкой. Спасибо за чуткость и профессионализм. Нам не пришлось ни о чем беспокоиться.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    relatedId: 's2'
  },
  {
    id: 't3',
    author: 'Дмитрий Соколов',
    role: 'Отец именинника',
    content: 'Космическое приключение — это хит! Аниматоры были просто великолепны, дети полностью погрузились в игру.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    relatedId: 's3'
  },
  {
    id: 't4',
    author: 'Анна Кравцова',
    role: 'Маркетолог',
    content: 'Loft Industrial — идеальное место. Мы проводили здесь запуск нового продукта. Свет и звук на высоте.',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    relatedId: 'v1'
  },
  {
    id: 't5',
    author: 'Игорь Денисов',
    role: 'Предприниматель',
    content: 'Покерная вечеринка прошла на уровне лучших казино Макао. Дилеры — настоящие профи, атмосфера зашкаливала.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    relatedId: 's4'
  },
  {
    id: 't6',
    author: 'Виктор Степанов',
    role: 'Гость мероприятия',
    content: 'Алко-казино — лучший формат для компании друзей. Было весело и познавательно, отличная работа сомелье-крупье!',
    avatarUrl: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    relatedId: 's5'
  },
  {
    id: 't7',
    author: 'Олег Самойлов',
    role: 'Тимлид',
    content: 'В Cyber Arena организовали турнир по лазертагу для всей команды. Огромный плюс за качественное оборудование и крутой дизайн площадки.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    relatedId: 'v5'
  },
  {
    id: 't8',
    author: 'Мария Антонова',
    role: 'Организатор девичника',
    content: 'Провели вечер в Woodland Spa. Баня просто супер, а шашлыки от шеф-повара — это отдельное удовольствие. Уютно и очень душевно!',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    relatedId: 'v6'
  }
];
