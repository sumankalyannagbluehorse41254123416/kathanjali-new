import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Import the Client Wrapper


// Import Profile Cards
import AboutCard from "@/components/rightProfile/AboutCard";
import RightProfileCard from "@/components/rightProfile/RightProfileCard";
import CurrentRoles from "@/components/rightProfile/CurrentRoles";
import AchievementsCard from "@/components/rightProfile/AchievementsCard";
import VisionCard from "@/components/rightProfile/VisionCard";
import SocialMediaCard from "@/components/rightProfile/SocialMediaCard";
import ContactCard from "@/components/rightProfile/ContactCard";
import PopularTags from "@/components/rightProfile/PopularTags";
import Categories from "@/components/rightProfile/Categories";
import NewsletterSignup from "@/components/rightProfile/NewsletterSignup";
import MobileProfileWrapper from "@/components/MobileProfileWrapper";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KathaAnjali - Healthcare Innovation",
  description: "Expert perspectives on healthcare innovation and leadership",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // We define the profile content once here
  const profileItems = (
    <div className="space-y-6">
      <RightProfileCard />
      <AboutCard />
      <CurrentRoles />
      <AchievementsCard />
      <VisionCard />
      <SocialMediaCard />
      <ContactCard />
      <Categories />
      <PopularTags />
      <NewsletterSignup />
    </div>
  );

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MobileProfileWrapper profileContent={profileItems}>
          {children}
        </MobileProfileWrapper>
      </body>
    </html>
  );
}