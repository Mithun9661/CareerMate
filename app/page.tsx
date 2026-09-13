"use client";

import { useEffect, useState } from "react";
import { Bot, BookOpen, CheckCircle2, FileSearch, GraduationCap, History, ImageUp, Languages, Send, Sparkles, Upload, Users } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
  const [history,setHistory]=useState(["Grammar check · Interview introduction"]);
  const remember=(text:string)=>setHistory(h=>[text,...h].slice(0,4));
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
        {view==="grammar"&&<Grammar remember={remember}/>}
        {view==="resume"&&<Resume remember={remember}/>}
        {view==="courses"&&<Courses remember={remember}/>}
        {view==="gd"&&<GD remember={remember}/>}
        <div className="mt-6"><p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700"><History size={16}/> Recent chat history</p><div className="grid gap-3 md:grid-cols-3">{history.slice(0,3).map((x,i)=><div key={i} className="rounded-2xl border bg-white p-4 text-sm text-slate-600">{x}</div>)}</div></div>
      </main>
    </SidebarInset>
  </SidebarProvider>
}

function Grammar({remember}:{remember:(s:string)=>void}){
  const [text,setText]=useState("I has compleated my machine learning project and want improve my resume.");
  const [result,setResult]=useState<{text:string;notes:string[]}|null>(null); const [busy,setBusy]=useState(false);
  const check=()=>{if(!text.trim())return;setBusy(true);setResult(null);setTimeout(()=>{let corrected=text;const rules:[[RegExp,string,string],[RegExp,string,string],[RegExp,string,string]]=[[/\bI has\b/gi,"I have","Use “have” with the subject “I”."],[/\bcompleated\b/gi,"completed","Correct spelling: completed."],[/\bwant improve\b/gi,"want to improve","Add “to” before the verb improve."]];const notes:string[]=[];rules.forEach(([p,r,n])=>{if(p.test(corrected)){corrected=corrected.replace(p,r);notes.push(n)}});if(!/[.!?]$/.test(corrected))corrected+=".";setResult({text:corrected,notes:notes.length?notes:["Your sentence is correctly written."]});remember("Grammar check · "+corrected);setBusy(false)},700)};
  useEffect(()=>{
    const context=(document as unknown as {modelContext?:{registerTool:(tool:unknown,options?:{signal:AbortSignal})=>void|Promise<void>}}).modelContext;
    if(!context?.registerTool)return;
    const lifecycle=new AbortController();
    void Promise.resolve(context.registerTool({
      name:"check_writing",title:"Check writing",description:"Check a sentence for common spelling and grammar mistakes and display the result in CareerMate AI.",
      inputSchema:{type:"object",properties:{text:{type:"string",minLength:1,maxLength:800}},required:["text"],additionalProperties:false},
      annotations:{readOnlyHint:false,untrustedContentHint:true},
      execute(input:unknown){
        const value=(input as {text?:unknown})?.text;
        if(typeof value!=="string"||!value.trim()||value.length>800)throw new Error("Text must contain 1 to 800 characters.");
        let corrected=value.trim();
        corrected=corrected.replace(/\bI has\b/gi,"I have").replace(/\bcompleated\b/gi,"completed").replace(/\bwant improve\b/gi,"want to improve");
        if(!/[.!?]$/.test(corrected))corrected+=".";
        setText(value);setResult({text:corrected,notes:["Common spelling and grammar rules were applied."]});remember("Grammar check · "+corrected);
        return {corrected};
      }
    },{signal:lifecycle.signal}));
    return()=>lifecycle.abort();
  },[]);
  return <div className="grid gap-5 lg:grid-cols-2"><section className="card"><Title title="Write with confidence" sub="Paste a sentence and get clear, instant feedback."/><textarea className="textarea" value={text} maxLength={800} onChange={e=>setText(e.target.value)} placeholder="Type or paste a sentence…"/><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><label className="secondary"><ImageUp/> Scan Text from Image<input type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&setText("Text scanned from "+e.target.files[0].name+". Please check this sentence.")}/></label><button className="primary" disabled={busy||!text.trim()} onClick={check}>{busy?<Spinner/>:<Sparkles/>}{busy?"Checking…":"Check writing"}</button></div></section><section className="card min-h-80"><Title title="AI suggestions" sub="Corrected text and short explanations."/>
    {!result&&!busy&&<Empty icon={<CheckCircle2/>} text="Your feedback will appear here."/>}{busy&&<Loading/>}{result&&<div className="mt-4 space-y-4"><div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4"><p className="text-xs font-bold uppercase text-emerald-700">Corrected sentence</p><p className="mt-2 font-medium leading-7 text-slate-800">{result.text}</p></div><ul className="space-y-2">{result.notes.map(x=><li key={x} className="flex gap-2 text-sm text-slate-600"><CheckCircle2 className="shrink-0 text-cyan-600" size={17}/>{x}</li>)}</ul></div>}
  </section></div>
}

