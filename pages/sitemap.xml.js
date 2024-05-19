
const URL = "https://codegrabber.vercel.app";

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
            <!-- static URLs -->
            <url>
                <loc>${URL}</loc>
            </url>
            <url>
                <loc>${URL}/blogs</loc>
            </url>
            <!-- dynamic URLs -->
            ${posts
                .map(({ slug }) => {
                    return `
                        <url>
                            <loc>${URL}/blogs/${slug}</loc>
                            <lastmod>${new Date().toISOString()}</lastmod>
                        </url>
                    `;
                })
                .join("")}
        </urlset>
    `;
}

export async function getServerSideProps({ res }) {
    let fet = await fetch(`${process.env.BACKEND_HOST}/api/blogs/getallblogs`);
    let posts = await fet.json();
    // Generate the XML sitemap with the blog data
    const sitemap = generateSiteMap(posts);
    res.setHeader("Content-Type", "text/xml");
    // Send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

export default function SiteMap() { }