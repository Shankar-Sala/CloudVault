import { Models } from "node-appwrite";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "@/components/FormattedDateTime";
import ActionDropdown from "@/components/ActionDropdown";

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link
      href={file.url}
      target="_blank"
      className="file-card transition-all hover:shadow-drop-3 hover:scale-[1.02] duration-200"
    >
      <div className="flex justify-between items-start">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />

       <div className="flex flex-col items-end justify-between gap-2">
          <ActionDropdown file={file} />
          <p className="body-2 text-muted-foreground">{convertFileSize(file.size)}</p>
        </div>
      </div>

     <div className="file-card-details space-y-1">
        <p className="subtitle-2 line-clamp-1 font-semibold text-dark-100 dark:text-white">
          {file.name}
        </p>
        <FormattedDateTime
          date={file.$createdAt}
          className="body-2 text-light-100"
        />
        <p className="caption line-clamp-1 text-muted-foreground">
          By: {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
};
export default Card;
