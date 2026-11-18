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
