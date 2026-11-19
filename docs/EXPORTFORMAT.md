# Exportformat Strafen-App → KCSB-Kasse

**Stand 18.11.2026.** Entschieden ist der Weg in die Kasse (QR-Code als Bildschirmfoto, Text als Ersatz, keine Datei). Alles Übrige ist ein Vorschlag und wird in einer Sitzung im Projekt KCSB-Kasse festgelegt, zusammen mit dem Import. Bis dahin baut die Strafen-App keinen Export.

## Weg vom Kegeltisch in die Kasse

Die Kasse läuft auf einem Rechner ohne Kamera. Vom iPad bzw. Handy kommt der Abend per Mail an den eigenen Rechner. Dafür gibt es zwei Wege mit demselben Code:

1. **QR-Code als Bildschirmfoto (Hauptweg).** Nach dem Abschluss zeigt die App einen QR-Code. Der Schriftführer macht ein Bildschirmfoto und schickt es mit dem Foto der Rechnung per Mail an den Rechner. In der Kasse lädt er beide zusammen beim Abend hoch, wie heute die Belege. Die Kasse erkennt den QR-Code selbst. Nebenbei liegt das Bildschirmfoto als Sicherung in der Fotomediathek.
2. **Code als Text (Ersatzweg).** „Code teilen“ öffnet das Teilen-Menü, dort Mail wählen. In der Kasse wird der Text in ein Feld eingefügt. Gedacht für den Fall, dass ein QR-Code nicht lesbar ist.

Eine eigene Datei zum Teilen gibt es nicht; das Bildschirmfoto übernimmt ihre Rolle (entschieden am 18.11.2026).

## Idee für den Import

Die Kasse liest Strafenzettel und Schnaps-Liste heute per Bilderkennung ein. Das Ergebnis sind zwei feste JSON-Schemas: `Strafenzettel` und `Schnapsliste` in `src/kcsb_kasse/erkennung/modelle.py`. Danach prüft der Kassenwart in der Prüfansicht und übernimmt mit „In den Abend übernehmen“.

Der Export der App liefert **genau diese beiden Schemas**, nur ohne Unsicherheit. Die Kasse ersetzt damit nur den Schritt „Bild erkennen“ durch „Code lesen“. Prüfansicht, Namenszuordnung, Katalogprüfung und Übernahme bleiben, wie sie sind.

## Aufbau des Codes

```
KCSB1.<Daten>.<Prüfsumme>
```

| Teil | Inhalt |
| --- | --- |
| `KCSB1` | Kennung und Formatversion. Ein inkompatibles Format bekommt `KCSB2`. Die Kasse lehnt unbekannte Versionen mit klarer Meldung ab. |
| `<Daten>` | JSON (siehe unten), als UTF-8 kodiert, mit gzip gepackt, dann Base64url ohne `=` am Ende. Damit übersteht der Code Mail und Messenger ohne Sonderzeichen. |
| `<Prüfsumme>` | Die ersten 8 Hex-Zeichen von SHA-256 über den Daten-Teil (den Base64url-Text). Damit erkennt die Kasse abgeschnittene oder veränderte Codes. Es ist kein Schutz gegen Fälschung und soll keiner sein. |

**Größe:** Gerechnet für einen großen Abend mit 14 Personen, je 7 verschiedenen Vergehen, Sonderbeträgen, Essen, Fußball und 15 Schnaps-Runden. Ohne Packung sind das 10,8 KB JSON und ein Code mit rund 14.500 Zeichen, zu viel für einen QR-Code. Mit gzip sind es rund 1.450 Zeichen, also ein QR-Code der Version 31 bis 32 (bis 145 × 145 Punkte).

**Probelauf** (18.11.2026): Ein Code dieser Länge wurde als QR-Code erzeugt und mit `zxing-cpp` aus einem Bild in iPad-Bildschirmgröße zurückgelesen. Das klappte fehlerfrei bei 3, 5 und 8 Pixeln je Punkt, also auch, wenn der Code auf dem Bildschirm nur 450 Pixel breit ist. Die ganze Kette lief ebenfalls durch: Code wie im Browser gepackt, als QR-Code ins Bild, zurückgelesen und mit `lies_code` unten entpackt; das JSON kam unverändert an, mit Umlauten und Anführungszeichen.

**Werkzeuge**

- **App:** `CompressionStream('gzip')`, `crypto.subtle` und `TextEncoder` sind im Browser eingebaut. Für den QR-Code gibt es keine Browser-Funktion; dafür kommt eine kleine MIT-lizenzierte Bibliothek als einzelne Datei in `app/`, ohne npm, damit sie offline mitläuft.
- **Kasse:** `gzip`, `base64` und `hashlib` aus der Standardbibliothek. Zum Lesen des QR-Codes aus dem Bild neu: `zxing-cpp`. Pillow ist schon da.

## Inhalt (JSON)

```json
{
  "datum": "2026-11-21",
  "erstellt": "2026-11-21T23:41",
  "strafenzettel": {
    "monat": "2026-11",
    "spalten": [
      {
        "name": "Benno",
        "anwesend": true, "anwesend_sicher": true,
        "grosser_deckel": true,
        "striche": [
          { "vergehen": "Pudel", "anzahl": 3, "sicher": true },
          { "vergehen": "verlorenes Spiel", "anzahl": 1, "sicher": true }
        ],
        "geldbetraege": [ { "betrag": "0,75", "anzahl": 1, "sicher": true } ],
        "essen": "Schnitzel", "essen_sicher": true,
        "siege": 1, "tore": 2, "vorlagen": 0, "fussball_sicher": true
      }
    ],
    "hinweise": []
  },
  "schnapsliste": {
    "zeilen": [
      { "getraenk": "Ouzo", "zahlt": "Ulf", "trinkt": "Kim", "durchgestrichen": false, "sicher": true }
    ],
    "hinweise": []
  }
}
```

