import Image from "next/image";
import Link from "next/link";
const TopStory = ({ topStory }) => {
    const {
        _id,
        title,
        excerpt,
        image,
        content,
        category,
        tags,
        author,
        createdAt,
        updatedAt
    } = topStory;

    return (
        <div className="flex flex-col">
            <h2
                className="font-bold capitalize text-2xl
                 px-4 py-4 bg-background text-primary"
            >
                Top stories
            </h2>
            <Link
                href={`/news/${_id}`}
                className="flex flex-col  items-center
            relative"
            >
                <div className="relative w-full h-60 md:h-96">
                    <Image
                        className="object-cover"
                        src={image}
                        alt={title}
                        fill
                        
                    />
                </div>
                <div className="px-2 py-2 md:absolute md:bottom-0 md:bg-black/40">
                    <h4
                        className="text-primary font-bold capitalize
                    md:text-white"
                    >
                        {title}
                    </h4>
                    <p className="text-excerpt md:text-white font-medium">
                        {excerpt}
                    </p>
                </div>
            </Link>
        </div>
    );
};
export default TopStory;
