//       ////       ////       ////         ><<        ><<                      ><<               ><       ><<<<<<<  ><<
//   ///    /// ///    /// ///    ///     ><<        ><< ><                   ><<                >< <<     ><<    ><<><<
//   //       ////  ///  ////       //    ><<   ><   ><<      ><<      ><<    ><<   ><<         ><  ><<    ><<    ><<><<
//   //      // //      // //      //     ><<  ><<   ><<><< ><<  ><< ><<  ><< ><< ><   ><<     ><<   ><<   ><<<<<<<  ><<
//     //  //     //  //     //  //       ><< >< ><< ><<><<><<   ><<><<   ><< ><<><<<<< ><<   ><<<<<< ><<  ><<       ><<
//       //         //         //         >< ><    ><<<<><< ><<  ><< ><<  ><< ><<><          ><<       ><< ><<       ><<
//        ///   /// ///     ///           ><<        ><<><<     ><<      ><< ><<<  ><<<<    ><<         ><<><<       ><<
//          /////      /////                                 ><<      ><<

//////////////////////////////////////////////////////////////////
///////////////////////////    v1.2    ///////////////////////////
//////////////////////////////////////////////////////////////////
///// Made with passion but not expertise, by Gubrica Adrián /////
//////////////////////////////////////////////////////////////////

export default class WiggleApi {
  constructor(server) {
    this.serverDomain = server.url
  }

  //////////////////////////////////////////////////////////

  // ***
  // GET FUNKCIE
  //
  // ***

  // Get Student Details

  // ---> Info:     Získanie detailných informácií študenta pri kliknutí na jeho meno
  // ---> Schéma:   getStudentDetails( id_študenta[integer] )
  //                Funkcia očakáva id študenta
  // ---> Výsledok: JSON

