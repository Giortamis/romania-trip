import { useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'romania-trip-live-v2'
const EUR_RON_FALLBACK = 5.33637
const GOOGLE_MAPS_PHOTO = {
  thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Google_Maps_icon_%282015-2020%29.svg?width=512',
  full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Google_Maps_icon_%282015-2020%29.svg?width=1024',
  alt: 'Google Maps',
  credit: 'Google Maps icon · Wikimedia Commons',
  source: 'https://commons.wikimedia.org/wiki/File:Google_Maps_icon_(2015-2020).svg',
}
const RALF_PHOTO = 'data:image/jpeg;base64,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'
const PARKING_THUMB = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 140'><rect width='200' height='140' rx='20' fill='%230256d6'/><text x='100' y='104' text-anchor='middle' font-size='110' font-family='Arial' font-weight='700' fill='white'>P</text></svg>"
const PARKING_FULL = 'data:image/jpeg;base64,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'

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
          credit: 'Google Maps εικόνα που επέλεξες',
          source: '#',
        },
      },
      {
        id: 'revolution-square',
        type: 'action',
        duration: 30,
        icon: '📍',
        title: 'Revolution Square (Πλατεία Επανάστασης)',
        description: 'Ιστορική πλατεία του Βουκουρεστίου, συνδεδεμένη με τη Ρουμανική Επανάσταση του 1989 και την πτώση του καθεστώτος Τσαουσέσκου.',
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
        description: 'Μία από τις παλαιότερες και πιο εμβληματικές λεωφόρους του Βουκουρεστίου, με ιστορικά μέγαρα, μουσεία και χαρακτηριστική αρχιτεκτονική.',
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
        description: 'Εμβληματικό νεοκλασικό συναυλιακό μέγαρο του 19ου αιώνα και έδρα της Φιλαρμονικής George Enescu, με χαρακτηριστικό κυκλικό θόλο.',
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
        description: 'Giant Schnitzel στο Arcade Cafe, Strada Smârdan 30, στην Παλιά Πόλη.',
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
        photo: GOOGLE_MAPS_PHOTO,
      },
      {
        id: 'thu-ralf-rest',
        type: 'fixed',
        duration: 120,
        icon: '🛏️',
        title: 'Ralf Residence',
        description: 'Ξεκούραση.',
        fixedStart: '2026-11-05T14:00:00+02:00',
        fixedLabel: 'REST',
        timeLabel: '14:00–16:00',
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
        description: 'Εμβληματικό βιβλιοπωλείο στην Παλιά Πόλη, γνωστό για το φωτεινό εξαώροφο εσωτερικό, τα λευκά μπαλκόνια και την εντυπωσιακή αρχιτεκτονική του.',
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
        description: 'Μικρή ορθόδοξη εκκλησία του 1724, χαρακτηριστικό δείγμα του μπρανκοβενέσκ ρυθμού, με περίτεχνα πέτρινα γλυπτά και εσωτερικές τοιχογραφίες.',
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
        description: 'Σκεπαστή στοά του 19ου αιώνα σε σχήμα πετάλου, γνωστή για τη γυάλινη οροφή, τις καμάρες και την ατμόσφαιρα της Belle Époque.',
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
        description: 'Εντυπωσιακό ιστορικό μέγαρο του 1900 στην Calea Victoriei, με γυάλινο και μεταλλικό θόλο και εκλεκτικιστική αρχιτεκτονική γαλλικής επιρροής.',
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
        description: 'Μία από τις μεγαλύτερες πλατείες του Βουκουρεστίου, κομβικό σημείο της πόλης και αφετηρία της μνημειακής Bulevardul Unirii προς το Παλάτι του Κοινοβουλίου.',
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
        photo: GOOGLE_MAPS_PHOTO,
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
          credit: 'Google Maps εικόνα που επέλεξες',
          source: '#',
        },
      },
    ],
  },
]


