import Image from "next/image";
import React from "react";

interface LoaderProps {
  label: string;
}

const Loader = ({ label }: LoaderProps) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center ">
      <div className="relative h-72 w-80 ">
        <Image alt="empty" fill src="/img/loading-animation.gif" />
      </div>
      <p className="text-muted-foreground text-lg text-center ">{label}</p>
    </div>
  );
};

export default Loader;
