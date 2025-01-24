import { StructureBuilder } from "sanity/desk";

export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Products")
        .schemaType("product")
        .child(S.documentTypeList("product")),
      S.listItem()
        .title("Categories")
        .schemaType("category")
        .child(S.documentTypeList("category")),
      // add other document types here
      S.listItem()
        .title("Banners")
        .schemaType("banner")
        .child(S.documentTypeList("banner")),
      S.listItem()
        .title("Collections")
        .schemaType("collection")
        .child(S.documentTypeList("collection")),
      S.listItem()
        .title("Orders")
        .schemaType("order")
        .child(S.documentTypeList("order")),
      S.listItem()
        .title("Reviews")
        .schemaType("review")
        .child(S.documentTypeList("review")),
    ]);
