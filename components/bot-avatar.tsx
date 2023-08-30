import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src="/img/aladin-logo.png" />
      <AvatarFallback>Aladin IA</AvatarFallback>
    </Avatar>
  );
};

export default BotAvatar;
