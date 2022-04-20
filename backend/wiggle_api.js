////////////////////////////////////////
////////////// WIGGLE API //////////////
//////////////    v1.0    //////////////
////////////////////////////////////////

export default class WiggleApi {
  constructor() {}

  //
  // FUNKCIE
  //

  // Get School Alternatives

  // ---> Info:     Získanie alternatívných škôl pre študenta, ktoré majú voľné miesto v rovnakej kategórii, akej sa nachádza študent
  // ---> Schéma:   getSchoolAlternatives( kategória_študenta[string] )
  //                Funkcia očakáva nasledovné argumenty pre kategóriu študenta: 'MK', 'AV', 'MD' (veľkými písmenami)
  // ---> Výsledok: JSON

  getSchoolAlternatives(category) {
    return fetch('https://wiggle.gubrica.com/api_getSchoolAlternatives.php', {
      credentials: 'same-origin',
      method: 'POST',
      body: `category=${category}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
  }

  // Get Student Details

  // ---> Info:     Získanie detailných informácií študenta pri kliknutí na jeho meno
  // ---> Schéma:   getStudentDetails( id_študenta[integer] )
  //                Funkcia očakáva id študenta
  // ---> Výsledok: JSON

  getStudentDetails(id) {
    return fetch('https://wiggle.gubrica.com/api_getStudentDetails.php', {
      credentials: 'same-origin',
      method: 'POST',
      body: `id=${id}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
  }

  // Update Student School

  // ---> Info:     Aktualizovanie vybranej školy študenta
  // ---> Schéma:   updateStudentSchool( id_študenta[integer], id_vybranej_školy[integer] )
  //                Funkcia očakáva id študenta a id vybranej školy
  // ---> Výsledok: Žiaden, vybraná škola sa len aktualizuje v databáze

  updateStudentSchool(id, newSchool) {
    fetch('https://wiggle.gubrica.com/api_updateStudentSchool.php', {
      credentials: 'same-origin',
      method: 'POST',
      body: `id=${id}&newSchool=${newSchool}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }

  // Update School List

  // ---> Info:     Aktualizovanie zoznamu škôl (dá sa použiť aj na prvé načítanie zoznamu)
  // ---> Schéma:   updateSchoolList( rok[integer], semester[string], kategóriu[string] )
  //                Funkcia očakáva školský rok vo forme: 2022, 2023... semester vo forme: 'LS', 'ZS' (veľkými písmenami)... semester vo forme: 'mk', 'av', 'md', 'vse'
  // ---> Výsledok: JSON. Funkcia vráti školu so zoznamom študentov

  updateSchoolList(year, semester, category) {
    return fetch('https://wiggle.gubrica.com/api_updateSchoolList.php', {
      credentials: 'same-origin',
      method: 'POST',
      body: `skolsky_rok=${year}&semester=${semester}&kategoria=${category}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
  }
}

//////////////////////////
/////////////////////////////////////
/////////////////////////
