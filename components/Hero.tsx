"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary),0.05),rgba(var(--background),0.8))]"></div>

            <div className="container px-4 md:px-6 flex flex-col items-center text-center relative z-10">
                <div
                    className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] mb-8 relative cursor-pointer"
                >
                    <Image
                        src="/images/panda.svg"
                        alt="Panda with laptop"
                        className={`w-full h-full object-contain`}
                        loading="eager"
                        width={320}
                        height={320}
                        priority
                    />
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 md:mb-6 animate-slide-down">
                    Full Stack
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 ml-3">Developer</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-[700px] mb-8 animate-slide-up">
                    Crafting elegant solutions through clean code and intuitive design. Transforming ideas into seamless digital experiences with precision and creativity.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                    <Link href="/">
                        <button className='rounded-lg py-2 px-5 text-lg bg-[#16a249] text-white'>Mes Projets</button>
                    </Link>
                    <Button size="lg" variant="outline" className="px-8">Contact Me</Button>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse-slow mt-20">
                    <a href="#projects" aria-label="Scroll down">
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;