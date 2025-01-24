import { getMainBanner } from "@/sanity/lib/queries/getBanners";
import Image from "next/image";
import Link from "next/link";

type BannerPlacement =
  | "home_hero"
  | "home_middle"
  | "category_top"
  | "collection_page"
  | "arrivals_page";

interface BannerProps {
  placement: BannerPlacement;
}

interface BannerData {
  buttonLink: string;
  buttonText: string;
  headline: string;
  image: string;
  placement: BannerPlacement;
  subheadline: string;
}

export default async function MainBanner({ placement }: BannerProps) {
  const mainBanner = await getMainBanner(placement);

  if (!mainBanner || mainBanner.placement !== placement) {
    return null;
  }

  const { image, headline, subheadline, buttonText, buttonLink } =
    mainBanner as BannerData;

  const containerClasses = {
    home_hero: "w-full",
    home_middle: "container mx-auto px-4",
    category_top: "container mx-auto px-4",
    collection_page: "container mx-auto px-4",
    arrivals_page: "container mx-auto px-4",
  };

  const heightClasses = {
    home_hero: "h-[600px]",
    home_middle: "h-[400px]",
    category_top: "h-[400px]",
    collection_page: "h-[400px]",
    arrivals_page: "h-[400px]",
  };

  return (
    <div className={`${containerClasses[placement]} overflow-hidden`}>
      <div
        className={`relative ${heightClasses[placement]} ${
          placement === "collection_page"
            ? "rounded-lg overflow-hidden mt-6"
            : ""
        }`}
      >
        {image && (
          <Image
            src={image}
            alt={headline || "Banner image"}
            fill
            className={`object-cover ${
              placement === "collection_page" ? "rounded-lg" : ""
            }`}
            priority
          />
        )}

        <div className="absolute inset-0 bg-black/30">
          <div className="container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-4">
            {headline && (
              <h1
                className={`font-bold mb-4 animate-fade-in ${
                  placement === "home_hero"
                    ? "text-4xl md:text-6xl"
                    : "text-3xl md:text-5xl"
                }`}
              >
                {headline}
              </h1>
            )}

            {subheadline && (
              <p
                className={`mb-8 animate-fade-in delay-200 ${
                  placement === "home_hero"
                    ? "text-xl md:text-2xl"
                    : "text-lg md:text-xl"
                }`}
              >
                {subheadline}
              </p>
            )}

            {buttonText && buttonLink && (
              <Link
                href={buttonLink}
                className="relative inline-block bg-white text-black px-8 py-3 rounded-full 
                  font-semibold overflow-hidden transition-all duration-500 ease-out
                  animate-fade-in delay-400 group hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  {buttonText}
                </span>
                <div
                  className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 
                  transition-transform duration-500 origin-left"
                ></div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
