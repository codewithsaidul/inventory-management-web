import { logoutUser } from "@/services/auth/logOutUser";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";


export default function LogOutBtn ({ shad = true }: { shad?: boolean }) {
  const handleLogout = async () => {
   const res =  await logoutUser();

   if (res.success) {
    toast.success(res.message);
    redirect("/login?loggedOut=true");
   }
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