"use client";
import { Button } from "../ui/button";

export default function LogOutBtn ({ shad = true }: { shad?: boolean }) {
  const handleLogout = async () => {
    console.log("LogOut")
  };

  return (
    <>
      {shad ? (
        <Button
          variant={"destructive"}
          onClick={handleLogout}
          className="cursor-pointer"
        >
          Logout
        </Button>
      ) : (
        <button onClick={handleLogout} className="cursor-pointer">
          Logout
        </button>
      )}
    </>
  );
}