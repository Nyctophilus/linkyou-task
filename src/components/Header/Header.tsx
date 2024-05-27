import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { NavigationMenuComponent } from "@/components/ui/navigation-menu";
import { navLinks } from "@/data/nav-links";
import { DropdownMenuComponent } from "../ui/dropdown-menu";

const countries = [
  {
    name: "كندا",
    shortcut: "/assets/images/canada-flag.png",
  },
  {
    name: "اليمن",
    shortcut: "/assets/images/yemen-flag.png",
  },
];

const languages = [
  {
    name: "عربي",
  },
  {
    name: "أنجليزى",
  },
];

const Header = () => {
  return (
    <header className="font-bold">
      <div className="bg-main py-3 mb-6">
        <div className="container flex justify-between ">
          <div className="flex gap-4 text-lg">
            <DropdownMenuComponent items={countries} />
            <DropdownMenuComponent items={languages} />
          </div>
          <div className="flex gap-4 text-lg">
            <button className="py-3 px-4 text-[#3D3D3D] bg-white hover:text-main-foreground hover:bg-white transition-colors rounded-xl shadow-md">
              التسجيل
            </button>
            <button className="py-3 px-4 text-main-foreground  hover:bg-white transition-colors">
              تسجيل الدخول
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-y-2 container">
        <div className="col-span-6 xl:col-span-5 xl:col-start-2">
          <NavigationMenuComponent links={navLinks} />
        </div>

        <img
          src="/assets/images/logo.png"
          alt="logo"
          className="w-24 col-start-1 row-start-2 xl:row-span-2 xl:row-start-1 place-self-center"
        />

        <div className="grid-cols-5 row-start-2 col-start-2 col-end-[-1] flex gap-4 items-center">
          <div className="grow flex justify-between px-8 py-2 border border-main/25 rounded-xl shadow-md">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="البحث عن السيارات، المنازل، الهواتف و أكثر..."
              className="border-none grow focus:outline-none"
            />
            <MagnifyingGlassIcon className="size-8 text-main-foreground" />
          </div>

          <button className="py-3 px-4 text-white bg-main-foreground hover:text-main-foreground hover:bg-white transition-colors rounded-xl shadow-md">
            إضافة إعلان
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
