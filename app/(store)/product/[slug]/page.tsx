// Server Component
import { getProductByName } from "@/sanity/lib/products/getProduct";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import { ProductGallery } from "./ProductGallery";
import { ProductBadges } from "./components/ProductBadges";
import { ProductOptions } from "./components/ProductOptions";
import ProductReviews from "./components/ProductReviews";
import { ProductVariantsTable } from "./components/ProductVariantsTable";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductByName(params.slug);

  const productId = product?._id;

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductBadges
        status={product.status}
        featured={product.featured}
        collections={product.collections}
      />

      <div className="grid md:grid-cols-2 gap-8">
        <ProductGallery
          mainImage={product.mainImage}
          images={product.images}
          productName={product.name}
        />

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-4">
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            {product.compareAtPrice && (
              <p className="text-lg text-gray-500 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </p>
            )}
          </div>

          <p className="text-gray-600">{product.shortDescription}</p>

          <ProductOptions
            options={product.options}
            images={product.images}
            variants={product.variants}
            basePrice={product.price}
            productName={product.name}
          />
          <ProductVariantsTable variants={product.variants} />

          <div className="prose max-w-none">
            <PortableText value={product.description} />
          </div>
          <br />
        </div>
      </div>
      <ProductReviews productId={productId} />
    </div>
  );
}
