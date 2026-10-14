const {chromium}=require('/opt/node-tools/node_modules/playwright');const {spawn}=require('child_process');
const [w,h,out,fps,from,to]=[+process.argv[2],+process.argv[3],process.argv[4],+process.argv[5]||25,+(process.argv[6]||0),+(process.argv[7]||150)];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome',args:['--allow-file-access-from-files']});
const p=await b.newPage({viewport:{width:w,height:h}});await p.goto(`file:///home/claude/promo/video.html?w=${w}&h=${h}`);await p.evaluate(()=>window.ready);
const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(fps),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','medium','-crf','20','-pix_fmt','yuv420p',out]);
const n0=Math.round(from*fps),n1=Math.round(to*fps);const T=Date.now();
for(let n=n0;n<n1;n++){await p.evaluate(t=>{render(t);return settle()},n/fps);const buf=await p.screenshot({type:'jpeg',quality:92});if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));
 if(n%250===0)console.log(out,n,((Date.now()-T)/1000|0)+'s')}
ff.stdin.end();await new Promise(r=>ff.on('close',r));await b.close();console.log('done',out,(Date.now()-T)/1000|0)})();
