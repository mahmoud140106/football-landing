import { AlignJustify } from "lucide-react";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Logo from "../assets/mainLogo.png";
import { Translate } from "translate-easy";

const links = [
  {
    name: "Main",
    href: "/",
  },
  {
    name: "All Matches",
    href: "/matches",
  },
  {
    name: "Videos",
    href: "https://videos.livefootballia.com",
  },
  {
    name: "Article And Lives",
    href: "/articles",
  },
  {
    name: "About US",
    href: "/aboutUs",
  },
];

export default function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <AlignJustify />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <div>
            <ul className="lg:flex lg:ml-14 lg:gap-x-5 max-lg:space-y-3 max-lg:fixed  max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
              <li className="mb-6 hidden max-lg:block">
                <a href="javascript:void(0)">
                  <img src={Logo} alt="logo" className="w-44" />
                </a>
              </li>
              {links.map((link) => (
                <li
                  className="max-lg:border-b max-lg:py-3 px-3"
                  key={link.name}
                >
                  <a className=" block text-[15px]" href={link.href}>
                    <Translate>{link.name}</Translate>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
