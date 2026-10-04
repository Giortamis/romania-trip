import { useEffect, useMemo, useState } from 'react'

const days = [
  { id: 'thu', short: 'Πέμ', date: '05/11', title: 'Πέμπτη 5 Νοεμβρίου', city: 'Βουκουρέστι' },
  { id: 'fri', short: 'Παρ', date: '06/11', title: 'Παρασκευή 6 Νοεμβρίου', city: 'Sinaia · Bușteni · Brașov' },
  { id: 'sat', short: 'Σάβ', date: '07/11', title: 'Σάββατο 7 Νοεμβρίου', city: 'Zărnești · Bran · Βουκουρέστι' },
  { id: 'sun', short: 'Κυρ', date: '08/11', title: 'Κυριακή 8 Νοεμβρίου', city: 'Otopeni · Επιστροφή' },
]

function bucharestClock(date) {
  return new Intl.DateTimeFormat('el-GR', {
    timeZone: 'Europe/Bucharest',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
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

      <section className="status-card">
        <div className="status-dot" />
        <div>
          <span>Ζωντανό πρόγραμμα</span>
          <strong>Εδώ θα εμφανίζεται η τρέχουσα και η επόμενη δραστηριότητα.</strong>
        </div>
      </section>

      <section className="placeholder-grid">
        <article className="placeholder-card">
          <span>🗓️</span>
          <h3>Πρόγραμμα ημέρας</h3>
          <p>Στο επόμενο βήμα περνάμε όλες τις ώρες, δραστηριότητες, φωτογραφίες και Google Maps.</p>
        </article>
        <article className="placeholder-card">
          <span>🏨</span>
          <h3>Καταλύματα</h3>
          <p>Ralf Residence · Heritage Loft 1735 · DA Residence, με στοιχεία και ιδιωτικά έγγραφα Drive.</p>
        </article>
        <article className="placeholder-card">
          <span>🚗</span>
          <h3>Αυτοκίνητο</h3>
          <p>Green Motion, ώρες παραλαβής/επιστροφής, voucher και πλοήγηση.</p>
        </article>
      </section>
    </main>
  )
}
