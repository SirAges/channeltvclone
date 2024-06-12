import React from "react";
import {
    EmailShareButton,
    FacebookShareButton,
    GabShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    EmailIcon,
    FacebookIcon,
    GabIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WhatsappIcon,
    WorkplaceIcon
} from "react-share";

const Share = ({ url }) => {
    return (
        <div className="flex flex-row items-center justify-center px-2 py-2">
            <div className="flex flex-row flex-wrap items-center justify-between gap-1">
                <FacebookShareButton url={url}>
                    <FacebookIcon size={30} borderRadius={5} />
                </FacebookShareButton>
                <EmailShareButton url={url}>
                    <EmailIcon size={30} borderRadius={5} />
                </EmailShareButton>
                <GabShareButton url={url}>
                    <GabIcon size={30} borderRadius={5} />
                </GabShareButton>
                <HatenaShareButton url={url}>
                    <HatenaIcon size={30} borderRadius={5} />
                </HatenaShareButton>
                <InstapaperShareButton url={url}>
                    <InstapaperIcon size={30} borderRadius={5} />
                </InstapaperShareButton>
                <LineShareButton url={url}>
                    <LineIcon size={30} borderRadius={5} />
                </LineShareButton>
                <LinkedinShareButton url={url}>
                    <LinkedinIcon size={30} borderRadius={5} />
                </LinkedinShareButton>
                <LivejournalShareButton url={url}>
                    <LivejournalIcon size={30} borderRadius={5} />
                </LivejournalShareButton>
                <MailruShareButton url={url}>
                    <MailruIcon size={30} borderRadius={5} />
                </MailruShareButton>
                <OKShareButton url={url}>
                    <OKIcon size={30} borderRadius={5} />
                </OKShareButton>
                <PocketShareButton url={url}>
                    <PocketIcon size={30} borderRadius={5} />
                </PocketShareButton>
                <RedditShareButton url={url}>
                    <RedditIcon size={30} borderRadius={5} />
                </RedditShareButton>
                <TelegramShareButton url={url}>
                    <TelegramIcon size={30} borderRadius={5} />
                </TelegramShareButton>
                <TumblrShareButton url={url}>
                    <TumblrIcon size={30} borderRadius={5} />
                </TumblrShareButton>
                <TwitterShareButton url={url}>
                    <TwitterIcon size={30} borderRadius={5} />
                </TwitterShareButton>
                <ViberShareButton url={url}>
                    <ViberIcon size={30} borderRadius={5} />
                </ViberShareButton>
                <VKShareButton url={url}>
                    <VKIcon size={30} borderRadius={5} />
                </VKShareButton>
                <WhatsappShareButton url={url}>
                    <WhatsappIcon size={30} borderRadius={5} />
                </WhatsappShareButton>
                <WorkplaceShareButton url={url}>
                    <WorkplaceIcon size={30} borderRadius={5} />
                </WorkplaceShareButton>
                <div className="h-5 flex-1" />
            </div>
        </div>
    );
};

export default Share;
