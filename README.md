PyPoE Parser
============
Parse extracted large JSON file from [PyPoE][] into parts.

Must to Know
------------
At first, you must know what you're doing and how to use [PyPoE][], here's
some useful links:

- [OmegaK2/PyPoE][PyPoE]
- [PoE Wiki - PyPoE][]

This repo contains only tiny script which to parse large json into parts with
specific structure, from:

#### data.json
```js
[
  { "filename": "fileA.json", "header": {...}, "data": {...} },
  { "filename": "fileB.json", "header": {...}, "data": {...} },
  ...
]
```

to:

#### fileA.json
```js
{ "filename": "fileA.json", "header": {...}, "data": {...} }
```

#### fileB.json
```js
{ "filename": "fileB.json", "header": {...}, "data": {...} }
```

. The script is not related to PoE exactly (ﾉ∀\`)

Btw, the use case seems really uncommon, no more document unless somebody asked.

Quick Start
-----------
1. Install
    ```sh
    git clone https://github.com/shirohana/pypoe-parser
    cd pypoe-parser
    yarn install
    ```

2. Usage
    ```txt
    Usage: parse-json [-m | --minimize] [-o <dir> | --output-dir=<dir>]
                      <target.json>
    ```

3. Extract full data as JSON format from PyPoE
    ```sh
    pypoe_extractor setup perform
    pypoe_extractor dat json data.json # data.json close to 288MB
    ```

4.
    ```sh
    # Extract hundreds JSON file to ./dist with human-readable JSON format
    ./bin/parse-json data.json

    # Minimized
    ./bin/parse-json -m data.json

    # Custom output directory
    ./bin/parse-json -m data.json -o ./another/dir
    ```

---

Remember the use-terms and policy of [Grinding Gear Games][ggg] and
[Path of Exile][], be a good fan/gamer.

[Path of Exile]: https://www.pathofexile.com/
[PoE Wiki - PyPoE]: https://pathofexile.gamepedia.com/Path_of_Exile_Wiki:PyPoE
[PyPoE]: https://github.com/OmegaK2/PyPoE
[ggg]: http://www.grindinggear.com
