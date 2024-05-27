export const navLinks = [
  {
    name: "الرئيسية",
    path: "/",
  },
  {
    name: "مركبات و سيارات",
    path: "/vehicles",
    children: [
      {
        name: "سيارات",
        path: "/vehicles#cars",
      },
      {
        name: "دراجات نارية",
        path: "/vehicles#bikes",
      },
      {
        name: "مراكب",
        path: "/vehicles#",
      },
      {
        name: "نقل ثقيل-حافلات-مركبات أخري",
        path: "/vehicles#heavy",
      },
      {
        name: "قطع غيار-إطارات-بطاريات-زيوت-اكسسوارات",
        path: "/vehicles#",
      },
    ],
  },
  {
    name: "عقارات",
    path: "/properties",
    children: [
      {
        name: "سكنية",
        path: "/properties#",
      },
      {
        name: "تجارية و مكاتب",
        path: "/properties#",
      },
      {
        name: "فلل",
        path: "/properties#",
      },
      {
        name: "منازل و أراضي",
        path: "/properties#",
      },
    ],
  },
  {
    name: "موبايلات و تابلت",
    path: "/mobiles",
    children: [
      {
        name: "موبايلات",
        path: "/mobiles#",
      },
      {
        name: "أجهزة لوحية",
        path: "/mobiles#",
      },
      {
        name: "قطع غيار و اكسسوارات",
        path: "/mobiles#",
      },
    ],
  },
  {
    name: "إلكترونيات",
    path: "/electronics",
    children: [
      {
        name: "تليفزيونات",
        path: "/electronics#",
      },
      {
        name: "كمبيوتر و لابتوب",
        path: "/electronics#",
      },
      {
        name: "كاميرات",
        path: "/electronics#",
      },
      {
        name: "أجهزة منزلية",
        path: "/electronics#",
      },
      {
        name: "ألعاب فيديو و منصاتها",
        path: "/electronics#",
      },
    ],
  },
  {
    name: "المزيد من الفئات",
    path: "/more",
  },
];
