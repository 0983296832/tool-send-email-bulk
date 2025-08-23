import ExcelUploadForm from "@/components/SendEmailForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans  items-center justify-items-center min-h-screen p-8 pb-20 ">
      <ExcelUploadForm />
    </div>
  );
}