`datum` ist der Tag des Abends, `erstellt` der Zeitpunkt des Exports in Ortszeit. Nach „Wieder öffnen“ und neuem Abschluss entsteht ein neuer Code mit späterem `erstellt`; er ersetzt beim Import den alten vollständig.

### Woher die Werte kommen

| Feld | Aus der App |
| --- | --- |
| `spalten` | eine Spalte pro anwesender Person, Mitglieder und Gäste, in Zettel-Reihenfolge. Abwesende fehlen. |
| `name` | Kurzname exakt wie in `stammdaten.json` bzw. der Kasse; bei Gästen der eingegebene Name |
| `grosser_deckel` | Schalter „Großer Deckel“ beim Abendstart |
| `striche` | pro Vergehen die Zahl der nicht entfernten Striche, einschließlich der Buchungen über „Spielende“. Bei „Alle 9“ und „Kranz Hand“ stehen die Striche bei allen anderen Anwesenden, nicht beim Werfer. Vergehen ohne Strich fehlen. Name exakt wie im Katalog. |
| `geldbetraege` | Sonderbeträge (Personenblatt und Einzelwertung), nach Betrag gruppiert. `betrag` als Text in deutscher Schreibweise wie in der Erkennung, gebildet aus ganzen Cent, nie aus einer Kommazahl. |
| `essen` | Freitext, leer wenn nichts eingetragen |
| `siege`, `tore`, `vorlagen` | Gab es am Abend Fußball (eine Fußball-Wertung oder ein Tor bzw. eine Vorlage), dann Zahlen für alle Anwesenden, auch `0`. Sonst `null`. So bekommen Abwesende in der Kasse richtig den kleinsten Wert der Anwesenden. |
| `*_sicher` | immer `true` |
| `zeilen` | fertige Schnaps-Runden in zeitlicher Reihenfolge. Gestrichene Runden fehlen, `durchgestrichen` ist also immer `false`. |
| `hinweise` | leer |

**Nicht im Export:** die angefangene Schnaps-Runde (verfällt), wer die erste 5 geworfen hat, Uhrzeiten und einzelne Einträge, entfernte Einträge, Abwesende. Die Rechnung kennt die App nicht.

## Lesen in der Kasse (Vorschlag)

```python
import base64, gzip, hashlib, json

def lies_code(text: str) -> dict:
    teile = "".join(text.split()).split(".")  # Zeilenumbrüche aus Mail oder Messenger entfernen
    if len(teile) != 3 or not teile[0].startswith("KCSB"):
        raise ValueError("Das ist kein Code der Strafen-App.")
    if teile[0] != "KCSB1":
        raise ValueError("Der Code stammt aus einer neueren App-Version.")
    daten, pruefsumme = teile[1], teile[2]
    if hashlib.sha256(daten.encode()).hexdigest()[:8] != pruefsumme:
        raise ValueError("Der Code ist unvollständig oder verändert. Bitte neu kopieren.")
    return json.loads(gzip.decompress(base64.urlsafe_b64decode(daten + "=" * (-len(daten) % 4))))
```

Aus einem Bild: `zxingcpp.read_barcodes(bild)` liefert die Texte aller QR-Codes; ein Text, der mit `KCSB` beginnt, geht in `lies_code`. Danach `Strafenzettel.model_validate(d["strafenzettel"])` und `Schnapsliste.model_validate(d["schnapsliste"])`. Wegen `extra="forbid"` fällt jede Abweichung im Format sofort auf.

## Einbau in der Kasse (Vorschlag)

1. **Beim Hochladen der Belege** prüft die Kasse jedes Bild zuerst auf einen QR-Code der Strafen-App. Wird einer gefunden, liest sie ihn, statt das Bild an die Bilderkennung zu schicken. Das ist exakt und kostet keinen Erkennungsaufruf. Alle anderen Bilder, etwa die Rechnung, laufen wie bisher.
2. Zusätzlich ein Feld „Code der Strafen-App einfügen“ für den Ersatzweg per Text.
3. Passt der Monat von `datum` nicht zum Abend, warnen.
4. Aus dem Code zwei Belege anlegen, Typ `strafenzettel_neu` und `schnapsliste`. `ergebnis` ist das jeweilige JSON, Status `erkannt`, `erkannt_mit` „Strafen-App“. Ab hier laufen Prüfansicht und „In den Abend übernehmen“ unverändert, mit `neuer_zettel=True`. Den Strafenzettel vor der Schnaps-Liste übernehmen, damit Gäste als Zahler gefunden werden.

## Offen, gemeinsam zu entscheiden

- **Gäste mit Strichen:** Die Kasse ignoriert Striche von Gästen und meldet das jeweils als Hinweis. Soll die App sie trotzdem exportieren (vollständig, aber mit Hinweisen) oder bei Gästen nur Anwesenheit und Essen?
- **Prüfansicht:** Soll der Kassenwart App-Daten wie Erkennungsdaten erst prüfen, oder reicht bei gültiger Prüfsumme die direkte Übernahme? Der Vorschlag oben behält die Prüfung bei, weil das ohne neuen Code geht.
- **Neue Abhängigkeit in der Kasse:** `zxing-cpp` zum Lesen des QR-Codes.
