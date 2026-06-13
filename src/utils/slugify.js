export default function slugify(value) {
    return value.replace(/\s+/g, "-").toLowerCase();
}