function Resume({remember}:{remember:(s:string)=>void}){
  const [file,setFile]=useState<File|null>(null); const [busy,setBusy]=useState(false); const [done,setDone]=useState(false);
  const run=()=>{if(!file)return;setBusy(true);setDone(false);setTimeout(()=>{setBusy(false);setDone(true);remember("Resume analyzed · ATS score 82/100")},850)};
  return <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]"><section className="card"><Title title="Upload your resume" sub="PDF or DOCX, up to 5 MB."/><label className="mt-4 flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/40 p-6 text-center hover:border-cyan-500"><input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e=>{setFile(e.target.files?.[0]||null);setDone(false)}}/><span className="mb-3 grid size-12 place-items-center rounded-2xl bg-white text-blue-700 shadow"><Upload/></span><strong className="text-slate-800">{file?file.name:"Drop your resume here"}</strong><span className="mt-1 text-sm text-slate-500">{file?"Ready to analyze":"or click to browse"}</span></label><button className="primary mt-4 w-full" disabled={!file||busy} onClick={run}>{busy?<Spinner/>:<FileSearch/>}{busy?"Reading resume…":"Analyze resume"}</button></section><section className="card min-h-96"><Title title="Resume intelligence" sub="ATS readiness, extracted profile and improvements."/>
    {!done&&!busy&&<Empty icon={<FileSearch/>} text="Upload your resume to unlock insights."/>}{busy&&<Loading/>}{done&&<div className="mt-5 grid gap-4 sm:grid-cols-[145px_1fr]"><div className="flex flex-col items-center justify-center rounded-2xl bg-[#0a2149] p-5 text-white"><span className="grid size-24 place-items-center rounded-full border-[9px] border-cyan-400 text-2xl font-bold">82</span><b className="mt-3">ATS Score</b><small className="text-blue-200/70">Strong profile</small></div><div className="space-y-3"><Insight t="Skills found" v="Python, React, Machine Learning, FastAPI, Git"/><Insight t="Education" v="B.Tech · Computer Science (AI & ML)"/><Insight t="Projects" v="AI platform, ML prediction and full-stack apps"/></div><div className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900 sm:col-span-2"><b>Top improvements:</b> Add measurable project results, strengthen SQL keywords, and include deployment links.</div></div>}
  </section></div>
}

