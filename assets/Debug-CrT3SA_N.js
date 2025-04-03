import{r as a,j as e}from"./index-BrTJRp4p.js";const h=()=>{const[i,c]=a.useState({loading:!0,errors:[],environment:{}});return a.useEffect(()=>{const n={baseUrl:"/yannblanc75Web.github.io/",mode:"production",hostname:window.location.hostname,pathname:window.location.pathname,port:window.location.port,hash:window.location.hash,userAgent:navigator.userAgent,serviceWorker:"serviceWorker"in navigator,timestamp:new Date().toISOString()};(async()=>{const o=[];try{const r=new Image;r.src="/yannblanc75Web.github.io/img/profil.jpg",await new Promise((l,t)=>{r.onload=l,r.onerror=()=>t(new Error("Impossible de charger l'image de profil")),setTimeout(()=>t(new Error("Timeout du chargement de l'image")),3e3)})}catch(r){o.push(`Erreur image: ${r.message}`)}try{const r=await fetch("/yannblanc75Web.github.io/yann_blanc_cv_asi.pdf",{method:"HEAD"});r.ok||o.push(`Erreur CV: statut ${r.status}`)}catch(r){o.push(`Erreur CV: ${r.message}`)}c({loading:!1,errors:o,environment:n})})()},[]),i.loading?e.jsxs("div",{className:"container",style:{padding:"2rem"},children:[e.jsx("h1",{children:"Diagnostic en cours..."}),e.jsx("div",{className:"loader-spinner",style:{margin:"2rem auto"}})]}):e.jsxs("div",{className:"container",style:{padding:"2rem"},children:[e.jsx("h1",{children:"Page de diagnostic"}),e.jsxs("section",{style:{marginBottom:"2rem"},children:[e.jsx("h2",{children:"Statut"}),i.errors.length===0?e.jsx("div",{style:{padding:"1rem",backgroundColor:"#e6ffe6",borderRadius:"5px"},children:"✅ Tout fonctionne correctement"}):e.jsxs("div",{style:{padding:"1rem",backgroundColor:"#ffe6e6",borderRadius:"5px"},children:["❌ ",i.errors.length," problème(s) détecté(s)",e.jsx("ul",{children:i.errors.map((n,s)=>e.jsx("li",{children:n},s))})]})]}),e.jsxs("section",{style:{marginBottom:"2rem"},children:[e.jsx("h2",{children:"Environnement"}),e.jsx("pre",{style:{backgroundColor:"#f4f4f4",padding:"1rem",borderRadius:"5px",overflow:"auto"},children:JSON.stringify(i.environment,null,2)})]}),e.jsxs("section",{children:[e.jsx("h2",{children:"Actions"}),e.jsxs("div",{style:{display:"flex",gap:"1rem",flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>window.location.reload(),style:{padding:"0.5rem 1rem",borderRadius:"5px"},children:"Recharger la page"}),e.jsx("button",{onClick:()=>window.location.href="/",style:{padding:"0.5rem 1rem",borderRadius:"5px"},children:"Aller à l'accueil"}),e.jsx("button",{onClick:()=>{"caches"in window?caches.keys().then(n=>{n.forEach(s=>{caches.delete(s),alert(`Cache ${s} vidé`)})}):alert("L'API Cache n'est pas disponible")},style:{padding:"0.5rem 1rem",borderRadius:"5px"},children:"Vider le cache"}),e.jsx("button",{onClick:()=>{"serviceWorker"in navigator?navigator.serviceWorker.getRegistrations().then(n=>{n.forEach(s=>{s.unregister(),alert("Service Worker désenregistré")})}):alert("Les Service Workers ne sont pas disponibles")},style:{padding:"0.5rem 1rem",borderRadius:"5px"},children:"Désactiver SW"})]})]})]})};export{h as default};
