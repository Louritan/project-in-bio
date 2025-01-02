import { Header } from "@/app/components/header";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Rocket } from "lucide-react";

export default function CriarPage() {
  return (
    <>
      <Header />
      <div className="h-screen flex flex-col gap-10 items-center justify-center max-w-xl mx-auto">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white">Escolha seu link</h1>
          <Rocket className="size-10" />
        </div>
        <form className="w-full flex items-center gap-2">
          <span className="text-white">projectinbio.com/</span>
          <Input />
          <Button className="w-[126px]">Criar</Button>
        </form>
        <span className="text-accent-pink">Erro de exemplo</span>
      </div>
    </>
  )
}
