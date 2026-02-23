/**
 * Groups music tracks by year and returns sorted titles
 * @param {Array} tracks - Array of track objects
 * @returns {Object} - Object with years as keys and sorted title arrays as values
 */

function getMusicTitlesByYear(tracks) {
  const result = {};
  if (!Array.isArray(tracks) || tracks.length === 0) return result;

for (const track of tracks) {
  if (!track || typeof track !== 'object') continue;

  if (typeof track.title !== 'string') continue;

  if (typeof track.year !== "number" || Number.isNaN(track.year)) continue;

  if (!result[track.year]) result[track.year] = [];
  result[track.year].push(track.title);
}

  for (const year in result) {
    result[year].sort();
  }

  return result;
}

/**
 * Filters tracks by criteria and adds decade information
 * @param {Array} tracks - Array of track objects
 * @param {Object} criteria - Filter criteria (minYear, maxYear, artist)
 * @returns {Array} - Filtered and transformed track objects
 */
function filterAndTransformTracks(tracks, criteria) {
 
  if (!Array.isArray(tracks) || tracks.length === 0) return [];


  criteria = criteria || {};

  const { minYear, maxYear, artist } = criteria;

  const artistFilter = (typeof artist === 'string' && artist.trim() !== '')
    ? artist.trim().toLowerCase()
    : null;

  const out = [];

  for (const track of tracks) {
   
    if (!track || typeof track !== 'object') continue;

    const { title, year, artist: trackArtist } = track;

    if (typeof title !== 'string') continue;
    if (typeof trackArtist !== 'string') continue;
    if (typeof year !== 'number' || Number.isNaN(year)) continue;

    if (typeof minYear === 'number' && !Number.isNaN(minYear) && year < minYear) continue;
    if (typeof maxYear === 'number' && !Number.isNaN(maxYear) && year > maxYear) continue;


    if (artistFilter !== null && trackArtist.toLowerCase() !== artistFilter) continue;


    const decadeStart = Math.floor(year / 10) * 10;
    const decade = `${decadeStart}s`;

    out.push({ title, artist: trackArtist, year, decade });
  }

  return out;
}

module.exports = {
    getMusicTitlesByYear,
    filterAndTransformTracks
};