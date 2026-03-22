import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { supabase } from "../lib/supabase";

export default function Home() {
  const mapRef = useRef();
  const mapInstance = useRef();

  const [events, setEvents] = useState([]);
  const [zones, setZones] = useState([]);
  const [alerts, setAlerts] = useState([]);

  function threatLevel(t) {
    t = t.toLowerCase();
    if (/nuclear|ballistic/.test(t)) return 5;
    if (/missile|strike/.test(t)) return 4;
    if (/troops/.test(t)) return 3;
    return 1;
  }

  function pushAlert(msg) {
    setAlerts(a => [msg, ...a.slice(0, 20)]);
  }

  useEffect(() => {
    loadZones();
  }, []);

  async function loadZones() {
    const { data } = await supabase.from("watch_zones").select("*");
    setZones(data || []);
  }

  useEffect(() => {
    if (mapInstance.current) return;

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      center: [0, 20],
      zoom: 2,
    });

    mapInstance.current = map;

    fetch("/api/news")
      .then(res => res.json())
      .then(data => {
        setEvents(data);

        data.forEach(e => {
          const threat = threatLevel(e.title);

          // ZONE CHECK
          zones.forEach(z => {
            if (Math.abs(e.lat - z.lat) < 3 && Math.abs(e.lon - z.lon) < 3) {
              pushAlert(`⚠️ ${z.name}: ${e.title}`);
            }
          });

          if (threat >= 4) {
            pushAlert("🚨 " + e.title);
          }

          new maplibregl.Marker({
            color: threat >= 4 ? "red" : "orange"
          })
            .setLngLat([e.lon, e.lat])
            .addTo(map);
        });
      });

  }, [zones]);

  return (
    <div>
      <div ref={mapRef} style={{ height: "100vh" }} />

      <div style={{
        position:"absolute",
        bottom:0,
        width:"100%",
        display:"flex",
        overflowX:"scroll"
      }}>
        {alerts.map((a,i)=><div key={i}>{a}</div>)}
      </div>
    </div>
  );
}
