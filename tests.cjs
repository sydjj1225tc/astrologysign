const assert=require('node:assert/strict');
const A=require('./astro.js');
assert.throws(()=>A.parseBirth('02/29/1900','12:00'));
assert.throws(()=>A.parseBirth('04/31/2000','12:00'));
assert.throws(()=>A.parseBirth('01/01/2000','24:00'));
assert.equal(A.parseBirth('02/29/2000','23:59'),Date.UTC(2000,1,29,23,59));
assert.equal(A.localToUTC(Date.UTC(2000,6,1,12),'America/New_York'),Date.UTC(2000,6,1,16));
assert.equal(A.localToUTC(Date.UTC(2000,0,1,12),'America/New_York'),Date.UTC(2000,0,1,17));
assert.equal(A.localToUTC(Date.UTC(2000,0,1,12),'Asia/Kolkata'),Date.UTC(2000,0,1,6,30));
assert.throws(()=>A.localToUTC(Date.UTC(2024,2,10,2,30),'America/New_York'),/skipped/);
assert.throws(()=>A.localToUTC(Date.UTC(2024,10,3,1,30),'America/New_York'),/twice/);
// Schlyter worked example, 1990 April 19 00:00 UT: Sun 28.686°, Moon 306.948°.
const sample=A.calculate(Date.UTC(1990,3,19),60,15);
assert.ok(Math.abs(sample.sun-28.686)<0.02);
assert.ok(Math.abs(sample.moon-306.948)<0.05);
assert.equal(A.zodiac(sample.sun).name,'Aries');
assert.equal(A.zodiac(sample.moon).name,'Aquarius');
assert.equal(A.zodiac(360).name,'Aries');
// Independently verify the ascendant is on the horizon and to the east.
for(const lat of [-70,-33,0,40,70])for(const lon of [-120,0,150]){
 const time=Date.UTC(2000,0,1,12),p=A.calculate(time,lat,lon),r=Math.PI/180;
 const theta=(280.46061837+lon)*r,eps=(23.4393-3.563e-7*1.5)*r,L=p.rising*r;
 const x=Math.cos(L),y=Math.sin(L)*Math.cos(eps),z=Math.sin(L)*Math.sin(eps);
 const altitude=Math.cos(lat*r)*(Math.cos(theta)*x+Math.sin(theta)*y)+Math.sin(lat*r)*z;
 const east=-Math.sin(theta)*x+Math.cos(theta)*y;
 assert.ok(Math.abs(altitude)<1e-10);assert.ok(east>0);
}
console.log('Passed: date/time validation, historical offsets, DST ambiguity, solar/lunar reference positions, and ascendant geometry.');
