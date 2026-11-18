# Entscheidungen

Was bisher entschieden wurde und warum. Neueste Änderungen stehen am Ende.

## Grundlagen (Konzeptrunden, 16.11.2026)

| Thema | Entscheidung | Begründung |
| --- | --- | --- |
| Gerät | Zuerst Handy hochkant (Pixel 10), später Tablet quer | Handy ist immer dabei und einhändig bedienbar; ein iPad ist nicht nötig, ein gebrauchtes Android-Tablet reicht |
| Nutzer | Ein Schriftführer, ein Gerät | Keine Synchronisation und keine Konflikte bei 12 Leuten an einem Tisch |
| Umfang | Ganzer Zettel inklusive Schnaps-Liste | Solange ein Teil fehlt, braucht man doch wieder Papier |
| Verbindung zur Kasse | Komplett autark und offline; Export als Code, den die Kasse einliest | Unabhängig vom Netz auf der Kegelbahn; ersetzt die Bilderkennung durch exakte Daten |
| Hauptfall | Einzelstrich direkt nach Zuruf; Verlierer am Spielende gesammelt | So läuft es heute auf Papier |
| Sichtbarkeit | Zettel-Ansicht auf dem Gerät zum Herumzeigen | Ersetzt den offen liegenden Papierzettel |
| Hauptgeste | Personenkacheln zuerst, dann Vergehen | Gerufen wird „Name plus Vergehen“; 14 große Kacheln trifft man blind |
| Blatt nach Strich | Schließt sofort | Mehrere Strafen für eine Person auf einmal sind selten |
| Fußball | Tore und Vorlagen laufend während des Spiels; Teams wechseln, auch Einzelspiele und zugeloste Partner | Deshalb keine Team-Verwaltung |
| Korrigieren | Jeder Strich ein Eintrag mit Uhrzeit; „Rückgängig“; Rückfrage nur ab 5 € | Kleine Strafen ohne Bremse, teure Fehltipps abgesichert |
| Stammdaten | In der App gepflegt, Kurznamen identisch mit der Kasse | App bleibt autark, Import ordnet über Namen zu |
| Export | Textcode zum Kopieren und Datei zum Teilen, mit Prüfsumme | Ein reiner Hash enthält keine Daten |
| Technik | Native Android ist in Ordnung; endgültig erst nach Test der Klickdummys | Getrenntes Projekt, nichts in der Kasse anlegen |
| Abendstart | Anwesende antippen, Gäste ergänzen, Großer Deckel umschalten | |
| Kachel-Reihenfolge | Wie auf dem Zettel | Der Schriftführer kennt sie vom Papier |
| Fußball-Modus | „Tor“ und „Vorlage“ nur während des Spiels im Blatt | |
| Spielende Fußball | Übrige Mitspieler werden automatisch Sieger; „zu Null“ ersetzt die 5 € durch 10 € | Clubregel |
| 5er-Schnaps | Erste 5 sucht aus, zweite zahlt, dritte trinkt; läuft den ganzen Abend nebenher | Clubregel |
| Versch. Geldbeträge | Für Spiele mit Einzelwertung, Beträge je nach Abschneiden | Keine festen Staffeln |
| Essen | Freitext | |
| Hauptleiste | Strafen, Schnaps, Zettel (damals noch Verlauf); Seltenes im Menü | |
| Erscheinungsbild | Dunkel, Clubfarben Schwarz und Rot, Hochformat, Bildschirm bleibt an | |
| Abschluss | Lückenprüfung, Summen, Sperren, Wiederöffnen möglich, frühere Abende einsehbar | |
| Schnaps-Details | Aussucher nicht exportieren; eine Person darf mehrere Rollen haben; Fünfen zählen in jedem Spiel; angefangener Zyklus verfällt | |
| Einzelwertung | Schnelltasten 0,25 €, 0,50 €, 1 €, 2 €; mehrfaches Tippen addiert | |
| Abgrenzung | Nur Strafensummen; nur Deutsch; mehr als zwei Gäste möglich, kam aber nie vor | |

## Tablet-Klickdummy (16.11.2026)

- Den Verlauf als Liste wollte der Nutzer nicht; er fiel weg.
- Die 5er-Eingabe sollte neu gedacht werden; daraus wurden drei feste Felder in einer Leiste rechts.
- Ob die Tablet-Ansicht eine Matrix bleibt, war offen. Beide Ansichten, Zettel und Kacheln, gefallen; welche bleibt, ist noch offen.
- Für das Getränk ist auch Freitext möglich.

## PRODUCT.md (17.11.2026)

