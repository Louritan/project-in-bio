"use client";

import { createLink } from "@/app/actions/create-link";
import { isLinkTaken } from "@/app/actions/is-link-taken";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { sanitizeLink } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateLinkForm() {
  const router = useRouter();

  const [link, setLink] = useState("");
  const [error, setError] = useState("");

  function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLink(sanitizeLink(e.target.value));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!link.length) {
      setError("Escolha um link primeiro :)");
      return;
    }

    const hasLink = await isLinkTaken(link);
    if (hasLink) {
      setError("Desculpe, esse link já está em uso.");
      return;
    }

    const success = await createLink(link);
    if (!success) {
      setError("Erro ao criar o perfil. Tente novamente mais tarde.");
      return;
    }

    router.push(`${link}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
        <span className="text-white">projectinbio.com/</span>
        <Input value={link} onChange={handleLinkChange} />
        <Button className="w-[126px]">Criar</Button>
      </form>
      {error && <span className="text-accent-pink">{error}</span>}
    </>
  )
}
