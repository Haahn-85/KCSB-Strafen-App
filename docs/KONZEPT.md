# KCSB Strafen-App – UX/UI-Konzept

Stand 18.11.2026. Entspricht den Klickdummys `klickdummy/index.html` (Handy) und `klickdummy/tablet.html` (Tablet). Ersetzt die erste Fassung vom 16.11. im Claude-Doc.

## Ziel und Rahmen

Die App ersetzt den Papier-Strafenzettel samt Schnaps-Liste: Der Schriftführer erfasst jeden Strich am Abend mit zwei Tipps auf dem Handy, und am Ende entsteht ein Code, den die Kasse einliest.

| Punkt | Festlegung |
| --- | --- |
| Gerät | Android-Handy im Hochformat (Pixel 10 als Referenz), später gebrauchtes Android-Tablet im Querformat |
| Nutzer | Ein festes Mitglied als Schriftführer, ein Gerät |
| Netz | Komplett offline, keine Anmeldung, kein Server |
| Umfang | Anwesenheit, Großer Deckel, 17 Vergehen, Sonderbeträge, Essen, Fußball (Sieg, Tor, Vorlage), Schnaps-Liste |
| Abgrenzung | Nur Strafensummen. Grundgebühr, Deckel-Aufteilung und Zahlungen bleiben in der Kasse |
| Projekt | Eigenes Vorhaben, getrennt von der KCSB-Kasse; gleiche Namen, Vergehen und Preise |
| Sprache | Deutsch |

Maßstab für den Erfolg: Ein Strich darf nicht länger dauern als auf Papier, also höchstens zwei Tipps und unter zwei Sekunden.

## Gestaltungsgrundsätze

Jeder Bildschirm folgt diesen Regeln, abgeleitet aus der Situation am Kegeltisch: eine Hand, wenig Licht, Ablenkung, Zeitdruck.

| Grundsatz | Umsetzung in der App |
| --- | --- |
| Daumenzone | Alles Häufige liegt unten: Hauptleiste, Aktionsleiste, in jedem Blatt der feste untere Teil mit den häufigen Strafen bzw. Personen. Oben stehen nur Anzeige und Menü |
| Große Trefferflächen | Kacheln 88 px hoch, Vergehen-Tasten mindestens 56 px, alle Ziele mindestens 44 px, 8 px Abstand |
| Ortsfestigkeit | Kacheln und Tasten wechseln am Abend nie ihren Platz. Reihenfolge wie auf dem Zettel |
| Wiedererkennen statt Merken | Zettel-Ansicht mit Strichbündeln wie auf Papier; Vergehen heißen exakt wie im Katalog |
| Sofortige Rückmeldung | Jeder Strich: kurze Vibration, Zähler und Betrag auf der Kachel ändern sich, Hinweisleiste mit Name, Vergehen, Betrag und „Rückgängig“ |
| Fehler verzeihen statt verhindern | Keine Rückfragen bei kleinen Strafen; Korrektur jederzeit im Personenblatt. Rückfrage nur ab 5 € |
| Eine Ebene zur Zeit | Öffnet sich ein Blatt oder Dialog, verschwindet die Hinweisleiste, damit nichts übereinander liegt |
| Ein Modus zur Zeit | Fußball-Tasten erscheinen nur, solange ein Fußballspiel läuft; der Kopf zeigt „Fußball läuft“ |

## Aufbau der App (Handy)

Drei Bereiche in der Hauptleiste unten decken den laufenden Abend ab; alles Seltene liegt im Menü oben rechts.

| Bereich | Inhalt |
| --- | --- |
| Strafen (Start) | 5er-Streifen (Schnaps · zahlt · trinkt), Personenkacheln mit Strichzahl und Betrag, Aktionsleiste „Fußball starten“ und „Spielende“ |
| Schnaps | Laufende Runde mit drei Feldern und „5 eintragen“, darunter die fertigen Runden (neueste oben) |
| Zettel | Übersicht in Papierform: Vergehen als Zeilen, Personen als Spalten, Strichbündel. Namenszeile und Summe bleiben beim Scrollen stehen; Namen antippen öffnet die Einzelansicht |
| Menü | Anwesenheit und Gäste, Essen, Abend abschließen, abgesetzt darunter „Neuen Abend beginnen“ |

### Personenblatt

Öffnet sich beim Tipp auf eine Kachel oder einen Namen im Zettel und dient zugleich als „Heute bei mir“ für Mitglieder. Aufbau von oben nach unten:

1. **Kopf:** Name, Tagessumme, bei offenem Blatt die letzte Aktion mit „Rückgängig“.
2. **Heute:** jedes Vergehen mit Anzahl und Betrag, Sonderbeträge, Tore, Vorlagen, Siege. Jede Zeile hat einen Knopf, der einen Eintrag entfernt.
3. **Weitere Vergehen:** Lustwurf, Schnapszahl, 3 Getränke, Handy rumspielen, Handy laut, Perle auf der Bahn.
4. **Sonst über Spielende:** verlorenes Spiel, Fussball verloren, Fussball zu Null.
5. **Fester unterer Teil:** im Fußball-Modus „Tor“ und „Vorlage“, darunter die acht häufigen Strafen (Pudel, Gasse, Kackstuhl, Königsmord, Glockenläuten, Alle 9, Kranz Hand, übers Seil springen), ganz unten „Sonderbetrag“, „Offen lassen“ und „Schließen“ bzw. „Fertig“.

