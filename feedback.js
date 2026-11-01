/* Customer feedback page - standalone. Load AFTER script.js. Needs only #app and #nav from index.html. */
(function(){
var ENDPOINT=""; /* paste your Formspree / Getform / Netlify form URL here to receive feedback. Until set, the form will NOT claim to send anything. */
var EMAIL=""; /* optional: your email address, used as a fallback link when ENDPOINT is empty */
function q(s){return document.querySelector(s)}
function page(){
 var ev=["Birthday","Baby shower","Engagement","Anniversary","Wedding","Corporate","Other"].map(function(x){return "<option>"+x+"</option>"}).join("");
 var st=[5,4,3,2,1].map(function(n){return '<input type="radio" name="rating" id="r'+n+'" value="'+n+'" required><label for="r'+n+'" aria-label="'+n+' out of 5 stars" title="'+n+' out of 5">★</label>'}).join("");
 var lb='style="text-transform:none;letter-spacing:0;font-size:.9rem;display:flex;gap:10px"',cb='style="width:22px;min-height:0"';
 return '<div class="pagehead"><div class="wrap"><span class="lab">Feedback</span><h1 style="font-size:clamp(2.2rem,5vw,3.6rem)">Share Your Feedback</h1><p class="sub" style="margin:0 auto">Celebrated with us? We’d love to hear how it went.</p></div></div>'
 +'<section><div class="wrap" style="max-width:860px"><form id="ff" novalidate>'
 +'<div class="f"><label for="fn">Name *</label><input id="fn" name="name" required autocomplete="name"></div>'
 +'<div class="f"><label for="fe">Email (optional)</label><input id="fe" name="email" type="email" autocomplete="email"></div>'
 +'<div class="f"><label for="ft">Event type</label><select id="ft" name="eventType"><option value="">Select…</option>'+ev+'</select></div>'
 +'<div class="f"><fieldset class="rate"><legend>Your rating *</legend>'+st+'</fieldset></div>'
 +'<div class="f full"><label for="fm">Your feedback *</label><textarea id="fm" name="message" rows="5" required></textarea></div>'
 +'<div class="f full"><label '+lb+'><input type="checkbox" name="mayPublish" value="yes" '+cb+'>You may display my comments on this website (first name only).</label></div>'
 +'<div class="f full"><label '+lb+'><input type="checkbox" id="fc2" required '+cb+'>I consent to Style &amp; Bloom Decor storing these details to review my feedback. [Owner: link your privacy policy.] *</label></div>'
 +'<div class="f full"><button class="btn" id="fb" type="submit">Send Feedback</button></div></form><div id="fmsg" role="status" aria-live="polite" style="padding:22px;border:1px solid var(--gold);background:var(--card);margin-top:20px;display:none"></div></div></section>';
}
function send(ev){
 ev.preventDefault();var f=ev.target,m=q("#fmsg"),b=q("#fb");m.style.display="block";
 if(!f.checkValidity()){f.reportValidity();m.textContent="Please add your name, a star rating and your feedback, and tick the consent box.";return}
 var data=new FormData(f);
 if(!ENDPOINT){var body=[];data.forEach(function(v,k){if(typeof v==="string"&&v)body.push(k+": "+v)});
  m.innerHTML="<b>Your feedback has not been sent.</b> This form is not yet connected to a receiving service."+(EMAIL?' You can <a href="mailto:'+EMAIL+'?subject=Customer feedback&body='+encodeURIComponent(body.join("\n"))+'">send it by email instead</a>.':" Please contact us using the details in the footer.");return}
 if(b.disabled)return;b.disabled=true;b.textContent="Sending…";
 fetch(ENDPOINT,{method:"POST",body:data,headers:{Accept:"application/json"}}).then(function(r){if(!r.ok)throw 0;f.style.display="none";m.innerHTML="<h3>Thank you</h3><p>Your feedback has been received. We really appreciate you taking the time.</p>"})
 .catch(function(){b.disabled=false;b.textContent="Send Feedback";m.textContent="Sorry, something went wrong sending your feedback. Please try again or contact us directly."});
}
function show(){
 var app=q("#app");if(!app)return;
 try{app.innerHTML=page();q("#ff").onsubmit=send;document.title="Feedback | Style & Bloom Decor";
  var n=q("#nav");if(n)n.classList.remove("open");
  document.querySelectorAll("#nav a").forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#feedback")});
  window.scrollTo(0,0)}
 catch(e){app.innerHTML='<section><div class="wrap"><p>Sorry, the feedback form could not load: '+e.message+'</p></div></section>'}
}
function homeLink(){
 var h=location.hash.slice(1);if(h&&h!=="home")return;
 document.querySelectorAll("#app h2").forEach(function(x){
  if(x.textContent.trim()==="Testimonials"&&!document.getElementById("fblink")){var p=document.createElement("p");p.id="fblink";p.className="sub";p.innerHTML='Celebrated with us? <a href="#feedback">Share your feedback</a>.';x.parentNode.appendChild(p)}})
}
function addLinks(){
 [["#nav a[href='#faq']",""],["#fl a[href='#faq']","display:block;padding:4px 0"]].forEach(function(c){
  var a=q(c[0]),p=a&&a.parentNode;if(!a||p.querySelector("a[href='#feedback']"))return;
  var l=document.createElement("a");l.href="#feedback";l.textContent="Feedback";if(c[1])l.setAttribute("style",c[1]);a.parentNode.insertBefore(l,a.nextSibling)})
}
function go(){addLinks();if(location.hash==="#feedback")show();else homeLink()}
window.addEventListener("hashchange",go); /* registered after script.js, so it runs after the site's own router */
go();
})();
