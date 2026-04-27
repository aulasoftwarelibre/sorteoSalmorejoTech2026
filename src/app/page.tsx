"use client";
import Body from "@/app/components/body/body";
import Footer from "@/app/components/footer/footer";


export default function Home() {
  return (
    <div className="relative" style={{ minHeight: "100vh" }}>
      <Body/>
      <Footer isVisible={true} />
    </div>
  );
}

