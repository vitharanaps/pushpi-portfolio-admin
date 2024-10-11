"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const MenuItems = () => {
  const menuItems = [
    {
      title: "PORTFOLIO",
      items: [
        {
          icon: "/home.png",
          label: "Hero",
          link: "/dashboard/home",
        },
        {
          icon: "/skills.png",
          label: "Skills",
          link: "/dashboard/skills",
        },
        {
          icon: "/experience.png",
          label: "Experience",
          link: "/dashboard/experience",
        },
        {
          icon: "/education.png",
          label: "Education",
          link: "/dashboard/education",
        },
      ],
    },
    {
      title: "SETTINGS",
      items: [
        {
          icon: "/settings.png",
          label: "settings",
          link: "/dashboard/settings",
        },
      ],
    },
  ];

  const path = usePathname();

  return (
    <div className="mt-4 text-sm ">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            return (
              <Link
                href={item.link}
                key={item.label}
                className={`flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md ${
                  path === item.link && "bg-mySkyLight"
                } hover:bg-mySkyLight`}
              >
                <Image src={item.icon} alt="" width={20} height={20} />
                <span className="hidden lg:block">{item.label}</span>
              </Link>
            );
          })}
         
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
