import { redirect } from "next/navigation";

export default function NotFound() {
  // This function catches ANY 404 on the entire site
  // and immediately sends the user back to the homepage.
  redirect("/");
  
  // Return null because this component will never actually render
  return null;
}