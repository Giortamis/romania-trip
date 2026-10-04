import { useEffect, useMemo, useState } from 'react'

const days = [
  { id: 'thu', short: 'Πέμ', date: '05/11', title: 'Πέμπτη 5 Νοεμβρίου', city: 'Βουκουρέστι' },
  { id: 'fri', short: 'Παρ', date: '06/11', title: 'Παρασκευή 6 Νοεμβρίου', city: 'Sinaia · Bușteni · Brașov' },
  { id: 'sat', short: 'Σάβ', date: '07/11', title: 'Σάββατο 7 Νοεμβρίου', city: 'Zărnești · Bran · Βουκουρέστι' },
  { id: 'sun', short: 'Κυρ', date: '08/11', title: 'Κυριακή 8 Νοεμβρίου', city: 'Otopeni · Επιστροφή' },
]

const thursday = [
  {
    time: '09:20',
    end: '09:45',
    startIso: '2026-11-05T09:20:00+02:00',
    endIso: '2026-11-05T09:45:00+02:00',
    icon: '✈️',
    title: 'Άφιξη στο Βουκουρέστι',
    description: 'Άφιξη στο OTP – Henri Coandă International Airport (Διεθνές Αεροδρόμιο Ανρί Κοάντα).',
    mapQuery: 'Henri Coanda International Airport Bucharest',
    mode: 'driving',
  },
  {
    time: '09:45',
    end: '10:30',
    startIso: '2026-11-05T09:45:00+02:00',
    endIso: '2026-11-05T10:30:00+02:00',
    icon: '🚗',
    title: 'Παραλαβή αυτοκινήτου – Green Motion',
    description: 'Shuttle από το αεροδρόμιο και παραλαβή Renault Arkana Automatic ή παρόμοιου από Green Motion.',
    mapQuery: 'Green Motion Bucharest Airport Strada Ferme B 1 Otopeni',
    mode: 'driving',
  },
  {
    time: '10:30',
    end: '10:45',
    startIso: '2026-11-05T10:30:00+02:00',
    endIso: '2026-11-05T10:45:00+02:00',
    icon: '🅿️',
    title: 'Interparking Piața Universității',
    description: 'Πηγαίνουμε κατευθείαν στο Parking Πλατείας Πανεπιστημίου. Δεν πάμε ακόμα στο Ralf Residence.',
    mapQuery: 'Interparking Piata Universitatii Bucharest',
    mode: 'driving',
  },
  {
    time: '11:00',
    end: '13:00',
    startIso: '2026-11-05T11:00:00+02:00',
    endIso: '2026-11-05T13:00:00+02:00',
    icon: '🚶',
    title: 'Πρωινή βόλτα στο κέντρο',
    description: 'Revolution Square (Πλατεία Επανάστασης) → Calea Victoriei (Λεωφόρος της Νίκης) → Romanian Athenaeum (Ρουμανικό Αθηναίο / Μέγαρο Μουσικής). Όλα με τα πόδια.',
    mapQuery: 'Revolution Square Bucharest',
    mode: 'walking',
  },
  {
    time: '13:00',
    end: '13:30',
    startIso: '2026-11-05T13:00:00+02:00',
    endIso: '2026-11-05T13:30:00+02:00',
    icon: '🍽️',
    title: 'Mici / Mititei',
    description: 'Πρώτο φαγητό-στόχος του ταξιδιού: παραδοσιακά ρουμανικά ψητά ρολάκια κρέατος.',
    mapQuery: 'Piața Universității Bucharest',
    mode: 'walking',
  },
  {
    time: '13:30',
    end: '14:00',
    startIso: '2026-11-05T13:30:00+02:00',
    endIso: '2026-11-05T14:00:00+02:00',
    icon: '🏨',
    title: 'Ralf Residence',
    description: 'Μετάβαση στο Ralf Residence, Strada Academiei 1A. Το επίσημο check-in της κράτησης ξεκινά στις 15:00, οπότε η νωρίτερη είσοδος εξαρτάται από το κατάλυμα.',
    mapQuery: 'Ralf Residence Strada Academiei 1A Bucharest',
    mode: 'walking',
    note: 'Επίσημο check-in: 15:00–00:00',
  },
  {
    time: '14:00',
    end: '15:45',
    startIso: '2026-11-05T14:00:00+02:00',
    endIso: '2026-11-05T15:45:00+02:00',
    icon: '😴',
    title: 'Ξεκούραση',
    description: 'Ξεκούραση πριν από την απογευματινή βόλτα και τον αγώνα. Αν το δωμάτιο δεν είναι διαθέσιμο νωρίτερα, το διάστημα προσαρμόζεται μετά τις 15:00.',
    mapQuery: 'Ralf Residence Strada Academiei 1A Bucharest',
    mode: 'walking',
  },
  {
    time: '16:00',
    end: '18:30',
    startIso: '2026-11-05T16:00:00+02:00',
    endIso: '2026-11-05T18:30:00+02:00',
    icon: '🏛️',
    title: 'Old Town / Lipscani',
    description: 'Old Town / Lipscani (Παλιά Πόλη / Λιπσκάνι) → Cărturești Carusel → Stavropoleos → Macca-Vilacrosse Passage → CEC Palace → Piața Unirii (Πλατεία Ένωσης).',
    mapQuery: 'Lipscani Old Town Bucharest',
    mode: 'walking',
  },
  {
    time: '18:30',
    end: '19:30',
    startIso: '2026-11-05T18:30:00+02:00',
    endIso: '2026-11-05T19:30:00+02:00',
    icon: '☕',
    title: 'Καφές / γλυκό / χαλάρωση',
    description: 'Μικρή στάση ή επιστροφή για λίγο στο κατάλυμα πριν φύγουμε για το γήπεδο.',
    mapQuery: 'Ralf Residence Strada Academiei 1A Bucharest',
    mode: 'walking',
  },
  {
    time: '19:45',
    end: '20:00',
    startIso: '2026-11-05T19:45:00+02:00',
    endIso: '2026-11-05T20:00:00+02:00',
    icon: '🚙',
    title: 'Παίρνουμε το αυτοκίνητο',
    description: 'Παραλαβή του αυτοκινήτου από Interparking Piața Universității και αναχώρηση για Rapid-Giulești. Χρησιμοποιούμε Multi-entry ώστε να μπορέσουμε να ξαναμπούμε μετά.',
    mapQuery: 'Interparking Piata Universitatii Bucharest',
    mode: 'walking',
  },
  {
    time: '20:15',
    end: '20:45',
    startIso: '2026-11-05T20:15:00+02:00',
    endIso: '2026-11-05T20:45:00+02:00',
    icon: '♿',
    title: 'Parking στο γήπεδο',
    description: '1η επιλογή: θέση ΑμεΑ αν εγκριθεί το αίτημα. 2η επιλογή: δημόσιες θέσεις απέναντι από το Stadionul Rapid-Giulești (Στάδιο Ραπίντ-Γκιουλέστι).',
    mapQuery: 'Stadionul Rapid-Giulesti Bucharest',
    mode: 'driving',
  },
  {
    time: '22:00',
    end: '00:00',
    startIso: '2026-11-05T22:00:00+02:00',
    endIso: '2026-11-06T00:00:00+02:00',
    icon: '⚽',
    title: 'Hapoel Be’er Sheva – OFI',
    description: 'Ο βασικός λόγος του ταξιδιού. Αγώνας στο Stadionul Rapid-Giulești.',
    mapQuery: 'Stadionul Rapid-Giulesti Bucharest',
    mode: 'walking',
  },
  {
    time: '00:15',
    end: '00:45',
    startIso: '2026-11-06T00:15:00+02:00',
    endIso: '2026-11-06T00:45:00+02:00',
    icon: '🌙',
    title: 'Επιστροφή στο Ralf Residence',
    description: 'Επιστροφή στο κέντρο, ξανά στο Interparking Piața Universității και διανυκτέρευση στο Ralf Residence.',
    mapQuery: 'Interparking Piata Universitatii Bucharest',
    mode: 'driving',
  },
]

