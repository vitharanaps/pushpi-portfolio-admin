import Link from "next/link";
import Image from "next/image";
import MenuItems from "@/components/MenuItems";
import Navbar from "@/components/NavBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    


    <div className="h-screen flex ">
      {/* Left */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%]  px-4 ">
        {/* logo */}
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start gap-2"
        >
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="hidden lg:block font-bold italic tracking-wide">Portfolio</span>
        </Link>
        <MenuItems />
      </div>
      {/* Right */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F&F*FA] overflow-scroll">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
