export default [
  {
    name: "نبذة عنا",
    path: "/about-us",
    children: [
      { name: "من نحن", path: "/about-us/#who" },
      { name: "رؤيتنا", path: "/about-us/#our-vision" },
    ],
  },
  {
    name: "تو سوق",
    path: "/to-soaq",
    children: [
      { name: "شروط الإستخدام", path: "/to-soaq/#" },
      { name: "سياسة الخصوصية", path: "/to-soaq/#" },
      { name: "تحميل التطبيق", path: "/to-soaq/#" },
    ],
  },
  {
    name: "الدول",
    children: [{ name: "كندا" }, { name: "اليمن" }],
  },
  {
    name: "تواصل معنا",
    path: "/contact-us",
    children: [
      { name: "المساعدة", path: "/contact-us/#" },
      { name: "الإتصال", path: "/contact-us/#" },
    ],
  },
];
