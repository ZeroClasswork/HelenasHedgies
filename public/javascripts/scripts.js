if (document.querySelector('#new-pet')) {
  document.querySelector('#new-pet').addEventListener('submit', (e) => {
    e.preventDefault();

    let pet = {};
    const inputs = document.querySelectorAll('.form-control');
    for (const input of inputs) {
      pet[input.name] = input.value;
    }

    axios.post('/pets', pet)
      .then(function (res) {
        window.location.replace(`/pets/${res.data.pet._id}`);
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}