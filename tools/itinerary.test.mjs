import assert from 'node:assert/strict'
import {readFileSync} from 'node:fs'
import {test} from 'node:test'

const source=readFileSync(new URL('../src/App.jsx',import.meta.url),'utf8')
const data=source.slice(source.indexOf('const GOOGLE_MAPS_PHOTO'),source.indexOf('const prestartByDay')).replaceAll('import.meta.env.BASE_URL',"'/romania-trip/'")
const {fri,sat}=Function(data+'\nreturn {fri:fridayBlocks,sat:saturdayBlocks}')()
const schedule=Function('addMinutes',source.slice(source.indexOf('function getSchedule'),source.indexOf('function getCurrentIndex'))+'\nreturn getSchedule')((d,m)=>new Date(d.getTime()+m*60000))
const clock=d=>new Intl.DateTimeFormat('el-GR',{timeZone:'Europe/Bucharest',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(d)

test('Friday lunch precedes hotel arrival and check-in REST follows actual arrival',()=>{
  assert.deepEqual(fri[0].activities.map(a=>a.id),[
    'fri-ralf-interparking','fri-interparking-bran','fri-bran','fri-bran-ograda',
    'fri-la-ceaun','fri-ograda-heritage','fri-heritage-checkin-rest',
  ])
  const route=fri[0].activities[3],hotel=fri[0].activities[5],walk=fri[1].activities[0]
  assert.equal(route.destination,'Ograda, Piața Sfatului 14, Brașov')
  assert.equal(route.mode,'driving')
  assert.equal(hotel.origin,route.destination)
  assert.equal(hotel.destination,'Heritage Loft 1735, Strada Gheorghe Barițiu 26, Brașov, Romania')
  assert.equal(hotel.mode,'driving')
  assert.equal(walk.origin,hotel.destination)
  assert.equal(walk.destination,'Piața Sfatului, Brașov, Romania')
  assert.equal(walk.mode,'walking')
  const normal=schedule(fri[0],{completed:{}}),hotelArrival=normal.at(-2).estimatedEnd
  assert.equal(+normal.at(-1).estimatedStart,+hotelArrival)
  const late=schedule(fri[0],{completed:{[hotel.id]:new Date(hotelArrival.getTime()+30*60000).toISOString()}})
  assert.equal(late.at(-1).estimatedStart-normal.at(-1).estimatedStart,30*60000)
  assert.equal(late.at(-1).estimatedEnd-normal.at(-1).estimatedEnd,30*60000)
  assert.equal(late.at(-1).showTimeRange,true)
})

test('overnight REST starts at arrival, follows delayed START/END, and ends next morning',()=>{
  for(const [block,start,end] of [[fri[1],'20:23','08:30'],[sat[0],'16:45','07:00']]){
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
  assert.equal(clock(rest.estimatedStart),'15:10')
  assert.equal(clock(rest.estimatedEnd),'16:40')
})

test('all Friday/Saturday routes have explicit endpoints/modes; meals and REST have no navigation',()=>{
  const mapUrl=Function(source.slice(source.indexOf('function mapUrl'),source.indexOf('function getBlockState'))+'\nreturn mapUrl')()
  const all=[...fri,...sat].flatMap(b=>b.activities)
  assert.equal(all.filter(a=>a.type==='route').length,15)
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