const OTHER_PHOTOS = {
  pelisor: {
    thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pelisor%20Castle%2C%20Sinaia.jpg?width=480',
    full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pelisor%20Castle%2C%20Sinaia.jpg?width=1600',
    alt: 'Pelișor Castle, Sinaia',
    credit: 'Cristian Bortes · Wikimedia Commons · CC BY 2.0',
    source: 'https://commons.wikimedia.org/wiki/File:Pelisor_Castle,_Sinaia.jpg',
  },
  cantacuzino: {
    thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Busteni%20-%20Cantacuzino%20Castle.jpg?width=480',
    full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Busteni%20-%20Cantacuzino%20Castle.jpg?width=1600',
    alt: 'Cantacuzino Castle, Bușteni',
    credit: 'Tiia Monto · Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Busteni_-_Cantacuzino_Castle.jpg',
  },
  piataSfatului: {
    thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Brasov%20piata%20sfatului.jpg?width=480',
    full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Brasov%20piata%20sfatului.jpg?width=1600',
    alt: 'Piața Sfatului, Brașov',
    credit: 'Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Brasov_piata_sfatului.jpg',
  },
  blackChurch: {
    thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Black%20Church%20Brasov.jpg?width=480',
    full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Black%20Church%20Brasov.jpg?width=1600',
    alt: 'Biserica Neagră, Brașov',
    credit: 'Roland Hagemann · Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Black_Church_Brasov.jpg',
  },
  sforii: {
    thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Strada%20Sforii.jpg?width=480',
    full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Strada%20Sforii.jpg?width=1600',
    alt: 'Strada Sforii, Brașov',
    credit: 'Henri Sivonen · Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Strada_Sforii.jpg',
  },
  schei: {
    thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Schei%20Gate%2C%20Brasov%2C%20Romania%20%285681082603%29.jpg?width=480',
    full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Schei%20Gate%2C%20Brasov%2C%20Romania%20%285681082603%29.jpg?width=1600',
    alt: 'Poarta Șchei, Brașov',
    credit: 'Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Schei_Gate,_Brasov,_Romania_(5681082603).jpg',
  },
  ecaterinei: {
    thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ecaterina%20gate%20of%20Bra%C8%99ov.jpg?width=480',
    full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Ecaterina%20gate%20of%20Bra%C8%99ov.jpg?width=1600',
    alt: 'Poarta Ecaterinei, Brașov',
    credit: 'Yair-haklai · Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Ecaterina_gate_of_Bra%C8%99ov.jpg',
  },
  republicii: {
    thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Republicii%20Street%20BrasovRo.jpg?width=480',
    full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Republicii%20Street%20BrasovRo.jpg?width=1600',
    alt: 'Strada Republicii, Brașov',
    credit: 'Itineris55 · Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Republicii_Street_BrasovRo.jpg',
  },
  bran: {
    thumb: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Bran%20Castle%20%28Dracula%27s%20Castle%29.jpg?width=480',
    full: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Bran%20Castle%20%28Dracula%27s%20Castle%29.jpg?width=1600',
    alt: 'Bran Castle',
    credit: 'Cristian Bortes · Wikimedia Commons',
    source: 'https://commons.wikimedia.org/wiki/File:Bran_Castle_(Dracula%27s_Castle).jpg',
  },
  laCeaun: {
    thumb: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/d3/2e/04/sweet-summer-nights.jpg?h=500&s=1&w=900',
    full: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/d3/2e/04/sweet-summer-nights.jpg?h=500&s=1&w=900',
    alt: 'La Ceaun – Brașov',
    credit: 'Tripadvisor · Sweet summer nights',
    source: 'https://www.tripadvisor.com/Restaurant_Review-g295394-d5894848-Reviews-La_Ceaun_Weiss-Brasov_Brasov_County_Central_Romania_Transylvania.html',
  },
  heritage: {
    thumb: 'https://images.squarespace-cdn.com/content/v1/5ae1a85b5ffd205aac4dc3d3/1524833685699-FLW7J972CVAIWFM6L0DU/cladire%2Bresidence%2Bhirscher.jpg',
    full: 'https://images.squarespace-cdn.com/content/v1/5ae1a85b5ffd205aac4dc3d3/1524833685699-FLW7J972CVAIWFM6L0DU/cladire%2Bresidence%2Bhirscher.jpg',
    alt: 'Heritage Loft 1735, Brașov',
    credit: 'Residence Hirscher · φωτογραφία κτιρίου',
    source: 'https://gabriel-mitache-br5w.squarespace.com/',
  },
  libearty: {
    thumb: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmillionsoffriends.org%2Flibearty%2Fviziteaza-sanctuarul%2F?w=520',
    full: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmillionsoffriends.org%2Flibearty%2Fviziteaza-sanctuarul%2F?w=1400',
    alt: 'Libearty Bear Sanctuary, Zărnești',
    credit: 'Libearty · επίσημη ιστοσελίδα',
    source: 'https://millionsoffriends.org/libearty/viziteaza-sanctuarul/',
  },
  micoteca: {
    thumb: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmicoteca.ro%2F?w=520',
    full: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmicoteca.ro%2F?w=1400',
    alt: 'Micoteca – Herăstrău',
    credit: 'Micoteca · επίσημη ιστοσελίδα',
    source: 'https://micoteca.ro/',
  },
  daResidence: {
    thumb: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.booking.com%2Fhotel%2Fro%2Fda-residence-otopeni1.en-gb.html?w=520',
    full: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.booking.com%2Fhotel%2Fro%2Fda-residence-otopeni1.en-gb.html?w=1400',
    alt: 'DA Residence, Otopeni',
    credit: 'Booking.com · σελίδα καταλύματος',
    source: 'https://www.booking.com/hotel/ro/da-residence-otopeni1.en-gb.html',
  },
  greenMotion: {
    thumb: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fgreenmotion.com%2Flocations%2Fromania%2Fbucharest-airport?w=520',
    full: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fgreenmotion.com%2Flocations%2Fromania%2Fbucharest-airport?w=1400',
    alt: 'Green Motion Bucharest Airport',
    credit: 'Green Motion · επίσημη ιστοσελίδα',
    source: 'https://greenmotion.com/locations/romania/bucharest-airport',
  },
  airport: {
    thumb: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fbucharestairports.ro%2Fen%2F?w=520',
    full: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fbucharestairports.ro%2Fen%2F?w=1400',
    alt: 'Henri Coandă International Airport',
    credit: 'Bucharest Airports · επίσημη ιστοσελίδα',
    source: 'https://bucharestairports.ro/en/',
  },
  coffee: {
    thumb: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><rect width='800' height='500' rx='40' fill='%237c2d12'/><text x='400' y='250' text-anchor='middle' dominant-baseline='middle' font-size='190'>☕</text><text x='400' y='420' text-anchor='middle' font-family='Arial' font-size='48' font-weight='700' fill='white'>Γλυκό / καφές</text></svg>",
    full: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><rect width='800' height='500' rx='40' fill='%237c2d12'/><text x='400' y='250' text-anchor='middle' dominant-baseline='middle' font-size='190'>☕</text><text x='400' y='420' text-anchor='middle' font-family='Arial' font-size='48' font-weight='700' fill='white'>Γλυκό / καφές</text></svg>",
    alt: 'Γλυκό / καφές',
    credit: 'Romania Trip',
    source: '#',
  },
  flight: {
    thumb: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><rect width='800' height='500' rx='40' fill='%231d4ed8'/><text x='400' y='250' text-anchor='middle' dominant-baseline='middle' font-size='190'>✈️</text><text x='400' y='420' text-anchor='middle' font-family='Arial' font-size='48' font-weight='700' fill='white'>OTP · 10:15</text></svg>",
    full: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'><rect width='800' height='500' rx='40' fill='%231d4ed8'/><text x='400' y='250' text-anchor='middle' dominant-baseline='middle' font-size='190'>✈️</text><text x='400' y='420' text-anchor='middle' font-family='Arial' font-size='48' font-weight='700' fill='white'>OTP · 10:15</text></svg>",
    alt: 'Πτήση επιστροφής 10:15',
    credit: 'Romania Trip',
    source: '#',
  },
}

