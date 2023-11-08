import AddView from "@/Views/Add";
import CategoryView from "@/Views/Category";
import HomeView from "@/Views/Home";
import { useGlobalStore } from "@/context/global";
import { ScreensTypes } from "@/enums";
import Head from "next/head";
import Image from "next/image";
import { Fragment } from "react";
import { BsChevronDown } from "react-icons/bs";

export default function Home() {
  const { currentScreen } = useGlobalStore();
  return (
    <Fragment>
      <Head>
        <title>Mesabite | Menu</title>
      </Head>
      <main>
        <div className="h-full min-h-screen w-screen flex flex-col justify-center items-center bg-[#FFF6DF] overflow-y-scroll pb-5">
          {/* NavBar */}
          {currentScreen === ScreensTypes.HOME && (
            <nav className="bg-[#FFCD00] flex justify-between items-center px-4 h-[65px] w-screen border-b-0 border-[#852E2C]">
              {/* Menu Button */}
              <div className="w-[18.57px] h-[11.43px]">
                <Image
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  src="/assets/menuIcon.png"
                />
              </div>
              {/* Language Selection */}
              <div className="flex justify-center items-center gap-2">
                <div className="w-[24px] h-[24px]">
                  <Image
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    src="/assets/en-flag.png"
                  />
                </div>
                <BsChevronDown />
              </div>
            </nav>
          )}
          {/* h-screen */}
          {currentScreen === ScreensTypes.HOME && <HomeView />}
          {currentScreen === ScreensTypes.FOLDER && <AddView />}
          {currentScreen === ScreensTypes.CATEGORY && <CategoryView />}
        </div>
      </main>
    </Fragment>
  );
}
