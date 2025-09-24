# Data Pathways — Healthy Cities & Human Settlements

## Setup Instructions
1. **NASA API Key**:
   - Obtain a key from https://api.nasa.gov/.
   - Replace `YOUR_NASA_API_KEY_HERE` in `main.js` with your key.
2. **GIBS Tile Server**:
   - Use NASA's GIBS API for map tiles: https://gibs.earthdata.nasa.gov/.
   - Update `main-map` in `index.html` with tile layer integration or use a static SVG/GeoJSON.
3. **CORS Handling**:
   - Use a serverless proxy (e.g., AWS Lambda) to handle NASA API requests and avoid CORS issues.
   - Example: Route requests through `/api/nasa?year=2025&key=YOUR_NASA_API_KEY_HERE`.
4. **Demo Mode**:
   - Toggle `#data-toggle` to switch between live NASA data and demo JSON.
   - Demo data is bundled in `main.js` under `// DEMO DATA`.
5. **Dataset-to-Indicator Mapping**:
   - NDVI (MODIS/Landsat): Green cover score.
   - LST (MODIS): Heat index (inverted).
   - AIRS/OMI: Air quality proxies.
   - GPM: Precipitation for water risk.
   - GRACE: Groundwater anomalies.
   - Infrastructure: Placeholder (local data).

## Notes
- Lazy-load images (`assets/*.webp`) and cache API responses.
- Ensure ARIA labels and keyboard navigation for accessibility.
- Use `styles.css` for responsive, mobile-first design.