Schließen: nach unten wischen, Zurück-Geste, Esc oder Tipp über das Blatt.

## Abläufe

### Abend starten

1. „Neuer Abend“ (Menü). Ist der laufende Abend nicht abgeschlossen, fragt die App mit der Zahl der Einträge nach.
2. Anwesende antippen; alle 12 Mitglieder stehen in Zettel-Reihenfolge bereit.
3. „Großer Deckel“ pro anwesender Person umschalten. Gäste mit Namen hinzufügen; Gäste ohne Einträge lassen sich wieder entfernen.
4. „Los“. Nur Anwesende erscheinen als Kacheln. Nachzügler über „+ Weitere Person“.

### Einzelstrich

1. Person antippen, das Blatt fährt hoch.
2. Vergehen antippen. Der Strich ist gesetzt, das Blatt schließt sich, die Hinweisleiste zeigt „Benno · Pudel · 0,25 €“ mit „Rückgängig“ (5 Sekunden).

Ab 5 € fragt die App einmal nach, mit Person und Vergehen im Titel („CV: Handy laut?“) und dem Betrag groß. Mehrere Striche für eine Person: Kachel lang drücken oder im Blatt „Offen lassen“; dann bleibt das Blatt offen und der Kopf zeigt die letzte Aktion.

### Fußball

1. „Fußball starten“ in der Aktionsleiste; der Kopf zeigt „Fußball läuft“.
2. Während des Spiels stehen „Tor“ und „Vorlage“ im festen unteren Teil jedes Personenblatts.
3. „Spielende“ beendet den Modus. Ein Spiel ohne Wertung lässt sich dort ebenfalls beenden.

### Spielende

Eine Taste, drei Arten:

| Art | Schritte | Ergebnis |
| --- | --- | --- |
| Spiel | Verlierer antippen, buchen | 1,50 € je Verlierer |
| Fußball | Verlierer antippen, bei Bedarf „Zu Null“, buchen | 5,00 € je Verlierer, mit „Zu Null“ stattdessen 10,00 €. Alle übrigen Anwesenden bekommen einen Sieg, abwählbar |
| Einzelwertung | Pro Mitspieler Schnelltasten +0,25 / +0,50 / +1 / +2 aufaddieren, „0“ setzt zurück | Sonderbetrag pro Person; wer leer bleibt, zahlt nichts |

„Buchen“ ist inaktiv, solange nichts gewählt ist. Eine Sammelbuchung lässt sich über die Hinweisleiste als Ganzes zurücknehmen.

### 5er-Schnaps

Jede geworfene 5 ist ein Tipp auf den 5er-Streifen. Die App führt den Dreier-Zyklus:

1. **Erste 5:** „Welcher Schnaps?“ Getränk aus Vorschlägen antippen oder als Freitext eingeben. Wer geworfen hat, wird nicht erfasst.
2. **Zweite 5:** „Wer zahlt?“ Person antippen. Das Getränk lässt sich hier noch ändern.
3. **Dritte 5:** „Wer trinkt?“ Person antippen. Die Runde ist fertig, der Zyklus beginnt neu.

Dieselbe Person darf zahlen und trinken. Fünfen zählen in jedem Spiel, auch beim Fußball. „Letzte 5 zurücknehmen“ wirkt nur auf die laufende Runde. Fertige Runden sind eigene Einträge: Sie lassen sich im Bereich Schnaps antippen, um das Getränk zu ändern oder die Runde zu streichen, und verschieben sich dabei nie gegenseitig. Ein angefangener Zyklus verfällt beim Abschluss.

### Essen

Menü, „Essen“: Liste der Anwesenden, Gericht als Freitext. Bereits eingegebene Gerichte erscheinen als Tasten.

### Korrigieren

- Direkt danach: „Rückgängig“ in der Hinweisleiste bzw. im Blattkopf.
- Später: Person antippen, unter „Heute“ den Eintrag mit dem Knopf daneben entfernen. Der Blattkopf bietet danach „Rückgängig“ an.
- Schnaps: laufende Runde über „Letzte 5 zurücknehmen“, fertige Runden im Bereich Schnaps.

Einen eigenen Verlauf gibt es nicht; jeder Eintrag trägt intern weiter seine Uhrzeit.

## Abschluss und Export

1. Menü, „Abend abschließen“, dann die Lückenprüfung: fehlendes Essen (führt zum Eintragen und zurück), laufendes Fußballspiel (ohne Wertung beenden), angefangene Schnaps-Runde (verfällt).
2. Summen pro Person und gesamt.
3. „Abschließen“ sperrt den Abend. Ein Banner zeigt „Abend abgeschlossen“ mit „Ergebnis“ und „Wieder öffnen“; Aktionsleiste und 5er-Streifen verschwinden, Personenblätter sind nur noch lesbar.
4. Ergebnis: Gesamtbetrag groß, Personen nach Betrag sortiert, dann die Exporte:

