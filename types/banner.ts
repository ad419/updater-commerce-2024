export interface MainBanner {
  _id: string;
  title: string;
  description: string;
  image: SanityImage;
  buttonText: string;
  buttonLink: string;
}

interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}
