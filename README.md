## 1. What phenomenon or experience is your project representing?

The project represents the experience of understanding one’s own personality in a way that can be expressed simply to strangers. This astrology knowledge can be used for icebreaking.

## 2. What part of that experience matters most?

The experience helps the user with social interactions, enhances self-understanding, and is a source of entertainment.

## 3. Does your current prototype represent that experience well? What does it capture or leave out?

Our current prototype represents self-exploration well by showing users personality traits based on their astrology signs. The prototype shows how connecting a mystical knowledge domain and technology can make astrology more accessible and personalized. However, it does not fully represent the social aspect yet. We could improve it by adding more features that encourage users to share their results and use them as conversation starters.

# Spark

Open `index.html` directly in a modern browser. No installation, build tools, internet connection, API keys, or external services are required. All scripts, styles, and city data are local. Birth details are never sent or saved.

Enter a date in MM/DD/YYYY format (1900–2100), local time in HH:MM 24-hour format, and a birthplace. The offline list includes 72 cities. Other locations are supported by entering coordinates and the UTC offset at birth. Coordinates use north/east positive and south/west negative values. Listed cities use city-center coordinates; these can be refined in the expandable location section.

Listed cities use the browser's built-in IANA time-zone data, including historical daylight saving rules. Historical accuracy depends on the browser's time-zone database. A manual UTC offset overrides automatic conversion. Repeated or skipped clock times are rejected with instructions to check the time or specify an offset. For an unlisted birthplace, all manual fields are required.

The calculator uses the Western tropical zodiac, geocentric Sun/Moon longitudes, and the eastern intersection of the horizon and ecliptic for the ascendant. Orbital elements and lunar longitude perturbations follow [Paul Schlyter's astronomical algorithms](https://www.stjarnhimlen.se/comp/ppcomp.html). These are approximate positions, without nutation, aberration, or a delta-T model. Results within 0.2° of a sign boundary are flagged; exact cusp placements need a higher precision ephemeris and accurate birth information. Geographical poles are unsupported. Astrology interpretations are for reflection and entertainment.

Files: `index.html` (page), `style.css` (responsive styling), `astro.js` (astronomy and time conversion), `app.js` (city data and form behavior). Optional calculation checks: `node tests.cjs` using Node's built-in test/assert tools, without dependencies.

## Interpretation pages

Calculated sign links open `sign.html` with the three sign names and selected placement in the URL, without the birth date, time, or coordinates. The page presents an approximately 340–380-word overview covering social presence, self-expression, emotional comfort, the trio together, and a practical reflection. The clicked placement is highlighted by its section anchor. Direct links with only `sign` and `placement` retain a standalone reading of approximately 400 words. Content is generated locally from authored text in `sign.js`; no AI service or external request is made at runtime.

Interpretation background was reviewed on CHANI (Sun, Moon, and rising roles), Cafe Astrology (Moon signs, both pages), and Astrology.com (ascendant meanings). Exact links appear on the reading page. Interpretations and social exercises are original editorial content, not quotations, scientific personality assessments, or predictions. No gender-specific assumptions or claims about physical appearance are used.

Reading navigation now opens a separate URL for each placement, preserving all three calculated signs. Only the selected placement is rendered, with its zodiac symbol, clothing colors, and three decorative heading emojis. The selected navigation link uses aria-current="page".
