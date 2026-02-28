"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const DESKTOP_IMAGES = [
    "https://4ne9fphotqlkpkiu.public.blob.vercel-storage.com/cover-1.webp",
    "https://4ne9fphotqlkpkiu.public.blob.vercel-storage.com/cover-2.webp"
];

const MOBILE_IMAGE = "https://4ne9fphotqlkpkiu.public.blob.vercel-storage.com/cover-mob-1.webp";

export default function BannerCarousel() {
    const [currentDesktopIndex, setCurrentDesktopIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDesktopIndex((prevIndex) => (prevIndex + 1) % DESKTOP_IMAGES.length);
        }, 3000); // Swap every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">

            {/* Desktop Carousel */}
            <div className="hidden md:block w-full h-full relative">
                {DESKTOP_IMAGES.map((img, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentDesktopIndex === idx ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={img}
                            alt={`Banner Image ${idx + 1}`}
                            fill
                            priority={idx === 0}
                            sizes="100vw"
                            className="object-cover object-center"
                        />
                    </div>
                ))}
            </div>

            {/* Mobile Static Image */}
            <div className="block md:hidden w-full h-full relative">
                <Image
                    src={MOBILE_IMAGE}
                    alt="Mobile Banner"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center"
                />
            </div>

        </div>
    );
}
