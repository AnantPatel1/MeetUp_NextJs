import MeetupList from "../components/meetups/MeetupList";

const Dummy_items = [
  {
    id: "m1",
    title: "Rivers and Moutains",
    address: "Switzerland, 1243 ",
    image: "https://nitsaholidays.in/uploads/blog/588661nitsa.jpg",
    description: "Beauty",
  },
  {
    id: "m1",
    title: "Rivers and Moutains",
    address: "Switzerland, 1243 ",
    image: "https://nitsaholidays.in/uploads/blog/588661nitsa.jpg",
    description: "Beauty",
  },
  {
    id: "m1",
    title: "Rivers and Moutains",
    address: "Switzerland, 1243 ",
    image: "https://nitsaholidays.in/uploads/blog/588661nitsa.jpg",
    description: "Beauty",
  },
];

function HomePage() {
  return <MeetupList meetups={Dummy_items} />;
}
export default HomePage;
