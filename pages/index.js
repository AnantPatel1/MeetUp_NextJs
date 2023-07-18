import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
// const Dummy_items = [
//   {
//     id: "m1",
//     title: "Rivers and Moutains",
//     address: "Switzerland, 1243 ",
//     image: "https://nitsaholidays.in/uploads/blog/588661nitsa.jpg",
//     description: "Beauty",
//   },
//   {
//     id: "m2",
//     title: "Skyscrappers",
//     address: "Chicago, 1245 ",
//     image:
//       "https://t4.ftcdn.net/jpg/02/20/54/73/360_F_220547309_vGPvZ7CEp09UOtRw3QIsmQaRS0zgQWjB.jpg",
//     description: "Awesome",
//   },
//   {
//     id: "m3",
//     title: "Historical Buildings",
//     address: "Croatia, 1246 ",
//     image:
//       "https://media.cnn.com/api/v1/images/stellar/prod/230113155058-01-istria-kvarner-croatia-rab.jpg?c=original",
//     description: "Beauty",
//   },
// ];

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

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
// The req object contains information about the incoming request, such as the HTTP method, the URL, and the cookies.
// The res object represents the outgoing response, and it can be used to set the response headers, the status code, and the body of the response.

// fetch data from an API
//   return {
//     props: {
//       meetups: Dummy_items,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Anant:This_IsAwesome@cluster0.grjntze.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetuplist = await meetupsCollection.find().toArray();
  // since it returns a promise await it
  client.close();

  return {
    props: {
      meetups: meetuplist.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}
export default HomePage;
// remember to use serverside props only when your data changes more frequently so that revalidate cannot help you, or you need acees to request and response, in every other cases we should use only staticprops
