let current=0, started=false;
const scenes=[...document.querySelectorAll('.scene')];
const music=document.getElementById('music');

let audioCtx, master, timer;
const notes=[261.63,329.63,392.00,523.25,392.00,329.63,293.66,392.00];

function startMusic(){
  if(started) return;
  started=true;
  audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  master=audioCtx.createGain(); master.gain.value=.055; master.connect(audioCtx.destination);
  let i=0;
  timer=setInterval(()=>{
    const osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
    osc.type='sine'; osc.frequency.value=notes[i++%notes.length];
    gain.gain.setValueAtTime(.0001,audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.22,audioCtx.currentTime+.04);
    gain.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.65);
    osc.connect(gain); gain.connect(master); osc.start(); osc.stop(audioCtx.currentTime+.7);
  },650);
  music.textContent="♪ nhạc Trung thu đang phát";
}
function goNext(){
  startMusic();
  scenes[current].classList.remove('active');
  current=(current+1)%scenes.length;
  scenes[current].classList.add('active');
}
document.body.addEventListener('click',goNext);