- Schriftführer ist ein festes Mitglied, nicht der Kassenwart.
- Technik bleibt offen.
- PRODUCT.md lag zunächst nur im Arbeitsbereich und liegt jetzt in diesem Projekt.

## Design-Bewertung des Handy-Klickdummys (17.11.2026)

Ergebnis 29 von 40 Punkten, Details in `KRITIK-2026-11-17.md`. Entscheidungen danach:

- Zuerst die Überdeckung durch die Hinweisleiste beheben, dann alle fünf gefundenen Probleme.
- Den Verlauf auch auf dem Handy entfernen; Korrektur im Personenblatt.
- Die 5er-Eingabe über den Schnaps-Streifen statt über das Personenblatt.

## Schnaps-Regel präzisiert (17.11.2026)

- Bei der ersten 5 wird nur das Getränk festgehalten. Wer sie geworfen hat, ist unerheblich und wird nicht erfasst.
- Die zweite 5 bestimmt den Zahler, die dritte den Trinker.

## Start der Entwicklung (18.11.2026)

- **Technik: PWA.** Installierbare Web-App aus HTML und JavaScript, ohne Framework und ohne Build-Schritt. Voraussetzung: Nach der ersten Installation läuft sie komplett offline. Begründung: Der Handy-Klickdummy war schon eine vollständige Web-Seite und ließ sich direkt zur App ausbauen; ein Code für Handy und Tablet. Entschieden vor dem Test am Tisch.
- **Auslieferung über GitHub Pages**, vorerst. Im kostenlosen Tarif ist das Repo öffentlich, also auch Konzept, Klickdummys und Kurznamen.
- **Reihenfolge der Mitglieder wie in `daten/stammdaten.json`** (Ulf, Kim, Niggel, Chris C, CV, Benno, Wenzel, Hahn, Reidi, Kuhni, Lomme, Winnie). Die Excel-Listen im Ordner `Grundlage` der Kasse haben eine andere Spaltenfolge; sie gilt nicht.
- **Abgleich mit der Original-Strafenliste erledigt.** `Strafenzettel 2025 Vorlage.xlsx` und die Monatslisten 2026 stimmen in Namen, Schreibweise (auch „Fussball“), Preisen und Reihenfolge der 17 Vergehen mit `daten/stammdaten.json` überein. Für das spätere Exportformat wichtig: Dort steht „versch. Geldbeträge“ als je eine Zeile pro Betrag (0,25 / 0,50 / 1 / 2 / 3 / 5 / 10 €) mit Anzahl.
- **Erster Test am Tisch auf einem iPad** (Safari und Chrome), mit dem Handy-Layout hochkant. Das Kachelraster nutzt die volle Breite, Blätter bleiben höchstens 640 px breit und mittig. Die Tablet-Ansicht quer bleibt Stufe 4.
- **Kein Exportcode, bis das Format mit der Kasse feststeht.** Der Beispiel-Code aus dem Klickdummy ist nicht in der App; nach dem Abschluss gibt es nur die Zusammenfassung für die Gruppe.
- **Export als QR-Code statt Datei.** Nach dem Abschluss zeigt die App den Code als QR-Code für ein Bildschirmfoto und als Text zum Teilen; eine eigene Datei entfällt. Begründung: Der Rechner mit der Kasse hat keine Kamera, der Abend kommt per Mail dorthin. Das Bildschirmfoto lässt sich in der Kasse zusammen mit dem Foto der Rechnung als Beleg hochladen. Ein Probelauf zeigte, dass ein großer Abend mit gzip gepackt in einen QR-Code passt und sich aus einem Bild exakt zurücklesen lässt. Das genaue Format ist ein Vorschlag in `docs/EXPORTFORMAT.md`.
- **Tablet-Ansicht quer vorgezogen.** Im Querformat ab 1000 px Breite zeigt die App die Tablet-Ansicht, hochkant die Handy-Ansicht; es ist derselbe Abend. Beide Tablet-Ansichten (Zettel-Matrix und Kacheln) sind umschaltbar eingebaut, damit der Test am Tisch entscheidet. Gegenüber dem Tablet-Klickdummy übernommen aus dem Handy: Schnaps als drei Felder mit festen Runden, Rückfrage ab 5 €, „Rückgängig“; Tor und Vorlage nur während eines Fußballspiels. Schnaps in der Leiste mit einem Tipp je 5. Die Matrix teilt die Breite gleichmäßig, damit 12 Spalten ohne seitliches Wischen passen. Das Manifest erzwingt kein Hochformat mehr; auf dem Handy hilft bei Bedarf die Drehsperre des Systems.
