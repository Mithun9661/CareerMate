"use client";

import { useCallback, useState } from "react";
import { Bot, BookOpen, CheckCircle2, FileSearch, GraduationCap, History, ImageUp, Languages, Send, Sparkles, Upload, Users } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import AIWorkspace from "@/components/ai-workspace";

type View = "grammar" | "resume" | "courses" | "gd";
const items = [
  { id:"grammar" as View, label:"Grammar Checker", icon:Languages },
  { id:"resume" as View, label:"Resume Analyzer", icon:FileSearch },
  { id:"courses" as View, label:"Course Recommendations", icon:GraduationCap },
  { id:"gd" as View, label:"GD Practice", icon:Users },
];
const topics = ["Should AI replace repetitive jobs?","Is remote work better for young professionals?","Should coding be compulsory in every degree?"];

function Spinner(){return <span className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"/>}

export default function Home(){
  const [view,setView]=useState<View>("grammar");
  const [history,setHistory]=useState<string[]>([]);
  const remember=useCallback((text:string)=>setHistory(h=>[text,...h].slice(0,4)),[]);
  return <SidebarProvider>
    <Sidebar className="border-0 bg-[#07152f] text-white">
      <SidebarHeader className="px-5 py-6">
        <div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-cyan-400 text-[#07152f]"><Bot/></div><div><p className="text-lg font-bold">CareerMate AI</p><p className="text-xs text-blue-200/60">Your career co-pilot</p></div></div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup><SidebarGroupLabel className="text-blue-200/50">WORKSPACE</SidebarGroupLabel><SidebarGroupContent><SidebarMenu className="gap-1.5 px-2">
          {items.map(x=><SidebarMenuItem key={x.id}><SidebarMenuButton isActive={view===x.id} onClick={()=>setView(x.id)} className="h-11 cursor-pointer rounded-xl px-3 text-blue-100 hover:bg-white/10 hover:text-white data-[active=true]:bg-cyan-400 data-[active=true]:font-semibold data-[active=true]:text-[#07152f]"><x.icon/><span>{x.label}</span></SidebarMenuButton></SidebarMenuItem>)}
        </SidebarMenu></SidebarGroupContent></SidebarGroup>
        <SidebarGroup className="mt-3"><SidebarGroupLabel className="text-blue-200/50">RECENT ACTIVITY</SidebarGroupLabel><div className="space-y-2 px-3">{history.slice(0,3).map((x,i)=><div key={i} className="truncate rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-blue-100/70">{x}</div>)}</div></SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4"><div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/8 p-3"><p className="mb-2 text-sm font-semibold text-cyan-200">Connect anywhere</p><div className="flex flex-wrap gap-1.5">{["WhatsApp","Telegram","Discord"].map(x=><span key={x} className="rounded-full bg-white/8 px-2 py-1 text-[11px] text-blue-100/60">{x} · Soon</span>)}</div></div></SidebarFooter>
    </Sidebar>
    <SidebarInset className="min-w-0 bg-[#f4f7fb]">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-white/90 px-4 backdrop-blur sm:px-7"><div className="flex items-center gap-3"><SidebarTrigger className="md:hidden"/><div><h1 className="font-semibold text-slate-900">{items.find(x=>x.id===view)?.label}</h1><p className="hidden text-xs text-slate-500 sm:block">Improve your communication and career readiness</p></div></div><div className="flex items-center gap-2 rounded-full border bg-white py-1.5 pl-2 pr-3"><span className="grid size-7 place-items-center rounded-full bg-[#0e2b5c] text-xs font-bold text-white">MK</span><span className="hidden text-sm font-medium sm:inline">Student</span></div></header>
      <main className="mx-auto w-full max-w-6xl p-4 sm:p-7">
        <section className="mb-6 flex items-center justify-between gap-5 rounded-[24px] bg-[#0a2149] px-6 py-5 text-white shadow-xl shadow-blue-950/10"><div><span className="inline-flex items-center gap-2 rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200"><Sparkles size={13}/> AI-powered workspace</span><h2 className="mt-2 text-xl font-bold sm:text-2xl">Turn every draft into your best work.</h2><p className="mt-1 text-sm leading-6 text-blue-100/65">Write better, strengthen your resume and prepare for opportunities.</p></div><div className="hidden size-16 place-items-center rounded-full bg-cyan-300/10 text-cyan-300 sm:grid"><Bot size={32}/></div></section>
        <AIWorkspace view={view} remember={remember}/>
        <div className="mt-6"><p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700"><History size={16}/> This session’s activity</p><div className="grid gap-3 md:grid-cols-3">{history.slice(0,3).map((x,i)=><div key={i} className="rounded-2xl border bg-white p-4 text-sm text-slate-600">{x}</div>)}</div></div>
      </main>
    </SidebarInset>
  </SidebarProvider>
}
