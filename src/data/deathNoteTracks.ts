export interface DeathNoteTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  cover: string;
  edition: 'OST 1' | 'OST 2';
  trackNumber: string;
  tag: 'L' | 'KIRA' | 'MISA' | 'DN' | 'OP' | 'ED';
  duration: string;
  url: string;
  fallbackUrl?: string;
  isPrimary?: boolean;
}

const TRACKS: Omit<DeathNoteTrack, 'artwork' | 'cover'>[] = [
  {
    "id": "ost1-04-l-theme",
    "title": "L's Theme",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "04",
    "tag": "L",
    "duration": "03:04",
    "url": "/audio/l-theme.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/04%20L%E3%81%AE%E3%83%86%E3%83%BC%E3%83%9E.mp3",
    "isPrimary": true
  },
  {
    "id": "ost1-11-l-theme-b",
    "title": "L's Theme B",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "11",
    "tag": "L",
    "duration": "02:54",
    "url": "/audio/l-theme-b.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/11%20L%E3%81%AE%E3%83%86%E3%83%BC%E3%83%9EB.mp3"
  },
  {
    "id": "ost1-03-light-theme",
    "title": "Light's Theme",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "03",
    "tag": "KIRA",
    "duration": "03:24",
    "url": "/audio/light-theme.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/03%20%E3%83%A9%E3%82%A4%E3%83%88%E3%81%AE%E3%83%86%E3%83%BC%E3%83%9E.mp3"
  },
  {
    "id": "ost1-23-low-of-solipsism",
    "title": "Low of Solipsism",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "23",
    "tag": "KIRA",
    "duration": "02:24",
    "url": "/audio/low-of-solipsism.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/23%20Low%20of%20Solipsism.mp3"
  },
  {
    "id": "ost1-01-death-note",
    "title": "Death Note",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "01",
    "tag": "DN",
    "duration": "03:10",
    "url": "https://archive.org/download/05_20240928_20240928_1951/01%20Death%20Note.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/01%20Death%20Note.mp3"
  },
  {
    "id": "ost1-29-the-world",
    "title": "The WORLD (TV Size)",
    "artist": "Nightmare",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "29",
    "tag": "OP",
    "duration": "01:23",
    "url": "https://archive.org/download/05_20240928_20240928_1951/29%20the%20World%20-TV%20size-.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/29%20the%20World%20-TV%20size-.mp3"
  },
  {
    "id": "ost1-30-alumina",
    "title": "Alumina (TV Size)",
    "artist": "Nightmare",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "30",
    "tag": "ED",
    "duration": "01:13",
    "url": "https://archive.org/download/05_20240928_20240928_1951/30%20%E3%82%A2%E3%83%AB%E3%83%9F%E3%83%8A%20-TV%20size-.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/30%20%E3%82%A2%E3%83%AB%E3%83%9F%E3%83%8A%20-TV%20size-.mp3"
  },
  {
    "id": "ost1-02",
    "title": "Incident (Jiken)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "02",
    "tag": "DN",
    "duration": "02:49",
    "url": "https://archive.org/download/05_20240928_20240928_1951/02%20%E4%BA%8B%E4%BB%B6.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/02%20%E4%BA%8B%E4%BB%B6.mp3"
  },
  {
    "id": "ost1-05",
    "title": "Tension (Kinchou)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "05",
    "tag": "DN",
    "duration": "03:53",
    "url": "https://archive.org/download/05_20240928_20240928_1951/05%20%E7%B7%8A%E5%BC%B5.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/05%20%E7%B7%8A%E5%BC%B5.mp3"
  },
  {
    "id": "ost1-06",
    "title": "Shiver (Senritsu)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "06",
    "tag": "DN",
    "duration": "03:04",
    "url": "https://archive.org/download/05_20240928_20240928_1951/06%20%E6%88%A6%E6%85%84.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/06%20%E6%88%A6%E6%85%84.mp3"
  },
  {
    "id": "ost1-07",
    "title": "Solitude (Kodoku)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "07",
    "tag": "DN",
    "duration": "03:18",
    "url": "https://archive.org/download/05_20240928_20240928_1951/07%20%E5%AD%A4%E7%8B%AC.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/07%20%E5%AD%A4%E7%8B%AC.mp3"
  },
  {
    "id": "ost1-08",
    "title": "Resonance (Kyoumei)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "08",
    "tag": "DN",
    "duration": "03:35",
    "url": "https://archive.org/download/05_20240928_20240928_1951/08%20%E5%85%B1%E9%B3%B4.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/08%20%E5%85%B1%E9%B3%B4.mp3"
  },
  {
    "id": "ost1-09",
    "title": "Anticipation (Kitai)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "09",
    "tag": "DN",
    "duration": "03:00",
    "url": "https://archive.org/download/05_20240928_20240928_1951/09%20%E6%9C%9F%E5%BE%85.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/09%20%E6%9C%9F%E5%BE%85.mp3"
  },
  {
    "id": "ost1-10",
    "title": "Kira Special Investigation Team",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "10",
    "tag": "KIRA",
    "duration": "02:08",
    "url": "https://archive.org/download/05_20240928_20240928_1951/10%20%E7%89%B9%E6%8D%9C%E3%82%AD%E3%83%A9%E7%8F%AD.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/10%20%E7%89%B9%E6%8D%9C%E3%82%AD%E3%83%A9%E7%8F%AD.mp3"
  },
  {
    "id": "ost1-12",
    "title": "Hesitation (Shunjun)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "12",
    "tag": "DN",
    "duration": "03:33",
    "url": "https://archive.org/download/05_20240928_20240928_1951/12%20%E9%80%A1%E5%B7%A1.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/12%20%E9%80%A1%E5%B7%A1.mp3"
  },
  {
    "id": "ost1-13",
    "title": "Pursuit (Tsuiseki)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "13",
    "tag": "DN",
    "duration": "02:56",
    "url": "https://archive.org/download/05_20240928_20240928_1951/13%20%E8%BF%BD%E8%B7%A1.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/13%20%E8%BF%BD%E8%B7%A1.mp3"
  },
  {
    "id": "ost1-14",
    "title": "L's Companions",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "14",
    "tag": "L",
    "duration": "02:29",
    "url": "https://archive.org/download/05_20240928_20240928_1951/14%20L%E3%81%AE%E4%BB%B2%E9%96%93.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/14%20L%E3%81%AE%E4%BB%B2%E9%96%93.mp3"
  },
  {
    "id": "ost1-15",
    "title": "Special Investigation (Tokusou)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "15",
    "tag": "DN",
    "duration": "03:06",
    "url": "https://archive.org/download/05_20240928_20240928_1951/15%20%E7%89%B9%E6%8D%9C.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/15%20%E7%89%B9%E6%8D%9C.mp3"
  },
  {
    "id": "ost1-16",
    "title": "Shinigami Realm",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "16",
    "tag": "DN",
    "duration": "03:26",
    "url": "https://archive.org/download/05_20240928_20240928_1951/16%20%E6%AD%BB%E7%A5%9E%E7%95%8C.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/16%20%E6%AD%BB%E7%A5%9E%E7%95%8C.mp3"
  },
  {
    "id": "ost1-17",
    "title": "Boredom (Taikutsu)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "17",
    "tag": "DN",
    "duration": "02:07",
    "url": "https://archive.org/download/05_20240928_20240928_1951/17%20%E9%80%80%E5%B1%88.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/17%20%E9%80%80%E5%B1%88.mp3"
  },
  {
    "id": "ost1-18",
    "title": "Rem",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "18",
    "tag": "DN",
    "duration": "02:07",
    "url": "https://archive.org/download/05_20240928_20240928_1951/18%20%E3%83%AC%E3%83%A0.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/18%20%E3%83%AC%E3%83%A0.mp3"
  },
  {
    "id": "ost1-19",
    "title": "Death Note Theme",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "19",
    "tag": "DN",
    "duration": "02:24",
    "url": "https://archive.org/download/05_20240928_20240928_1951/19%20Death%20Note%20Theme.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/19%20Death%20Note%20Theme.mp3"
  },
  {
    "id": "ost1-20",
    "title": "Kyrie",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "20",
    "tag": "DN",
    "duration": "01:23",
    "url": "https://archive.org/download/05_20240928_20240928_1951/20%20Kyrie.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/20%20Kyrie.mp3"
  },
  {
    "id": "ost1-21",
    "title": "Domine Kira",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "21",
    "tag": "KIRA",
    "duration": "02:15",
    "url": "https://archive.org/download/05_20240928_20240928_1951/21%20Domine%20Kira.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/21%20Domine%20Kira.mp3"
  },
  {
    "id": "ost1-22",
    "title": "Teleology of Death",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "22",
    "tag": "DN",
    "duration": "01:04",
    "url": "https://archive.org/download/05_20240928_20240928_1951/22%20Teleology%20of%20Death.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/22%20Teleology%20of%20Death.mp3"
  },
  {
    "id": "ost1-24",
    "title": "Requiem",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "24",
    "tag": "DN",
    "duration": "01:20",
    "url": "https://archive.org/download/05_20240928_20240928_1951/24%20Requiem.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/24%20Requiem.mp3"
  },
  {
    "id": "ost1-25",
    "title": "Immanence",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "25",
    "tag": "DN",
    "duration": "01:14",
    "url": "https://archive.org/download/05_20240928_20240928_1951/25%20Immanence.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/25%20Immanence.mp3"
  },
  {
    "id": "ost1-26",
    "title": "Dirge",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "26",
    "tag": "DN",
    "duration": "01:27",
    "url": "https://archive.org/download/05_20240928_20240928_1951/26%20Dirge.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/26%20Dirge.mp3"
  },
  {
    "id": "ost1-27",
    "title": "Light Lights up Light",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "27",
    "tag": "KIRA",
    "duration": "02:01",
    "url": "https://archive.org/download/05_20240928_20240928_1951/27%20Light%20Lights%20up%20Light.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/27%20Light%20Lights%20up%20Light.mp3"
  },
  {
    "id": "ost1-28",
    "title": "Alert",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack",
    "edition": "OST 1",
    "trackNumber": "28",
    "tag": "DN",
    "duration": "00:50",
    "url": "https://archive.org/download/05_20240928_20240928_1951/28%20Alert.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_1951/28%20Alert.mp3"
  },
  {
    "id": "ost2-01",
    "title": "Kyrie II",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "01",
    "tag": "DN",
    "duration": "02:21",
    "url": "https://archive.org/download/05_20240928_20240928_2002/01%20Kyrie%20II.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/01%20Kyrie%20II.mp3"
  },
  {
    "id": "ost2-02",
    "title": "Semblance of Dualism",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "02",
    "tag": "DN",
    "duration": "01:35",
    "url": "https://archive.org/download/05_20240928_20240928_2002/02%20Semblance%20of%20Dualism.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/02%20Semblance%20of%20Dualism.mp3"
  },
  {
    "id": "ost2-03",
    "title": "Low of Solipsism II",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "03",
    "tag": "KIRA",
    "duration": "01:42",
    "url": "https://archive.org/download/05_20240928_20240928_2002/03%20Low%20of%20Solipsism%20II.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/03%20Low%20of%20Solipsism%20II.mp3"
  },
  {
    "id": "ost2-04",
    "title": "Death Note Theme (Inst.)",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "04",
    "tag": "DN",
    "duration": "00:45",
    "url": "https://archive.org/download/05_20240928_20240928_2002/04%20Death%20Note%20Theme%20%EF%BD%9Einstrumental%EF%BD%9E.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/04%20Death%20Note%20Theme%20%EF%BD%9Einstrumental%EF%BD%9E.mp3"
  },
  {
    "id": "ost2-05",
    "title": "Tactics of the Absolute",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "05",
    "tag": "DN",
    "duration": "00:50",
    "url": "https://archive.org/download/05_20240928_20240928_2002/05%20Tactics%20of%20the%20Absolute.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/05%20Tactics%20of%20the%20Absolute.mp3"
  },
  {
    "id": "ost2-06",
    "title": "Kyrie for Orchestra",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "06",
    "tag": "DN",
    "duration": "01:19",
    "url": "https://archive.org/download/05_20240928_20240928_2002/06%20Kyrie%20for%20orchestra.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/06%20Kyrie%20for%20orchestra.mp3"
  },
  {
    "id": "ost2-07",
    "title": "Air",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "07",
    "tag": "DN",
    "duration": "01:59",
    "url": "https://archive.org/download/05_20240928_20240928_2002/07%20Air.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/07%20Air.mp3"
  },
  {
    "id": "ost2-08",
    "title": "Light Lights up Light for Piano",
    "artist": "Yoshihisa Hirano",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "08",
    "tag": "KIRA",
    "duration": "02:04",
    "url": "https://archive.org/download/05_20240928_20240928_2002/08%20Light%20Lights%20up%20Light%20for%20piano.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/08%20Light%20Lights%20up%20Light%20for%20piano.mp3"
  },
  {
    "id": "ost2-09",
    "title": "Kuroi Light (Dark Light)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "09",
    "tag": "KIRA",
    "duration": "01:58",
    "url": "https://archive.org/download/05_20240928_20240928_2002/09%20%E9%BB%92%E3%81%84%E3%83%A9%E3%82%A4%E3%83%88.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/09%20%E9%BB%92%E3%81%84%E3%83%A9%E3%82%A4%E3%83%88.mp3"
  },
  {
    "id": "ost2-10",
    "title": "L's Wall (L no Kabe)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "10",
    "tag": "L",
    "duration": "02:19",
    "url": "https://archive.org/download/05_20240928_20240928_2002/10%20L%E3%81%AE%E5%A3%81.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/10%20L%E3%81%AE%E5%A3%81.mp3"
  },
  {
    "id": "ost2-11",
    "title": "Heartbeat (Kodou)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "11",
    "tag": "DN",
    "duration": "03:15",
    "url": "https://archive.org/download/05_20240928_20240928_2002/11%20%E9%BC%93%E5%8B%95.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/11%20%E9%BC%93%E5%8B%95.mp3"
  },
  {
    "id": "ost2-12",
    "title": "Uneasiness (Fuan)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "12",
    "tag": "DN",
    "duration": "02:58",
    "url": "https://archive.org/download/05_20240928_20240928_2002/12%20%E4%B8%8D%E5%AE%89.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/12%20%E4%B8%8D%E5%AE%89.mp3"
  },
  {
    "id": "ost2-13",
    "title": "Sense of Tension (Kinchoukan)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "13",
    "tag": "DN",
    "duration": "03:09",
    "url": "https://archive.org/download/05_20240928_20240928_2002/13%20%E7%B7%8A%E5%BC%B5%E6%84%9F.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/13%20%E7%B7%8A%E5%BC%B5%E6%84%9F.mp3"
  },
  {
    "id": "ost2-14",
    "title": "Higuchi (Kakou)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "14",
    "tag": "DN",
    "duration": "02:52",
    "url": "https://archive.org/download/05_20240928_20240928_2002/14%20%E7%81%AB%E5%8F%A3.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/14%20%E7%81%AB%E5%8F%A3.mp3"
  },
  {
    "id": "ost2-15",
    "title": "Shiver B (Senritsu B)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "15",
    "tag": "DN",
    "duration": "03:02",
    "url": "https://archive.org/download/05_20240928_20240928_2002/15%20%E6%88%A6%E6%85%84B.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/15%20%E6%88%A6%E6%85%84B.mp3"
  },
  {
    "id": "ost2-16",
    "title": "Yotsuba Murder Conference Room",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "16",
    "tag": "DN",
    "duration": "03:20",
    "url": "https://archive.org/download/05_20240928_20240928_2002/16%20%E3%83%A8%E3%83%84%E3%83%90%E6%AE%BA%E3%81%97%E3%81%AE%E4%BC%9A%E8%AD%B0%E5%AE%A4.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/16%20%E3%83%A8%E3%83%84%E3%83%90%E6%AE%BA%E3%81%97%E3%81%AE%E4%BC%9A%E8%AD%B0%E5%AE%A4.mp3"
  },
  {
    "id": "ost2-17",
    "title": "Anger (Ikari)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "17",
    "tag": "DN",
    "duration": "03:16",
    "url": "https://archive.org/download/05_20240928_20240928_2002/17%20%E6%80%92%E3%82%8A.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/17%20%E6%80%92%E3%82%8A.mp3"
  },
  {
    "id": "ost2-18",
    "title": "Shinigami Realm B",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "18",
    "tag": "DN",
    "duration": "02:32",
    "url": "https://archive.org/download/05_20240928_20240928_2002/18%20%E6%AD%BB%E7%A5%9E%E7%95%8CB.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/18%20%E6%AD%BB%E7%A5%9E%E7%95%8CB.mp3"
  },
  {
    "id": "ost2-19",
    "title": "L's Companions II",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "19",
    "tag": "L",
    "duration": "02:05",
    "url": "https://archive.org/download/05_20240928_20240928_2002/19%20L%E3%81%AE%E4%BB%B2%E9%96%93.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/19%20L%E3%81%AE%E4%BB%B2%E9%96%93.mp3"
  },
  {
    "id": "ost2-20",
    "title": "Misa's Theme A",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "20",
    "tag": "MISA",
    "duration": "02:33",
    "url": "https://archive.org/download/05_20240928_20240928_2002/20%20%E3%83%9F%E3%82%B5%E3%81%AE%E3%83%86%E3%83%BC%E3%83%9EA.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/20%20%E3%83%9F%E3%82%B5%E3%81%AE%E3%83%86%E3%83%BC%E3%83%9EA.mp3"
  },
  {
    "id": "ost2-21",
    "title": "Misa's Theme B",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "21",
    "tag": "MISA",
    "duration": "02:33",
    "url": "https://archive.org/download/05_20240928_20240928_2002/21%20%E3%83%9F%E3%82%B5%E3%81%AE%E3%83%86%E3%83%BC%E3%83%9EB.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/21%20%E3%83%9F%E3%82%B5%E3%81%AE%E3%83%86%E3%83%BC%E3%83%9EB.mp3"
  },
  {
    "id": "ost2-22",
    "title": "Intro",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "22",
    "tag": "DN",
    "duration": "02:22",
    "url": "https://archive.org/download/05_20240928_20240928_2002/22%20%E3%82%A4%E3%83%B3%E3%83%88%E3%83%AD.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/22%20%E3%82%A4%E3%83%B3%E3%83%88%E3%83%AD.mp3"
  },
  {
    "id": "ost2-23",
    "title": "Sakura TV",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "23",
    "tag": "DN",
    "duration": "01:38",
    "url": "https://archive.org/download/05_20240928_20240928_2002/23%20%E3%82%B5%E3%82%AF%E3%83%A9TV.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/23%20%E3%82%B5%E3%82%AF%E3%83%A9TV.mp3"
  },
  {
    "id": "ost2-24",
    "title": "Reasoning (Suiri)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "24",
    "tag": "DN",
    "duration": "03:34",
    "url": "https://archive.org/download/05_20240928_20240928_2002/24%20%E6%8E%A8%E7%90%86.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/24%20%E6%8E%A8%E7%90%86.mp3"
  },
  {
    "id": "ost2-25",
    "title": "Suspicious (Ayashige)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "25",
    "tag": "DN",
    "duration": "03:29",
    "url": "https://archive.org/download/05_20240928_20240928_2002/25%20%E6%80%AA%E3%81%97%E3%81%92.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/25%20%E6%80%AA%E3%81%97%E3%81%92.mp3"
  },
  {
    "id": "ost2-26",
    "title": "Yotsuba Group",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "26",
    "tag": "DN",
    "duration": "02:49",
    "url": "https://archive.org/download/05_20240928_20240928_2002/26%20%E3%83%A8%E3%83%84%E3%83%90%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/26%20%E3%83%A8%E3%83%84%E3%83%90%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97.mp3"
  },
  {
    "id": "ost2-27",
    "title": "Secret (Himitsu)",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "27",
    "tag": "DN",
    "duration": "03:23",
    "url": "https://archive.org/download/05_20240928_20240928_2002/27%20%E7%A7%98%E5%AF%86.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/27%20%E7%A7%98%E5%AF%86.mp3"
  },
  {
    "id": "ost2-28",
    "title": "Sound of Clock Hands",
    "artist": "Hideki Taniuchi",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "28",
    "tag": "DN",
    "duration": "02:59",
    "url": "https://archive.org/download/05_20240928_20240928_2002/28%20%E6%99%82%E8%A8%88%E3%81%AE%E9%87%9D%E3%81%AE%E9%9F%B3.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/28%20%E6%99%82%E8%A8%88%E3%81%AE%E9%87%9D%E3%81%AE%E9%9F%B3.mp3"
  },
  {
    "id": "ost2-29",
    "title": "What's Up, People?! (TV Size)",
    "artist": "Maximum The Hormone",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "29",
    "tag": "OP",
    "duration": "01:24",
    "url": "https://archive.org/download/05_20240928_20240928_2002/29%20What's%20Up%2C%20People-!%20%EF%BD%9ETV%E3%82%B5%E3%82%A4%E3%82%BA%EF%BD%9E.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/29%20What's%20Up%2C%20People-!%20%EF%BD%9ETV%E3%82%B5%E3%82%A4%E3%82%BA%EF%BD%9E.mp3"
  },
  {
    "id": "ost2-30",
    "title": "Zetsubou Billy (TV Size)",
    "artist": "Maximum The Hormone",
    "album": "DEATH NOTE Original Soundtrack II",
    "edition": "OST 2",
    "trackNumber": "30",
    "tag": "ED",
    "duration": "01:14",
    "url": "https://archive.org/download/05_20240928_20240928_2002/30%20%E7%B5%B6%E6%9C%9B%E3%83%93%E3%83%AA%E3%83%BC%20%EF%BD%9ETV%E3%82%B5%E3%82%A4%E3%82%BA%EF%BD%9E.mp3",
    "fallbackUrl": "https://archive.org/download/05_20240928_20240928_2002/30%20%E7%B5%B6%E6%9C%9B%E3%83%93%E3%83%AA%E3%83%BC%20%EF%BD%9ETV%E3%82%B5%E3%82%A4%E3%82%BA%EF%BD%9E.mp3"
  }
];

// Authentic official soundtrack album cover artwork for Death Note OST 1 and OST 2
export const DEATH_NOTE_TRACKS: DeathNoteTrack[] = TRACKS.map((track) => {
  const actualCover = track.edition === 'OST 2'
    ? '/images/music/death-note-ost-2.jpg'
    : '/images/music/death-note-ost-1.jpg';

  return {
    ...track,
    artwork: actualCover,
    cover: actualCover,
  };
});

