const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelected = document.getElementById('movie-list');

let selectedTicketPrice = +movieSelected.value;

//get data from localStorage and populat UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectSeats')) ?? [];

  selectedSeats.forEach((seatIndex) => {
    seats[seatIndex].classList.add('selected');
  });

  const selectedMovie =
    JSON.parse(localStorage.getItem('selectedMovieIndex')) ?? 0;
  movieSelected.selectedIndex = selectedMovie;

  selectedTicketPrice =
    JSON.parse(localStorage.getItem('selectedMoviePrice')) ??
    selectedTicketPrice;
  updateSelectedCount();
};
//upddate count and price
updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  localStorage.setItem('selectSeats', JSON.stringify(seatsIndex));
  const selectedSeatsCount = selectedSeats.length;

  count.innerHTML = selectedSeatsCount;
  total.innerHTML = selectedSeatsCount * selectedTicketPrice;
};

saveSelectedMovieData = (movieIndex, moviePrice) => {
  console.log(movieIndex, moviePrice);
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

//movie change listner

movieSelected.addEventListener('change', (e) => {
  selectedTicketPrice = +movieSelected.value;
  saveSelectedMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//seat click listener
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

populateUI();
