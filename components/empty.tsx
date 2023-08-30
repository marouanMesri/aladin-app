import Image from "next/image";
import React from "react";

interface EmptyProps {
  label: string;
}

const Empty = ({ label }: EmptyProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center ">
      <div className="relative h-72 w-80 ">
        <Image alt="empty" fill src="/img/empty.png" />
      </div>
      <p className="text-muted-foreground text-lg text-center ">{label}</p>
    </div>
  );
};

export default Empty;
