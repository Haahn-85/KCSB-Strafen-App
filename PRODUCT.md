# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Installierbare Web-App (PWA): HTML und JavaScript ohne Framework und ohne Build-Schritt, offline über einen Service Worker. Voraussetzung ist, dass die App nach der ersten Installation komplett ohne Netz läuft. Ausgeliefert über GitHub Pages. Entschieden am 18.11.2026.

## Users

- **Schriftführer (Hauptnutzer):** ein festes Mitglied des KC Spritney Biers. Er erfasst am Kegelabend alle Strafen auf einem einzigen Gerät, während gespielt, gerufen und getrunken wird. Strafen werden ihm meist als „Name plus Vergehen“ zugerufen und sofort notiert.
- **Kassenwart:** erhält am Ende den Export, liest ihn in die KCSB-Kasse ein und erstellt dort die Monatsabrechnung. Er bedient die App am Abend nicht selbst.
- **Clubmitglieder:** schauen während des Abends auf dem Gerät nach, was bei ihnen steht, und bekommen danach eine lesbare Zusammenfassung in die Club-Gruppe.

## Product Purpose

Die App ersetzt den handgeführten Strafenzettel samt Schnaps-Liste. Erfolg heißt: Ein Strich geht mindestens so schnell wie auf Papier, also mit höchstens zwei Tipps, und am Ende des Abends liegt ein Export vor, den die Kasse exakt einliest. Heute wird der Papierzettel fotografiert und per Bilderkennung ausgewertet; das entfällt.

## Positioning

Die App ist auf die Regeln genau dieses Clubs gebaut, nicht auf Kegelstrafen im Allgemeinen: Strafenkatalog mit 17 Vergehen, Dreier-Zyklus beim 5er-Schnaps, Sammelbuchung am Spielende, Fußball-Statistik und ein Exportformat, das zur KCSB-Kasse passt. Der Schriftführer tippt nur Ereignisse; was daraus folgt (wer zahlt den Schnaps, wer bekommt einen Sieg), rechnet die App.

## Operating Context

- Kegelabend einmal im Monat, am dritten Samstag. Meist 9 bis 12 Anwesende, Gäste selten und bisher nie mehr als zwei. Abende mit mehr Gästen waren keine normalen Strafen-Abende.
- Der Papierzettel „KCSB-Zettel v2“ (A4 quer) hat eine Spalte pro Person und eine Zeile pro Vergehen. Gezählt wird in Strichlisten mit Fünferbündeln. Weitere Zeilen: Anwesend, Großer Deckel, vier Zeilen „versch. Geldbeträge“, Essen, Fußball Sieg, Tor, Vorlage. Die Rückseite ist die Schnaps-Liste (Getränk, zahlt, trinkt).
- Einzelstriche sind der Normalfall. Dass eine Person mehrere Strafen auf einmal bekommt, ist selten.
- Gespielt werden Einzelspiele, Spiele mit zugelosten Partnern und Fußball. Teams wechseln innerhalb eines Abends. Am Ende eines Spiels werden die Verlierer gesammelt notiert.
- Tore und Vorlagen beim Fußball werden laufend während des Spiels erfasst.
- Bei Spielen mit Einzelwertung bekommt jeder Mitspieler je nach Abschneiden einen eigenen Betrag. Feste Staffeln gibt es nicht.
- 5er-Schnaps: Wer die erste 5 wirft, sucht einen Schnaps aus, die zweite 5 zahlt, die dritte 5 trinkt. Danach beginnt der Zyklus neu. Er läuft den ganzen Abend nebenher, in jedem Spiel, auch beim Fußball.
- Geräte: Android-Handy im Hochformat (Pixel 10 als Referenz), später ein gebrauchtes Android-Tablet im Querformat. Ein iPad ist nicht nötig.

## Capabilities and Constraints