const fridayBlocks = [
  {
    id: 'fri-morning',
    title: 'Μπλοκ 1 · Interparking → Sinaia → Bușteni → Brașov',
    startLabel: '🏨 ΦΕΥΓΟΥΜΕ ΑΠΟ ΤΟ RALF — START',
    plannedStart: '2026-11-06T08:30:00+02:00',
    startHint: 'Πατάμε START το πρωί όταν φύγουμε από το Ralf. Παίρνουμε το αυτοκίνητο από το Interparking και η πρώτη οδική διαδρομή ξεκινά από εκεί.',
    activities: [
      {
        id: 'fri-interparking-pelisor',
        type: 'route',
        duration: 150,
        icon: '🚗',
        title: 'Interparking Piața Universității → Pelișor Castle',
        description: 'Παίρνουμε το αυτοκίνητο από το Interparking Piața Universității και οδηγούμε προς Sinaia με τελικό προορισμό το Pelișor Castle (Κάστρο Πέλισορ).',
        destination: 'Pelisor Castle Sinaia Romania',
        mode: 'driving',
        photo: GOOGLE_MAPS_PHOTO,
      },
      {
        id: 'fri-pelisor',
        type: 'action',
        duration: 75,
        icon: '🏰',
        title: 'Pelișor Castle (Κάστρο Πέλισορ)',
        description: 'Μικρότερο βασιλικό ανάκτορο του συγκροτήματος Peleș, χτισμένο το 1899–1902 για τον Φερδινάνδο και τη Μαρία, με έντονα στοιχεία Art Nouveau.',
        photo: OTHER_PHOTOS.pelisor,
      },
      {
        id: 'fri-pelisor-cantacuzino',
        type: 'route',
        duration: 30,
        icon: '🚗',
        title: 'Pelișor → Cantacuzino Castle',
        description: 'Οδήγηση Sinaia → Bușteni με τελικο προορισμό το Cantacuzino Castle',
        destination: 'Cantacuzino Castle Busteni Romania',
        mode: 'driving',
        photo: GOOGLE_MAPS_PHOTO,
      },
      {
        id: 'fri-cantacuzino',
        type: 'action',
        duration: 60,
        icon: '🏰',
        title: 'Cantacuzino Castle (Κάστρο Καντακουζίνο)',
        description: 'Αρχοντικό του 1911 σε νεορουμανικό ύφος, χτισμένο για τον πρίγκιπα Gheorghe Grigore Cantacuzino, με πανοραμική θέα στα όρη Bucegi.',
        photo: OTHER_PHOTOS.cantacuzino,
      },
      {
        id: 'fri-cantacuzino-la-ceaun',
        type: 'route',
        duration: 60,
        icon: '🚗',
        title: 'Cantacuzino Castle → Ograda',
        description: 'Κατευθείαν για Ograda – Piața Sfatului στο Brașov.',
        destination: 'Ograda Piata Sfatului 14 Brasov',
        mode: 'driving',
        photo: GOOGLE_MAPS_PHOTO,
      },
      {
        id: 'fri-la-ceaun',
        type: 'action',
        duration: 45,
        icon: '🍲',
        title: 'Ograda (Slow-Cooked Beef Cheeks ή Goulash with Beef Cheeks, Cooked in Cauldron)',
        description: 'Γεύμα στο Ograda – Piața Sfatului 14.',
        photo: {
          thumb: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fograda.com%2Fro%2Freservation?w=520',
          full: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fograda.com%2Fro%2Freservation?w=1400',
          alt: 'Ograda – Brașov',
          credit: 'Ograda · Piața Sfatului 14',
          source: 'https://ograda.com/ro/reservation',
        },
      },
      {
        id: 'fri-to-heritage',
        type: 'route',
        duration: 15,
        icon: '🏨',
        title: 'Ograda → Heritage Loft 1735',
        description: 'Str Gheorghe Bariţiu nr 26. Δωρεάν ιδιωτικό parking στο κατάλυμα.',
        destination: 'Heritage Loft 1735 Brasov',
        mode: 'driving',
        photo: GOOGLE_MAPS_PHOTO,
      },
      {
        id: 'fri-heritage-checkin-rest',
        type: 'fixed',
        duration: 120,
        icon: '🛏️',
        title: 'Heritage Loft 1735 / check-in',
        description: 'Επίσημο check-in: 14:00–22:00. 14:00–16:00 για ξεκούραση.',
        fixedStart: '2026-11-06T14:00:00+02:00',
        fixedLabel: '14:00–16:00',
        photo: OTHER_PHOTOS.heritage,
      },

    ],
  },
  {
    id: 'fri-afternoon',
    title: 'Μπλοκ 2 · Brașov με τα πόδια',
    startLabel: '🏨 ΦΕΥΓΟΥΜΕ ΑΠΟ ΤΟ HERITAGE — START',
    plannedStart: '2026-11-06T16:00:00+02:00',
    startHint: 'Νέο START όταν φύγουμε από το Heritage. Από εδώ και μετά όλα γίνονται με τα πόδια.',
    activities: [
      {
        id: 'fri-piata-sfatului',
        type: 'action',
        duration: 20,
        icon: '📍',
        title: 'Piața Sfatului (Πλατεία Συμβουλίου)',
        description: 'Η ιστορική κεντρική πλατεία του Brașov, περιτριγυρισμένη από πολύχρωμα κτίρια και με το παλιό Δημαρχείο στο κέντρο.',
        destination: 'Piata Sfatului Brasov Romania',
        mode: 'walking',
        photo: OTHER_PHOTOS.piataSfatului,
      },
      {
        id: 'fri-black-church',
        type: 'action',
        duration: 30,
        icon: '⛪',
        title: 'Biserica Neagră / Black Church (Μαύρη Εκκλησία)',
        description: 'Η μεγαλύτερη γοτθική εκκλησία της Ρουμανίας, εμβληματικό μνημείο του Brașov, γνωστό για το επιβλητικό εσωτερικό και το μεγάλο εκκλησιαστικό όργανο.',
        destination: 'Black Church Brasov Romania',
        mode: 'walking',
        photo: OTHER_PHOTOS.blackChurch,
      },
      {
        id: 'fri-sforii',
        type: 'action',
        duration: 20,
        icon: '🧵',
        title: 'Strada Sforii (Οδός του Σχοινιού)',
        description: 'Μία από τις στενότερες ιστορικές οδούς της Ευρώπης, δημιουργημένη αρχικά ως διάδρομος πρόσβασης για τους πυροσβέστες του μεσαιωνικού Brașov.',
        destination: 'Strada Sforii Brasov Romania',
        mode: 'walking',
        photo: OTHER_PHOTOS.sforii,
      },
      {
        id: 'fri-schei',
        type: 'action',
        duration: 20,
        icon: '🏛️',
        title: 'Poarta Șchei (Πύλη Σκέι)',
        description: 'Νεοκλασική πύλη του 1827–1828 που συνέδεσε πιο άνετα την οχυρωμένη πόλη με τη συνοικία Șchei, σε μορφή θριαμβικής αψίδας.',
        destination: 'Schei Gate Brasov Romania',
        mode: 'walking',
        photo: OTHER_PHOTOS.schei,
      },
      {
        id: 'fri-ecaterinei',
        type: 'action',
        duration: 20,
        icon: '🏰',
        title: 'Poarta Ecaterinei / Catherine’s Gate (Πύλη Αικατερίνης)',
        description: 'Μεσαιωνική πύλη του 1559 με τέσσερις μικρούς πυργίσκους, από τα πιο χαρακτηριστικά σωζόμενα τμήματα των παλιών οχυρώσεων του Brașov.',
        destination: "Catherine's Gate Brasov Romania",
        mode: 'walking',
        photo: OTHER_PHOTOS.ecaterinei,
      },
      {
        id: 'fri-republicii',
        type: 'action',
        duration: 40,
        icon: '🚶',
        title: 'Strada Republicii (Οδός Δημοκρατίας)',
        description: 'Ο κεντρικός πεζόδρομος του ιστορικού Brașov, με πολύχρωμα κτίρια, καφέ και καταστήματα μέσα στον πυρήνα της παλιάς πόλης.',
        destination: 'Strada Republicii Brasov Romania',
        mode: 'walking',
        photo: OTHER_PHOTOS.republicii,
      },
      {
        id: 'fri-return-piata',
        type: 'action',
        duration: 30,
        icon: '📍',
        title: 'Επιστροφή στην Piața Sfatului',
        description: 'Ολοκληρώνουμε τον κύκλο της παλιάς πόλης.',
        destination: 'Piata Sfatului Brasov Romania',
        mode: 'walking',
        photo: OTHER_PHOTOS.piataSfatului,
      },
      {
        id: 'fri-dessert',
        type: 'action',
        duration: 60,
        icon: '☕',
        title: 'Γλυκό + καφές σε εσωτερικό χώρο',
        description: 'Επιλογή επιτόπου στην Παλιά Πόλη. Δεν κλειδώνουμε ακόμη συγκεκριμένο μαγαζί.',
        photo: OTHER_PHOTOS.coffee,
      },
      {
        id: 'fri-back-heritage',
        type: 'route',
        duration: 10,
        icon: '🏨',
        title: 'Επιστροφή στο Heritage Loft 1735',
        description: 'Με τα πόδια πίσω στο κατάλυμα.',
        destination: 'Heritage Loft 1735 Brasov',
        mode: 'walking',
        photo: GOOGLE_MAPS_PHOTO,
      },
      {
        id: 'fri-heritage-night',
        type: 'fixed',
        duration: 720,
        icon: '🛏️',
        title: 'Heritage Loft 1735',
        description: 'Ξεκούραση.',
        fixedStart: '2026-11-06T20:00:00+02:00',
        fixedLabel: '20:00–πρωί',
        photo: OTHER_PHOTOS.heritage,
      },

    ],
  },
]

