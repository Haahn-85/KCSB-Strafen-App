# KCSB Strafen-App – Hinweise für Claude

Handy-App, mit der der Schriftführer des KC Spritney Biers (KCSB) am Kegelabend die Strafen erfasst. Sie ersetzt den Papier-Strafenzettel samt Schnaps-Liste: ein Gerät, offline, kein Konto. Am Ende entsteht ein Export, den die KCSB-Kasse einliest.

## Zuerst lesen

1. `PRODUCT.md`: Nutzer, Clubregeln, Grenzen, Grundsätze. Maßgeblich bei jeder Frage, was die App können muss.
2. `docs/KONZEPT.md`: Bildschirme und Abläufe, Stand der Klickdummys.
3. `docs/ENTSCHEIDUNGEN.md`: was schon entschieden ist und warum. Nicht neu aufrollen, ohne nachzufragen.
4. `klickdummy/index.html` (Handy) und `klickdummy/tablet.html` (Tablet): Referenz für Verhalten und Optik. Im Browser öffnen und durchklicken.

## Stand

- Technik: PWA in `app/`, entstanden aus dem Handy-Klickdummy. HTML und JavaScript ohne Framework, ohne Build-Schritt, ohne npm-Pakete. Offline über `app/sw.js`; Stammdaten lädt die App aus `daten/stammdaten.json`. Der Abend steht im `localStorage` und wird nach jeder Aktion gespeichert.
- Auslieferung über GitHub Pages aus dem Hauptverzeichnis; die App liegt unter `/app/`.
- Erster Test am Kegeltisch auf einem iPad (Safari/Chrome) mit dem Handy-Layout hochkant.
- Rauchtest: `node test/smoke.mjs` (braucht `chromium` und `python3`). Prüft Anwesenheit, Strich, Speichern und den Neustart ohne Netz.

## Regeln für die Arbeit

- Oberfläche nur auf Deutsch. Bezeichner im Code deutsch, wie in der KCSB-Kasse (`mitglied`, `vergehen`, `preis_cent`).
- Geldbeträge immer als ganze Cent (Ganzzahl), nie als Gleitkommazahl.
- Kurznamen der Mitglieder und Namen der Vergehen exakt wie in `daten/stammdaten.json`, das der KCSB-Kasse entspricht. Schreibweisen wie „Fussball verloren“ nicht „korrigieren“, sonst scheitert der Import.
- Das Projekt KCSB-Kasse (`/home/hahn/Projekte/KCSB-Kasse`) nicht verändern. Gemeinsam sind nur Stammdaten und das Exportformat.
- Die Hauptgeste nicht verlängern: Ein Einzelstrich ist Person antippen, Vergehen antippen. Mehr Tipps oder Rückfragen nur, wo PRODUCT.md es verlangt.
- Bei Widerspruch zwischen Klickdummy und PRODUCT.md gilt PRODUCT.md. Dann nachfragen, statt still eine Seite anzupassen.

## Clubregeln, die leicht falsch umgesetzt werden

- **5er-Schnaps:** Die erste 5 legt nur das Getränk fest; wer sie geworfen hat, wird nicht erfasst. Die zweite 5 bestimmt, wer zahlt, die dritte, wer trinkt. Dieselbe Person darf zahlen und trinken. Fertige Runden werden als eigene Einträge gespeichert und verschieben sich nie rückwirkend. Ein angefangener Zyklus verfällt beim Abschluss.
- **Spielende:** „verlorenes Spiel“ 1,50 € je Verlierer. Beim Fußball 5,00 € je Verlierer; „zu Null“ ersetzt das durch 10,00 €. Alle übrigen Anwesenden bekommen einen Sieg, abwählbar. Einzelwertung bucht frei addierte Beträge pro Person als Sonderbetrag (Schnelltasten 0,25 €, 0,50 €, 1 €, 2 €).
- **Rückfrage** nur bei Vergehen ab 5,00 €.
- **Abschluss** sperrt den Abend. „Neuer Abend“ verwirft einen nicht abgeschlossenen Abend nur nach Rückfrage.
- Die App führt nur Strafensummen. Grundgebühr, Aufteilung der Rechnung und Zahlungen bleiben in der Kasse.

## Offene Punkte

- Format von Exportcode und Prüfsumme, gemeinsam mit dem Import in der KCSB-Kasse festlegen. Vorschlag in `docs/EXPORTFORMAT.md`; entschieden ist nur der Weg: QR-Code als Bildschirmfoto, Text als Ersatz, keine Datei.
- Welche Tablet-Ansicht bleibt: Zettel-Matrix oder Kacheln.

## Gestaltung

- Dunkle Darstellung in den Clubfarben: Schwarz #111111 und Rot #C8102E. Schriften im Klickdummy: Barlow und Barlow Condensed.
- Logo-Dateien liegen in der KCSB-Kasse unter `src/kcsb_kasse/ui/statisch/`.
- Für Gestaltungsarbeit ist das Impeccable-Plugin eingerichtet: PRODUCT.md liegt im Hauptverzeichnis, ein DESIGN.md gibt es noch nicht.
