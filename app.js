'use strict';
// Compact offline gazetteer: city centers, east-positive longitude, IANA time zone.
const cities=[
 ['New York, USA',40.7128,-74.006,'America/New_York'],['Los Angeles, USA',34.0522,-118.2437,'America/Los_Angeles'],
 ['Chicago, USA',41.8781,-87.6298,'America/Chicago'],['Houston, USA',29.7604,-95.3698,'America/Chicago'],
 ['Phoenix, USA',33.4484,-112.074,'America/Phoenix'],['Philadelphia, USA',39.9526,-75.1652,'America/New_York'],
 ['San Francisco, USA',37.7749,-122.4194,'America/Los_Angeles'],['Seattle, USA',47.6062,-122.3321,'America/Los_Angeles'],
 ['Boston, USA',42.3601,-71.0589,'America/New_York'],['Miami, USA',25.7617,-80.1918,'America/New_York'],
 ['Denver, USA',39.7392,-104.9903,'America/Denver'],['Washington, DC, USA',38.9072,-77.0369,'America/New_York'],
 ['Atlanta, USA',33.749,-84.388,'America/New_York'],['Dallas, USA',32.7767,-96.797,'America/Chicago'],
 ['Honolulu, USA',21.3099,-157.8581,'Pacific/Honolulu'],['Anchorage, USA',61.2181,-149.9003,'America/Anchorage'],
 ['Toronto, Canada',43.6532,-79.3832,'America/Toronto'],['Vancouver, Canada',49.2827,-123.1207,'America/Vancouver'],
 ['Montreal, Canada',45.5019,-73.5674,'America/Toronto'],['Mexico City, Mexico',19.4326,-99.1332,'America/Mexico_City'],
 ['London, UK',51.5074,-0.1278,'Europe/London'],['Manchester, UK',53.4808,-2.2426,'Europe/London'],
 ['Edinburgh, UK',55.9533,-3.1883,'Europe/London'],['Dublin, Ireland',53.3498,-6.2603,'Europe/Dublin'],
 ['Paris, France',48.8566,2.3522,'Europe/Paris'],['Berlin, Germany',52.52,13.405,'Europe/Berlin'],
 ['Rome, Italy',41.9028,12.4964,'Europe/Rome'],['Madrid, Spain',40.4168,-3.7038,'Europe/Madrid'],
 ['Amsterdam, Netherlands',52.3676,4.9041,'Europe/Amsterdam'],['Lisbon, Portugal',38.7223,-9.1393,'Europe/Lisbon'],
 ['Athens, Greece',37.9838,23.7275,'Europe/Athens'],['Stockholm, Sweden',59.3293,18.0686,'Europe/Stockholm'],
 ['Oslo, Norway',59.9139,10.7522,'Europe/Oslo'],['Reykjavik, Iceland',64.1466,-21.9426,'Atlantic/Reykjavik'],
 ['Istanbul, Turkey',41.0082,28.9784,'Europe/Istanbul'],['Moscow, Russia',55.7558,37.6173,'Europe/Moscow'],
 ['Dubai, UAE',25.2048,55.2708,'Asia/Dubai'],['Cairo, Egypt',30.0444,31.2357,'Africa/Cairo'],
 ['Lagos, Nigeria',6.5244,3.3792,'Africa/Lagos'],['Nairobi, Kenya',-1.2921,36.8219,'Africa/Nairobi'],
 ['Johannesburg, South Africa',-26.2041,28.0473,'Africa/Johannesburg'],['Cape Town, South Africa',-33.9249,18.4241,'Africa/Johannesburg'],
 ['Mumbai, India',19.076,72.8777,'Asia/Kolkata'],['Delhi, India',28.6139,77.209,'Asia/Kolkata'],
 ['Bengaluru, India',12.9716,77.5946,'Asia/Kolkata'],['Chennai, India',13.0827,80.2707,'Asia/Kolkata'],
 ['Kolkata, India',22.5726,88.3639,'Asia/Kolkata'],['Karachi, Pakistan',24.8607,67.0011,'Asia/Karachi'],
 ['Dhaka, Bangladesh',23.8103,90.4125,'Asia/Dhaka'],['Kathmandu, Nepal',27.7172,85.324,'Asia/Kathmandu'],
 ['Bangkok, Thailand',13.7563,100.5018,'Asia/Bangkok'],['Singapore, Singapore',1.3521,103.8198,'Asia/Singapore'],
 ['Jakarta, Indonesia',-6.2088,106.8456,'Asia/Jakarta'],['Manila, Philippines',14.5995,120.9842,'Asia/Manila'],
 ['Hong Kong, China',22.3193,114.1694,'Asia/Hong_Kong'],['Beijing, China',39.9042,116.4074,'Asia/Shanghai'],
 ['Shanghai, China',31.2304,121.4737,'Asia/Shanghai'],['Tokyo, Japan',35.6762,139.6503,'Asia/Tokyo'],
 ['Seoul, South Korea',37.5665,126.978,'Asia/Seoul'],['Sydney, Australia',-33.8688,151.2093,'Australia/Sydney'],
 ['Melbourne, Australia',-37.8136,144.9631,'Australia/Melbourne'],['Brisbane, Australia',-27.4698,153.0251,'Australia/Brisbane'],
 ['Perth, Australia',-31.9505,115.8605,'Australia/Perth'],['Adelaide, Australia',-34.9285,138.6007,'Australia/Adelaide'],
 ['Auckland, New Zealand',-36.8485,174.7633,'Pacific/Auckland'],['Wellington, New Zealand',-41.2866,174.7756,'Pacific/Auckland'],
 ['São Paulo, Brazil',-23.5505,-46.6333,'America/Sao_Paulo'],['Rio de Janeiro, Brazil',-22.9068,-43.1729,'America/Sao_Paulo'],
 ['Buenos Aires, Argentina',-34.6037,-58.3816,'America/Argentina/Buenos_Aires'],['Santiago, Chile',-33.4489,-70.6693,'America/Santiago'],
 ['Lima, Peru',-12.0464,-77.0428,'America/Lima'],['Bogotá, Colombia',4.711,-74.0721,'America/Bogota']
];
const $=id=>document.getElementById(id),form=$('birth-form');
// Keep numeric entry, pasted formatted values, and edits at the caret usable.
function formatBirthInput(input,groups,separator){
 const limit=groups.reduce((sum,n)=>sum+n,0);
 function format(){
  const raw=input.value,caret=input.selectionStart??raw.length;
  const before=raw.slice(0,caret).replace(/\D/g,'').length;
  const digits=raw.replace(/\D/g,'').slice(0,limit);
  const parts=[];let offset=0;
  for(const size of groups){if(offset<digits.length)parts.push(digits.slice(offset,offset+size));offset+=size;}
  input.value=parts.join(separator);
  let position=0,seen=0;
  while(position<input.value.length&&seen<before){if(/\d/.test(input.value[position]))seen++;position++;}
  input.setSelectionRange(position,position);
 }
 input.addEventListener('input',format);
 input.addEventListener('beforeinput',event=>{
  const start=input.selectionStart,end=input.selectionEnd;
  if(start!==end||start===null||!event.cancelable)return;
  // Backspace/delete across a separator removes the adjacent digit too.
  if(event.inputType==='deleteContentBackward'&&input.value[start-1]===separator){
   event.preventDefault();input.setRangeText('',Math.max(0,start-2),start,'end');input.dispatchEvent(new Event('input',{bubbles:true}));
  }else if(event.inputType==='deleteContentForward'&&input.value[start]===separator){
   event.preventDefault();input.setRangeText('',start,start+2,'end');input.dispatchEvent(new Event('input',{bubbles:true}));
  }
 });
}
formatBirthInput($('birth-date'),[2,2,4],'/');
formatBirthInput($('birth-time'),[2,2],':');
const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
function findCity(){const query=normalize($('birth-place').value);return cities.find(c=>normalize(c[0])===query||normalize(c[0].split(',')[0])===query);}
cities.sort((a,b)=>a[0].localeCompare(b[0])).forEach(city=>{const option=document.createElement('option');option.value=city[0];$('cities').append(option);});
$('birth-place').addEventListener('input',()=>{
 const city=findCity();$('latitude').value=city?city[1]:'';$('longitude').value=city?city[2]:'';$('utc-offset').value='';
 $('location-summary').textContent=city?`${city[0]} · Time zone: ${city[3].replaceAll('_',' ')}`:'';
});
function resetResults(){
 document.querySelector('.results').classList.remove('has-results');
 [['rising','—',''],['sun','—',''],['moon','—','']].forEach(([key,title,note])=>{$(`${key}-sign`).textContent=title;$(`${key}-degree`).textContent=note;});
 $('result-context').textContent='';
 $('calculation-note').textContent='An accurate birth time matters, especially for your rising sign.';
}
form.addEventListener('input',()=>{resetResults();$('error').hidden=true;});
form.addEventListener('submit',event=>{
 event.preventDefault();$('error').hidden=true;
 try{
  const wall=Astro.parseBirth($('birth-date').value.trim(),$('birth-time').value.trim()),city=findCity();
  if(!$('birth-place').value.trim())throw Error('Enter your birthplace.');
  const lat=Number($('latitude').value),lon=Number($('longitude').value),offsetText=$('utc-offset').value.trim();
  if(!$('latitude').value||!$('longitude').value||!Number.isFinite(lat)||!Number.isFinite(lon)||Math.abs(lat)>=90||Math.abs(lon)>180){$('manual').open=true;throw Error('Choose a city from the list, or enter a latitude between −90 and 90 (excluding the poles) and longitude from −180 to 180.');}
  let utc;
  if(offsetText){const offset=Number(offsetText);if(!Number.isFinite(offset)||offset< -12||offset>14)throw Error('Enter a UTC offset between −12 and +14 hours.');utc=wall-offset*3600000;}
  else if(city){utc=Astro.localToUTC(wall,city[3]);}
  else{$('manual').open=true;throw Error('Enter the UTC offset at birth for this location.');}
  const positions=Astro.calculate(utc,lat,lon);let boundary=false;
  for(const key of ['rising','sun','moon']){
   if(positions[key]===null){$(`${key}-sign`).textContent='Indeterminate';$(`${key}-degree`).textContent='The horizon aligns with the ecliptic at this moment.';continue;}
   const sign=Astro.zodiac(positions[key]);boundary ||= sign.boundary;
   const link=document.createElement('a');
   const context=new URLSearchParams({sign:sign.name,placement:key});
   for(const role of ['rising','sun','moon'])if(positions[role]!==null)context.set(role,Astro.zodiac(positions[role]).name);
   link.href=`sign.html?${context}`;
   link.textContent=sign.name;
   link.setAttribute('aria-label',`Read about ${key} ${sign.name}`);
   $(`${key}-sign`).replaceChildren(link);$(`${key}-degree`).textContent=`${sign.degree.toFixed(1)}° in ${sign.name}${sign.boundary?' · near a sign boundary':''}`;
  }
  document.querySelector('.results').classList.add('has-results');
  const offset=(wall-utc)/3600000;
  $('result-context').textContent=`${city?city[0]:$('birth-place').value.trim()} · ${$('birth-date').value} at ${$('birth-time').value} · UTC${offset>=0?'+':''}${Number(offset.toFixed(4))}`;
  $('calculation-note').textContent=boundary?'A placement is close to a sign boundary. Small differences in birth time, location, or calculation method could change that sign.':'Calculated for your local birth time using the Western tropical zodiac. Positions are approximate.';
 }catch(error){resetResults();$('error').textContent=error.message;$('error').hidden=false;if(/clock change/.test(error.message))$('manual').open=true;}
});
