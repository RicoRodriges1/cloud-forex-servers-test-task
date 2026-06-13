export default function slugify(value: string): string {
  return value.replace(/\s+/g, "-").toLowerCase();
}