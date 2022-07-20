window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/locations/';
  
    const response = await fetch(url);
  
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const selectTag = document.getElementById('location');
      for (const location of data.locations) {
        const optionTag= document.createElement('option')
        optionTag.value= location.id
        optionTag.innerHTML= location.name
        selectTag.appendChild(optionTag);
      }
      const formTag= document.getElementById('create-conference-form');
      formTag.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData= new FormData(formTag);
        const json= JSON.stringify(Object.fromEntries(formData));
        console.log(json)
        const conferenceUrl = 'http://localhost:8000/api/conferences/';
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
    };

    const response = await fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
        formTag.reset();
        const newConference = await response.json();
        console.log(newConference);
      }
    });
    }
  
  });