"use client";

import { Github, Linkedin, Instagram, Twitter, Plus } from "lucide-react";
import { startTransition, useState } from "react";
import { Modal } from "../../ui/modal";
import { Button } from "../../ui/button";
import { useParams, useRouter } from "next/navigation";
import { createSocialLinks } from "@/app/actions/create-social-links";
import { Input } from "../../ui/input";

export function EditSocialLinks() {
  const router = useRouter();
  const { profileId } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");

  async function handleAddSocialLinks() {
    setIsSubmitting(true);
    await createSocialLinks({
      profileId: profileId as string,
      github,
      linkedin,
      instagram,
      twitter,
    });
    startTransition(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      router.refresh();
    });
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
      >
        <Plus />
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]">
          <p className="text-white font-bold text-xl">
            Adicionar redes sociais
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 w-full">
              <Github />
              <Input
                type="text"
                placeholder="Link Github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Linkedin />
              <Input
                type="text"
                placeholder="Link Linkedin"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Instagram />
              <Input
                type="text"
                placeholder="Link Instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <Twitter />
              <Input
                type="text"
                placeholder="Link Twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="font-bold text-white"
            >
              Voltar
            </button>
            <Button
              onClick={handleAddSocialLinks}
              disabled={isSubmitting}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
