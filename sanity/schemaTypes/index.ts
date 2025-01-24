import { type SchemaTypeDefinition } from "sanity";

import { bannerType } from "./bannerType";
import { categoryType } from "./categoryType";
import { collectionType } from "./collectionType";
import { orderType } from "./orderType";
import { productType } from "./productType";
import { reviewType } from "./reviewType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    productType,
    reviewType,
    orderType,
    collectionType,
    categoryType,
    bannerType,
  ],
};
