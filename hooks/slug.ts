import slugify from "slugify";

export default function slug(data: string): string {
  try {
    return slugify(data, {
      replacement: "-",
      lower: true,
      locale: "vi",
    });
  } catch (error) {
    throw new Error(String(error));
  }
}
