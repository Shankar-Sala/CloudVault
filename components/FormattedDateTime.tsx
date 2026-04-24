import React from "react";
import { cn, formatDateTime } from "@/lib/utils";

export const FormattedDateTime = ({
  date,
  className,
}: {
  date: string;
  className?: string;
}) => {
  return (
 <p className={cn("caption text-muted-foreground/80", className)}>
      {formatDateTime(date)}
    </p>
  );
};
export default FormattedDateTime;
