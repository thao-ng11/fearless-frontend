window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';
  
    const response = await fetch(url);
  
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const selectTag = document.getElementById('conference');
      for (const conference of data.conferences) {
        const optionTag= document.createElement('option')
        optionTag.value= conference.id
        optionTag.innerHTML= conference.name
        selectTag.appendChild(optionTag);
      }
      const formTag= document.getElementById('create-presentation-form');
      formTag.addEventListener('submit', async (event) => {
        event.preventDefault();

        
        const formData= new FormData(formTag);
        const conferenceID = Object.fromEntries(formData).conference;
        const json= JSON.stringify(Object.fromEntries(formData));
        console.log(conferenceID)
        const presentationUrl = `http://localhost:8000/api/conferences/${conferenceID}/presentations/`;
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
    };

    const response = await fetch(presentationUrl, fetchConfig);
    if (response.ok) {
        formTag.reset();
        const newPresentation = await response.json();
        console.log(newPresentation);
      }
    });
    }
  
});