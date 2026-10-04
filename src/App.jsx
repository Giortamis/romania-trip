import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'romania-trip-live-v2'

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
        id: 'mici',
        type: 'action',
        duration: 30,
        icon: '🍽️',
        title: 'Mici / Mititei',
        description: 'Στάση για το πρώτο φαγητό-στόχο του ταξιδιού.',
      },
      {
        id: 'to-ralf',
        type: 'route',
        duration: 30,
        icon: '🚶',
        title: 'Μετάβαση στο Ralf Residence',
        description: 'Πηγαίνουμε στο Ralf Residence, Strada Academiei 1A. Η επίσημη ώρα check-in ξεκινά στις 15:00.',
        destination: 'Ralf Residence Strada Academiei 1A Bucharest',
        mode: 'walking',
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
        id: 'old-town',
        type: 'action',
        duration: 150,
        icon: '🏛️',
        title: 'Old Town / Lipscani',
        description: 'Cărturești Carusel → Stavropoleos → Macca-Vilacrosse Passage → CEC Palace → Piața Unirii.',
        destination: 'Lipscani Old Town Bucharest',
        mode: 'walking',
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
        title: 'Προς Interparking & παραλαβή αυτοκινήτου',
        description: 'Επιστροφή στο Interparking Piața Universității και παίρνουμε το αυτοκίνητο.',
        destination: 'Interparking Piata Universitatii Bucharest',
        mode: 'walking',
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
                    <button className="end-button" onClick={() => onEnd(block.id, item.id)}>
                      ✓ END
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

  function endActivity(blockId, activityId) {
    setLiveState((prev) => {
      const blockState = getBlockState(prev, blockId)
      return {
        ...prev,
        [blockId]: {
          ...blockState,
          completed: {
            ...blockState.completed,
            [activityId]: new Date().toISOString(),
          },
        },
      }
    })
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
