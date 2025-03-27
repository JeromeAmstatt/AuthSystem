"use client";

import React from "react";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-5">
        <main className="text-center max-w-4xl mx-auto">
          <Hero />
          <div className="flex w-full mt-16">
            <Projects />
          </div>
        </main>
      </div>
    </main>
  );
}