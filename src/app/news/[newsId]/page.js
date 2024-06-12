import { SingleNews } from "@/components";
const NewsIdPage = ({ params: { newsId } }) => {
    return <SingleNews newsId={newsId} />;
};
export default NewsIdPage;
