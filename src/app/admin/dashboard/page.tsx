"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LogOut, UserCircle, Briefcase, Trophy, FolderGit2, 
  Save, Plus, Trash2, Edit, Loader2, Image as ImageIcon
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // --- STATES DATA ---
  const [profile, setProfile] = useState({ name: "", role: "", description: "", avatar_url: "" });
  const [projects, setProjects] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [internships, setInternships] = useState<any[]>([]);

  // --- STATES FORM (Untuk Create/Edit) ---
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [projectForm, setProjectForm] = useState({ title: "", description: "", tech_stack: "", image_url: "" });
  const [projectFile, setProjectFile] = useState<File | null>(null);
  
  const [achieveForm, setAchieveForm] = useState({ title: "", description: "", cert_url: "", medal_url: "" });
  const [certFile, setCertFile] = useState<File | null>(null);
  const [medalFile, setMedalFile] = useState<File | null>(null);
  
  const [internForm, setInternForm] = useState({ company_name: "", role: "", logo_url: "" });
  const [logoFile, setLogoFile] = useState<File | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
      } else {
        await fetchAllData();
      }
    };
    checkUser();
  }, [router]);

  const fetchAllData = async () => {
    setLoading(true);
    const { data: profData } = await supabase.from("profile").select("*").eq("id", 1).single();
    if (profData) setProfile(profData);
    
    const { data: projData } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (projData) setProjects(projData);

    const { data: achData } = await supabase.from("achievements").select("*").order("created_at", { ascending: false });
    if (achData) setAchievements(achData);

    const { data: intData } = await supabase.from("internships").select("*").order("created_at", { ascending: false });
    if (intData) setInternships(intData);

    setLoading(false);
  };

  const uploadImage = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('portfolio').upload(filePath, file);
    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('portfolio').getPublicUrl(filePath);
    return data.publicUrl;
  };

  // --- PERBAIKAN: Menangkap error Supabase di setiap fungsi CRUD ---

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let avatarUrl = profile.avatar_url;
      if (avatarFile) {
        avatarUrl = await uploadImage(avatarFile, 'avatars');
      }
      const { error } = await supabase.from("profile").upsert({ id: 1, ...profile, avatar_url: avatarUrl });
      if (error) throw error; // Lempar error jika gagal
      
      alert("Profile berhasil diperbarui!");
      setAvatarFile(null);
      fetchAllData();
    } catch (error: any) {
      alert("Gagal menyimpan profile: " + error.message);
    }
    setSaving(false);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl = projectForm.image_url;
      if (projectFile) imageUrl = await uploadImage(projectFile, 'projects');

      const payload = { ...projectForm, image_url: imageUrl };
      
      let dbError;
      if (editingId) {
        const { error } = await supabase.from("projects").update(payload).eq("id", editingId);
        dbError = error;
      } else {
        const { error } = await supabase.from("projects").insert([payload]);
        dbError = error;
      }
      
      if (dbError) throw dbError;

      resetForms();
      fetchAllData();
      alert("Project berhasil disimpan!");
    } catch (error: any) {
      alert("Gagal menyimpan project: " + error.message);
    }
    setSaving(false);
  };

  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let certUrl = achieveForm.cert_url;
      let medalUrl = achieveForm.medal_url;
      if (certFile) certUrl = await uploadImage(certFile, 'achievements');
      if (medalFile) medalUrl = await uploadImage(medalFile, 'achievements');

      const payload = { ...achieveForm, cert_url: certUrl, medal_url: medalUrl };
      
      let dbError;
      if (editingId) {
        const { error } = await supabase.from("achievements").update(payload).eq("id", editingId);
        dbError = error;
      } else {
        const { error } = await supabase.from("achievements").insert([payload]);
        dbError = error;
      }
      
      if (dbError) throw dbError;

      resetForms();
      fetchAllData();
      alert("Penghargaan berhasil disimpan!");
    } catch (error: any) {
      alert("Gagal menyimpan achievement: " + error.message);
    }
    setSaving(false);
  };

  const handleSaveInternship = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let logoUrl = internForm.logo_url;
      if (logoFile) logoUrl = await uploadImage(logoFile, 'internships');

      const payload = { ...internForm, logo_url: logoUrl };
      
      let dbError;
      if (editingId) {
        const { error } = await supabase.from("internships").update(payload).eq("id", editingId);
        dbError = error;
      } else {
        const { error } = await supabase.from("internships").insert([payload]);
        dbError = error;
      }
      
      if (dbError) throw dbError;

      resetForms();
      fetchAllData();
      alert("Magang berhasil disimpan!");
    } catch (error: any) {
      alert("Gagal menyimpan internship: " + error.message);
    }
    setSaving(false);
  };

  const handleDelete = async (table: string, id: string) => {
    if (confirm("Yakin ingin menghapus data ini?")) {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) {
        alert("Gagal menghapus: " + error.message);
      } else {
        fetchAllData();
      }
    }
  };

  const resetForms = () => {
    setEditingId(null);
    setProjectForm({ title: "", description: "", tech_stack: "", image_url: "" });
    setAchieveForm({ title: "", description: "", cert_url: "", medal_url: "" });
    setInternForm({ company_name: "", role: "", logo_url: "" });
    setProjectFile(null); setCertFile(null); setMedalFile(null); setLogoFile(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
      </div>
    );
  }

  const FileInput = ({ label, onChange, currentUrl, file }: any) => {
    const previewUrl = file ? URL.createObjectURL(file) : currentUrl;
    
    return (
      <div>
        <label className="text-sm font-bold text-slate-700 block mb-2">{label}</label>
        <div className="flex items-center gap-4">
          <input 
            type="file" accept="image/*"
            onChange={onChange}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all border border-slate-200 rounded-2xl bg-slate-50"
          />
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-sm" />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex text-slate-800 font-sans selection:bg-emerald-200">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-8 border-b border-slate-100 flex items-center gap-3">
            <div className="bg-emerald-500 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-emerald-500/30">JS</div>
            <div>
              <h2 className="font-bold text-lg text-slate-900 leading-tight">Admin Panel</h2>
              <p className="text-xs text-slate-500 font-medium">Command Center</p>
            </div>
          </div>
          
          <nav className="p-4 space-y-2 mt-4">
            <TabButton icon={<UserCircle />} label="Profile Hero" isActive={activeTab === "profile"} onClick={() => {setActiveTab("profile"); resetForms();}} />
            <TabButton icon={<FolderGit2 />} label="Projects" isActive={activeTab === "projects"} onClick={() => {setActiveTab("projects"); resetForms();}} />
            <TabButton icon={<Trophy />} label="Achievements" isActive={activeTab === "achievements"} onClick={() => {setActiveTab("achievements"); resetForms();}} />
            <TabButton icon={<Briefcase />} label="Internships" isActive={activeTab === "internships"} onClick={() => {setActiveTab("internships"); resetForms();}} />
          </nav>
        </div>
        <div className="p-4 border-t border-slate-100">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors">
            <LogOut size={20} /> Logout Sistem
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/80 to-slate-50/90 z-0" />
        
        <div className="relative z-10 p-8 md:p-12 max-w-5xl mx-auto">
          
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-black text-slate-900 capitalize">{activeTab.replace('_', ' ')}</h1>
              <p className="text-slate-500 font-medium mt-1">Atur konten landing page Anda secara real-time.</p>
            </div>
            <button onClick={handleLogout} className="md:hidden bg-white p-3 rounded-full shadow-sm text-red-500">
              <LogOut size={20} />
            </button>
          </div>

          {/* === TAB PROFILE === */}
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-2">Nama Lengkap</label>
                    <input type="text" required value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-slate-50 font-medium text-slate-900"/>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-2">Role Pekerjaan</label>
                    <input type="text" required value={profile.role} onChange={e => setProfile({...profile, role: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-slate-50 font-medium text-slate-900"/>
                  </div>
                </div>

                <FileInput label="Upload Foto Profil Baru" file={avatarFile} onChange={(e:any) => setAvatarFile(e.target.files[0])} currentUrl={profile.avatar_url} />

                <div>
                  <label className="text-sm font-bold text-slate-700 block mb-2">Deskripsi Singkat</label>
                  <textarea rows={4} required value={profile.description} onChange={e => setProfile({...profile, description: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-slate-50 font-medium text-slate-900 resize-none"></textarea>
                </div>

                <button type="submit" disabled={saving} className="bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30 flex items-center gap-2">
                  {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />} Simpan Profile
                </button>
              </form>
            </motion.div>
          )}

          {/* === TAB PROJECTS === */}
          {activeTab === "projects" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
                <h2 className="text-xl font-bold mb-6 border-b pb-4">{editingId ? "Edit Project" : "Tambah Project Baru"}</h2>
                <form onSubmit={handleSaveProject} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-bold text-slate-700 block mb-2">Judul Project</label>
                      <input type="text" required value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/20 outline-none bg-slate-50"/>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 block mb-2">Tech Stack (pisahkan koma)</label>
                      <input type="text" required value={projectForm.tech_stack} onChange={e => setProjectForm({...projectForm, tech_stack: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/20 outline-none bg-slate-50"/>
                    </div>
                  </div>
                  <FileInput label="Upload Gambar Project" file={projectFile} onChange={(e:any) => setProjectFile(e.target.files[0])} currentUrl={projectForm.image_url} />
                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-2">Deskripsi Project</label>
                    <textarea rows={3} required value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/20 outline-none bg-slate-50 resize-none"></textarea>
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" disabled={saving} className="bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl hover:bg-emerald-600 transition-all flex items-center gap-2">{saving ? <Loader2 className="animate-spin" /> : <Save size={20} />} Simpan</button>
                    {editingId && <button type="button" onClick={resetForms} className="px-8 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Batal</button>}
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map(p => (
                  <div key={p.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex gap-4 items-center">
                    <img src={p.image_url} alt={p.title} className="w-24 h-24 rounded-2xl object-cover border border-slate-100" />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">{p.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.description}</p>
                      <div className="flex gap-2 mt-3">
                        <button onClick={() => {setEditingId(p.id); setProjectForm(p);}} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg hover:bg-blue-100 flex items-center gap-1"><Edit size={14}/> Edit</button>
                        <button onClick={() => handleDelete("projects", p.id)} className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg hover:bg-red-100 flex items-center gap-1"><Trash2 size={14}/> Hapus</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* === TAB ACHIEVEMENTS === */}
          {activeTab === "achievements" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
                <h2 className="text-xl font-bold mb-6 border-b pb-4">{editingId ? "Edit Penghargaan" : "Tambah Penghargaan Baru"}</h2>
                <form onSubmit={handleSaveAchievement} className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-2">Judul Penghargaan</label>
                    <input type="text" required value={achieveForm.title} onChange={e => setAchieveForm({...achieveForm, title: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none bg-slate-50"/>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileInput label="Upload Sertifikat" file={certFile} onChange={(e:any) => setCertFile(e.target.files[0])} currentUrl={achieveForm.cert_url} />
                    <FileInput label="Upload Medali/Trophy" file={medalFile} onChange={(e:any) => setMedalFile(e.target.files[0])} currentUrl={achieveForm.medal_url} />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 block mb-2">Deskripsi</label>
                    <textarea rows={3} required value={achieveForm.description} onChange={e => setAchieveForm({...achieveForm, description: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none bg-slate-50 resize-none"></textarea>
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" disabled={saving} className="bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl hover:bg-emerald-600 transition-all flex items-center gap-2">{saving ? <Loader2 className="animate-spin" /> : <Save size={20} />} Simpan</button>
                    {editingId && <button type="button" onClick={resetForms} className="px-8 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Batal</button>}
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {achievements.map(a => (
                  <div key={a.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex gap-6 items-center">
                    <div className="flex gap-2">
                      <img src={a.cert_url} className="w-16 h-16 rounded-xl object-cover border" title="Sertifikat"/>
                      <img src={a.medal_url} className="w-16 h-16 rounded-xl object-cover border" title="Medali"/>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">{a.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{a.description}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => {setEditingId(a.id); setAchieveForm(a);}} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-1"><Edit size={14}/> Edit</button>
                      <button onClick={() => handleDelete("achievements", a.id)} className="text-xs font-bold text-red-600 bg-red-50 px-3 py-2 rounded-lg hover:bg-red-100 flex items-center justify-center gap-1"><Trash2 size={14}/> Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* === TAB INTERNSHIPS === */}
          {activeTab === "internships" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100">
                <h2 className="text-xl font-bold mb-6 border-b pb-4">{editingId ? "Edit Magang" : "Tambah Magang Baru"}</h2>
                <form onSubmit={handleSaveInternship} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-bold text-slate-700 block mb-2">Nama Perusahaan</label>
                      <input type="text" required value={internForm.company_name} onChange={e => setInternForm({...internForm, company_name: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none bg-slate-50"/>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-slate-700 block mb-2">Posisi / Role</label>
                      <input type="text" required value={internForm.role} onChange={e => setInternForm({...internForm, role: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none bg-slate-50"/>
                    </div>
                  </div>
                  <FileInput label="Upload Logo Perusahaan" file={logoFile} onChange={(e:any) => setLogoFile(e.target.files[0])} currentUrl={internForm.logo_url} />
                  
                  <div className="flex gap-4">
                    <button type="submit" disabled={saving} className="bg-emerald-500 text-white font-bold px-8 py-4 rounded-2xl hover:bg-emerald-600 transition-all flex items-center gap-2">{saving ? <Loader2 className="animate-spin" /> : <Save size={20} />} Simpan</button>
                    {editingId && <button type="button" onClick={resetForms} className="px-8 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all">Batal</button>}
                  </div>
                </form>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {internships.map(i => (
                  <div key={i.id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center relative group">
                    <img src={i.logo_url} alt={i.company_name} className="w-20 h-20 rounded-full object-cover border-4 border-slate-50 mb-3 shadow-sm" />
                    <h4 className="font-bold text-slate-800">{i.company_name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{i.role}</p>
                    
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => {setEditingId(i.id); setInternForm(i);}} className="bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600"><Edit size={14}/></button>
                      <button onClick={() => handleDelete("internships", i.id)} className="bg-red-500 text-white p-2 rounded-lg shadow hover:bg-red-600"><Trash2 size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}

function TabButton({ icon, label, isActive, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all font-bold text-sm ${isActive ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30" : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"}`}>
      {icon} {label}
    </button>
  );
}