const saturdayBlocks = [
  {
    id: 'sat-day',
    title: 'Μπλοκ ημέρας · Brașov → Zărnești → Bran → Bucharest → Otopeni',
    startLabel: '🏨 ΦΕΥΓΟΥΜΕ ΑΠΟ ΤΟ HERITAGE — START',
    plannedStart: '2026-11-07T08:30:00+02:00',
    startHint: 'START όταν έχουμε κάνει checkout, οι βαλίτσες είναι στο αυτοκίνητο και ξεκινάμε.',
    activities: [
      {
        id: 'sat-heritage-libearty',
        type: 'route',
        duration: 60,
        icon: '🚗',
        title: 'Heritage Loft 1735 → Libearty Bear Sanctuary',
        description: 'Brașov → Zărnești με περιθώριο για άφιξη. Η ακριβής ώρα του tour δεν έχει κλειδωθεί ακόμα.',
        destination: 'Libearty Bear Sanctuary Zarnesti Romania',
        mode: 'driving',
        photo: GOOGLE_MAPS_PHOTO,
      },
      {
        id: 'sat-libearty',
        type: 'action',
        duration: 90,
        icon: '🐻',
        title: 'Libearty Bear Sanctuary (Καταφύγιο αρκούδων)',
        description: 'Καταφύγιο κοντά στο Zărnești που φιλοξενεί διασωθείσες καφέ αρκούδες σε μεγάλες δασωμένες εκτάσεις, με επισκέψεις μόνο μέσω οργανωμένων ξεναγήσεων.',
        photo: OTHER_PHOTOS.libearty,
      },
      {
        id: 'sat-libearty-bran',
        type: 'route',
        duration: 45,
        icon: '🚗',
        title: 'Libearty → Bran Castle',
        description: 'Οδήγηση Zărnești → Bran Castle',
        destination: 'Bran Castle Romania',
        mode: 'driving',
        photo: GOOGLE_MAPS_PHOTO,
      },
      {
        id: 'sat-bran',
        type: 'action',
        duration: 75,
        icon: '🏰',
        title: 'Bran Castle (Κάστρο Μπραν)',
        description: 'Μεσαιωνικό κάστρο του 14ου αιώνα σε στρατηγικό πέρασμα των Καρπαθίων, γνωστό παγκοσμίως για τη σύνδεσή του με τον θρύλο του Dracula.',
        photo: OTHER_PHOTOS.bran,
      },
      {
        id: 'sat-bran-bucharest',
        type: 'route',
        duration: 240,
        icon: '🚗',
        title: 'Bran → Bucharest (φαγητό Micoteca – Mici)',
        description: 'Επιστροφή στο Βουκουρέστι (Μεγάλη διαδρομή).',
        destination: 'Micoteca Aleea Michael Jackson 1 Bucharest',
        mode: 'driving',
        photo: GOOGLE_MAPS_PHOTO,
      },
      {
        id: 'sat-micoteca',
        type: 'action',
        duration: 60,
        icon: '🍽️',
        title: 'Micoteca – Mici',
        description: 'Τα Mici είναι παραδοσιακά ρουμανικά μικρά ρολά κιμά χωρίς έντερο, ψημένα στα κάρβουνα και συνήθως σερβιρισμένα με μουστάρδα. Διεύθυνση: Intrarea Arcul de Triumf, Parcul Herăstrău, Aleea Michael Jackson 1, 011453 București.',
        photo: OTHER_PHOTOS.micoteca,
      },
      {
        id: 'sat-micoteca-da',
        type: 'route',
        duration: 60,
        icon: '🚗',
        title: 'Micoteca → DA Residence, Otopeni',
        description: 'Οδήγηση προς 8 Strada 9 Mai, Otopeni. Δωρεάν ιδιωτικό parking στο κατάλυμα.',
        destination: 'DA Residence 8 Strada 9 Mai Otopeni Romania',
        mode: 'driving',
        photo: GOOGLE_MAPS_PHOTO,
      },
      {
        id: 'sat-da-residence-night',
        type: 'fixed',
        duration: 720,
        icon: '🛏️',
        title: 'DA Residence',
        description: 'Ξεκούραση.',
        fixedStart: '2026-11-07T19:00:00+02:00',
        fixedLabel: '19:00–πρωί',
        photo: OTHER_PHOTOS.daResidence,
      },

    ],
  },
]

