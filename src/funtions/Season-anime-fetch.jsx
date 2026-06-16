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
              coverImage { large }
              type
              status
              format
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
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://anilist.co',
      },
      body: JSON.stringify({ query, variables: { id } }),
    });
    const json = await res.json();
    return json.data.Media
}




async function getFullSequels(startId) {
  const result = [];
  const ids = [startId];
  const visited = new Set([startId]);

  for (let index = 0; index < ids.length; index++) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // espera 1s entre requests

    const anime = await relatedAnime(ids[index]);
    const filtered = anime.relations.edges.filter(
      e => e.node.type === 'ANIME' && (e.relationType === 'SEQUEL' || e.relationType === 'PREQUEL' ) && e.node.status !== 'NOT_YET_RELEASED'
    );

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

export const infoFetch = async (id) => {
  const query = `
    query($search: String) {
      Media(search: $search, type: ANIME) {
        description(asHtml: false)
        title { english romaji }
        averageScore
        format
        episodes
        genres
        status
        relations {
          edges {
            relationType
            node {
              id
              title { romaji english }
              coverImage { large }
              type
              status
            }
          }
        }
        startDate { year month day }
        bannerImage
        coverImage { extraLarge medium }
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

  try {
    const res = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://anilist.co',
      },
      body: JSON.stringify({ query, variables: { search: id } }),
    });

    const json = await res.json();
    const anime = json.data.Media;
    const mainStudio = anime.studios.edges.find(a => a.isMain);

    const cleanDesc = anime.description
      ? anime.description
          .replace(/<[^>]+>/g, "")
          .replace(/\([^)]+\)\s*Notes?:[\s\S]*/i, "")
          .replace(/\(Source:[^)]+\)/gi, "")
          .replace(/\(Note:[^)]+\)/gi, "")
          .trim()
      : "";

    const epRes = await fetch(`https://api.ani.zip/mappings?anilist_id=${anime.id}`);
    const epJson = await epRes.json();
    const kitsuId = epJson.mappings?.kitsu_id;
    const kitsuThumbs = {};
    const totalEpisodes = epJson.episodeCount;

    const aniZipEpisodes = Object.entries(epJson.episodes ?? {}).map(([num, ep]) => ({
      episode: parseInt(num),
      title: ep.title,
      image: ep.image,
      runtime: ep.runtime,
      airdate: ep.airdate,
      overview: ep.overview,
    }));

    const epDesc = {};
    const fetchKitsuPage = async (page) => {
      const res = await fetch(
        `https://kitsu.io/api/edge/anime/${kitsuId}/episodes?page[limit]=20&page[offset]=${(page - 1) * 20}`
      );
      const json = await res.json();
      json.data?.forEach(ep => {
        const num = ep.attributes.number;
        if (ep.attributes.description) epDesc[num] = ep.attributes.description;
        const thumb = ep.attributes.thumbnail?.original;
        if (thumb) kitsuThumbs[num] = thumb;
      });
    };
    console.log(await getFullSequels(anime.id));
    
    const totalPages = Math.ceil(totalEpisodes / 20);
    await Promise.all(
      Array.from({ length: totalPages }, (_, i) => i + 1).map(page => fetchKitsuPage(page))
    );

    const autor = anime.staff.edges.find(e => e.role === 'Director')?.node.name.full ?? 'N/A';
    const allRelated = []
    const info = {
      banner: anime,
      title: anime.title.english ?? anime.title.romaji,
      format: anime.format,
      description: cleanDesc,
      episodes: totalEpisodes,
      genres: anime.genres,
      score: anime.averageScore / 10,
      year: anime.startDate.year,
      studio: mainStudio?.node.name ?? 'N/A',
      autor,
      status: anime.status,
      epInfo: aniZipEpisodes,
      epBanner: kitsuThumbs,
      imgBanner: anime.bannerImage,
      continuation: allRelated,
      epDesc,
    };
    return info;
  } catch (error) {
    console.log(error);
  }
};