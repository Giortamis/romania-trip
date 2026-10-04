import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'romania-trip-live-v2'
const RALF_PHOTO = 'data:image/jpeg;base64,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'

const days = [
  { id: 'thu', short: 'Πέμ', date: '05/11', title: 'Πέμπτη 5 Νοεμβρίου', city: 'Βουκουρέστι' },
  { id: 'fri', short: 'Παρ', date: '06/11', title: 'Παρασκευή 6 Νοεμβρίου', city: 'Sinaia · Bușteni · Brașov' },
  { id: 'sat', short: 'Σάβ', date: '07/11', title: 'Σάββατο 7 Νοεμβρίου', city: 'Zărnești · Bran · Βουκουρέστι' },
  { id: 'sun', short: 'Κυρ', date: '08/11', title: 'Κυριακή 8 Νοεμβρίου', city: 'Otopeni · Επιστροφή' },
]

const thursdayBlocks = [
  {
    id: 'thu-car',
    title: 'Μπλοκ 1 · Μόλις πάρουμε το αυτοκίνητο',
    startLabel: '🚗 ΠΑΡΕΛΑΒΑ ΤΟ ΑΥΤΟΚΙΝΗΤΟ — START',
    plannedStart: '2026-11-05T10:30:00+02:00',
    startHint: 'Πατάμε START μόνο όταν ολοκληρωθεί πραγματικά η παραλαβή από Green Motion.',
    activities: [
      {
        id: 'drive-greenmotion-interparking',
        type: 'route',
        duration: 20,
        icon: '🚗',
        title: 'Green Motion → Interparking Piața Universității',
        description: 'Οδήγηση κατευθείαν στο κέντρο. Δεν περνάμε πρώτα από το Ralf Residence.',
        destination: 'Interparking Piata Universitatii Bucharest',
        mode: 'driving',
      },
      {
        id: 'revolution-square',
        type: 'action',
        duration: 30,
        icon: '📍',
        title: 'Revolution Square (Πλατεία Επανάστασης)',
        description: 'Πρώτη στάση της πρωινής βόλτας. Από εδώ συνεχίζουμε με τα πόδια προς Calea Victoriei.',
        destination: 'Revolution Square Bucharest',
        mode: 'walking',
        photo: {
          thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Revolution%20Square%2C%20Bucharest%20-%20panoramio.jpg?width=480',
          full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Revolution%20Square%2C%20Bucharest%20-%20panoramio.jpg?width=1600',
          alt: 'Revolution Square, Bucharest',
          credit: 'Keith Ruffles · Wikimedia Commons · CC BY 3.0',
          source: 'https://commons.wikimedia.org/wiki/File:Revolution_Square,_Bucharest_-_panoramio.jpg',
        },
      },
      {
        id: 'calea-victoriei',
        type: 'action',
        duration: 60,
        icon: '🚶',
        title: 'Calea Victoriei (Λεωφόρος της Νίκης)',
        description: 'Περπάτημα στη Calea Victoriei. Η επόμενη πλοήγηση μας οδηγεί προς το Romanian Athenaeum.',
        destination: 'Calea Victoriei Bucharest',
        mode: 'walking',
        photo: {
          thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Calea%20Victoriei%20%281%29.jpg?width=480',
          full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Calea%20Victoriei%20%281%29.jpg?width=1600',
          alt: 'Calea Victoriei, Bucharest',
          credit: 'Leontin l · Wikimedia Commons · CC BY-SA 4.0',
          source: 'https://commons.wikimedia.org/wiki/File:Calea_Victoriei_(1).jpg',
        },
      },
      {
        id: 'romanian-athenaeum',
        type: 'action',
        duration: 30,
        icon: '🏛️',
        title: 'Romanian Athenaeum (Ρουμανικό Αθηναίο)',
        description: 'Στάση στο Ateneul Român / Ρουμανικό Αθηναίο. Η φωτογραφία βοηθά να αναγνωρίσουμε αμέσως την πρόσοψη όταν φτάσουμε.',
        destination: 'Romanian Athenaeum Bucharest',
        mode: 'walking',
        photo: {
          thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Romanian%20Athenaeum%20Ateneul%20Rom%C3%A2n%20%2852460204562%29.jpg?width=480',
          full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Romanian%20Athenaeum%20Ateneul%20Rom%C3%A2n%20%2852460204562%29.jpg?width=1600',
          alt: 'Romanian Athenaeum, Bucharest',
          credit: 'George M. Groutas · Wikimedia Commons · CC BY 2.0',
          source: 'https://commons.wikimedia.org/wiki/File:Romanian_Athenaeum_Ateneul_Rom%C3%A2n_(52460204562).jpg',
        },
      },
      {
        id: 'arcade-schnitzel',
        type: 'action',
        duration: 60,
        icon: '🍽️',
        title: 'Arcade Cafe – Giant Schnitzel',
        description: 'Πέμπτη: Giant Schnitzel στο Arcade Cafe, Strada Smârdan 30, στην Παλιά Πόλη.',
        destination: 'Arcade Cafe Strada Smardan 30 Bucharest',
        mode: 'walking',
        photo: {
          thumb: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Farcadecafe.ro%2F?w=700',
          full: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Farcadecafe.ro%2F?w=1400',
          alt: 'Arcade Cafe – επίσημη ιστοσελίδα',
          credit: 'Arcade Cafe · snapshot επίσημης ιστοσελίδας',
          source: 'https://arcadecafe.ro/',
        },
      },
      {
        id: 'to-ralf',
        type: 'route',
        duration: 15,
        icon: '🏨',
        title: 'Arcade Cafe → Ralf Residence (με τα πόδια)',
        description: 'Πηγαίνουμε στο Ralf Residence, Strada Academiei 1A. Επίσημο check-in από 15:00.',
        destination: 'Ralf Residence Strada Academiei 1A Bucharest',
        mode: 'walking',
        photo: {
          thumb: RALF_PHOTO,
          full: RALF_PHOTO,
          alt: 'Ralf Residence – πρόσοψη κτιρίου',
          credit: 'Φωτογραφία από την επιβεβαίωση κράτησης',
          source: 'https://www.booking.com/hotel/ro/ralf-residence-bucuresti1.html',
        },
      },
    ],
  },
  {
    id: 'thu-afternoon',
    title: 'Μπλοκ 2 · Απογευματινή έξοδος από Ralf',
    startLabel: '🏨 ΦΕΥΓΟΥΜΕ ΑΠΟ ΤΟ ΞΕΝΟΔΟΧΕΙΟ — START',
    plannedStart: '2026-11-05T16:00:00+02:00',
    startHint: 'Νέο START όταν φύγουμε πραγματικά από το Ralf Residence.',
    activities: [
      {
        id: 'carturesti-carusel',
        type: 'action',
        duration: 30,
        icon: '📚',
        title: 'Cărturești Carusel (Βιβλιοπωλείο Καρτουρέστι Καρουζέλ)',
        description: 'Πρώτη απογευματινή στάση στην Παλιά Πόλη, Strada Lipscani 55.',
        destination: 'Carturesti Carusel Bucharest',
        mode: 'walking',
        photo: {
          thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Str.%20Lipscani%20nr.%2055%20%28Cas%C4%83%20cu%20pr%C4%83v%C4%83lie%29.jpg?width=480',
          full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Str.%20Lipscani%20nr.%2055%20%28Cas%C4%83%20cu%20pr%C4%83v%C4%83lie%29.jpg?width=1600',
          alt: 'Cărturești Carusel – πρόσοψη, Lipscani 55',
          credit: 'Wikimedia Commons · δείτε πηγή/άδεια',
          source: 'https://commons.wikimedia.org/wiki/File:Str._Lipscani_nr._55_(Cas%C4%83_cu_pr%C4%83v%C4%83lie).jpg',
        },
      },
      {
        id: 'stavropoleos',
        type: 'action',
        duration: 30,
        icon: '⛪',
        title: 'Stavropoleos (Μονή / Εκκλησία Σταυρουπόλεως)',
        description: 'Ξεχωριστή στάση ώστε το END να ανοίγει πλοήγηση για την επόμενη.',
        destination: 'Stavropoleos Monastery Bucharest',
        mode: 'walking',
        photo: {
          thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/RO%20B%20Stavropoleos%20church.jpg?width=480',
          full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/RO%20B%20Stavropoleos%20church.jpg?width=1600',
          alt: 'Stavropoleos Church, Bucharest',
          credit: 'Wikimedia Commons · δείτε πηγή/άδεια',
          source: 'https://commons.wikimedia.org/wiki/File:RO_B_Stavropoleos_church.jpg',
        },
      },
      {
        id: 'macca-vilacrosse',
        type: 'action',
        duration: 30,
        icon: '✨',
        title: 'Macca-Vilacrosse Passage (Στοά Μακά-Βιλακρός)',
        description: 'Περνάμε από τη χαρακτηριστική σκεπαστή στοά του ιστορικού κέντρου.',
        destination: 'Pasajul Macca-Vilacrosse Bucharest',
        mode: 'walking',
        photo: {
          thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Macca-Villacrosse.jpg?width=480',
          full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Macca-Villacrosse.jpg?width=1600',
          alt: 'Macca-Vilacrosse Passage, Bucharest',
          credit: 'Wikimedia Commons · δείτε πηγή/άδεια',
          source: 'https://commons.wikimedia.org/wiki/File:Macca-Villacrosse.jpg',
        },
      },
      {
        id: 'cec-palace',
        type: 'action',
        duration: 25,
        icon: '🏛️',
        title: 'CEC Palace (Μέγαρο CEC)',
        description: 'Στάση στην πρόσοψη του CEC Palace, στη Calea Victoriei.',
        destination: 'CEC Palace Bucharest',
        mode: 'walking',
        photo: {
          thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/CEC%20Palace.jpg?width=480',
          full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/CEC%20Palace.jpg?width=1600',
          alt: 'CEC Palace, Bucharest',
          credit: 'Wikimedia Commons · δείτε πηγή/άδεια',
          source: 'https://commons.wikimedia.org/wiki/File:CEC_Palace.jpg',
        },
      },
      {
        id: 'piata-unirii',
        type: 'action',
        duration: 35,
        icon: '📍',
        title: 'Piața Unirii (Πλατεία Ένωσης)',
        description: 'Τελευταία ξεχωριστή στάση της απογευματινής περιήγησης.',
        destination: 'Piata Unirii Bucharest',
        mode: 'walking',
        photo: {
          thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pta%20unirii.JPG?width=480',
          full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pta%20unirii.JPG?width=1600',
          alt: 'Piața Unirii, Bucharest',
          credit: 'Wikimedia Commons · δείτε πηγή/άδεια',
          source: 'https://commons.wikimedia.org/wiki/File:Pta_unirii.JPG',
        },
      },
      {
        id: 'coffee-rest',
        type: 'action',
        duration: 60,
        icon: '☕',
        title: 'Καφές / γλυκό / χαλάρωση',
        description: 'Μικρή στάση πριν την αναχώρηση για το γήπεδο.',
      },
      {
        id: 'to-parking',
        type: 'route',
        duration: 15,
        icon: '🚶',
        title: 'Προς Interparking Piața Universității',
        description: 'Με τα πόδια πίσω στην Πλατεία Πανεπιστημίου και παίρνουμε το αυτοκίνητο από το Interparking.',
        destination: 'Interparking Piata Universitatii Bucharest',
        mode: 'walking',
        photo: {
          thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Piata%20Universitatii%2C%20Bucuresti.jpg?width=480',
          full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Piata%20Universitatii%2C%20Bucuresti.jpg?width=1600',
          alt: 'Piața Universității, Bucharest',
          credit: 'Gabriel · Wikimedia Commons · CC BY 2.0',
          source: 'https://commons.wikimedia.org/wiki/File:Piata_Universitatii,_Bucuresti.jpg',
        },
      },
      {
        id: 'to-stadium',
        type: 'route',
        duration: 45,
        icon: '🚗',
        title: 'Interparking → Stadionul Rapid-Giulești',
        description: 'Οδήγηση προς το γήπεδο και αναζήτηση θέσης. 1η επιλογή η θέση ΑμεΑ, αν εγκριθεί.',
        destination: 'Stadionul Rapid-Giulesti Bucharest',
        mode: 'driving',
        photo: {
          thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Rapid%20Stadium%20opening%2C%20March%202022%20%281%29.jpg?width=480',
          full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Rapid%20Stadium%20opening%2C%20March%202022%20%281%29.jpg?width=1600',
          alt: 'Stadionul Rapid-Giulești',
          credit: 'Wikimedia Commons · Public Domain',
          source: 'https://commons.wikimedia.org/wiki/File:Rapid_Stadium_opening,_March_2022_(1).jpg',
        },
      },
      {
        id: 'match',
        type: 'fixed',
        duration: 120,
        icon: '⚽',
        title: 'Hapoel Be’er Sheva – OFI',
        description: 'Σταθερό γεγονός. Η ώρα έναρξης δεν μετακινείται από το live πρόγραμμα.',
        fixedStart: '2026-11-05T22:00:00+02:00',
        fixedLabel: 'ΣΤΑΘΕΡΟ · 22:00',
        destination: 'Stadionul Rapid-Giulesti Bucharest',
        mode: 'walking',
        photo: {
          thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Romania%20bucharest%20Rapid-Giule%C8%99ti%20Stadium.jpg?width=480',
          full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Romania%20bucharest%20Rapid-Giule%C8%99ti%20Stadium.jpg?width=1600',
          alt: 'Stadionul Rapid-Giulești, Bucharest',
          credit: 'Arne Müseler · Wikimedia Commons · CC BY-SA 3.0',
          source: 'https://commons.wikimedia.org/wiki/File:Romania_bucharest_Rapid-Giule%C8%99ti_Stadium.jpg',
        },
      },
      {
        id: 'return-centre',
        type: 'route',
        duration: 45,
        icon: '🌙',
        title: 'Γήπεδο → Interparking → Ralf Residence',
        description: 'Μετά τον αγώνα επιστρέφουμε στο κέντρο, παρκάρουμε ξανά και πάμε για ύπνο.',
        destination: 'Interparking Piata Universitatii Bucharest',
        mode: 'driving',
      },
    ],
  },
]

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function fmtClock(value) {
  const date = value instanceof Date ? value : new Date(value)
  return new Intl.DateTimeFormat('el-GR', {
    timeZone: 'Europe/Bucharest',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    hour12: false,
  }).format(date)
}

