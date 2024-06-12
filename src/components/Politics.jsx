import Image from "next/image";
import Link from "next/link";
const Politics = ({ politic, mini }) => {
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
    } = politic;

    return (
        <div className="flex flex-col space-y-6">
            {mini ? (
                <Link
                    href={`/news/${_id}`}
                    className="flex flex-row items-center"
                >
                    <div className="relative rounded-lg w-24 h-24">
                        <Image
                            className="object-cover rounded-lg"
                            src={image}
                            alt={title}
                            fill
                            priority
                        />
                    </div>
                    <div className="px-2 py-2 flex-1">
                        <h4
                            className="text-primary font-bold text-sm
                        capitalize"
                        >
                            {title}
                        </h4>
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
                    </div>
                </Link>
            ) : (
                <Link
                    href={`/news/${_id}`}
                    className="flex flex-col md:flex-row items-center"
                >
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
                                   key={t} className="uppercase
                    text-xs"
                                >
                                    {t}
                                </p>
                            ))}
                        </div>
                    </div>
                    <h4 className="text-primary font-bold  capitalize">
                        {title}
                    </h4>
                </Link>
            )}
        </div>
    );
};
export default Politics;
