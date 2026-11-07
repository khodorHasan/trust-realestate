"use client";
import { useState } from "react";
import Hero from "../components/Hero";
import Listings from "../components/Listings";
import ActionCards from "../components/ActionCards";
import About from "../components/About";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Modal from "../components/Modals";
import WhatsAppFloat from "../components/WhatsAppFloat";
export default function Home() {
  const [modal, setModal] = useState<null | "publish" | "request">(null);

  return (
    <>
      <Hero onPublish={() => setModal("publish")} />
      <Listings />
      <ActionCards
        onPublish={() => setModal("publish")}
        onRequest={() => setModal("request")}
      />
      <About />
      <Services />

      <WhatsAppFloat />

      <Modal
        open={modal !== null}
        onClose={() => setModal(null)}
        type={modal || "publish"}
      />
    </>
  );
}
