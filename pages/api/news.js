const GEO = "YOUR_OPENCAGE_KEY";

async function geo(loc) {
  const r = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${loc}&key=${GEO}`
  );
  const d = await r.json();
  return d.results[0]?.geometry;
}

export default async function handler(req, res) {
  const r = await fetch(
    "https://api.gdeltproject.org/api/v2/doc/doc?query=military OR strike OR missile&format=json"
  );
  const d = await r.json();

  const out = [];

  for (let a of d.articles.slice(0, 10)) {
    const loc = a.title.split(" in ")[1] || "Europe";
    const g = await geo(loc);

    if (!g) continue;

    out.push({
      title: a.title,
      url: a.url,
      lat: g.lat,
      lon: g.lng
    });
  }

  res.json(out);
}
