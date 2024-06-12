import Image from "next/image";
import Link from "next/link";
const Headlines = ({ headline, mini }) => {
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
    } = headline;

    return (
        <div className="flex flex-col space-y-6 ">
            {mini ? (
                <Link
                    href={`/news/${_id}`}
                    className="flex flex-row items-center px-2"
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
                        <h4 className="text-primary font-bold  capitalize">
                            {title}
                        </h4>
                    </div>
                </Link>
            ) : (
                <Link
                    href={`/news/${_id}`}
                    className="flex flex-col  items-center"
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
                    <div className="px-2 py-2">
                        <h4 className="text-primary font-bold capitalize">
                            {title}
                        </h4>
                    </div>
                </Link>
            )}
        </div>
    );
};
export default Headlines;