function fmtFull(value) {
  const date = value instanceof Date ? value : new Date(value)
  return new Intl.DateTimeFormat('el-GR', {
    timeZone: 'Europe/Bucharest',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    hour12: false,
  }).format(date)
}

function bucharestClock(date) {
  return new Intl.DateTimeFormat('el-GR', {
    timeZone: 'Europe/Bucharest',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    hour12: false,
    second: '2-digit',
  }).format(date)
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000)
}

function mapUrl(query, mode = 'walking') {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}&travelmode=${mode}`
}

function getBlockState(liveState, blockId) {
  return liveState?.[blockId] || { startedAt: null, completed: {} }
}

function getSchedule(block, state) {
  let cursor = state.startedAt ? new Date(state.startedAt) : new Date(block.plannedStart)

  return block.activities.map((activity, index) => {
    const completedAt = state.completed?.[activity.id] ? new Date(state.completed[activity.id]) : null
    let estimatedStart = cursor

    if (activity.type === 'fixed') {
      const fixed = new Date(activity.fixedStart)
      estimatedStart = fixed
    }

    const estimatedEnd = addMinutes(estimatedStart, activity.duration)

    if (completedAt) {
      cursor = completedAt
    } else if (activity.type === 'fixed') {
      cursor = estimatedEnd
    } else {
      cursor = estimatedEnd
    }

    return {
      ...activity,
      index,
      completedAt,
      estimatedStart,
      estimatedEnd,
    }
  })
}

function getCurrentIndex(schedule) {
  const idx = schedule.findIndex((item) => !item.completedAt)
  return idx === -1 ? schedule.length : idx
}

function getAnchorInfo(block, state) {
  const fixed = block.activities.find((item) => item.type === 'fixed')
  if (!fixed) return null

  const schedule = getSchedule(block, state)
  const fixedIndex = schedule.findIndex((item) => item.id === fixed.id)
  const before = schedule.slice(0, fixedIndex)
  const lastBefore = before[before.length - 1]
  const projectedArrival = lastBefore?.completedAt || lastBefore?.estimatedEnd || new Date(block.plannedStart)
  const anchor = new Date(fixed.fixedStart)
  const diff = Math.round((anchor - projectedArrival) / 60000)

  return {
    anchor,
    diff,
    projectedArrival,
  }
}

function LiveBlock({ block, liveState, onStart, onEnd, onReset, onOpenPhoto }) {
  const state = getBlockState(liveState, block.id)
  const schedule = getSchedule(block, state)
  const currentIndex = getCurrentIndex(schedule)
  const anchorInfo = getAnchorInfo(block, state)
  const complete = currentIndex >= schedule.length

  return (
    <section className="live-block">
      <div className="block-head">
        <div>
          <p className="block-kicker">{block.title}</p>
          <h3>{state.startedAt ? `START: ${fmtFull(state.startedAt)}` : `Προγραμματισμένο START: ${fmtClock(block.plannedStart)}`}</h3>
          <p>{block.startHint}</p>
        </div>

        {state.startedAt ? (
          <button className="reset-button" onClick={() => onReset(block.id)}>↺ Reset</button>
        ) : (
          <button className="start-button" onClick={() => onStart(block.id)}>{block.startLabel}</button>
        )}
      </div>

      {state.startedAt && !complete && (
        <div className="live-now">
          <div className="pulse-dot" />
          <div>
            <span>ΤΩΡΑ</span>
            <strong>{schedule[currentIndex].title}</strong>
            <small>
              Ξεκίνησε/υπολογίζεται {fmtClock(schedule[currentIndex].estimatedStart)}
              {schedule[currentIndex].type !== 'fixed' && ` · στόχος END ${fmtClock(schedule[currentIndex].estimatedEnd)}`}
            </small>
          </div>
        </div>
      )}

      {anchorInfo && state.startedAt && (
        <div className={anchorInfo.diff < 45 ? 'anchor-warning danger' : 'anchor-warning'}>
          <span>⚓ Σταθερό deadline</span>
          <strong>Αγώνας 22:00</strong>
          <small>
            Με το τωρινό πρόγραμμα προβλεπόμενη ολοκλήρωση πριν τον αγώνα: {fmtClock(anchorInfo.projectedArrival)}
            {' · '}
            {anchorInfo.diff >= 0 ? `περιθώριο ~${anchorInfo.diff}′` : `καθυστέρηση ~${Math.abs(anchorInfo.diff)}′`}
          </small>
        </div>
      )}

      <div className="activities-list">
        {schedule.map((item, index) => {
          const done = Boolean(item.completedAt)
          const current = state.startedAt && index === currentIndex
          const future = state.startedAt && index > currentIndex
          const nextItem = schedule[index + 1]
          const nextNeedsNavigation = Boolean(
            current &&
            nextItem?.destination &&
            nextItem.destination !== item.destination
          )

          return (
            <article
              key={item.id}
              className={[
                'activity-row',
                done ? 'done' : '',
                current ? 'current' : '',
                future ? 'future' : '',
                item.type === 'fixed' ? 'fixed' : '',
              ].join(' ')}
            >
              <div className="activity-icon">{done ? '✓' : item.icon}</div>

              <div className="activity-main">
                {item.photo && (
                  <button
                    className="landmark-thumb"
                    onClick={() => onOpenPhoto(item.photo)}
                    aria-label={`Μεγέθυνση φωτογραφίας: ${item.photo.alt}`}
                  >
                    <img src={item.photo.thumb} alt={item.photo.alt} loading="lazy" />
                    <span>🔍 Μεγέθυνση</span>
                  </button>
                )}

                <div className="activity-meta">
                  <span className={item.type === 'route' ? 'type route' : item.type === 'fixed' ? 'type fixed' : 'type'}>
                    {item.type === 'route' ? 'ΔΙΑΔΡΟΜΗ' : item.type === 'fixed' ? item.fixedLabel : 'ΔΡΑΣΗ'}
                  </span>
                  <span>
                    {done
                      ? `END ${fmtClock(item.completedAt)}`
                      : item.type === 'fixed'
                        ? '22:00'
                        : `${fmtClock(item.estimatedStart)} → ${fmtClock(item.estimatedEnd)}`}
                  </span>
                </div>

                <h4>{item.title}</h4>
                <p>{item.description}</p>

                <div className="activity-actions">
                  {item.destination && (
                    <a
                      className="maps-button"
                      href={mapUrl(item.destination, item.mode)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      📍 Google Maps
                    </a>
                  )}

                  {current && (
                    <button
                      className="end-button"
                      onClick={() => onEnd(
                        block.id,
                        item.id,
                        nextNeedsNavigation ? nextItem.destination : null,
                        nextNeedsNavigation ? nextItem.mode : null,
                      )}
                    >
                      {nextNeedsNavigation ? '✓ END → GOOGLE MAPS' : '✓ END'}
                    </button>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {complete && (
        <div className="block-complete">
          ✅ Το μπλοκ ολοκληρώθηκε. Όλες οι πραγματικές ώρες END έχουν αποθηκευτεί στο κινητό.
        </div>
      )}
    </section>
  )
}

export default function App() {
  const [now, setNow] = useState(new Date())
  const [activeDay, setActiveDay] = useState('thu')
  const [liveState, setLiveState] = useState(() => loadState())
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    saveState(liveState)
  }, [liveState])

  const selected = useMemo(
    () => days.find((day) => day.id === activeDay) ?? days[0],
    [activeDay],
  )

  function startBlock(blockId) {
    setLiveState((prev) => ({
      ...prev,
      [blockId]: {
        startedAt: new Date().toISOString(),
        completed: {},
      },
    }))
  }

  function endActivity(blockId, activityId, nextDestination = null, nextMode = 'walking') {
    const blockState = getBlockState(liveState, blockId)
    const nextState = {
      ...liveState,
      [blockId]: {
        ...blockState,
        completed: {
          ...blockState.completed,
          [activityId]: new Date().toISOString(),
        },
      },
    }

    saveState(nextState)
    setLiveState(nextState)

    if (nextDestination) {
      window.location.assign(mapUrl(nextDestination, nextMode || 'walking'))
    }
  }

  function resetBlock(blockId) {
    const ok = window.confirm('Να μηδενιστεί αυτό το μπλοκ και να διαγραφούν οι δοκιμαστικές ώρες START/END;')
    if (!ok) return

    setLiveState((prev) => {
      const next = { ...prev }
      delete next[blockId]
      return next
    })
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">ROMANIA TRIP 2026</p>
          <h1>Βουκουρέστι · Brașov</h1>
          <p className="trip-dates">5–8 Νοεμβρίου 2026</p>
        </div>
        <div className="clock-card">
          <span>Ώρα Ρουμανίας</span>
          <strong>{bucharestClock(now)}</strong>
        </div>
      </header>

      <nav className="day-tabs" aria-label="Ημέρες ταξιδιού">
        {days.map((day) => (
          <button
            key={day.id}
            className={day.id === activeDay ? 'day-tab active' : 'day-tab'}
            onClick={() => setActiveDay(day.id)}
          >
            <span>{day.short}</span>
            <strong>{day.date}</strong>
          </button>
        ))}
      </nav>

      <section className="day-heading">
        <p>{selected.city}</p>
        <h2>{selected.title}</h2>
      </section>

      {activeDay === 'thu' ? (
        <>
          <section className="prestart-card">
            <div>
              <span>ΠΡΙΝ ΤΟ START</span>
              <strong>09:20 άφιξη OTP → Green Motion → παραλαβή αυτοκινήτου</strong>
              <p>Δεν μας νοιάζει αν εδώ υπάρξει καθυστέρηση. Το ζωντανό πρόγραμμα αρχίζει όταν πατήσουμε START μετά την παραλαβή.</p>
            </div>
          </section>

          {thursdayBlocks.map((block) => (
            <LiveBlock
              key={block.id}
              block={block}
              liveState={liveState}
              onStart={startBlock}
              onEnd={endActivity}
              onReset={resetBlock}
              onOpenPhoto={setSelectedPhoto}
            />
          ))}

          <section className="logic-card">
            <strong>Πώς δουλεύει τώρα</strong>
            <p>
              START μόνο στην αρχή κάθε μπλοκ. Μετά πατάμε μόνο END. Η πραγματική ώρα END γίνεται αυτόματα η βάση
              για την επόμενη δραστηριότητα, άρα οι επόμενες ώρες μετακινούνται χωρίς να πειράζεται το σταθερό 22:00 του αγώνα.
            </p>
          </section>
        </>
      ) : activeDay === 'sat' ? (
        <section className="placeholder-card saturday-food-card">
          <button
            className="landmark-thumb"
            onClick={() => setSelectedPhoto({
              thumb: 'https://micoteca.ro/wp-content/uploads/2026/05/micoteca-herastrat-1.jpg',
              full: 'https://micoteca.ro/wp-content/uploads/2026/05/micoteca-herastrat-1.jpg',
              alt: 'Micoteca, Herăstrău',
              credit: 'Micoteca · επίσημη ιστοσελίδα',
              source: 'https://micoteca.ro/',
            })}
            aria-label="Μεγέθυνση φωτογραφίας Micoteca"
          >
            <img src="https://micoteca.ro/wp-content/uploads/2026/05/micoteca-herastrat-1.jpg" alt="Micoteca, Herăstrău" loading="lazy" />
            <span>🔍 Μεγέθυνση</span>
          </button>
          <span>🍽️ ΚΛΕΙΔΩΜΕΝΟ ΦΑΓΗΤΟ</span>
          <h3>Micoteca – Mici</h3>
          <p>Το Σάββατο, μετά την επιστροφή στο Βουκουρέστι, κρατάμε τα mici στη Micoteca, Herăstrău. Θα ενσωματωθεί στο πλήρες live πρόγραμμα του Σαββάτου.</p>
          <a
            className="maps-button saturday-map"
            href={mapUrl('Micoteca Herastrau Bucharest', 'driving')}
            target="_blank"
            rel="noreferrer"
          >
            📍 Google Maps
          </a>
        </section>
      ) : (
        <section className="placeholder-card">
          <span>🧭</span>
          <h3>{selected.title}</h3>
          <p>Μόλις κλειδώσουμε τη λειτουργία της Πέμπτης, εφαρμόζουμε ακριβώς τον ίδιο μηχανισμό και στις υπόλοιπες ημέρες.</p>
        </section>
      )}

      {selectedPhoto && (
        <div className="photo-modal" role="dialog" aria-modal="true" aria-label={selectedPhoto.alt} onClick={() => setSelectedPhoto(null)}>
          <div className="photo-modal-card" onClick={(event) => event.stopPropagation()}>
            <button className="photo-close" onClick={() => setSelectedPhoto(null)} aria-label="Κλείσιμο">×</button>
            <img src={selectedPhoto.full} alt={selectedPhoto.alt} />
            <div className="photo-caption">
              <strong>{selectedPhoto.alt}</strong>
              <a href={selectedPhoto.source} target="_blank" rel="noreferrer">{selectedPhoto.credit}</a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
