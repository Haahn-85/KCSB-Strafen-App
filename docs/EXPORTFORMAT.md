# Exportformat Strafen-App → KCSB-Kasse

**Festgelegt am 18.11.2026** in der KCSB-Kasse (`SPEC.md` 7.1), dort ist der Import gebaut (`src/kcsb_kasse/erkennung/strafen_app.py`, `belege.py`). Die Kasse verweist für die Felder auf dieses Dokument. Die Strafen-App erzeugt den Code seit 19.11.2026 (`exportDaten` und `machCode` in `app/index.html`). Änderungen am Format nur in beiden Projekten zugleich, sonst mit neuer Kennung `KCSB2`.

## Weg vom Kegeltisch in die Kasse

Die Kasse läuft auf einem Rechner ohne Kamera. Vom iPad bzw. Handy kommt der Abend per Mail an den eigenen Rechner. Dafür gibt es zwei Wege mit demselben Code:

1. **QR-Code als Bildschirmfoto (Hauptweg).** Nach dem Abschluss zeigt die App einen QR-Code. Der Schriftführer macht ein Bildschirmfoto und schickt es mit dem Foto der Rechnung per Mail an den Rechner. In der Kasse lädt er beide zusammen beim Abend hoch, wie heute die Belege. Die Kasse erkennt den QR-Code selbst. Nebenbei liegt das Bildschirmfoto als Sicherung in der Fotomediathek.
2. **Code als Text (Ersatzweg).** „Code teilen“ öffnet das Teilen-Menü, dort Mail wählen. In der Kasse wird der Text in ein Feld eingefügt. Gedacht für den Fall, dass ein QR-Code nicht lesbar ist.

Eine eigene Datei zum Teilen gibt es nicht; das Bildschirmfoto übernimmt ihre Rolle (entschieden am 18.11.2026).

## Grundidee

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

**Probelauf** (18.11.2026): Ein Code dieser Länge wurde als QR-Code erzeugt und mit `zxing-cpp` aus einem Bild in iPad-Bildschirmgröße zurückgelesen. Das klappte fehlerfrei bei 3, 5 und 8 Pixeln je Punkt, also auch, wenn der Code auf dem Bildschirm nur 450 Pixel breit ist.

**Probe mit der fertigen App** (19.11.2026): Großer Abend mit 14 Personen, Fußball, Essen mit Umlauten und Anführungszeichen, 15 Runden; Code 1.302 Zeichen, QR-Code 137 × 137 Punkte. Bildschirmfotos in Handy-Größe (1170 × 2532) und iPad-Größe (1640 × 2360) las die Kasse mit `code_im_bild`, `lies_code` und `auswerten` fehlerfrei; das JSON kam unverändert an. Auch auf 640 Pixel lange Kante verkleinert und als JPEG gespeichert blieb der Code lesbar.

**Werkzeuge**

- **App:** `CompressionStream('gzip')`, `crypto.subtle` und `TextEncoder` sind im Browser eingebaut (Safari ab 16.4). Den QR-Code zeichnet `app/qrcode.js` (qrcode-generator 2.0.4 von Kazuhiko Arase, MIT, unverändert übernommen, kein npm); der Service Worker hält die Datei offline vor. Fehlerkorrektur Stufe M, Größe automatisch, Ausgabe als SVG schwarz auf weiß mit Ruhezone. „Code als Text teilen“ teilt nur den Code, ohne Titel, weil manche Apps den Titel vor den Text setzen.
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

## Lesen in der Kasse

Umgesetzt in `erkennung/strafen_app.py` der Kasse, im Kern so:

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

## Einbau in der Kasse

Umgesetzt wie in `SPEC.md` 7.1 der Kasse: Beim Hochladen prüft die Kasse jedes Bild zuerst auf diesen QR-Code und liest ihn statt der Bilderkennung; der Text-Code lässt sich im Reiter Belege einfügen. Aus einem Code entstehen zwei Belege (Strafenzettel neu, Schnaps-Liste) mit Status „erkannt“. Erst den Strafenzettel übernehmen, dann die Schnaps-Liste. Passt der Monat von `datum` nicht zum Abend, steht ein Hinweis am Strafenzettel.

## Entschieden (18.11.2026, Kasse SPEC 7.1)

- **Gäste mit Strichen:** Die App exportiert sie vollständig. Die Kasse ignoriert Striche von Gästen und meldet das als Hinweis; „Großer Deckel“ bei einem Gast setzt dort „beim großen Deckel mitrechnen“.
- **Prüfansicht bleibt Pflicht**, auch bei gültiger Prüfsumme.
- **Neue Abhängigkeit in der Kasse:** `zxing-cpp` zum Lesen des QR-Codes.
