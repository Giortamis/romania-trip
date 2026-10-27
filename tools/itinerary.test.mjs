import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {test} from 'node:test'

const source=readFileSync(new URL('../src/App.jsx',import.meta.url),'utf8')
const data=source.slice(source.indexOf('const GOOGLE_MAPS_PHOTO'),source.indexOf('const prestartByDay')).replaceAll('import.meta.env.BASE_URL',"'/romania-trip/'")
const {fri,sat}=Function(data+'\nreturn {fri:fridayBlocks,sat:saturdayBlocks}')()
const schedule=Function('addMinutes',source.slice(source.indexOf('function getSchedule'),source.indexOf('function getCurrentIndex'))+'\nreturn getSchedule')((d,m)=>new Date(d.getTime()+m*60000))
const clock=d=>new Intl.DateTimeFormat('el-GR',{timeZone:'Europe/Bucharest',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(d)

const finalFriday = [
  [
    "fri-ralf-interparking",
    "08:30",
    "08:45"
  ],
  [
    "fri-interparking-bran",
    "08:45",
    "11:30"
  ],
  [
    "fri-bran",
    "11:30",
    "12:45"
  ],
  [
    "fri-bran-heritage",
    "12:45",
    "13:40"
  ],
  [
    "fri-heritage-arrival",
    "13:40",
    "13:50"
  ],
  [
    "fri-heritage-ograda",
    "13:50",
    "14:00"
  ],
  [
    "fri-la-ceaun",
    "14:00",
    "15:00"
  ],
  [
    "fri-ograda-heritage",
    "15:00",
    "15:15"
  ],
  [
    "fri-heritage-checkin-rest",
    "15:15",
    "16:30"
  ],
  [
    "fri-heritage-black-church",
    "16:30",
    "16:45"
  ],
  [
    "fri-black-church",
    "16:45",
    "17:15"
  ],
  [
    "fri-black-church-catherine",
    "17:15",
    "17:25"
  ],
  [
    "fri-ecaterinei",
    "17:25",
    "17:35"
  ],
  [
    "fri-catherine-republicii",
    "17:35",
    "17:45"
  ],
  [
    "fri-republicii",
    "17:45",
    "18:15"
  ],
  [
    "fri-to-zoomserie",
    "18:15",
    "18:25"
  ],
  [
    "fri-dessert",
    "18:25",
    "19:10"
  ],
  [
    "fri-back-heritage",
    "19:10",
    "19:20"
  ],
  [
    "fri-heritage-night",
    "19:20",
    "08:30"
  ]
]

test('Friday matches every agreed time and keeps the car parked after Heritage arrival',()=>{
  const all=fri.flatMap(b=>schedule(b,{completed:{}}))
  assert.deepEqual(all.map(a=>[a.id,clock(a.estimatedStart),clock(a.estimatedEnd)]),finalFriday)
  assert.ok(!all.some(a=>/Sforii|Poarta Șchei/.test(a.title)))
  assert.ok(!all.some(a=>a.id==='fri-piata-sfatului'))
  for(const a of all.slice(4).filter(a=>a.type==='route'))assert.equal(a.mode,'walking',a.id)
  const checkin=all.find(a=>a.id==='fri-heritage-checkin-rest')
  assert.equal(checkin.type,'rest')
  assert.equal(checkin.showTimeRange,true)
  assert.equal(checkin.description,'check-in / Ξεκούραση.')
  assert.equal(all.at(-1).description,'Ξεκούραση.')
  const expected={
    'fri-bran-heritage':['Heritage Loft 1735, Strada Gheorghe Barițiu 26, Brașov, Romania','driving'],
    'fri-heritage-ograda':['Ograda, Piața Sfatului 14, Brașov','walking'],
    'fri-ograda-heritage':['Heritage Loft 1735, Strada Gheorghe Barițiu 26, Brașov, Romania','walking'],
    'fri-heritage-black-church':['Black Church, Curtea Johannes Honterus 2, Brașov','walking'],
    'fri-to-zoomserie':['Zoomserie Brașov, Strada Apollonia Hirscher 1, Brașov','walking'],
  }
  for(const [id,wanted] of Object.entries(expected)){const a=all.find(a=>a.id===id);assert.deepEqual([a.destination,a.mode],wanted,id)}
})

test('overnight REST starts at arrival, follows delayed START/END, and ends next morning',()=>{
  for(const [block,start,end] of [[fri[1],'19:20','08:30'],[sat[0],'16:45','07:00']]){
    const normal=schedule(block,{completed:{}})
    assert.equal(clock(normal.at(-1).estimatedStart),start)
    assert.equal(clock(normal.at(-1).estimatedEnd),end)
    const delayed=schedule(block,{startedAt:new Date(new Date(block.plannedStart).getTime()+30*60000).toISOString(),completed:{}})
    assert.equal(delayed.at(-1).estimatedStart-normal.at(-1).estimatedStart,30*60000)
    assert.equal(+delayed.at(-1).estimatedEnd,+normal.at(-1).estimatedEnd)
    const previous=normal.at(-2)
    const completed=schedule(block,{completed:{[previous.id]:new Date(previous.estimatedEnd.getTime()+10*60000).toISOString()}})
    assert.equal(completed.at(-1).estimatedStart-normal.at(-1).estimatedStart,10*60000)
    assert.equal(+completed.at(-1).estimatedEnd,+normal.at(-1).estimatedEnd)
  }
})

test('Bran is Friday only, Libearty is Saturday only, and Pelisor is removed',()=>{
  assert.equal(/pelișor|pelisor/i.test(source),false)
  assert.equal(fri.flatMap(b=>b.activities).filter(a=>a.id==='fri-bran').length,1)
  assert.equal(sat.flatMap(b=>b.activities).some(a=>/bran/i.test(a.title)),false)
  assert.equal(fri.flatMap(b=>b.activities).some(a=>/libearty/i.test(a.title)),false)
  assert.equal(clock(schedule(sat[0],{completed:{}})[1].estimatedStart),'09:45')
  const rest=schedule(fri[0],{completed:{}}).at(-1)
  assert.equal(rest.type,'rest')
  assert.equal(clock(rest.estimatedStart),'15:15')
  assert.equal(clock(rest.estimatedEnd),'16:30')
})

test('all Friday/Saturday routes have explicit endpoints/modes; meals and REST have no navigation',()=>{
  const mapUrl=Function(source.slice(source.indexOf('function mapUrl'),source.indexOf('function getBlockState'))+'\nreturn mapUrl')()
  const all=[...fri,...sat].flatMap(b=>b.activities)
  assert.equal(all.filter(a=>a.type==='route').length,13)
  assert.equal(new Set(all.map(a=>a.id)).size,all.length)
  for(const a of all){
    if(a.type==='route'){
      assert.ok(a.origin&&a.destination,a.id)
      const url=new URL(mapUrl(a.destination,a.mode,a.origin))
      assert.equal(url.searchParams.get('origin'),a.origin)
      assert.equal(url.searchParams.get('destination'),a.destination)
      assert.equal(url.searchParams.get('travelmode'),a.mode)
      assert.equal(a.mode,a.icon==='🚶'?'walking':'driving')
    }
    if(a.typeLabel==='ΓΕΥΜΑ'||a.type==='rest'||a.fixedLabel==='REST'){
      assert.equal(a.disableNavigation,true,a.id)
      assert.equal(a.destination,undefined,a.id)
    }
  }
  assert.deepEqual(all.filter(a=>a.typeLabel==='ΓΕΥΜΑ').map(a=>a.title),['Ograda Restaurant','Zoomserie Brașov','Micoteca'])
})