function Courses({remember}:{remember:(s:string)=>void}){
  const [goal,setGoal]=useState("Machine Learning Engineer");const [busy,setBusy]=useState(false);const [show,setShow]=useState(true);
  const courses=[["Applied Machine Learning","Intermediate","8 weeks","Build complete ML projects with deployment."],["Computer Vision","Advanced","10 weeks","Master transfer learning and image models."],["SQL for Data & AI","Beginner","4 weeks","Close a common hiring gap for ML roles."]];
  const run=()=>{if(!goal.trim())return;setBusy(true);setShow(false);setTimeout(()=>{setBusy(false);setShow(true);remember("Learning path · "+goal)},650)};
  return <section className="card"><Title title="Your personalized learning path" sub="Enter your career goal for three focused recommendations."/><div className="mt-4 flex flex-col gap-3 rounded-2xl bg-slate-50 p-4 sm:flex-row"><input className="input" value={goal} onChange={e=>setGoal(e.target.value)} placeholder="e.g. ML Engineer"/><button className="primary" disabled={busy||!goal.trim()} onClick={run}>{busy?<Spinner/>:<BookOpen/>}Build my path</button></div><div className="mt-5 grid gap-4 lg:grid-cols-3">{show&&courses.map((c,i)=><article key={c[0]} className="rounded-2xl border bg-white p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"><div className="flex justify-between"><span className="grid size-10 place-items-center rounded-xl bg-blue-50 font-bold text-blue-700">0{i+1}</span><span className="h-fit rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold">{c[2]}</span></div><h3 className="mt-5 text-lg font-bold">{c[0]}</h3><p className="text-xs font-semibold uppercase text-cyan-700">{c[1]}</p><p className="mt-3 text-sm leading-6 text-slate-500">{c[3]}</p><p className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-700"><CheckCircle2 size={16}/>Best match</p></article>)}</div></section>
}

function GD({remember}:{remember:(s:string)=>void}){
  const [index,setIndex]=useState(0);const [answer,setAnswer]=useState("");const [busy,setBusy]=useState(false);const [done,setDone]=useState(false);
  const run=()=>{if(answer.trim().length<20)return;setBusy(true);setDone(false);setTimeout(()=>{setBusy(false);setDone(true);remember("GD practice · "+topics[index])},750)};
  return <div className="grid gap-5 lg:grid-cols-2"><section className="card"><div className="flex flex-wrap justify-between gap-3"><Title title="Practise your point of view" sub="Build a structured answer and get feedback."/><button className="secondary" onClick={()=>{setIndex((index+1)%topics.length);setDone(false)}}><Sparkles/>New topic</button></div><div className="mt-4 rounded-2xl bg-[#0a2149] p-5 text-white"><small className="font-bold uppercase tracking-widest text-cyan-300">GD topic</small><p className="mt-2 text-lg font-semibold">{topics[index]}</p></div><textarea className="textarea min-h-40" value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Write your opening, arguments and conclusion…"/><div className="mt-3 flex justify-between gap-3"><small className={answer.length<20?"text-amber-600":"text-emerald-600"}>{answer.length<20?"Minimum 20 characters":"Ready for feedback"}</small><button className="primary" disabled={busy||answer.trim().length<20} onClick={run}>{busy?<Spinner/>:<Send/>}Get feedback</button></div></section><section className="card"><Title title="Speaking feedback" sub="Four signals that improve GD performance."/>
    {!done&&!busy&&<Empty icon={<Users/>} text="Submit your response to see scores."/>}{busy&&<Loading/>}{done&&<div className="mt-5 space-y-4">{[["Grammar",88],["Clarity",84],["Content",79],["Confidence",82]].map(([n,s])=><div key={n as string}><div className="mb-1 flex justify-between text-sm"><span>{n}</span><b>{s}/100</b></div><div className="h-2 rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-blue-700 to-cyan-400" style={{width:s+"%"}}/></div></div>)}<div className="rounded-2xl bg-cyan-50 p-4 text-sm leading-6 text-cyan-900"><b>Coach’s tip:</b> State your position clearly, support it with one example, and acknowledge the opposite view.</div></div>}
  </section></div>
}

function Title({title,sub}:{title:string;sub:string}){return <div><h2 className="font-bold text-slate-900">{title}</h2><p className="mt-1 text-sm text-slate-500">{sub}</p></div>}
function Insight({t,v}:{t:string;v:string}){return <div className="rounded-xl border p-3"><small className="font-bold uppercase text-slate-400">{t}</small><p className="mt-1 text-sm font-medium text-slate-700">{v}</p></div>}
function Empty({icon,text}:{icon:React.ReactNode;text:string}){return <div className="grid min-h-64 place-items-center text-center text-slate-400"><div className="[&>svg]:mx-auto [&>svg]:mb-3 [&>svg]:text-blue-400"><span>{icon}</span><p className="text-sm font-semibold text-slate-600">{text}</p></div></div>}
function Loading(){return <div className="grid min-h-64 place-items-center text-blue-700"><Spinner/></div>}
