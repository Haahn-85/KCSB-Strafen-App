# KCSB Strafen-App

Strafen am Kegelabend direkt auf dem Handy erfassen statt auf dem Papierzettel. Eigenes Projekt, getrennt von der [KCSB-Kasse](../KCSB-Kasse); gemeinsam sind nur Mitgliedernamen, Strafenkatalog und das Exportformat.

## Stand

Konzept und Klickdummys sind fertig, App-Code gibt es noch nicht. Die Technik (installierbare Web-App oder native Android-App) wird nach einem Test der Klickdummys am Kegeltisch entschieden.

## Inhalt

| Pfad | Inhalt |
| --- | --- |
| `PRODUCT.md` | Nutzer, Clubregeln, Grenzen, Grundsätze |
| `CLAUDE.md` | Arbeitshinweise für Claude in VS Code |
| `docs/KONZEPT.md` | Bildschirme und Abläufe, Stand der Klickdummys |
| `docs/ENTSCHEIDUNGEN.md` | Alle bisherigen Entscheidungen mit Begründung |
| `docs/KRITIK-2026-11-17.md` | Design-Bewertung des Handy-Klickdummys und was daraus umgesetzt wurde |
| `klickdummy/index.html` | Klickdummy Handy (hochkant) |
| `klickdummy/tablet.html` | Klickdummy Tablet (quer), zwei Ansichten |
| `daten/stammdaten.json` | Mitglieder und Strafenkatalog wie in der KCSB-Kasse |

## Klickdummys ansehen

Die Dateien laufen ohne Server direkt im Browser:

```
xdg-open klickdummy/index.html
xdg-open klickdummy/tablet.html
```

In VS Code geht es auch mit der Erweiterung „Live Preview“ von Microsoft: Datei öffnen, „Show Preview“. Für den Handy-Eindruck im Browser die Gerätesimulation öffnen (F12, dann Strg+Umschalt+M).

Veröffentlichte Fassungen zum Teilen:
- [Handy-Klickdummy](https://claude.ai/artifact/AbYnBz5G7NEYgM1tPcZacx)
- [Tablet-Klickdummy](https://claude.ai/artifact/MzxxvPaw6xBhuR77J6iZ8S)
- [Konzept als Claude-Doc](https://claude.ai/artifact/SCXY5rXZN4gpG2amGSsDj7). Nicht mehr aktuell, maßgeblich ist `docs/KONZEPT.md`.

## Nächste Schritte

1. Klickdummy einen Kegelabend lang parallel zum Papier bedienen und Fehltipps notieren.
2. Danach die Technik entscheiden.
3. Exportformat zusammen mit dem Import in der KCSB-Kasse festlegen.
