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

function HomePage(props) {
  // const [loadMeetup, setLoadMeetup] = useState([]);
  // if you visit the index.html in dev tools, you will find the <ul> to be empty, this is because the NextJs does not wait for the next render cycle
  // here initially the loadmeetup is empty [], so this is hown in the dev tools
  // useEffect(() => {
  //   // send a http request to fetch data
  //   setLoadMeetup(Dummy_items);
  // }, []);
  return <MeetupList meetups={props.meetups} />;
}

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  // The req object contains information about the incoming request, such as the HTTP method, the URL, and the cookies.
  // The res object represents the outgoing response, and it can be used to set the response headers, the status code, and the body of the response.

  // fetch data from an API
  return {
    props: {
      meetups: Dummy_items,
    },
  };
}

// export async function getStaticProps() {
//   // fetch data from an API
//   return {
//     props: {
//       meetups: Dummy_items,
//     },
//     revalidate: 1,
//   };
// }
export default HomePage;
