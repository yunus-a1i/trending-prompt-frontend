import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
export default function HomeNavbar() {
  return (
    <>
      <div className="w-full h-20 flex justify-between p-4">
        <div className=" flex object-cover">
          <Image alt="logo" src={logo} height={20} width={50} />
        </div>
        <div className="hidden lg:flex items-center  space-x-10">
          <div>Trending</div>
          <div>Category</div>
          <div>How it works</div>
        </div>
        <button className="bg-[#C1C1C1] px-3 py-1 rounded-full text-black italic font-normal text-2xl">
          <Link href={'/login'}>
          Get Started</Link>
        </button>
      </div>
    </>
  );
}
