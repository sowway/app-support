# app-support
app-support website

## Languages

The home page defaults to English at `index.html`; `index-ko.html` is the Korean
home page, and the existing `index-en.html` remains available. The language
selection is saved in browser storage when available. Support, privacy, and
contact pages accept `?lang=en` or `?lang=ko`, which takes precedence over a
saved preference. Internal links carry the current language, including links
to specific sections such as `?lang=ko#data-deletion`.
