'use strict';
// Original interpretive copy, separate from astronomical calculation sources.
// Each entry contains [characteristics, reflection] for rising, sun, and moon.
const readings = {
 Aries: {
 rising:['You may meet new situations directly, with quick reactions and a willingness to go first. Others may notice your energy and independence before they see your softer side.','Make room to observe before acting. A confident entrance can also leave space for other voices.'],
 sun:['Initiative, courage, and independence are central Aries themes. You may feel most yourself when starting something, taking a challenge, or making your own choices.','Practice staying with projects after the initial excitement fades. Patience can support your drive.'],
 moon:['Feelings may arrive quickly and ask for immediate expression. Emotional freedom, honest responses, and a chance to take action can feel reassuring.','Pause before reacting to a strong feeling. Give yourself time to identify what you need beneath the urgency.']},
 Taurus:{
 rising:['A calm, steady presence may shape how others first experience you. You may approach unfamiliar situations carefully and prefer a comfortable, predictable pace.','Let steadiness support you without turning every unfamiliar choice into a threat.'],
 sun:['Building a dependable life, enjoying sensory pleasures, and following through are common Taurus themes. You may take pride in creating something tangible and lasting.','Notice when persistence becomes resistance. Changing direction does not erase what you have built.'],
 moon:['Familiar routines, physical comfort, and dependable affection may help you feel secure. You may process emotions gradually and value consistency in close relationships.','Name your feelings before retreating into habit. Comfort and honest conversation can work together.']},
 Gemini:{
 rising:['Curiosity and lively conversation may be your first bridge to other people. You may adapt quickly, ask questions, and explore several possibilities before settling on one.','Slow the exchange enough to listen as well as respond. You do not have to fill every silence.'],
 sun:['Learning, exchanging ideas, and discovering connections may give you a sense of purpose. Variety and freedom to change your mind are common Gemini themes.','Choose a few ideas to develop deeply. Focus need not mean losing your curiosity.'],
 moon:['Talking or writing may help you understand your feelings. You may need mental stimulation and room to see an emotional situation from more than one angle.','Let a feeling exist before explaining it. Understanding an emotion is only one part of experiencing it.']},
 Cancer:{
 rising:['You may enter new settings gently, reading the atmosphere before opening up. Others may experience you as attentive, protective, or initially reserved.','Check whether an impression reflects the present situation or an old protective habit.'],
 sun:['Care, belonging, and emotional connection may be important to your identity. You may find purpose in nurturing people, preserving memories, or creating a sense of home.','Offer care without taking responsibility for everyone’s feelings. Your own needs belong in the picture.'],
 moon:['Emotional safety and close bonds may be especially meaningful. You may respond strongly to atmosphere and find reassurance in familiar people, places, or rituals.','Ask directly for comfort when you need it. Others may not recognize a need you have kept private.']},
 Leo:{
 rising:['You may come across as warm, expressive, and noticeable. A generous welcome, playful style, or confident presence can be how you approach new people—even if you feel more private inside.','You do not have to perform confidence all the time. Let people meet the quieter parts of you too.'],
 sun:['Creativity, wholehearted self-expression, and pride in what you make are central Leo themes. You may feel energized by encouraging others or bringing your own vision to life.','Build a sense of worth that lasts beyond applause. Share the spotlight without shrinking your contribution.'],
 moon:['Feeling appreciated and loved openly may matter deeply to you. You may express affection generously and need warmth, play, and personal recognition in close relationships.','Ask for reassurance plainly instead of testing whether someone will notice. A quiet gesture can carry real love.']},
 Virgo:{
 rising:['You may approach new situations by noticing details and looking for practical ways to help. Others may first see a thoughtful, observant, or carefully prepared person.','Give yourself permission to participate before everything is perfectly arranged.'],
 sun:['Developing a skill, solving problems, and being useful may support your sense of identity. Virgo themes include discernment, care, and steady improvement.','Let good work be good enough sometimes. Your value is not limited to what you fix.'],
 moon:['Order, manageable routines, and practical support may help you feel grounded. You may show care through small acts and try to understand feelings by working through their details.','Treat emotions as experiences rather than errors to correct. Rest can be useful without needing justification.']},
 Libra:{
 rising:['You may lead with courtesy, charm, and an awareness of the people around you. Finding common ground and creating a pleasant atmosphere can be your natural way into new settings.','Allow a clear preference to show, even when it differs from someone else’s.'],
 sun:['Partnership, fairness, and an appreciation of beauty may shape your sense of purpose. You may enjoy bringing different perspectives into a more balanced relationship.','A fair decision does not always please everyone. Include your own priorities in the balance.'],
 moon:['Reciprocity, companionship, and peaceful communication may help you feel secure. Tension in a close relationship may affect you strongly, even when you try to remain composed.','Express discomfort before it becomes resentment. Honest disagreement can deepen connection.']},
 Scorpio:{
 rising:['You may enter new situations with focus and a measured level of openness. Others may notice intensity, privacy, or a tendency to observe closely before trusting.','Let trust grow through small, real exchanges rather than requiring certainty at the outset.'],
 sun:['Depth, commitment, and personal transformation are common Scorpio themes. You may feel drawn to understanding what lies beneath appearances and pursuing what matters with determination.','Leave room for flexibility. A meaningful commitment does not require total control.'],
 moon:['Emotions may feel private, powerful, and closely tied to trust. You may seek relationships where honesty and loyalty allow you to reveal what you usually protect.','Share vulnerability in manageable steps. Needing reassurance does not make you less strong.']},
 Sagittarius:{
 rising:['An open, adventurous, or candid manner may shape your first impression. You may approach unfamiliar people and places with humor and an appetite for possibility.','Consider how your honesty lands. Curiosity about another viewpoint can make candor kinder.'],
 sun:['Exploration, learning, and the search for meaning may help you feel alive. You may value freedom to follow a belief, widen your perspective, or discover something beyond the familiar.','Turn an inspiring idea into a practical next step. Freedom can coexist with follow-through.'],
 moon:['Space, hope, and a sense of possibility may help you recover emotionally. A change of scene or a broader perspective may feel comforting when life becomes heavy.','Stay present with difficult feelings before looking for the bright side. Not every emotion needs an immediate lesson.']},
 Capricorn:{
 rising:['You may appear composed, deliberate, or responsible when meeting new situations. You may prefer to assess expectations and build credibility through consistent actions.','You can be approachable without having every answer. Let warmth accompany your competence.'],
 sun:['Responsibility, mastery, and building something enduring may shape your identity. You may find satisfaction in long-term progress and earning trust through your efforts.','Define success in personal terms. Rest and relationships deserve a place alongside achievement.'],
 moon:['Reliability, clear boundaries, and a feeling of capability may bring emotional security. You may express care through commitment and practical help rather than dramatic displays.','Let someone support you without first proving that you need it. Feelings do not have to be productive.']},
 Aquarius:{
 rising:['An independent or unconventional approach may be part of your first impression. You may enter a group by noticing its patterns, offering a fresh idea, or keeping a little personal distance.','Make space for a personal connection as well as an interesting exchange of ideas.'],
 sun:['Original thinking, autonomy, and concern for a wider community are common Aquarius themes. You may find purpose in questioning assumptions and imagining different ways to live.','Bring your ideas close to the people they affect. Individual needs can matter as much as the bigger system.'],
 moon:['Emotional breathing room, friendship, and acceptance of your individuality may help you feel secure. You may step back to understand a feeling before sharing it.','Tell people when you need space and when you want closeness. Detachment does not have to hide affection.']},
 Pisces:{
 rising:['A gentle, imaginative, or receptive manner may shape how you meet the world. You may pick up on atmosphere quickly and adapt your approach to the people around you.','Keep a sense of your own preferences while responding to others. Sensitivity benefits from boundaries.'],
 sun:['Imagination, compassion, and a search for connection are common Pisces themes. You may feel most yourself through creative work, kindness, or experiences that reach beyond everyday routines.','Give your imagination a practical container. Small commitments can help an inspired vision become real.'],
 moon:['A rich inner life and sensitivity to emotional atmosphere may shape your needs. Solitude, creativity, and gentle companionship may offer comfort when you feel overwhelmed.','Distinguish your feelings from the emotions around you. Clear boundaries can protect your capacity to care.']}
};
const meanings={rising:'Rising describes your approach to new situations and the impression you may give others.',sun:'Sun describes themes of identity, purpose, and self-expression.',moon:'Moon describes emotional habits, comfort, and the needs you may reveal in close relationships.'};
// Original social-setting suggestions; these are invitations, not predictions.
const social = {
 Aries:['Start with a simple introduction and one direct question. Let your willingness to initiate make room for someone who is waiting to join in.','Share a recent challenge you enjoyed, then ask what the other person is trying.','Take a short movement break and decide whether you want company or a moment alone.'],
 Taurus:['Choose a comfortable spot and begin with something you genuinely appreciate about the setting. You can create connection without matching the room’s fastest pace.','Talk about a craft, meal, place, or project you have enjoyed taking time with.','Give yourself an unhurried transition home, with familiar comforts and fewer demands.'],
 Gemini:['Use your curiosity to open a conversation, then follow one answer a little further. A thoughtful follow-up can create more connection than another new topic.','Share an interesting idea and invite a different perspective without turning the exchange into a debate.','Write a few lines about the evening or talk with someone who listens without rushing you.'],
 Cancer:['Begin with a person or topic that feels familiar. A gentle welcome can help someone feel included without making you responsible for everyone’s experience.','Share a meaningful memory or ask about a place where someone feels at home.','Leave time for privacy or a check-in with someone whose company feels easy.'],
 Leo:['Offer a warm hello and one sincere compliment. Let your expressive side show through a story, a laugh, or a personal detail you enjoy sharing.','Share something you are proud of, then invite someone else to tell their own story.','Seek a small moment of affectionate connection rather than measuring the evening by how much attention you received.'],
 Virgo:['Notice one useful detail, then let yourself join the conversation without organizing everything. Being present is enough; you do not need to earn your place by helping.','Mention something you are learning and ask for someone’s experience rather than offering an immediate solution.','Keep the next step simple: a quiet routine, a short list for tomorrow, or permission to leave tasks unfinished.'],
 Libra:['Introduce two people with a shared interest, or ask a question that invites several perspectives. You can encourage ease while still expressing your own opinion.','Share a preference clearly, even if the group is leaning another way.','Choose a calm exchange where you can name what felt good and what you would change.'],
 Scorpio:['Try a thoughtful, open question and share at your own pace. You can show interest without revealing personal details before you feel ready.','Talk about a subject you care about while leaving the other person room to keep things lighter.','Choose privacy or a trusted listener, and let the evening settle before deciding what it meant.'],
 Sagittarius:['Open with a recent discovery or a question about something someone wants to explore. Let enthusiasm invite stories rather than become pressure to keep things upbeat.','Share what surprised you in a new experience and ask what surprised them recently.','Make room for a change of scenery, while also acknowledging any feelings that did not fit the upbeat mood.'],
 Capricorn:['Start with a clear introduction and a small personal detail beyond your work. Your thoughtful presence can be welcoming without needing to demonstrate competence.','Talk about what you enjoy building or learning, not only what you have achieved.','Set aside a little time with no task to complete and no impression to maintain.'],
 Aquarius:['Offer an unusual but accessible question, then show interest in the person behind the answer. A fresh perspective can coexist with simple warmth.','Share an idea you care about and ask how it connects with someone’s everyday experience.','Give yourself breathing room, then decide whether a friendly check-in would feel good.'],
 Pisces:['Begin with a shared experience, such as music or the atmosphere, and let the conversation unfold. You can be receptive without agreeing to every request.','Share a creative interest or a story that moved you, at a level of detail that feels comfortable.','Choose a quieter environment and ask which feelings are yours to carry into the rest of the night.']
};
const captions={rising:'Your social presence',sun:'Your authentic expression',moon:'Your emotional comfort'};
const labels={rising:'Rising',sun:'Sun',moon:'Moon'};
const intro='Use this reading as a starting point for noticing what feels natural when you meet people. You do not need to become more outgoing, agreeable, or impressive to belong. Keep what resonates, leave what does not, and let your experience carry more weight than any description.';
// Color families follow Tarot.com; shades and styling ideas are editorial choices.
const clothingColors={
 Aries:[['Scarlet','#e34848'],['Burgundy','#852d46']],
 Taurus:[['Emerald','#258366'],['Sage','#a7bc98']],
 Gemini:[['Sunshine yellow','#f3cf4b'],['Butter yellow','#f5e7a1']],
 Cancer:[['Pearl white','#f3f0e9'],['Silver','#bdc5d0']],
 Leo:[['Gold','#dbb451'],['Champagne','#e9d6a8']],
 Virgo:[['Olive green','#8a985c'],['Chocolate brown','#795440']],
 Libra:[['Rose pink','#e4a9bc'],['Sky blue','#9dc8e6']],
 Scorpio:[['Black','#17151b'],['Soft black','#38343c']],
 Sagittarius:[['Violet','#9564c7'],['Plum','#754473']],
 Capricorn:[['Cocoa brown','#88634f'],['Charcoal grey','#656573']],
 Aquarius:[['Cobalt blue','#4165d6'],['Ice blue','#b4dcef']],
 Pisces:[['Seafoam green','#a7d4c0'],['Mint green','#c3e6ca']]
};
const clothingIdeas={
 rising:'Try one shade in a jacket, top, or scarf as an easy introduction to your personal style. A small accent is enough if a full-color outfit feels too bold.',
 sun:'Choose a shade for a favorite shirt, dress, or matching set that feels like you. Let the color highlight something you already enjoy wearing.',
 moon:'Try a shade in a soft knit, comfortable layer, or familiar accessory. Choose a texture and fit that feel good to you, whether you are going out or winding down.'
};
function placementSection(sign,role){
 return {id:role,sign,role,title:`${labels[role]} ${sign} — ${captions[role]}`,
 text:`${meanings[role]} ${readings[sign][role][0]}`,
 social:social[sign][Object.keys(labels).indexOf(role)],balance:readings[sign][role][1]};
}
const zodiacSymbols={Aries:'♈',Taurus:'♉',Gemini:'♊',Cancer:'♋',Leo:'♌',Virgo:'♍',Libra:'♎',Scorpio:'♏',Sagittarius:'♐',Capricorn:'♑',Aquarius:'♒',Pisces:'♓'};
function singleSections(sign,role){return [placementSection(sign,role)];}
const params=new URLSearchParams(location.search),sign=params.get('sign'),placement=params.get('placement');
const validSign=value=>typeof value==='string'&&Object.hasOwn(readings,value);
const trio=Object.fromEntries(Object.keys(labels).map(role=>[role,params.get(role)]));
const complete=Object.values(trio).every(validSign);
if(validSign(sign)&&Object.hasOwn(meanings,placement)){
 const selectedMatches=!complete||trio[placement]===sign;
 if(!selectedMatches){document.getElementById('invalid').hidden=false;}
 else{
 document.title=`${labels[placement]} ${sign} — Spark`;
 function addZodiacLabel(element,name,text){
  const symbol=document.createElement('span');symbol.className='zodiac-glyph';
  symbol.textContent=zodiacSymbols[name]+'\uFE0E';symbol.setAttribute('aria-hidden','true');
  const label=document.createElement('span');label.textContent=text;element.append(symbol,label);
 }
 document.getElementById('reading-title').textContent='';
 addZodiacLabel(document.getElementById('reading-title'),sign,`${labels[placement]} ${sign}`);
 document.getElementById('reading-intro').textContent=intro;
 const sections=singleSections(sign,placement);
 for(const item of sections){
  const section=document.createElement('section');section.id=item.id;
  const heading=document.createElement('h2');heading.textContent=item.title;
  const paragraph=document.createElement('p');paragraph.textContent=item.text;
  section.className='placement-reading';
  section.setAttribute('aria-labelledby',`${item.id}-heading`);heading.id=`${item.id}-heading`;
  section.append(heading,paragraph);
  for(const [title,text] of [['In social settings 💬',item.social],['A gentle reminder 🌷',item.balance]]){
   const box=document.createElement('section');box.className='reading-box';
   const h=document.createElement('h3');
   const split=title.lastIndexOf(' ');h.textContent=title.slice(0,split)+' ';
   const emoji=document.createElement('span');emoji.textContent=title.slice(split+1);emoji.setAttribute('aria-hidden','true');h.append(emoji);
   h.id=`${item.id}-detail-${section.children.length}`;box.setAttribute('aria-labelledby',h.id);
   const p=document.createElement('p');p.textContent=text;box.append(h,p);section.append(box);
  }
  const colorBox=document.createElement('section');colorBox.className='reading-box';
  const colorHeading=document.createElement('h3');colorHeading.textContent='Lucky clothing colors ';
  colorHeading.id=`${item.id}-colors`;colorBox.setAttribute('aria-labelledby',colorHeading.id);
  const dress=document.createElement('span');dress.textContent='👗';dress.setAttribute('aria-hidden','true');colorHeading.append(dress);
  const palette=document.createElement('ul');palette.className='clothing-palette';
  for(const [name,hex] of clothingColors[item.sign]){
   const chip=document.createElement('li'),swatch=document.createElement('span');
   swatch.className='color-swatch';swatch.style.backgroundColor=hex;swatch.setAttribute('aria-hidden','true');
   const label=document.createElement('span');label.textContent=name;chip.append(swatch,label);palette.append(chip);
  }
  const tip=document.createElement('p');tip.textContent=clothingIdeas[item.role];
  colorBox.append(colorHeading,palette,tip);section.append(colorBox);document.getElementById('reading-sections').append(section);
 }
 for(const key of Object.keys(labels)){
  const link=document.createElement('a');
  const nextSign=complete?trio[key]:sign;
  const next=new URLSearchParams({sign:nextSign,placement:key});
  if(complete)for(const role of Object.keys(labels))next.set(role,trio[role]);
  link.href=`sign.html?${next}`;
  addZodiacLabel(link,nextSign,`${labels[key]} ${nextSign}`);
  if(key===placement)link.setAttribute('aria-current','page');
  document.getElementById('placements').append(link);
 }
 document.getElementById('reading').hidden=false;
 }
}else{document.getElementById('invalid').hidden=false;}