function bucharestClock(date) {
  return new Intl.DateTimeFormat('el-GR', {
    timeZone: 'Europe/Bucharest',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

function mapUrl(query, mode = 'walking') {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}&travelmode=${mode}`
}

function getThursdayStatus(now) {
  const first = thursday[0]
  const last = thursday[thursday.length - 1]
  const firstStart = new Date(first.startIso)
  const lastEnd = new Date(last.endIso)

  if (now < firstStart) {
    return { label: 'Επόμενο', text: `${first.time} · ${first.title}` }
  }

  if (now > lastEnd) {
    return { label: 'Η Πέμπτη ολοκληρώθηκε', text: 'Το πρόγραμμα της Πέμπτης έχει ολοκληρωθεί.' }
  }

  const current = thursday.find((item) => now >= new Date(item.startIso) && now < new Date(item.endIso))
  if (current) return { label: 'Τώρα', text: `${current.time} · ${current.title}` }

  const next = thursday.find((item) => now < new Date(item.startIso))
  return next
    ? { label: 'Επόμενο', text: `${next.time} · ${next.title}` }
    : { label: 'Πρόγραμμα', text: 'Δεν υπάρχει άλλη προγραμματισμένη δραστηριότητα.' }
}

export default function App() {
  const [now, setNow] = useState(new Date())
  const [activeDay, setActiveDay] = useState('thu')

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const selected = useMemo(
    () => days.find((day) => day.id === activeDay) ?? days[0],
    [activeDay],
  )

  const thursdayStatus = getThursdayStatus(now)

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
          <section className="status-card">
            <div className="status-dot" />
            <div>
              <span>{thursdayStatus.label}</span>
              <strong>{thursdayStatus.text}</strong>
            </div>
          </section>

          <section className="timeline">
            {thursday.map((item) => {
              const active = now >= new Date(item.startIso) && now < new Date(item.endIso)
              return (
                <article className={active ? 'activity-card active-activity' : 'activity-card'} key={item.startIso}>
                  <div className="activity-time">
                    <strong>{item.time}</strong>
                    <span>έως {item.end}</span>
                  </div>

                  <div className="activity-photo" aria-hidden="true">
                    <span>{item.icon}</span>
                  </div>

                  <div className="activity-body">
                    <div className="activity-title-row">
                      <h3>{item.title}</h3>
                      {active && <span className="now-badge">ΤΩΡΑ</span>}
                    </div>
                    <p>{item.description}</p>
                    {item.note && <p className="activity-note">{item.note}</p>}
                    <a
                      className="map-button"
                      href={mapUrl(item.mapQuery, item.mode)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      📍 Άνοιγμα στο Google Maps
                    </a>
                  </div>
                </article>
              )
            })}
          </section>

          <p className="build-note">Οι πραγματικές φωτογραφίες των σημείων θα προστεθούν στο επόμενο βήμα.</p>
        </>
      ) : (
        <section className="placeholder-card single-placeholder">
          <span>🧭</span>
          <h3>{selected.title}</h3>
          <p>Το πρόγραμμα αυτής της ημέρας θα περαστεί στο επόμενο βήμα.</p>
        </section>
      )}
    </main>
  )
}
