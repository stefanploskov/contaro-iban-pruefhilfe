const input=document.querySelector('#iban');
const result=document.querySelector('#result');
const formatted=document.querySelector('#formatted');
const badge=document.querySelector('#badge');

function normalize(value){
  return value.toUpperCase().replace(/[^A-Z0-9]/g,'');
}

function isValidIban(value){
  if(value.length<15||value.length>34||!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(value)) return false;
  const moved=value.slice(4)+value.slice(0,4);
  const numeric=[...moved].map(character=>/[A-Z]/.test(character)?character.charCodeAt(0)-55:character).join('');
  let remainder=0;
  for(const digit of numeric) remainder=(remainder*10+Number(digit))%97;
  return remainder===1;
}

function check(){
  const compact=normalize(input.value);
  formatted.textContent=compact.replace(/(.{4})/g,'$1 ').trim();
  const valid=isValidIban(compact);
  badge.textContent=valid?'Prüfsumme gültig':'Formal nicht gültig';
  badge.style.color=valid?'#1c6b4d':'#a13b35';
  result.hidden=false;
}

document.querySelector('#check').addEventListener('click',check);
document.querySelector('#copy').addEventListener('click',async()=>{
  await navigator.clipboard.writeText(formatted.textContent.replace(/\s/g,''));
  document.querySelector('#copy').textContent='Kopiert';
});
