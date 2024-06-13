import { getServerSideSitemapIndex } from "next-sitemap";
import axios from "axios";
export async function GET(request) {
    // Method to source urls from cms
    // const urls = await fetch('https//example.com/api')
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN;
    const news  = await axios.get(`${baseUrl}/api/news`);
  
    const paths =news.status === 200? news.data.map(({ _id }) =>
    `${baseUrl}/${_id}.xml`):[]

    return getServerSideSitemapIndex(paths);
}