| Form | Zweck | Weg |
| --- | --- | --- |
| QR-Code | Import in die Kasse, Sicherung | Bildschirmfoto, per Mail an den eigenen Rechner, in der Kasse mit den Belegen hochladen |
| Textcode | Ersatzweg für den Import | „Code teilen“, per Mail an sich selbst, in der Kasse einfügen |
| Lesbare Zusammenfassung | Club-Gruppe | „Zusammenfassung kopieren“: Strafen pro Person, Schnaps-Runden |

Der Textcode enthält die vollständigen Daten des Abends und endet mit einer Prüfsumme, damit die Kasse abgeschnittene oder veränderte Codes erkennt. Eine eigene Datei gibt es nicht. Das genaue Format ist offen, Vorschlag in `docs/EXPORTFORMAT.md`. Wiederöffnen ist möglich; beim nächsten Abschluss entsteht ein neuer Code.

## Tablet (Querformat)

Zwei Ansichten, umschaltbar im Kopf; beide gefallen, welche bleibt, ist offen.

- **Zettel:** Matrix wie der Papierzettel, ein Tipp in eine Zelle setzt einen Strich. Zeilen für Vergehen, Sonderbetrag, Fußball (Sieg, Tor, Vorlage) und Essen; Summenzeile unten fest.
- **Kacheln:** links die Personen, rechts alle Vergehen als große Tasten. Person und Vergehen in beliebiger Reihenfolge antippen.
- **Rechte Leiste:** Schnaps mit drei Feldern. Bei der ersten 5 stehen dort Getränke-Tasten mit „+ Anderes“, danach die Namen für Zahler und Trinker. Darunter die fertigen Runden und unten „Spielende“.
- **Korrigieren:** Taste im Kopf. Der nächste Tipp auf eine Zelle oder ein Vergehen entfernt dort einen Strich, danach schaltet sich der Modus ab.

## Daten und Stammdaten

Die App führt eigene Stammdaten (`daten/stammdaten.json`) und speichert jeden Strich als einzelnen Eintrag; die Verbindung zur Kasse läuft allein über gleiche Namen.

- **Mitglieder:** 12 Kurznamen in Zettel-Reihenfolge, in der App pflegbar, identisch mit der Kasse.
- **Vergehen:** 17 Einträge mit Preis wie in der Kasse. Der beim Strich gültige Preis wird mitgespeichert.
- **Gäste:** pro Abend frei anlegbar.
- **Einträge:** Art (Strich, Sonderbetrag, Tor, Vorlage, Sieg), Person, Uhrzeit, Betrag in Cent, entfernt ja/nein. Zähler und Summen werden daraus berechnet.
- **Schnaps:** laufende Runde (Getränk, zahlt) und fertige Runden (Getränk, zahlt, trinkt, Uhrzeit) getrennt von den Einträgen.
- **Speichern:** nach jedem Eintrag sofort auf dem Gerät.

## Erscheinungsbild

- **Farben:** fast schwarzer Hintergrund, Kacheln eine Stufe heller mit sichtbarem Rand. Clubrot #C8102E für die wichtigste Aktion und Auswahl, Rosa für Beträge, Grün nur für Fußball.
- **Schrift:** Barlow Condensed für Namen und Zahlen in Kacheln, Barlow für Text. Beträge in Tabellenziffern. Keine Schrift unter 14 px.
- **Bewegung:** Blätter fahren in etwa 0,2 s hoch; bei reduzierter Bewegung ohne Animation. Vibration kurz beim Strich, doppelt bei Sammelbuchung.
- **Gerät:** Hochformat fest, Bildschirm bleibt während eines offenen Abends an.

## Ausbaustufen und offene Entscheidungen

| Stufe | Inhalt | Papier noch nötig? |
| --- | --- | --- |
| 0 | Klickdummys (erledigt) | Ja |
| 1 | Abend starten, Einzelstrich, Personenblatt mit Korrektur, Zettel-Ansicht, Speichern | Für Schnaps, Essen, Fußball |
| 2 | Spielende mit drei Arten, Fußball-Modus, Sonderbetrag, Essen | Für Schnaps |
| 3 | 5er-Schnaps, Abschluss, Export als Code und Datei | Nein |
| 4 | Tablet-Ansicht, Import in der Kasse | Nein |

Offen:

- [x] **Technik:** installierbare Web-App (PWA), entschieden am 18.11.2026.
- [ ] **Exportformat** und Prüfsumme, zusammen mit dem Import in der Kasse.
- [x] **Abgleich** mit der Original-Strafenliste im Ordner „Grundlage“ der Kasse, erledigt am 18.11.2026.
- [ ] **Tablet-Ansicht:** Zettel oder Kacheln.
- [ ] **Test am Tisch:** Klickdummy einen Abend parallel zum Papier bedienen und Fehltipps zählen.
