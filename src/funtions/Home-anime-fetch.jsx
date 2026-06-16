export const animeFetch = async (animeId) => {
  const topIds = animeId.slice(0,10);
  const recIds = animeId.slice(10,34);
  const libIds = animeId.slice(34,58);
  const seaIds = animeId.slice(58);

  const query =  `
    query($topIds: [Int], $recIds: [Int], $libIds: [Int], $seaIds : [Int]){
      top : Page(perPage : 10){
      media(id_in : $topIds, type : ANIME){
        description(asHtml: false)
        title { romaji english native }
        genres
        format
        episodes
        averageScore
        id
        }
      }

    recomandations : Page(perPage : 24){
      media(id_in : $recIds, type : ANIME){
        title { romaji english native }
        coverImage { extraLarge }
        episodes
        bannerImage
        genres
        id
        }
      }

      library : Page(perPage : 24){
      media(id_in : $libIds, type : ANIME){
        title { romaji english native }
        coverImage { extraLarge }
        episodes
        id
        }
      }

      season : Page(perPage : 3){
      media(id_in : $seaIds, type : ANIME){
        title { romaji english native }
        coverImage { extraLarge }
        episodes
        description(asHtml: false)
        id
        genres
        }
      }
    }
  `
  try {
    const res = await fetch('https://graphql.anilist.co', {
      method: "POST",
      headers: { 'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': 'https://anilist.co', },
      body: JSON.stringify({ query, variables: { topIds,recIds,libIds,seaIds  } })
    })
    const json = await res.json();
    let totalEp = {};
    for (let index = 0; index < topIds.length; index++) {
      const epRes = await fetch(`https://api.ani.zip/mappings?anilist_id=${topIds[index]}`);
      const epJson = await epRes.json();
      totalEp[topIds[index]] = epJson.episodeCount
    }
      return [totalEp, json.data]
      console.log(json.data);
      

  } catch (err) {
    console.warn(`animeFetch falló para ID ${animeId}:`, err)
    return null
  }
}