- Ein Schriftführer, ein Gerät. Kein Konto, kein Server, komplett offline.
- Umfang: Anwesenheit, Großer Deckel, alle Vergehen, Sonderbeträge, Essen als Freitext, Fußball (Sieg, Tor, Vorlage) und Schnaps-Liste.
- Die App führt nur Strafensummen. Grundgebühr, Aufteilung der Rechnung und Zahlungen bleiben in der Kasse.
- Stammdaten werden in der App gepflegt. Die Kurznamen müssen mit der Kasse übereinstimmen, damit der Import zuordnen kann: Ulf, Kim, Niggel, Chris C, CV, Benno, Wenzel, Hahn, Reidi, Kuhni, Lomme, Winnie. Gäste sind pro Abend frei anlegbar.
- Strafenkatalog wie in der Kasse (gültig ab Januar 2026): Pudel 0,25 €, Gasse 0,50 €, Kackstuhl 0,50 €, Königsmord 0,50 €, Glockenläuten 1,00 €, Alle 9 1,00 €, Kranz Hand 1,00 €, übers Seil springen 1,00 €, verlorenes Spiel 1,50 €, Handy rumspielen 3,00 €, Lustwurf 5,00 €, Fussball verloren 5,00 €, Schnapszahl 7,50 €, 3 Getränke 10,00 €, Fussball zu Null 10,00 €, Perle auf der Bahn 20,00 €, Handy laut 50,00 €. Quelle: `src/kcsb_kasse/stammdaten.py` im Projekt KCSB-Kasse.
- Spielende-Regeln: Verlorenes Spiel kostet 1,50 € je Verlierer. Fußball verloren kostet 5,00 €; „zu Null“ ersetzt das durch 10,00 €. Alle übrigen Mitspieler bekommen einen Sieg. Einzelwertung bucht frei addierte Beträge pro Person.
- Alle 9 und Kranz Hand: Der Werfer zahlt nicht; alle anderen Anwesenden, auch Gäste, bekommen je einen Strich. Erfasst wird mit denselben zwei Tipps (Werfer, Vergehen); wer geworfen hat, wird nicht gespeichert.
- Schnaps: Bei der ersten 5 hält die App nur das Getränk fest (aus Vorschlägen oder als Freitext); wer diese 5 geworfen hat, ist unerheblich und wird nicht erfasst. Die zweite 5 bestimmt, wer zahlt, die dritte, wer trinkt; dieselbe Person darf beides sein. Das Getränk lässt sich bis zum Ende der Runde ändern. Ein angefangener Zyklus verfällt am Ende des Abends.
- Korrigieren muss jederzeit möglich sein. Eine Rückfrage gibt es nur bei Vergehen ab 5 €.
- Abschluss: Lückenprüfung, Summen pro Person, Sperren des Abends. Wiederöffnen ist möglich und erzeugt einen neuen Export. Frühere Abende bleiben einsehbar.
- Export: ein Code mit allen Daten des Abends und Prüfsumme, angezeigt als QR-Code für ein Bildschirmfoto und als Text zum Teilen, dazu eine lesbare Zusammenfassung für die Club-Gruppe. Eine eigene Datei gibt es nicht. Der Weg zur Kasse läuft per Mail an den eigenen Rechner, der keine Kamera hat; das Bildschirmfoto wird dort mit den Belegen hochgeladen. Ein reiner Hash-Wert reicht nicht, weil er keine Daten enthält.
- Sprache: nur Deutsch.
- Eigenes Projekt, getrennt von der KCSB-Kasse. Gemeinsam sind nur Namen, Vergehen und Preise. Im Kassen-Projekt wird nichts angelegt.
- Offene Entscheidungen: genaues Format von Code und Prüfsumme, festzulegen zusammen mit dem Import in der Kasse. Vorschlag in `docs/EXPORTFORMAT.md`.

## Brand Commitments

- Name: KC Spritney Biers, Kürzel KCSB.
- Logo-Dateien im Projekt KCSB-Kasse unter `src/kcsb_kasse/ui/statisch/`: `kcsb_logo.svg`, `kcsb_logo_schwarz.svg`, `kcsb_logo_schwarz.png`, `kcsb.png`.
- Clubfarben, wie in Kasse und Abrechnungs-PDF verwendet: Schwarz #111111 und Rot #C8102E. Im Konzept bestätigt: dunkle Darstellung in den Clubfarben.
- Begriffe des Clubs werden wörtlich übernommen: Spitznamen, Vergehen wie im Katalog (Pudel, Gasse, Kackstuhl, Königsmord …), Großer Deckel, versch. Geldbeträge.

## Evidence on Hand

- Konzept: `docs/KONZEPT.md` (aktuell). Die erste Fassung als [Claude-Doc](https://claude.ai/artifact/SCXY5rXZN4gpG2amGSsDj7) ist überholt.
- Entscheidungen mit Begründung: `docs/ENTSCHEIDUNGEN.md`.
- Klickdummy Handy: `klickdummy/index.html`, veröffentlicht als [KCSB Strafen-App Klickdummy](https://claude.ai/artifact/AbYnBz5G7NEYgM1tPcZacx). Nach der Design-Bewertung vom 17.11. überarbeitet (`docs/KRITIK-2026-11-17.md`).
- Klickdummy Tablet: `klickdummy/tablet.html`, veröffentlicht als [KCSB Strafen-App Klickdummy Tablet](https://claude.ai/artifact/MzxxvPaw6xBhuR77J6iZ8S). Beide Ansichten (Zettel-Matrix und Kacheln) gefallen; welche bleibt, ist offen.
- Stammdaten: `daten/stammdaten.json`, übernommen aus der KCSB-Kasse.
- KCSB-Kasse (`/home/hahn/Projekte/KCSB-Kasse`) als Vorlage für Datenmodell und Papierzettel: `src/kcsb_kasse/db/modelle.py`, `src/kcsb_kasse/pdf/strafenzettel.py`, `src/kcsb_kasse/erkennung/prompts/`.
- Original-Strafenliste im Ordner `Grundlage` der Kasse: am 18.11.2026 abgeglichen, Katalog stimmt überein (siehe `docs/ENTSCHEIDUNGEN.md`).
- Nicht vorhanden: echte Abenddaten aus der App, Tests am Kegeltisch. Nichts davon darf erfunden werden.

## Product Principles

1. **Papier ist die Messlatte.** Ein Einzelstrich braucht höchstens zwei Tipps. Was langsamer ist als ein Strich auf dem Zettel, wird nicht benutzt.
2. **Die Clubregeln stecken in der App.** Der Schriftführer meldet nur, was passiert ist; Schnaps-Rollen, Sieger und Beträge leitet die App ab.
3. **So offen wie der Zettel auf dem Tisch.** Jeder kann sehen, was bei ihm steht, und jeder Fehler lässt sich korrigieren.
4. **Autark bis zum Export.** Kein Netz, kein Konto. Daten verlassen das Gerät nur über den Export an die Kasse und die Zusammenfassung an die Gruppe.
5. **Für den Schriftführer, nicht für den Kassenwart.** Abrechnungslogik bleibt in der Kasse; die App bleibt so schlicht, dass ein Mitglied sie nach kurzer Einweisung sicher bedient.
