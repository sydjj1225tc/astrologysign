/* Local tropical longitudes. Orbital elements and lunar perturbations:
   Paul Schlyter, https://www.stjarnhimlen.se/comp/ppcomp.html
   Approximate geocentric positions; no nutation, aberration or delta-T model. */
(function(root){
  'use strict';
  const rad=Math.PI/180, sin=x=>Math.sin(x*rad), cos=x=>Math.cos(x*rad);
  const norm=x=>((x%360)+360)%360, atan=(y,x)=>Math.atan2(y,x)/rad;
  const signs=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
  function anomaly(m,e){
    const M=norm(m)*rad; let E=M;
    for(let i=0;i<12;i++){const delta=(E-e*Math.sin(E)-M)/(1-e*Math.cos(E));E-=delta;if(Math.abs(delta)<1e-12)break;}
    return atan(Math.sqrt(1-e*e)*Math.sin(E),Math.cos(E)-e);
  }
  function calculate(utc,lat,lon){
    const jd=utc/86400000+2440587.5,d=jd-2451543.5;
    const ws=282.9404+4.70935e-5*d,ms=356.0470+0.9856002585*d;
    const sun=norm(anomaly(ms,0.016709-1.151e-9*d)+ws);
    const n=125.1228-0.0529538083*d,w=318.0634+0.1643573223*d,m=115.3654+13.0649929509*d;
    const v=anomaly(m,0.0549)+w;
    let moon=atan(sin(n)*cos(v)+cos(n)*sin(v)*cos(5.1454),cos(n)*cos(v)-sin(n)*sin(v)*cos(5.1454));
    const D=m+w+n-ms-ws,F=m+w;
    moon+=-1.274*sin(m-2*D)+0.658*sin(2*D)-0.186*sin(ms)-0.059*sin(2*m-2*D)-0.057*sin(m-2*D+ms)+0.053*sin(m+2*D)+0.046*sin(2*D-ms)+0.041*sin(m-ms)-0.035*sin(D)-0.031*sin(m+ms)-0.015*sin(2*F-2*D)+0.011*sin(m-4*D);
    const T=(jd-2451545)/36525,theta=norm(280.46061837+360.98564736629*(jd-2451545)+0.000387933*T*T-T*T*T/38710000+lon);
    const eps=23.4393-3.563e-7*d;
    // Intersect the ecliptic and horizon planes; select the eastern intersection.
    const A=cos(lat)*cos(theta),B=cos(lat)*sin(theta)*cos(eps)+sin(lat)*sin(eps);
    let rising=norm(atan(A,-B));
    const east=-sin(theta)*cos(rising)+cos(theta)*sin(rising)*cos(eps);
    if(east<0)rising=norm(rising+180);
    if(Math.hypot(A,B)<1e-10 || Math.abs(east)<1e-10)rising=null;
    return {sun,moon:norm(moon),rising};
  }
  function parseBirth(date,time){
    const match=/^(\d{2})\/(\d{2})\/(\d{4})$/.exec(date);
    if(!match)throw Error('Enter your birth date as MM/DD/YYYY.');
    const [,mo,da,yr]=match.map(Number),stamp=Date.UTC(yr,mo-1,da),check=new Date(stamp);
    if(yr<1900||yr>2100||check.getUTCFullYear()!==yr||check.getUTCMonth()!==mo-1||check.getUTCDate()!==da)throw Error('Enter a valid birth date between 1900 and 2100.');
    if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))throw Error('Enter a 24-hour birth time as HH:MM, from 00:00 to 23:59.');
    const [h,m]=time.split(':').map(Number);return stamp+(h*60+m)*60000;
  }
  function localToUTC(wall,zone){
    const formatter=new Intl.DateTimeFormat('en-GB',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
    const localStamp=stamp=>{const p=Object.fromEntries(formatter.formatToParts(new Date(stamp)).map(x=>[x.type,x.value]));return Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second);};
    // Sample offsets on both sides to detect skipped and repeated local clock times.
    const offsets=new Set();for(let h=-48;h<=48;h+=6){const sample=wall+h*3600000;offsets.add(localStamp(sample)-sample);}
    const matches=[...offsets].map(offset=>wall-offset).filter(utc=>localStamp(utc)===wall).sort((a,b)=>a-b);
    if(!matches.length)throw Error('This local time was skipped during a clock change. Check the time, or enter the UTC offset at birth below.');
    if(matches.length>1)throw Error('This local time occurred twice during a clock change. Enter the UTC offset at birth below to choose the correct occurrence.');
    return matches[0];
  }
  function zodiac(angle){const x=norm(angle);return {name:signs[Math.floor(x/30)],degree:x%30,boundary:Math.min(x%30,30-x%30)<0.2};}
  const api={calculate,parseBirth,localToUTC,zodiac};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.Astro=api;
})(globalThis);
