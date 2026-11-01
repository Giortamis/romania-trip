import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {test} from 'node:test'
const source=readFileSync(new URL('../src/App.jsx',import.meta.url),'utf8')
const data=source.slice(source.indexOf('const GOOGLE_MAPS_PHOTO'),source.indexOf('const prestartByDay')).replaceAll('import.meta.env.BASE_URL',"'/romania-trip/'")
const {thu,sat}=Function(data+'\nreturn {thu:thursdayBlocks,sat:saturdayBlocks}')()
const schedule=Function('addMinutes',source.slice(source.indexOf('function getSchedule'),source.indexOf('function getCurrentIndex'))+'\nreturn getSchedule')((d,m)=>new Date(d.getTime()+m*60000))
const clock=d=>new Intl.DateTimeFormat('el-GR',{timeZone:'Europe/Bucharest',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(d)
const intervals=b=>schedule(b,{completed:{}}).map(a=>[a.id,clock(a.estimatedStart),clock(a.estimatedEnd)])
test('Thursday evening follows the agreed route and keeps the match fixed at 22:00',()=>{
 assert.deepEqual(intervals(thu[1]),[
 ['thu-chanttal-carusel','17:00','17:10'],['carturesti-carusel','17:10','17:40'],
 ['thu-carusel-chocoloco','17:40','17:50'],['thu-chocoloco','17:50','18:25'],
 ['thu-chocoloco-chanttal','18:25','18:35'],['thu-chanttal-free-time','18:35','20:15'],
 ['to-parking','20:15','20:20'],['to-stadium','20:20','21:05'],['match','22:00','00:00'],
 ['return-centre','00:00','00:45'],['thu-interparking-chanttal','00:45','01:00'],['thu-chanttal-night-rest','01:00','08:30'],
 ])
 const match=thu[1].activities.find(a=>a.id==='match')
 assert.equal(match.type,'fixed');assert.equal(match.fixedStart,'2026-11-05T22:00:00+02:00')
 for(const a of thu[1].activities)assert.ok(!['stavropoleos','macca-vilacrosse','cec-palace','piata-unirii','thu-gioelia','thu-gioelia-stop'].includes(a.id))
})
test('Saturday sightseeing is only Macca and overnight REST begins after the return',()=>{
 assert.deepEqual(intervals(sat[1]),[
 ['sat-da-interparking','18:00','18:40'],['sat-interparking-macca','18:40','18:50'],
 ['sat-macca-vilacrosse','18:50','19:20'],['sat-macca-interparking','19:20','19:30'],
 ['sat-interparking-da','19:30','20:10'],['sat-da-residence-night','20:10','07:00'],
 ])
 assert.equal(sat[0].activities.length,5)
 assert.equal(clock(schedule(sat[0],{completed:{}}).at(-1).estimatedEnd),'16:45')
 assert.deepEqual(sat[1].activities.filter(a=>a.type==='action').map(a=>a.id),['sat-macca-vilacrosse'])
})
test('all eight new navigation routes use explicit endpoints and correct transport modes',()=>{
 const points={hotel:'CHANTTAL Luxury - UNIVERSITY, Strada Academiei 4, București, Romania',carusel:'Cărturești Carusel, Strada Lipscani 55, București, Romania',chocoloco:'Chocoloco Victoriei, Calea Victoriei 38-40, București, Romania',parking:'Interparking Piața Universității, Strada Toma Caragiu 1, București, Romania',da:'DA Residence, 8 Strada 9 Mai, Otopeni, Romania',macca:'Pasajul Macca-Vilacrosse, București, Romania'}
 const reviewed=[['thu-chanttal-carusel','hotel','carusel','walking'],['thu-carusel-chocoloco','carusel','chocoloco','walking'],['thu-chocoloco-chanttal','chocoloco','hotel','walking'],['to-parking','hotel','parking','walking'],['sat-da-interparking','da','parking','driving'],['sat-interparking-macca','parking','macca','walking'],['sat-macca-interparking','macca','parking','walking'],['sat-interparking-da','parking','da','driving']]
 const map=Function(source.slice(source.indexOf('function mapUrl'),source.indexOf('function getBlockState'))+'\nreturn mapUrl')()
 const all=[...thu[1].activities,...sat[1].activities]
 for(const [id,from,to,mode] of reviewed){const a=all.find(a=>a.id===id);assert.deepEqual([a.origin,a.destination,a.mode],[points[from],points[to],mode]);const url=new URL(map(a.destination,a.mode,a.origin));assert.deepEqual([url.searchParams.get('origin'),url.searchParams.get('destination'),url.searchParams.get('travelmode')],[points[from],points[to],mode])}
 for(const a of all.filter(a=>a.type==='rest'||a.typeLabel==='ΓΕΥΜΑ'))assert.equal(a.destination,undefined,a.id)
 assert.equal(all.find(a=>a.id==='thu-chocoloco').disableNavigation,true)
})
