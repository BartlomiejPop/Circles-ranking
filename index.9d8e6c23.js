console.log("circles");const e=document.querySelector(".container"),o=document.querySelector(".circle"),t=document.querySelector(".score"),r=document.querySelector(".final-score"),l=document.querySelector(".play-again"),n=document.querySelector(".pause-resume"),d=document.querySelector(".volume"),s=document.querySelector(".game-over"),c=document.querySelector(".timer-bg"),a=document.getElementById("audio"),i=document.getElementById("click"),y=document.getElementById("bonus"),u=document.querySelector(".record"),g=document.querySelector(".lightmode"),m=document.querySelector(".darkmode"),b=document.querySelector(".email-input"),p=document.querySelector(".password-input"),S=document.querySelector(".login-btn"),w=document.querySelector(".register-btn");let x,h,k,q=0,C=0;i.volume=.1,y.volume=.2;const v=e=>{o.style.display="flex",o.style.top=.05*window.innerHeight+.7*Math.random(window.innerHeight)*window.innerHeight+"px",o.style.left=.05*window.innerWidth+.7*Math.random(window.innerWidth)*window.innerWidth+"px",o.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`,x=setTimeout((()=>{f(q)}),e)},f=e=>{o.style.display="none",s.style.display="flex",r.textContent=`Time's up! Your score is: ${q}`,q=0,t.innerText=q,clearInterval(k),0==localStorage.getItem("NewRecord")&&localStorage.setItem("NewRecord",e),localStorage.getItem("NewRecord")<e&&localStorage.setItem("NewRecord",e),u.textContent=` record: ${localStorage.getItem("NewRecord")}`},I=()=>{h-=10,c.textContent=h+"ms"},L=()=>{l.style.backgroundColor=" rgb(255, 255, 255, 0.2)",l.style.color=" rgb(255, 255, 255, 0.5)",document.querySelector("body").style.backgroundImage="url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6WPYoOL4wCrFoXXSCxZNLhZ4y1b8XrY26l2y3js1dDOD3Ffc1eWfT26yySZIzieWOpQE&usqp=CAU)",document.querySelector("body").style.backgroundSize="37px",document.querySelector("body").style.animation="bg-scrolling-dark 1.44s infinite linear",c.style.color="rgb(150, 150, 150,0.35)",n.style.backgroundColor="rgb(255, 255, 255, 0.2)",n.style.color=" rgb(255, 255, 255, 0.5)",localStorage.setItem("mode","dark"),o.style.boxShadow="9px 9px 44px 16px rgb(128, 129, 141)",b.style.color="rgb(255, 255, 255, 0.5)",b.style.backgroundColor="rgb(255, 255, 255, 0.2)",p.style.color="rgb(255, 255, 255, 0.5)",p.style.backgroundColor="rgb(255, 255, 255, 0.2)",S.style.color="rgb(255, 255, 255, 0.5)",S.style.backgroundColor="rgb(255, 255, 255, 0.2)",w.style.color="rgb(255, 255, 255, 0.5)",w.style.backgroundColor="rgb(255, 255, 255, 0.2)"},E=()=>{document.querySelector("body").style.background="",l.style.backgroundColor=" rgb(119, 119, 119, 0.15)",c.style.color="rgb(154, 154, 154, 0.3)",document.querySelector("body").style.backgroundSize="",document.querySelector("body").style.animation="bg-scrolling 0.32s infinite linear",n.style.backgroundColor=" rgba(66, 68, 90, 0.1)",l.style.color=" rgb(119, 119, 119)",n.style.color=" rgb(119, 119, 119)",localStorage.setItem("mode","light"),o.style.boxShadow="9px 9px 44px 16px rgb(128, 129, 141)",b.style.color=" rgb(119, 119, 119)",b.style.backgroundColor="rgba(66, 68, 90, 0.1)",p.style.color=" rgb(119, 119, 119)",p.style.backgroundColor="rgba(66, 68, 90, 0.1)",S.style.color="rgb(119, 119, 119)",S.style.backgroundColor="rgba(66, 68, 90, 0.1)",w.style.color="rgb(119, 119, 119)",w.style.backgroundColor="rgba(66, 68, 90, 0.1)"};o.addEventListener("mousedown",(()=>{o.style.display="none",i.play(),q++,c.textContent=h+ +C+"ms",clearTimeout(x),v(h),t.innerText=q,q>=100&&q<200?o.style.border=" 10px double rgb(255, 255, 255)":q>=200&&q<300?o.style.border=" 10px dotted rgb(255, 255, 255)":q>=300&&(o.style.border=" 8px dashed rgb(255, 255, 255)");Math.random(1)<.04&&(()=>{const o=document.createElement("div");o.classList.add("circle-event"),o.style.display="flex",o.innerHTML="<span class='score'>+0.1s</span>",o.style.top=.5*Math.random(window.innerHeight)*window.innerHeight+"px",o.style.left=.5*Math.random(window.innerWidth)*window.innerWidth+"px",e.appendChild(o),setTimeout((()=>{o.style.display="none"}),1200),o.addEventListener("mousedown",(()=>{h+=100,c.textContent=h+ +C+"ms",y.play(),o.style.display="none"}))})()})),l.addEventListener("click",(()=>{h=1e3,C=0,c.textContent=h+"ms",c.style.display="block",s.style.display="none",setTimeout((()=>{v(h)}),500),k=setInterval(I,1e3),o.style.border=" 8px solid rgb(255, 255, 255)"})),n.addEventListener("mousedown",(()=>{'<i class="fa-solid fa-play"></i>'==n.innerHTML?(a.play(),a.volume=d.value/100,n.innerHTML='<i class="fa-solid fa-pause"></i>'):(a.pause(),n.innerHTML='<i class="fa-solid fa-play"></i>')})),d.addEventListener("input",(()=>{a.volume=d.value/100})),m.addEventListener("mousedown",L),g.addEventListener("mousedown",E),"dark"===localStorage.getItem("mode")?L():E();
//# sourceMappingURL=index.9d8e6c23.js.map