const sundayBlocks = [
  {
    id: 'sun-return',
    title: 'Μπλοκ επιστροφής · DA Residence → Green Motion → πτήση',
    startLabel: '🏨 ΦΕΥΓΟΥΜΕ ΑΠΟ DA RESIDENCE — START',
    plannedStart: '2026-11-08T07:20:00+02:00',
    startHint: 'START μόλις φύγουμε πραγματικά από το DA Residence με όλες τις αποσκευές.',
    activities: [
      {
        id: 'sun-da-greenmotion',
        type: 'route',
        duration: 20,
        icon: '🚗',
        title: 'DA Residence → Green Motion (Επιστροφή αυτοκινήτου στις 08:00)',
        description: 'Πηγαίνουμε στο Str. Ferme B nr.1, Otopeni για την επιστροφή του αυτοκινήτου.',
        deadlineAt: '2026-11-08T08:00:00+02:00',
        deadlineLabel: 'Επιστροφή αυτοκινήτου · 08:00',
        destination: 'Green Motion Bucharest Airport Strada Ferme B 1 Otopeni',
        mode: 'driving',
        photo: GOOGLE_MAPS_PHOTO,
      },
      {
        id: 'sun-flight',
        type: 'fixed',
        duration: 1,
        icon: '✈️',
        title: 'Πτήση επιστροφής',
        description: 'Τελικό σταθερό deadline του ταξιδιού.',
        fixedStart: '2026-11-08T10:15:00+02:00',
        fixedLabel: 'ΣΤΑΘΕΡΟ · 10:15',
        photo: OTHER_PHOTOS.flight,
      },
    ],
  },
]

