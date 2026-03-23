"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Html, Environment } from "@react-three/drei";
import * as THREE from "three";
import { 
  SiLaravel, SiGo, SiNodedotjs, SiNextdotjs, SiReact, SiTypescript, SiJavascript,
  SiVuedotjs, SiPython, SiFlutter, SiHtml5, SiCss, SiTailwindcss, SiGit, 
  SiDocker, SiPhp, SiInertia, SiMysql, SiExpress, SiCodeigniter, SiBun, 
  SiArduino, SiLivewire, SiSupabase
} from "react-icons/si";
import { TbCube } from "react-icons/tb";

// URL Sound Effect Keyboard Mekanik (Bisa diganti dengan path lokal seperti "/sounds/keyboard-click.mp3" nantinya)
const KEYBOARD_CLICK_SOUND = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";

const playClickSound = () => {
  const audio = new Audio(KEYBOARD_CLICK_SOUND);
  audio.volume = 0.6; // Mengatur volume suara (0.0 sampai 1.0)
  // Memutar audio dan menangani error jika browser memblokir autoplay sebelum user berinteraksi
  audio.play().catch((err) => console.log("Audio play failed:", err));
};

const skills = [
  { name: "Laravel", role: "Backend", color: "#FF2D20", Icon: SiLaravel },
  { name: "Livewire", role: "Fullstack", color: "#FB70A9", Icon: SiLivewire },
  { name: "Supabase", role: "Database", color: "#F59E0B", Icon: SiSupabase }, 
  { name: "PHP", role: "Backend", color: "#777BB4", Icon: SiPhp },
  { name: "CodeIgniter", role: "Backend", color: "#EF4223", Icon: SiCodeigniter },
  
  { name: "Go Lang", role: "Backend", color: "#00ADD8", Icon: SiGo },
  { name: "Node JS", role: "Backend", color: "#339933", Icon: SiNodedotjs },
  { name: "Express JS", role: "Backend", color: "#000000", Icon: SiExpress },
  { name: "Python", role: "Backend", color: "#3776AB", Icon: SiPython },
  { name: "Bun", role: "Runtime", color: "#fbf0df", Icon: SiBun },
  
  { name: "React JS", role: "Frontend", color: "#61DAFB", Icon: SiReact },
  { name: "Next JS", role: "Fullstack", color: "#000000", Icon: SiNextdotjs },
  { name: "Vue JS", role: "Frontend", color: "#4FC08D", Icon: SiVuedotjs },
  { name: "Inertia JS", role: "Fullstack", color: "#00C58E", Icon: SiInertia },
  { name: "Flutter", role: "Mobile", color: "#02569B", Icon: SiFlutter },
  
  { name: "TypeScript", role: "Language", color: "#3178C6", Icon: SiTypescript },
  { name: "JavaScript", role: "Language", color: "#F7DF1E", Icon: SiJavascript },
  { name: "HTML5", role: "Frontend", color: "#E34F26", Icon: SiHtml5 },
  { name: "CSS3", role: "Frontend", color: "#1572B6", Icon: SiCss },
  { name: "Tailwind", role: "Frontend", color: "#06B6D4", Icon: SiTailwindcss },
  
  { name: "SQL", role: "Database", color: "#4479A1", Icon: SiMysql },
  { name: "Docker", role: "DevOps", color: "#2496ED", Icon: SiDocker },
  { name: "Git", role: "Tools", color: "#F05032", Icon: SiGit },
  { name: "IoT", role: "Hardware", color: "#00979D", Icon: SiArduino },
  { name: "C++", role: "Core", color: "#00599C", Icon: TbCube } 
];

const KeyCap = ({ 
  position, 
  skill, 
  activeKey, 
  setActiveKey 
}: { 
  position: [number, number, number]; 
  skill: any;
  activeKey: string | null;
  setActiveKey: (val: string | null) => void;
}) => {
  const [clicked, setClicked] = useState(false);
  const baseRef = useRef<THREE.Mesh>(null);
  
  // Menggunakan state global agar hanya 1 tombol yang hover dalam satu waktu
  const hovered = activeKey === skill.name;

  useFrame(() => {
    if (baseRef.current) {
      baseRef.current.position.y = THREE.MathUtils.lerp(
        baseRef.current.position.y,
        clicked ? position[1] - 0.15 : position[1],
        0.2
      );
    }
  });

  const isLightBg = skill.color === "#fbf0df" || skill.color === "#F7DF1E";
  const iconColor = hovered ? skill.color : (isLightBg ? "#000000" : "#ffffff");

  return (
    <group position={position}>
      <RoundedBox
        ref={baseRef}
        args={[1.15, 0.5, 1.15]} 
        radius={0.1}
        smoothness={4}
        onPointerOver={(e) => {
          e.stopPropagation(); // Mencegah klik bocor ke tombol lain
          setActiveKey(skill.name);
        }}
        onPointerOut={(e) => { 
          e.stopPropagation();
          if (activeKey === skill.name) setActiveKey(null);
          setClicked(false); 
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          setClicked(true);
          playClickSound(); // Memanggil efek suara saat tombol ditekan
        }}
        onPointerUp={(e) => {
          e.stopPropagation();
          setClicked(false);
        }}
      >
        <meshStandardMaterial color={hovered ? "#ffffff" : skill.color} roughness={0.2} metalness={0.1} />
        
        {/* Tambahkan div flex untuk memastikan ikon presisi di tengah */}
        <Html transform position={[0, 0.26, 0]} rotation={[-Math.PI / 2, 0, 0]} pointerEvents="none" zIndexRange={[1, 0]}>
          <div className="flex items-center justify-center w-[30px] h-[30px]">
            <skill.Icon size={30} color={iconColor} />
          </div>
        </Html>

        {/* Z-index ditingkatkan & posisi Y di naikkan agar tidak tertimpa logo dari baris depan */}
        {(hovered || clicked) && (
          <Html position={[0, 1.8, 0]} center zIndexRange={[9999, 8000]}>
            <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-3 w-max border-2 border-green-400 animate-bounce cursor-default relative z-[9999]">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-inner" style={{ backgroundColor: skill.color }}>
                <skill.Icon size={20} color={isLightBg ? "#000000" : "#ffffff"} />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 leading-tight">{skill.name}</p>
                <p className="text-[11px] text-green-600 font-black uppercase tracking-wider">{skill.role}</p>
              </div>
            </div>
          </Html>
        )}
      </RoundedBox>
    </group>
  );
};

export default function Keyboard3D() {
  // State global untuk melacak tombol mana yang sedang disorot
  const [activeKey, setActiveKey] = useState<string | null>(null);

  return (
    <div className="w-full h-[600px] cursor-grab active:cursor-grabbing relative z-10">
      <Canvas camera={{ position: [0, 8, 8], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} castShadow />
        <Environment preset="city" />
        
        <RoundedBox args={[6.2, 0.4, 6.2]} position={[0, -0.4, 0]} radius={0.15}>
          <meshStandardMaterial color="#111111" roughness={0.7} />
        </RoundedBox>

        {skills.map((skill, i) => {
          const row = Math.floor(i / 5);
          const col = i % 5;
          return (
            <KeyCap 
              key={i} 
              position={[(col - 2) * 1.18, 0, (row - 2) * 1.18]} 
              skill={skill} 
              activeKey={activeKey}
              setActiveKey={setActiveKey}
            />
          );
        })}
        
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.2} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}