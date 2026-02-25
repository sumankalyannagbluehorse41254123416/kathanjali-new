"use client";

import { useState } from "react";
import EmailPopup from "@/components/EmailPopup";

export default function harishchandra() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <EmailPopup open={open} setOpen={setOpen}/>
    </>
  )
}