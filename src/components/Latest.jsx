import Image from "next/image";
import Link from "next/link";

const Latest = ({ latest, mini }) => {
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
    } = latest;

    return (
        <div className="flex flex-col space-y-6 px-2">
            <Link href={`/news/${_id}`} className="flex flex-row items-center">
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
                    <h4 className="text-primary font-bold capitalize">
                        {title}
                    </h4>
                </div>
            </Link>
        </div>
    );
};
export default Latest;
