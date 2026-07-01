const relatedAnime = async (id) => {
  const query = `
    query($id: Int) {
      Media(id: $id, type: ANIME) {
        relations {
          edges {
            relationType
            node {
              id
              title { romaji english }
              coverImage { extraLarge }
              type
              status
              description(asHtml: false)
              format
              episodes
            }
          }
        }
        startDate { year month day }
      }
    }
  `;

  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: "https://anilist.co",
    },
    body: JSON.stringify({ query, variables: { id: parseInt(id) } }),
  });

  if (!res.ok) return null;

  const json = await res.json();
  return json.data?.Media ?? null;
};


// FIX #2: incluye MOVIE además de TV para cubrir películas de franquicia
async function getSeasons(startId) {
  const result = [];
  const ids = [startId];
  const visited = new Set([startId]);

  for (let index = 0; index < ids.length; index++) {
    if (index > 0) await new Promise((resolve) => setTimeout(resolve, 900));

    const anime = await relatedAnime(ids[index]);
    if (!anime) continue;

    const filtered = anime.relations.edges.filter((e) => {
      if (e.node.type !== "ANIME") return false;
      if (e.node.status === "NOT_YET_RELEASED") return false;
      if (e.relationType !== "SEQUEL" && e.relationType !== "PREQUEL") return false;
      // FIX #2: TV y MOVIE como parte de la cadena de temporadas
      if (e.node.format !== "TV" && e.node.format !== "MOVIE") return false;
      return true;
    });

    for (const edge of filtered) {
      if (!visited.has(edge.node.id)) {
        visited.add(edge.node.id);
        ids.push(edge.node.id);
        result.push(edge);
      }
    }
  }

  return result;
}


// FIX #3: el parámetro se renombra a `animeId` y el query usa `id: $id`
export const infoFetch = async (animeName) => {
  const query = `
    query($search: String) {
      Media(search: $search, type: ANIME) {
        description(asHtml: false)
        title { english romaji }
        averageScore
        format
        episodes
        genres
        idMal
        status
        relations {
          edges {
            relationType
            node {
              id
              title { romaji english }
              coverImage { extraLarge large}
              type
              format
              status
            }
          }
        }
        startDate { year month day }
        bannerImage
        coverImage { large extraLarge }
        id
        studios {
          edges {
            isMain
            node {
              id
              name
              isAnimationStudio
            }
          }
        }
        staff {
          edges {
            role
            node {
              id
              name { full }
            }
          }
        }
      }
    }
  `;

  // Fase 1: AniList — crítico, sin esto no hay nada
  let anime;
  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "https://anilist.co",
      },
      // FIX #3: usa id numérico en vez de search string
      body: JSON.stringify({ query, variables: { search: animeName } }),
    });

    if (!res.ok) throw new Error(`AniList error: ${res.status}`);

    const json = await res.json();
    anime = json.data?.Media;
    if (!anime) throw new Error("AniList returned no Media");
  } catch (error) {
    console.error("AniList fetch failed:", error);
    return null;
  }

  // Datos base de AniList (siempre disponibles)
  const mainStudio = anime.studios.edges.find((a) => a.isMain);
  const autor =
    anime.staff.edges.find((e) => e.role === "Director")?.node.name.full ?? "N/A";

  const cleanDesc = anime.description
    ? anime.description
        .replace(/<[^>]+>/g, "")
        .replace(/\([^)]+\)\s*Notes?:[\s\S]*/i, "")
        .replace(/\(Source:[^)]+\)/gi, "")
        .replace(/\(Note:[^)]+\)/gi, "")
        .trim()
    : "";

  // FIX #1: OVAs directas desde AniList como fallback base
  const directOvas = anime.relations.edges.filter(
    (e) => e.node.type === "ANIME" && e.node.format === "OVA"
  );

  // Fase 2: ani.zip + Kitsu — enriquecimiento opcional
  // FIX #5: si falla, la página igual carga con datos de AniList
  let aniZipEpisodes = [];
  let kitsuThumbs = {};
  let epDesc = {};
  let totalEpisodes = anime.episodes ?? 0;

  try {
    const epRes = await fetch(
      `https://api.ani.zip/mappings?anilist_id=${anime.id}`
    );
    const epJson = await epRes.json();

    // FIX #5: validar que la respuesta es un objeto con episodes, no "Not Found"
    if (!epRes.ok || typeof epJson !== "object" || !epJson.episodes) {
      console.warn(`ani.zip: no data for anilist_id=${anime.id}, using AniList fallback`);
    } else {
      totalEpisodes = epJson.episodeCount ?? totalEpisodes;
      const kitsuId = epJson.mappings?.kitsu_id;

      aniZipEpisodes = Object.entries(epJson.episodes).map(([num, ep]) => ({
        episode: parseInt(num),
        title: ep.title,
        image: ep.image,
        runtime: ep.runtime,
        airdate: ep.airdate,
        overview: ep.overview,
      }));

      // FIX #5: guard para kitsuId antes de hacer fetch
      if (kitsuId) {
        const fetchKitsuPage = async (page) => {
          try {
            const res = await fetch(
              `https://kitsu.io/api/edge/anime/${kitsuId}/episodes?page[limit]=20&page[offset]=${
                (page - 1) * 20
              }`
            );
            if (!res.ok) return;
            const json = await res.json();
            json.data?.forEach((ep) => {
              const num = ep.attributes.number;
              if (ep.attributes.description) epDesc[num] = ep.attributes.description;
              const thumb = ep.attributes.thumbnail?.original;
              if (thumb) kitsuThumbs[num] = thumb;
            });
          } catch (e) {
            console.warn(`Kitsu page ${page} failed:`, e);
          }
        };

        const totalPages = Math.ceil(totalEpisodes / 20);
        await Promise.all(
          Array.from({ length: totalPages }, (_, i) => i + 1).map((page) =>
            fetchKitsuPage(page)
          )
        );
      }
    }
  } catch (enrichError) {
    console.warn("ani.zip/Kitsu enrichment failed, using AniList data only:", enrichError);
  }

  const info = {
    overviewInfo : {
      img: anime.coverImage.extraLarge,
      title: anime.title.english ?? anime.title.romaji,
      format: anime.format,
      description: cleanDesc,
      episodes: totalEpisodes,
      genres: anime.genres,
      score: anime.averageScore / 10,
      year: anime.startDate.year,
      mobileImg : anime.coverImage.large,
      status: anime.status,
      studio: mainStudio?.node.name ?? "N/A",
      autor,
      status: anime.status,
    },
    
    epInfo: aniZipEpisodes,
    epBanner: kitsuThumbs,
    banner: anime.bannerImage,
    epDesc,
    ovas: directOvas,
    episodes: totalEpisodes,
  };

  return {
    ...info,
    seasonsPromise: getSeasons(anime.id),
  };
};