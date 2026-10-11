const images=[
'../../assets/bitboard/CAD1.jpg',
'../../assets/bitboard/UI.png',
'../../assets/bitboard/FEABoard.png',
'../../assets/bitboard/Wood.jpg'
];
const modal=document.getElementById('modal'),modalImg=document.getElementById('modalImg');
let current=0;
const open=i=>{current=i;modalImg.src=images[i];modal.classList.add('open');};
const close=()=>modal.classList.remove('open');
const prev=()=>{current=(current+images.length-1)%images.length;modalImg.src=images[current];};
const next=()=>{current=(current+1)%images.length;modalImg.src=images[current];};
document.querySelectorAll('.gallery-item').forEach(el=>el.onclick=()=>open(+el.dataset.index));
document.getElementById('modalClose').onclick=close;
document.getElementById('modalPrev').onclick=prev;
document.getElementById('modalNext').onclick=next;
modal.onclick=e=>{if(e.target===modal)close();};
document.addEventListener('keydown',e=>{if(!modal.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')prev();if(e.key==='ArrowRight')next();});

const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));