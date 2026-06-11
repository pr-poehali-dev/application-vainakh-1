export interface Story {
  id: number;
  userId: number;
  name: string;
  avatar: string;
  seen: boolean;
  time: string;
  online: boolean;
}

export interface Post {
  id: number;
  userId: number;
  name: string;
  avatar: string;
  time: string;
  text?: string;
  image?: string;
  type: "text" | "photo" | "audio" | "video";
  fires: number;
  comments: number;
  online: boolean;
  recentlyOnline?: boolean;
}

export interface ChatUser {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  recentlyOnline?: boolean;
  lastSeen?: string;
}

export interface Message {
  id: number;
  fromMe: boolean;
  text: string;
  time: string;
  reaction?: string;
}

export const STORIES: Story[] = [
  { id: 1, userId: 10, name: "Ты", avatar: "🧑", seen: false, time: "", online: true },
  { id: 2, userId: 11, name: "Аслан", avatar: "👨‍🦱", seen: false, time: "15 мин назад", online: true },
  { id: 3, userId: 12, name: "Хеда", avatar: "👩", seen: false, time: "1 час назад", online: false },
  { id: 4, userId: 13, name: "Муса", avatar: "🧔", seen: true, time: "3 часа назад", online: false },
  { id: 5, userId: 14, name: "Залина", avatar: "👩‍🦰", seen: false, time: "2 часа назад", online: true },
  { id: 6, userId: 15, name: "Ибрагим", avatar: "👨", seen: true, time: "вчера", online: false },
  { id: 7, userId: 16, name: "Лейла", avatar: "🧕", seen: false, time: "20 мин назад", online: true },
];

export const POSTS: Post[] = [
  {
    id: 1, userId: 11, name: "Аслан Исаев", avatar: "👨‍🦱", time: "15 минут назад",
    text: "Грозный — самый красивый город на Северном Кавказе 🏙️ Кто согласен — ставьте огонь!",
    type: "text", fires: 142, comments: 28, online: true,
  },
  {
    id: 2, userId: 12, name: "Хеда Нурова", avatar: "👩", time: "2 часа назад",
    text: "Горы Чечни. Нет слов, только красота 🏔️",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    type: "photo", fires: 389, comments: 54, online: false,
  },
  {
    id: 3, userId: 14, name: "Залина Дудаева", avatar: "👩‍🦰", time: "вчера в 19:30",
    text: "Вечерний Грозный — лучшее место для прогулок ✨",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&q=80",
    type: "photo", fires: 217, comments: 31, online: true,
  },
  {
    id: 4, userId: 13, name: "Муса Ахматов", avatar: "🧔", time: "3 дня назад",
    text: "Новая трека уже в работе 🎵 Голосовой пост — слушайте!",
    type: "audio", fires: 503, comments: 89, online: false, recentlyOnline: true,
  },
  {
    id: 5, userId: 16, name: "Лейла Бекова", avatar: "🧕", time: "5 мая 2026",
    text: "Традиционные блюда нашего народа — это гордость и душа 🍽️",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    type: "photo", fires: 678, comments: 112, online: true,
  },
];

export const CHATS: ChatUser[] = [
  { id: 11, name: "Аслан Исаев", avatar: "👨‍🦱", lastMessage: "Ок, буду через 10 минут!", time: "сейчас", unread: 2, online: true },
  { id: 12, name: "Хеда Нурова", avatar: "👩", lastMessage: "Спасибо за фото 😊", time: "2 мин", unread: 0, online: false, recentlyOnline: true, lastSeen: "был 2 минуты назад" },
  { id: 14, name: "Залина Дудаева", avatar: "👩‍🦰", lastMessage: "Голосовое сообщение 🎵", time: "15 мин", unread: 1, online: false, lastSeen: "был вчера в 21:30" },
  { id: 13, name: "Муса Ахматов", avatar: "🧔", lastMessage: "Новая трека готова!", time: "1 час", unread: 0, online: false, lastSeen: "был 3 часа назад" },
  { id: 15, name: "Ибрагим Хаджиев", avatar: "👨", lastMessage: "Привет! Как дела?", time: "вчера", unread: 0, online: false, lastSeen: "был вчера в 18:00" },
  { id: 16, name: "Лейла Бекова", avatar: "🧕", lastMessage: "Отличная идея 🔥", time: "вчера", unread: 0, online: true },
  { id: 17, name: "Беслан Кадиев", avatar: "🧑", lastMessage: "Увидимся на выходных", time: "3 дня", unread: 0, online: false, lastSeen: "был 3 дня назад" },
];

export const MESSAGES: Message[] = [
  { id: 1, fromMe: false, text: "Привет! Как дела?", time: "10:30" },
  { id: 2, fromMe: true, text: "Отлично! Ты как?", time: "10:31" },
  { id: 3, fromMe: false, text: "Тоже всё хорошо 🔥", time: "10:31" },
  { id: 4, fromMe: true, text: "Идёшь сегодня на встречу?", time: "10:35" },
  { id: 5, fromMe: false, text: "Да, буду! Ок, буду через 10 минут!", time: "10:36", reaction: "🔥" },
];

export const EXPLORE_POSTS: Post[] = [
  {
    id: 101, userId: 20, name: "Адам Муртазов", avatar: "👨‍💻", time: "5 мин назад",
    text: "Топ места Чечни для путешествий в 2026 году 🗺️",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
    type: "photo", fires: 1204, comments: 234, online: true,
  },
  {
    id: 102, userId: 21, name: "Зайнаб Эдилова", avatar: "👩‍🎤", time: "30 мин назад",
    text: "Чеченская музыка набирает обороты по всему миру 🎶",
    type: "audio", fires: 876, comments: 143, online: false,
  },
  {
    id: 103, userId: 22, name: "Рамзан Дадаев", avatar: "🏋️", time: "1 час назад",
    text: "Утренняя тренировка в горах 💪 Нет ничего лучше!",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&q=80",
    type: "photo", fires: 2341, comments: 389, online: true,
  },
];

export const USERS_SEARCH = [
  { id: 30, name: "Магомед Азиев", avatar: "👨", city: "Грозный", online: true, friends: 234 },
  { id: 31, name: "Марьям Садулаева", avatar: "👩‍🦳", city: "Гудермес", online: false, lastSeen: "был 1 час назад", friends: 156 },
  { id: 32, name: "Тимур Исмаилов", avatar: "🧔‍♂️", city: "Москва", online: false, lastSeen: "был вчера", friends: 89 },
  { id: 33, name: "Хава Алиева", avatar: "🧕", city: "Грозный", online: true, friends: 312 },
  { id: 34, name: "Шамиль Нальгиев", avatar: "👴", city: "Нальчик", online: false, lastSeen: "был 2 дня назад", friends: 67 },
];
