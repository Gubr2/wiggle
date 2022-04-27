////////////////////////////////////////
////////////// WIGGLE API //////////////
//////////////    v1.1    //////////////
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
  // ---> Výsledok: Success/Error log v konzoli

  updateStudentSchool(id, newSchool) {
    fetch('https://wiggle.gubrica.com/api_updateStudentSchool.php', {
      credentials: 'same-origin',
      method: 'POST',
      body: `id=${id}&newSchool=${newSchool}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      if (response.ok) {
        console.log('Student school updated successfully!')
      } else {
        throw new Error('Something went wrong while updating student school.')
      }
    })
  }

  // Update School List

  // ---> Info:     Aktualizovanie zoznamu škôl (dá sa použiť aj na prvé načítanie zoznamu)
  // ---> Schéma:   updateSchoolList( rok[integer], semester[string], kategóriu[string] )
  //                Funkcia očakáva školský rok vo forme: 2022, 2023... semester vo forme: 'LS', 'ZS' (veľkými písmenami)... semester vo forme: 'mk', 'av', 'md', 'vse'
  // ---> Výsledok: JSON. Funkcia vráti školu so zoznamom študentov

  getSchoolList(year, semester, category) {
    return fetch('https://wiggle.gubrica.com/api_getSchoolList.php', {
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

  // Update Student Information Status

  // ---> Info:     Aktualizovanie údaju "Dá vedieť"
  // ---> Schéma:   updateStudentInformationStatus( id_študenta[integer], dá_vedieť[boolean] )
  //                Funkcia očakáva id študenta a údaj 0/1 pre údaj "Dá vedieť"
  // ---> Výsledok: Success/Error log v konzoli

  updateStudentInformationStatus(id, daVediet) {
    fetch('https://wiggle.gubrica.com/api_updateStudentInformationStatus.php', {
      credentials: 'same-origin',
      method: 'POST',
      body: `id=${id}&daVediet=${daVediet}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      if (response.ok) {
        console.log('Student information status updated successfully!')
      } else {
        throw new Error('Something went wrong while updating student information status.')
      }
    })
  }

  // Get Year and Semester

  // ---> Info:     Získanie konkrétnych výberových konaní a ich stavov zamknutia
  // ---> Schéma:   getYearAndSemester()
  //                Funkcia neočakáva žiadne argumenty
  // ---> Výsledok: JSON. Funkcia vráti konkrétne výberových konania a ich stavy zamknutia

  getYearAndSemester() {
    return fetch('https://wiggle.gubrica.com/api_getYearAndSemester.php', {
      credentials: 'same-origin',
      method: 'POST',
      body: '',
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

  // Update Student Note

  // ---> Info:     Aktualizovanie poznámky študenta
  // ---> Schéma:   updateStudentSchool( id_študenta[integer], poznámka[string] )
  //                Funkcia očakáva id študenta a poznámku
  // ---> Výsledok: Success/Error log v konzoli

  updateStudentNote(id, note) {
    fetch('https://wiggle.gubrica.com/api_updateStudentNote.php', {
      credentials: 'same-origin',
      method: 'POST',
      body: `id=${id}&note=${note}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      if (response.ok) {
        console.log('Student note updated successfully!')
      } else {
        throw new Error('Something went wrong while updating student note.')
      }
    })
  }
}

//////////////////////////
/////////////////////////////////////
/////////////////////////

//
// TESTING
//

const api = new WiggleApi()

api.getSchoolList(2022, 'ZS', 'mk').then((data) => {
  console.log(data)
})
