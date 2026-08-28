import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest { return { name: "FOX SIM", short_name: "FOX SIM", description: "Estudos e ferramentas para aviação e simulação.", start_url: "/", display: "standalone", background_color: "#071019", theme_color: "#071019", icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }] }; }
