document.querySelectorAll('.carousel').forEach(el=>{
  const images=JSON.parse(el.dataset.images);
  let current=0,timer;
  el.innerHTML=images.map((src,i)=>`<img src="${src}" class="${i===0?'active':''}" alt="">`).join('')
   +(images.length>1?`<button class="carousel-arrow left">‹</button><button class="carousel-arrow right">›</button><div class="carousel-dots">${images.map((_,i)=>`<span class="carousel-dot ${i===0?'active':''}" data-i="${i}"></span>`).join('')}</div>`:'');
  const imgs=el.querySelectorAll('img'),dots=el.querySelectorAll('.carousel-dot');
  const show=i=>{imgs.forEach((im,j)=>im.classList.toggle('active',j===i));dots.forEach((d,j)=>d.classList.toggle('active',j===i));current=i;};
  const next=()=>show((current+1)%images.length);
  const prev=()=>show((current-1+images.length)%images.length);
  const reset=()=>{clearInterval(timer);timer=setInterval(next,5000);};
  if(images.length>1){
    el.querySelector('.left').onclick=()=>{prev();reset();};
    el.querySelector('.right').onclick=()=>{next();reset();};
    dots.forEach(d=>d.onclick=()=>{show(+d.dataset.i);reset();});
    timer=setInterval(next,5000);
  }
});

const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