const blocksByDay = {
  thu: thursdayBlocks,
  fri: fridayBlocks,
  sat: saturdayBlocks,
  sun: sundayBlocks,
}

const prestartByDay = {
  thu: {
    title: '09:20 άφιξη OTP → Green Motion → παραλαβή αυτοκινήτου',
    text: 'Το live πρόγραμμα αρχίζει μόνο όταν ολοκληρωθεί πραγματικά η παραλαβή του αυτοκινήτου.',
  },
  fri: {
    title: 'Πρωινό / checkout Ralf → Interparking Piața Universității',
    text: 'Πατάμε START όταν φύγουμε πραγματικά από το Ralf. Πηγαίνουμε στο Interparking, παίρνουμε το αυτοκίνητο και η πρώτη οδική διαδρομή ξεκινά από εκεί.',
  },
  sat: {
    title: 'Checkout Heritage · βαλίτσες στο αυτοκίνητο',
    text: 'Πατάμε START μόνο όταν έχουμε ολοκληρώσει το checkout και είμαστε έτοιμοι να φύγουμε.',
  },
  sun: {
    title: 'Πολύ πρωινή αναχώρηση από DA Residence',
    text: 'Στόχος START περίπου 07:20 ώστε η επιστροφή Green Motion να ολοκληρωθεί στις 08:00.',
  },
}

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
  const schedule = getSchedule(block, state)
  const currentIndex = getCurrentIndex(schedule)

  const candidates = schedule
    .map((item, index) => {
      if (index < currentIndex || item.completedAt) return null
      if (item.deadlineAt) {
        return {
          item,
          index,
          anchor: new Date(item.deadlineAt),
          label: item.deadlineLabel || item.title,
          deadlineOnItem: true,
        }
      }
      if (item.type === 'fixed') {
        return {
          item,
          index,
          anchor: new Date(item.fixedStart),
          label: item.title,
          deadlineOnItem: false,
        }
      }
      return null
    })
    .filter(Boolean)
    .sort((a, b) => a.anchor - b.anchor)

  const next = candidates[0]
  if (!next) return null

  const before = next.deadlineOnItem
    ? schedule.slice(currentIndex, next.index + 1)
    : schedule.slice(currentIndex, next.index)

  const lastBefore = before[before.length - 1]
  const projectedArrival = lastBefore?.completedAt || lastBefore?.estimatedEnd || new Date()
  const diff = Math.round((next.anchor - projectedArrival) / 60000)

  return {
    anchor: next.anchor,
    fixed: next.item,
    label: next.label,
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
          <span>⚓ Επόμενο σταθερό deadline</span>
          <strong>{anchorInfo.label} · {fmtClock(anchorInfo.anchor)}</strong>
          <small>
            Προβλεπόμενη ολοκλήρωση πριν το deadline: {fmtClock(anchorInfo.projectedArrival)}
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
                        ? (item.timeLabel || fmtClock(item.fixedStart))
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
  const [eurRon, setEurRon] = useState(EUR_RON_FALLBACK)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let active = true

    fetch('https://api.frankfurter.app/latest?from=EUR&to=RON')
      .then((response) => {
        if (!response.ok) throw new Error('FX request failed')
        return response.json()
      })
      .then((data) => {
        const rate = Number(data?.rates?.RON)
        if (active && Number.isFinite(rate)) setEurRon(rate)
      })
      .catch(() => {
        // Keep the last known fallback rate if the live request is unavailable.
      })

    return () => {
      active = false
    }
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
          <div className="fx-rate">
            <span>Ισοτιμία</span>
            <strong>1€ = {eurRon.toFixed(2)} RON</strong>
          </div>
          <div className="clock-divider" />
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

      <>
        <section className="prestart-card">
          <div>
            <span>ΠΡΙΝ ΤΟ START</span>
            <strong>{prestartByDay[activeDay].title}</strong>
            <p>{prestartByDay[activeDay].text}</p>
          </div>
        </section>

        {(blocksByDay[activeDay] || []).map((block) => (
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
          <strong>Πώς δουλεύει</strong>
          <p>
            START μόνο στην αρχή κάθε μπλοκ. Μετά χρησιμοποιούμε END. Η πραγματική ώρα END γίνεται η βάση
            για την επόμενη δραστηριότητα. Όπου η επόμενη στάση είναι αλλού, το END ανοίγει και Google Maps.
            Τα σταθερά deadlines δεν μετακινούνται.
          </p>
        </section>
      </>

      {selectedPhoto && (
        <div className="photo-modal" role="dialog" aria-modal="true" aria-label={selectedPhoto.alt} onClick={() => setSelectedPhoto(null)}>
          <div className="photo-modal-card" onClick={(event) => event.stopPropagation()}>
            <button className="photo-close" onClick={() => setSelectedPhoto(null)} aria-label="Κλείσιμο">×</button>
            <img src={selectedPhoto.full} alt={selectedPhoto.alt} />
            <div className="photo-caption">
              <strong>{selectedPhoto.alt}</strong>
              {selectedPhoto.source && selectedPhoto.source !== '#' ? (
                <a href={selectedPhoto.source} target="_blank" rel="noreferrer">{selectedPhoto.credit}</a>
              ) : (
                <span>{selectedPhoto.credit}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
