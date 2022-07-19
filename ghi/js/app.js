function createCard(name, description, pictureUrl, starts, ends, location) {
    return `
      <div class="card" style="flex-wrap: wrap; border: 0px;">
            <div class="shadow p-3 mb-5 bg-white rounded">
            <img src="${pictureUrl}" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
            <p class="card-text">${description}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">${starts} - ${ends} </small>
            </div>
        </div>
      </div>
    `;
  }
window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        // Figure out what to do when the response is bad
        console.error('Something went wrong with the request');
      } else {
        const data = await response.json();
        let columnNum = 0;

        for (let conference of data.conferences) {
            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
              const details = await detailResponse.json();
              const name = details.conference.name;
              const description = details.conference.description;
              const pictureUrl = details.conference.location.picture_url;
              const location = details.conference.location.name;
              const jsonstarts = details.conference.starts;
              const jsonends = details.conference.ends;
              const s_day_time = new Date(jsonstarts)
                var month = s_day_time.getMonth()
                var day = s_day_time.getDate()
                var year = s_day_time.getFullYear()
                var starts = month + "/" + day + "/" + year
            const e_day_time = new Date(jsonends)
                var month = e_day_time.getMonth() + 1
                var day = e_day_time.getDate()
                var year = e_day_time.getFullYear()
                var ends = month + "/" + day + "/" + year
              const html = createCard(name, description, pictureUrl, starts, ends, location);
              console.log(html)
              const columns = document.querySelectorAll('.col');
              let column = columns[columnNum];
              columnNum +=1;
              if (columnNum > 2)
              {
                columnNum = 0;
              }
              column.innerHTML += html;
            }
          }
    
    }
  } catch (e) {
        // console.error(e);
        // const html = generateError();
        // const row = document.querySelector('.row');
        // row.innerHTML += html; 
        (e => console.error('error', e));

      // Figure out what to do if an error is raised
    }
  
  });