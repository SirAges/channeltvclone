import Image from "next/image";import Link from "next/link";

const World = ({ world }) => {
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
    } = world;

    return (
        <div className="flex flex-col space-y-6 bg-card">
            <Link
                href={`/news/${_id}`}
                className="flex flex-col md:flex-row items-center"
            >
                <div
                    className="w-full
                     py-0.5 bg-primary"
                />
                <div className="relative w-full h-60">
                    <Image
                        className="object-cover"
                        src={image}
                        alt={title}
                        fill
                        priority
                    />
                </div>
                <div className="px-2 py-2 flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-danger" />
                    <div className="flex flex-row flex-wrap space-x-2">
                        {tags.split(",").map(t => (
                            <p
key={t}
                                className="uppercase
                    text-xs"
                            >
                                {t}
                            </p>
                        ))}
                    </div>
                </div>
                <h4 className="text-primary font-bold  capitalize">
                    {title}
                </h4>{" "}
                <div className="px-2 py-2 flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-danger" />
                    <p
                        className="capitalize italic text-xs font-semibold
                    text-primary"
                    >
                        {author}
                    </p>
                </div>
            </Link>
        </div>
    );
};
export default World;
