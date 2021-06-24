import slugify from "slugify";
export const getSlug = (title, id) => {
  return slugify(`${title}-${id}`, {
    lower: true,
    remove: /[*+~,.()'"!:@]/g,
  });
};
