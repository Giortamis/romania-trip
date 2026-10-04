import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'romania-trip-live-v2'
const RALF_PHOTO = 'data:image/jpeg;base64,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'
const PARKING_THUMB = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 140'><rect width='200' height='140' rx='20' fill='%230256d6'/><text x='100' y='104' text-anchor='middle' font-size='110' font-family='Arial' font-weight='700' fill='white'>P</text></svg>"
const PARKING_FULL = 'https://hotnews.ro/wp-content/uploads/2024/04/image-2012-11-5-13553519-41-university-place.jpg?crop=1&h=533&w=800'

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
        description: 'Οδήγηση κατευθείαν για το Parking.',
        destination: 'Interparking Piata Universitatii Bucharest',
        mode: 'driving',
        photo: {
          thumb: PARKING_THUMB,
          full: PARKING_FULL,
          alt: 'Είσοδος Interparking Piața Universității',
          credit: 'HotNews · είσοδος υπόγειου parking Piața Universității',
          source: 'https://hotnews.ro/foto-cum-a-fost-tradusa-in-engleza-denumirea-pietei-universitatii-la-intrarea-in-parcarea-subterana-university-place-620382',
        },
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
        icon: '🅿️',
        title: 'Γήπεδο → Interparking → Ralf Residence',
        description: 'Μετά τον αγώνα οδηγούμε κατευθείαν στο Interparking Piața Universității. Παρκάρουμε και συνεχίζουμε με τα πόδια για το Ralf Residence.',
        destination: 'Interparking Piata Universitatii Bucharest',
        mode: 'driving',
        photo: {
          thumb: PARKING_THUMB,
          full: PARKING_FULL,
          alt: 'Είσοδος Interparking Piața Universității',
          credit: 'HotNews · είσοδος υπόγειου parking Piața Universității',
          source: 'https://hotnews.ro/foto-cum-a-fost-tradusa-in-engleza-denumirea-pietei-universitatii-la-intrarea-in-parcarea-subterana-university-place-620382',
        },
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