  getStudentDetails(id) {
    return fetch(`${this.serverDomain}/api_getStudentDetails.php`, {
      credentials: 'same-origin',
      method: 'POST',
      body: `id=${id}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
  }

  // Get School

  // ---> Info:     Aktualizovanie konkrétnej školy (
  // ---> Schéma:   getSchool( rok[integer], semester[string], kategóriu[string], id_školy[integer] )
  //                Funkcia očakáva školský rok vo forme: 2022, 2023... semester vo forme: 'LS', 'ZS' (veľkými písmenami)... kategóriu vo forme: 'mk', 'av', 'md', 'vse'... id školy vo forme napr. 6360, 89...
  // ---> Výsledok: JSON. Funkcia vráti konkrétnu školu so zoznamom študentov

  getSchool(year, semester, category, school_id) {
    return fetch(`${this.serverDomain}/api_getSchool.php`, {
      credentials: 'same-origin',
      method: 'POST',
      body: `skolsky_rok=${year}&semester=${semester}&kategoria=${category}&school_id=${school_id}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
  }

  // Get School List

  // ---> Info:     Aktualizovanie zoznamu škôl (dá sa použiť aj na prvé načítanie zoznamu)
  // ---> Schéma:   getSchoolList( rok[integer], semester[string], kategóriu[string] )
  //                Funkcia očakáva školský rok vo forme: 2022, 2023... semester vo forme: 'LS', 'ZS' (veľkými písmenami)... kategóriu vo forme: 'mk', 'av', 'md', 'vse'
  // ---> Výsledok: JSON. Funkcia vráti vybrané školy so zoznamom študentov

  getSchoolList(year, semester, category) {
    return fetch(`${this.serverDomain}/api_getSchoolList.php`, {
      credentials: 'same-origin',
      method: 'POST',
      body: `skolsky_rok=${year}&semester=${semester}&kategoria=${category}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
  }

  // Get School Alternatives

  // ---> Info:     Získanie alternatívných škôl pre študenta, ktoré majú voľné miesto v rovnakej kategórii, akej sa nachádza študent
  // ---> Schéma:   getSchoolAlternatives( kategória_študenta[string] )
  //                Funkcia očakáva nasledovné argumenty pre kategóriu študenta: 'MK', 'AV', 'MD' (veľkými písmenami)
  // ---> Výsledok: JSON

  getSchoolAlternatives(category) {
    return fetch(`${this.serverDomain}/api_getSchoolAlternatives.php`, {
      credentials: 'same-origin',
      method: 'POST',
      body: `category=${category}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
  }

  // Get Year and Semester

  // ---> Info:     Získanie konkrétnych výberových konaní a ich stavov zamknutia
  // ---> Schéma:   getYearAndSemester()
  //                Funkcia neočakáva žiadne argumenty
  // ---> Výsledok: JSON. Funkcia vráti konkrétne výberových konania a ich stavy zamknutia

  getYearAndSemester() {
    return fetch(`${this.serverDomain}/api_getYearAndSemester.php`, {
      credentials: 'same-origin',
      method: 'POST',
      body: '',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
  }

  // Get Export

  // ---> Info:     Získanie .csv súboru z daného ročníka
  // ---> Schéma:   getExport(rok[integer], semester[string])
  //                Funkcia očakáva školský rok vo forme: 2022, 2023... kategóriu vo forme: 'mk', 'av', 'md', 'vse'
  // ---> Výsledok: V prehliadači sa stiahne .csv súbor

  getExport(year, semester) {
    return fetch(`${this.serverDomain}/api_getExport.php`, {
      credentials: 'same-origin',
      method: 'POST',
      body: `year=${year}&semester=${semester}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // ---> Konverzia na .csv formát
        let items = data
        let replacer = (key, value) => (value === null ? ' ' : value) // specify how you want to handle null values here
        let header = Object.keys(items[0])
        let csv = [
          header.join(';'), // header row first
          ...items.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(';')),
        ].join('\r\n')

        // ---> Stiahnutie .csv

        let pom = document.createElement('a')
        let csvContent = '\ufeff' + csv //here we load our csv data
        let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        let url = URL.createObjectURL(blob)

        pom.href = url
        pom.setAttribute('download', `wiggle-export_${year}_${semester}.csv`)
        pom.click()
      })
  }

  //////////////////////////////////////////////////////////

  // ***
  // UPDATE FUNKCIE
  //
  // ***

  // Update Student School

  // ---> Info:     Aktualizovanie vybranej školy študenta
  // ---> Schéma:   updateStudentSchool( id_študenta[integer], id_vybranej_školy[integer] )
  //                Funkcia očakáva id študenta a id vybranej školy
  // ---> Výsledok: Success/Error log v konzoli

  updateStudentSchool(id, newSchool) {
    return new Promise((resolve) => {
      fetch(`${this.serverDomain}/api_updateStudentSchool.php`, {
        credentials: 'same-origin',
        method: 'POST',
        body: `id=${id}&newSchool=${newSchool}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => {
        if (response.ok) {
          console.log('Student school updated successfully!')
          resolve()
        } else {
          throw new Error('Something went wrong while updating student school.')
        }
      })
    })
  }

  // Update Student Information Status

  // ---> Info:     Aktualizovanie údaju "Dá vedieť"
  // ---> Schéma:   updateStudentInformationStatus( id_študenta[integer], dá_vedieť[boolean] )
  //                Funkcia očakáva id študenta a údaj 0/1 pre údaj "Dá vedieť"
  // ---> Výsledok: Success/Error log v konzoli

  updateStudentInformationStatus(id, daVediet) {
    return new Promise((resolve) => {
      fetch(`${this.serverDomain}api_updateStudentInformationStatus.php`, {
        credentials: 'same-origin',
        method: 'POST',
        body: `id=${id}&daVediet=${daVediet}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => {
        if (response.ok) {
          console.log('Student information status updated successfully!')
          resolve()
        } else {
          throw new Error('Something went wrong while updating student information status.')
        }
      })
    })
  }

  // Update Student Note

  // ---> Info:     Aktualizovanie poznámky študenta
  // ---> Schéma:   updateStudentNote( id_študenta[integer], poznámka[string] )
  //                Funkcia očakáva id študenta a poznámku
  // ---> Výsledok: Success/Error log v konzoli

  updateStudentNote(id, note) {
    return new Promise((resolve) => {
      fetch(`${this.serverDomain}/api_updateStudentNote.php`, {
        credentials: 'same-origin',
        method: 'POST',
        body: `id=${id}&note=${note}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then((response) => {
        if (response.ok) {
          console.log('Student note updated successfully!')
          resolve()
        } else {
          throw new Error('Something went wrong while updating student note.')
        }
      })
    })
  }
}

//////////////////////////
/////////////////////////////////////
/////////////////////////

//
// VZOR POUŽITIA
//

const api = new WiggleApi({
  url: 'https://wiggle.gubrica.com',
})

api.getSchoolList(2022, 'ZS', 'mk').then((data) => {
  console.log(data)
})
