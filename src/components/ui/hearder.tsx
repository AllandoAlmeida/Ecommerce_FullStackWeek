"use client";
import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Card } from "./card";
import { Button } from "./button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetClose,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { Cart } from "./cart";

const Header = () => {
  const { status, data } = useSession();
  const handleLoginClick = async () => {
    await signIn();
  };
  const HandleLogOutClick = async () => {
    await signOut();
  };
  return (
    <Card className="flex items-center justify-between p-[1.875rem]  ">
      <div className="flex items-center justify-between w-full md:max-w-[50rem] md:w-[50rem] md:m-auto">      
      <Sheet >
        <SheetTrigger asChild>
          <Button size="icon" variant={"outline"}>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="text-left text-lg ">Menu</SheetHeader>
          {status == "authenticated" && data?.user && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 py-5">
                <Avatar>
                  <AvatarFallback>
                    {data.user.name?.[0].toUpperCase()}
                  </AvatarFallback>
                  {data.user.image && (
                    <AvatarImage
                      src={data.user.image}
                      className="rounded-md"
                    ></AvatarImage>
                  )}
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-medium">{data.user.name}</p>
                  <p className="text-sm opacity-75">Boas Compras!</p>
                </div>
              </div>
              <Separator />
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {status == "unauthenticated" && (
              <Button
                onClick={handleLoginClick}
                variant={"outline"}
                className="w-full justify-start gap-2"
              >
                <LogInIcon size={16} />
                Fazer Login
              </Button>
            )}
            {status == "authenticated" && (
              <Button
                onClick={HandleLogOutClick}
                variant={"outline"}
                className="w-full justify-start gap-2"
              >
                <LogOutIcon size={16} />
                Fazer Logout
              </Button>
            )}
            <Button variant={"outline"} className="w-full justify-start gap-2">
              <HomeIcon size={16} />
              Início
            </Button>
            <Button variant={"outline"} className="w-full justify-start gap-2">
              <PercentIcon size={16} />
              Ofertas
            </Button>
            <SheetClose asChild>
              <Link href={"/catalog"}>
                <Button
                  variant={"outline"}
                  className="w-full justify-start gap-2"
                >
                  <ListOrderedIcon size={16} />
                  Catálogo
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/">
        <h1 className="text-lg font-semibold">
          <span className="text-primary">FSW</span> Store
        </h1>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant={"outline"}>
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <Cart />
        </SheetContent>
      </Sheet>
      </div>
    </Card>
  );
};

export default Header;
